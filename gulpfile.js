var gulp = require('gulp');
var rename = require('gulp-rename');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var colors = require('colors');

var sassPath = './src/css/**/*.scss';
var cssOutput = './src/css';

// Compile SCSS files
gulp.task('compile-sass', function() {
  var s = sass();
  return gulp.src(sassPath)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({ browsers: 'last 2 versions' }))
    .pipe(rename(function(path) {
      path.extname = ".css"
    }))
    .pipe(gulp.dest(cssOutput))
    .pipe(browserSync.stream())
    .pipe(cleanCSS())
    .pipe(rename(function(path) {
      path.basename += ".min";
    }))
    .pipe(gulp.dest(cssOutput))
    .pipe(browserSync.stream());
});

gulp.task('watch', function() {
  return gulp.watch(sassPath, ['compile-sass']);
});

// Django server and Browser Sync
gulp.task('serve', ['watch'], function() {
  browserSync.init({
    server: {
      baseDir: '.',
      index: 'index.html'
    },
    browser: "google chrome"
  });

  gulp.watch('src/**/*.js').on('change', browserSync.reload);
  gulp.watch('./*.html').on('change', browserSync.reload);
});

gulp.task('default', ['serve'])
