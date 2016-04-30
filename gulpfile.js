/**
 * Created by urvoy_p on 27/04/16.
 */
// Gulp Imports
const gulp        = require('gulp');
const gulpUtil    = require('gulp-util');
const gulpQunit   = require('gulp-qunit');
const gulpClean   = require('gulp-clean');
const gulpUglifly = require('gulp-uglify');
const gulpRename  = require('gulp-rename');
const gulpWebpack = require('webpack-stream');
const webpackConf = require('./webpack.config.js');

const paths = {
  scriptFiles: 'app/src/**/*.js',
  buildPath: 'app/out/',
  buildFiles: 'app/out/*.js',
  appIndex: 'app/index.html',
  testIndex: 'app/tests/index.html'
};

gulp.task('watch', function () {
  gulp.watch(paths.scriptFiles, ['build']);
});

gulp.task('watch-n-test', function () {
  gulp.watch(paths.scriptFiles, ['build', 'test']);
});

gulp.task('build', function () {
  return gulp.src(paths.scriptFiles)
    .pipe(gulpWebpack(webpackConf))
    .pipe(gulp.dest(paths.buildPath));
});

gulp.task('test', function () {
  return gulp.src(paths.testIndex)
    .pipe(gulpQunit());
});

gulp.task('clean', function () {
  return gulp.src(paths.buildPath, {read: false})
    .pipe(gulpClean());
});