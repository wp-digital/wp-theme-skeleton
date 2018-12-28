/* eslint-disable */
const webpackStream = require('webpack-stream');
const webpack4 = require('webpack');

module.exports = (gulp, config, plugins) => () =>
  gulp
    .src(config.src.js)
    .pipe(
      plugins.plumber({
        errorHandler: plugins.notify.onError(err => ({
          title: 'js',
          message: err.message
        }))
      })
    )
    .pipe(
      plugins.debug({
        title: 'js:'
      })
    )
    .pipe(
      webpackStream(
        {
          config: require('../webpack.config.js')
        },
        webpack4
      )
    )
    .pipe(gulp.dest(config.build.js));
