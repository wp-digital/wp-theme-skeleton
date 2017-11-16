let gulp = require('gulp');
let tasks = require('require-dir')('gulp/tasks');
let plugins = require('gulp-load-plugins')();
let argv = require('yargs').argv;
let config = require('./gulp/config');

Object.keys(tasks).forEach(task => {
    gulp.task(task, tasks[task](gulp, config, plugins));
});

gulp.task('watch', require('./gulp/watch')(gulp, config, plugins));
gulp.task('build', (() => {
    if (argv.all) {
        // @TODO: environment variable should be set once in the process, so need research
    } else if (argv.prod) {
        return gulp.series('set-prod', 'sass', 'js');
    } else {
        return gulp.series('font', 'sprite', 'img', 'sass', 'js');
    }
})());
gulp.task('rebuild', gulp.series('clean', 'build'));
gulp.task('ws', gulp.parallel('watch', 'serve'));
gulp.task('default', gulp.series('rebuild', 'ws'));