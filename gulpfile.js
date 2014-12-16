var gulp = require('gulp')
,   browserify = require('browserify')
,   source = require('vinyl-source-stream')
,   sass = require('gulp-sass')
,   gutil = require('gulp-util')
,   uglify = require('gulp-uglify')
,   streamify = require('gulp-streamify')
,   concat = require('gulp-concat')
,   jshint = require('gulp-jshint')
,   stylish = require('jshint-stylish')
,   csslint = require('gulp-csslint')
,   livereload = require('gulp-livereload')
,   jade = require('gulp-jade')
,   rev = require('gulp-rev')
,   buffer = require('gulp-buffer')
,   usemin = require('gulp-usemin');


// TASKS
//==============================================================================
gulp.task('default', ['compile:js', 'compile:css', 'compile:bower', 'publish', 'compile:jade', 'watch']);

gulp.task('watch', function() {
    var server = livereload();

    gulp.watch('./public/**/*.scss', ['compile:css']);
    gulp.watch('./public/js/**/*.js', ['compile:js']);
    gulp.watch('./public/index.html', ['publish']);
    gulp.watch('./public/**/*.jade', ['jade']);
});

gulp.task('jshint', function() {
    return gulp.src(['./public/js/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('publish', function() {
    return gulp.src(['./public/**/*.html', '!./public/bower_components/**/*.html'])
        .pipe(gulp.dest('./dist/'))
        .pipe(livereload());
});

gulp.task('compile:jade', function() {
    return gulp.src('./public/**/*.jade')
        .pipe(jade())
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
        .pipe(buffer())
        .pipe(rev())
        .pipe(gulp.dest('./dist/js'))
        
        // build manifest
        //.pipe(rev.manifest())
        //.pipe(gulp.dest('./dist/js'))
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
