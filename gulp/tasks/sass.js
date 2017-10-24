let autoprefixer = require('autoprefixer');

module.exports = (gulp, config, plugins) => () => {
    let isProd = process.env.NODE_ENV === 'production';

    return gulp.src(config.src.sass)
        .pipe(plugins.plumber({
            errorHandler: plugins.notify.onError(err => ({
                title: 'sass',
                message: err.message
            }))
        }))
        .pipe(plugins.if(!isProd, plugins.sourcemaps.init()))
        .pipe(plugins.sass()
            .on('error', plugins.sass.logError))
        .pipe(plugins.postcss([
            autoprefixer({
                browsers: ['> 1%', 'last 5 versions', 'Firefox ESR'],
                remove: false
            })
        ]))
        .pipe(plugins.if(isProd, plugins.cssmin()))
        .pipe(plugins.if(!isProd, plugins.sourcemaps.write()))
        .pipe(plugins.debug({
            title: 'sass:'
        }))
        .pipe(plugins.if(isProd, plugins.rename(path => {
            path.extname = `.min${path.extname}`;
        })))
        .pipe(gulp.dest(config.build.css));
};