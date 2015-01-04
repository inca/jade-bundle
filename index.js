"use strict";

var grunt = require('grunt')
  , path = require('path')
  , _ = require('underscore')
  , fs = require('fs')
  , jade = require('jade');

var Bundle = module.exports = exports = function(options) {
  this.options = options || {};
};

function expand(pattern, cwd) {
  var arr = Array.isArray(pattern) ? pattern : [pattern];
  return grunt.file.expand({
    filter: 'isFile',
    matchBase: true,
    cwd: cwd
  }, arr);
}

Object.defineProperty(Bundle.prototype, 'basedir', {
  get: function() {
    return this.options.basedir || process.cwd();
  }
});

Bundle.prototype.cwd = function(newRoot) {
  return new Bundle(_.extend({}, this.options, {
    cwd: newRoot
  }));
};

Bundle.prototype.compile = function(pattern, locals) {
  var bundle = this;
  var cwd = bundle.options.cwd ?
    path.join(bundle.basedir, bundle.options.cwd) :
    bundle.basedir;
  var files = expand(pattern, cwd)
    , result = {}
    , data = _.extend({}, bundle.options.locals, locals);
  files.forEach(function(file) {
    var filename = file.replace(/\.jade$/, '');
    var sourceFile = path.join(cwd, file);
    var jadeSource = fs.readFileSync(sourceFile, 'utf-8');
    var fn = jade.compile(jadeSource, {
      filename: sourceFile,
      basedir: bundle.basedir,
      doctype: 'html'
    });
    result[filename] = fn(data);
  });
  return result;
};
