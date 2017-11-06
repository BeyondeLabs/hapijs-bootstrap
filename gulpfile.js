const gulp = require('gulp');
const shell = require('gulp-shell');
const watch = require('gulp-watch');

const src = [
  './db',
  './routes',
  './services',
  './test',
  './server.js',
];

gulp.task('watch', () => 
  watch(src, () => gulp.run('test:dev'))
);

gulp.task('test:dev', shell.task(['yarn test:dev']));