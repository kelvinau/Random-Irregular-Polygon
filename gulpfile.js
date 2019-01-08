const gulp = require('gulp');
const umd = require('gulp-umd');
const rename = require('gulp-rename');
gulp.task('build', function() {
  return gulp
    .src('src/*.js')
    .pipe(
      umd({
        exports: function(file) {
          return 'RIP';
        },
        namespace: function(file) {
          return 'RIP';
        },
      })
    )
    .pipe(rename('random-irregular-polygon.umd.js'))
    .pipe(gulp.dest('build'));
});
