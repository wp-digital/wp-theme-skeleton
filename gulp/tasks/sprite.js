module.exports = (gulp, config, plugins) => () => gulp
  .src(config.src.sprite)
  .pipe(
    plugins.plumber({
      errorHandler: plugins.notify.onError(err => ({
        title: 'sprite',
        message: err.message,
      })),
    }),
  )
  .pipe(
    plugins.svgSprite({
      mode: {
        sprite1: {
          mode: 'symbol',
          dest: '.',
          bust: false,
          sprite: 'sprite.php',
          layout: 'vertical',
          prefix: '.',
          dimensions: '-icon',
          inline: true,
        },
        sprite2: {
          mode: 'symbol',
          dest: '.',
          bust: false,
          sprite: 'sprite.svg',
          layout: 'vertical',
          prefix: '.',
          dimensions: '-icon',
          render: {
            scss: {
              dest: 'sprite.scss',
              template: `${config.src.dir}/sass/sprite/sprite_template.scss`,
            },
          },
        },
      },
    }),
  )
  .pipe(
    plugins.debug({
      title: 'sprite:',
    }),
  )
  .pipe(
    plugins.if(
      '*.scss',
      gulp.dest(`${config.src.dir}/sass/sprite`),
      plugins.if('*.svg', gulp.dest(`${config.src.dir}/img`), gulp.dest('./')),
    ),
  );
