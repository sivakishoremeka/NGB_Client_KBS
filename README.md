# NGB_Client

This project built in Angular 1.5.

### Clone the repo

```shell
git clone https://github.com/trigitaltech/NGB_Client
cd NGB_Client
```

### Install npm packages

Install the `npm` packages described in the `package.json`:

```shell
npm install
```

### grunt scripts

For using grunt commands install grunt-cli to machine.

```shell
npm install -g grunt-cli
```

These are the most useful tasks which are defined in gruntfile:

- `grunt connect` - Start a connect web server.
- `grunt serve` - Alias for "clean:server", "copy:server", "connect:livereload",
  "watch" tasks.
- `grunt compass` - Compile Sass to CSS using Compass.
- `grunt cssmin` - Minify CSS.
- `grunt jshint` - Validate files with JSHint.
- `grunt nodeunit` - Run Nodeunit unit tests.
- `grunt requirejs` - Build a RequireJS project.
- `grunt uglify` - Minify files with UglifyJS.
- `grunt watch` - Run predefined tasks whenever watched files change.
- `grunt devcode` - Remove code blocks based on environment configuration.
- `grunt gh-pages` - Publish to gh-pages.
- `grunt gh-pages-clean` - Clean cache dir.
- `grunt karma` - run karma.
- `grunt validate` - Alias for "jshint:all", "validation" tasks.
- `grunt default` - Alias for "clean", "jshint", "copy:dev" tasks.

These are the build & deploy related available tasks script:

- `grunt prod` - Alias for "clean:dist", "clean:server", "compass:dist","copy:prod", "copy:tests", "concat", "uglify:prod","devcode:dist", "hashres", "replace" tasks.
- `grunt dev` - Alias for "clean", "compass:dev", "copy:dev" tasks.
- `grunt deploy` - Alias for "prod", "gh-pages" tasks.
