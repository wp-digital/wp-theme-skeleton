module.exports = (gulp, config, plugins) => () => gulp
  .src(config.src.html)
  .pipe(
    plugins.plumber({
      errorHandler: plugins.notify.onError(err => ({
        title: 'html',
        message: err.message,
      })),
    }),
  )
  .pipe(plugins.fileInclude())
  .pipe(
    plugins.debug({
      title: 'html:',
    }),
  )
  .pipe(gulp.dest(config.build.html));
