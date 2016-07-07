/**
 * Created by urvoy_p on 27/04/16.
 */
// Gulp Imports
const gulp        = require('gulp');
const gulpQunit   = require('gulp-qunit');
const gulpClean   = require('gulp-clean');

const paths = {
  scriptFiles: 'app/src/**/*.js',
  distPath: 'app/dist/',
  distFiles: ['app/dist/creator*', 'app/dist/tests*'],
  appIndex: 'app/creator.html',
  testIndex: 'app/tests/creator.html'
};

gulp.task('test', function () {
  return gulp.src(paths.testIndex)
    .pipe(gulpQunit());
});

gulp.task('clean', function () {
  return gulp.src(paths.distFiles, {read: false})
    .pipe(gulpClean());
});