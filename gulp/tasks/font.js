module.exports = (gulp, config, plugins) => () => gulp.src(config.src.fonts, {
        since: gulp.lastRun('font')
    }).pipe(plugins.plumber({
        errorHandler: plugins.notify.onError(err => ({
            title: 'fonts',
            message: err.message
        }))
    }))
    .pipe(plugins.debug({
        title: 'fonts:'
    }))
    .pipe(gulp.dest(config.build.fonts));