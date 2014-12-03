var gulp = require('gulp')
,   browserify = require('browserify')
,   source = require('vinyl-source-stream')
,   sass = require('gulp-ruby-sass')
,   gutil = require('gulp-util')
,   uglify = require('gulp-uglify')
,   streamify = require('gulp-streamify')
,   concat = require('gulp-concat')
,   jshint = require('gulp-jshint')
,   stylish = require('jshint-stylish')
,   csslint = require('gulp-csslint')
,   livereload = require('gulp-livereload');


// TASKS
//==============================================================================
gulp.task('default', ['compile:js', 'compile:css', 'compile:bower', 'publish', 'watch']);

gulp.task('watch', function() {
    var server = livereload();

    gulp.watch('./public/**/*.scss', ['compile:css']);
    gulp.watch('./public/js/**/*.js', ['compile:js']);
    gulp.watch('./public/index.html', ['publish']);
});

gulp.task('jshint', function() {
    return gulp.src(['./public/js/**/*.js'])
      .pipe(jshint())
      .pipe(jshint.reporter('jshint-stylish'))
});

gulp.task('publish', function() {
    return gulp.src(['./public/index.html'])
        .pipe(gulp.dest('./dist/'))
        .pipe(livereload());
});

gulp.task('compile:bower', function() {
    return gulp.src(['./public/bower_components/**/*.min.css'])
        .pipe(gulp.dest('./dist/vendor'))
        .pipe(livereload());
});

gulp.task('compile:js', ['jshint'], function() {
    return browserify('./public/js/app')
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(streamify(uglify()))
        .pipe(gulp.dest('./dist/js'))
        .pipe(livereload());
});

gulp.task('compile:css', function() {
    return gulp.src(['./public/scss/*.scss'])
        .pipe(sass())
        .pipe(csslint())
        .pipe(csslint.reporter())
        .pipe(gulp.dest('./dist/css'))
        .pipe(livereload());
});
