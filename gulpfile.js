const gulp = require('gulp');
const umd = require('gulp-umd');
const rename = require('gulp-rename');
gulp.task('build', function() {
  return gulp
    .src('src/*.js')
    .pipe(umd())
    .pipe(rename('random-irregular-polygon.umd.js'))
    .pipe(gulp.dest('build'));
});
