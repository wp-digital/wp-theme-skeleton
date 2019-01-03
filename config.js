module.exports = {
  src: {
    dir: 'assets/src',
    fonts: 'assets/src/fonts/**/*.{eot,ttf,woff,woff2,svg}',
    js: 'assets/src/js/common.js',
    sass: 'assets/src/sass/*.{sass,scss}',
    html: 'assets/src/html/*.html',
    img: [
      'assets/src/img/**/*.{jpg,png,gif,svg}',
      '!assets/src/img/sprite/*.*',
    ],
    sprite: 'assets/src/img/sprite/*.svg',
  },
  watch: {
    fonts: 'assets/src/fonts/**/*.{eot,ttf,woff,woff2,svg}',
    js: 'assets/src/js/**/*.{js,jsx}',
    sass: 'assets/src/sass/**/*.{sass,scss}',
    html: 'assets/src/html/**/*.html',
    img: [
      'assets/src/img/**/*.{jpg,png,gif,svg}',
      '!assets/src/img/sprite/*.*',
    ],
    sprite: 'assets/src/img/sprite/*.svg',
  },
  build: {
    dir: 'assets/build',
    fonts: 'assets/build/fonts',
    js: 'assets/build/js',
    css: 'assets/build/css',
    html: 'assets/build/html',
    img: 'assets/build/img',
    all: 'assets/build/**/*.*',
    sprite: 'assets/build/sprite',
  },
  local: 'http://localhost',
};
