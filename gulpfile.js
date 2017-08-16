import gulp from 'gulp';
import mocha from 'gulp-mocha';

gulp.task('test', () => {
  gulp.src(['test/*test.js'], { read: false })
    .pipe(mocha())
    .once('error', () => {
      process.exit(1);
    })
    .once('end', () => {
      process.exit();
    });
});
