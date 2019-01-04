const gulp = require('gulp');
const tasks = require('require-dir')('gulp/tasks');
const plugins = require('gulp-load-plugins')();
const {
  argv,
} = require('yargs');
const config = require('./config');

Object.keys(tasks).forEach((task) => {
  gulp.task(task, tasks[task](gulp, config, plugins));
});

gulp.task('watch', require('./gulp/watch')(gulp, config, plugins));

gulp.task('build', (() => {
  switch (true) {
    case argv.prod:
      return gulp.series('set-prod', 'sass');
    default:
      return gulp.series('font', 'sprite', 'img', 'sass');
  }
})());
gulp.task('rebuild', gulp.series('clean', 'build'));
gulp.task('ws', gulp.parallel('watch', 'serve', 'html'));
gulp.task('default', gulp.series('rebuild', 'ws'));
