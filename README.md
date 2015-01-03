# Jade Templates Prerenderer

This tiny library allows you to render a set of Jade templates, so that you could place them anywhere on your page.

A typical example would be to bundle static snippets for use with client-side frameworks (like AngularJS):

```
each html, filename in bundle.cwd('pages').compile('admin/*')
  script(id=filename, type='text/ng-template')!= html
```

Note that Jade is synchronous, so on production this should be replaced with static HTML page. Again, this is where `jade-bundle` would come in handy.

## Usage

Configure the `JadeBundle` object and place it in your locals:

```
var JadeBundle = require('jade-bundle');

app.use(function(req, res, next) {
  res.locals.bundle = new JadeBundle({
    basedir: '/path/to/views',
    locals: res.locals
  });
  next();
});
```

Now use it right inside your templates, like this:

```
# /path/to/views/index.html
each html, filename in bundle.cwd('templates').compile('**/*.jade')
  script(id=filename, type='text/ng-template')!= html
```

The `cwd` method was used above to make filenames relative to `/path/to/views/templates` directory.

## Notes

* The `.jade` extension is stripped from filename, so that you can append the desired one.

* The filenames do not start with a slash. Feel free to prepend one, if you need it.

* In production you might want to compile the Jade using `grunt-contrib-jade`. In most cases you can also place `bundle` into `options.data` and it will work like a charm.

## License

You don't need one. Use at your own risk and be nice to others :)
