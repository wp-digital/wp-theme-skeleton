const browserSync = require('browser-sync').create();

module.exports = (gulp, config, plugins) => () => {
  browserSync.init({
    server: {
      baseDir: config.build,
      // directory: true
    },
    // proxy: {
    //     target: config.local
    // },
    open: false,
    notify: false,
  });
  browserSync.watch([config.build.all]).on('change', browserSync.reload);
};
