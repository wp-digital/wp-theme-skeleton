const jpegoptim = require('imagemin-jpegoptim');
const pngquant = require('imagemin-pngquant');
const imageminPngcrush = require('imagemin-pngcrush');

module.exports = (gulp, config, plugins) => () => gulp
  .src(config.src.img, {
    since: gulp.lastRun('img'),
  })
  .pipe(
    plugins.plumber({
      errorHandler: plugins.notify.onError(err => ({
        title: 'img',
        message: err.message,
      })),
    }),
  )
  .pipe(
    plugins.imagemin([
      plugins.imagemin.gifsicle({
        interlaced: true,
        optimizationLevel: 1,
      }),
      plugins.imagemin.jpegtran({
        progressive: true,
      }),
      plugins.imagemin.optipng({
        optimizationLevel: 3,
      }),
      plugins.imagemin.svgo({
        plugins: [
          {
            optimizationLevel: 3,
          },
          {
            progessive: true,
          },
          {
            interlaced: true,
          },
          {
            removeViewBox: false,
          },
          {
            removeUselessStrokeAndFill: false,
          },
          {
            cleanupIDs: false,
          },
        ],
      }),
      jpegoptim({
        max: 75,
      }),
      pngquant({
        quality: '65-80',
        speed: 3,
      }),
      imageminPngcrush(),
    ]),
  )
  .pipe(
    plugins.debug({
      title: 'img:',
    }),
  )
  .pipe(gulp.dest(config.build.img));
