import gulp from 'gulp';
import runSequence from 'run-sequence';

gulp.task('dev', cb => runSequence('clean', 'nodemon', cb));
