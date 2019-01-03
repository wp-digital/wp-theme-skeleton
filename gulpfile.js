let gulp = require('gulp')
let tasks = require('require-dir')('gulp/tasks')
let plugins = require('gulp-load-plugins')()
let argv = require('yargs').argv
let config = require('./config')

Object.keys(tasks).forEach(task => {
  gulp.task(task, tasks[task](gulp, config, plugins))
})

gulp.task('watch', require('./gulp/watch')(gulp, config, plugins))
gulp.task('build', (() => {
  switch (true) {
    case argv.prod:
      return gulp.series('set-prod', 'sass', 'js')
    default:
      return gulp.series('font', 'sprite', 'img', 'sass', 'js')
  }
})())
gulp.task('rebuild', gulp.series('clean', 'build'))
gulp.task('ws', gulp.parallel('watch', 'serve', 'html'))
gulp.task('default', gulp.series('rebuild', 'ws'))

//     "babel-plugin-dynamic-import-webpack": "^1.0.1",
//     "babel-plugin-transform-react-jsx": "^6.24.1",
