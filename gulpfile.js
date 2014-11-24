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
//,   livereload = require('./app/livereload')
//,   bodyParser = require('body-parser')
//,   db = require('./config/db');
//


// TASKS
//==================================================================
gulp.task("default", function() {
    gulp.watch("./public/**/*.scss", ["compile:css"]);
    gulp.watch("./public/js/*.js", ["browserify"]);
    //gulp.watch("./app/**/*.*", livereload);
});

gulp.task("jshint", function() {
    return gulp.src(["./public/js/**/*.js"])
      .pipe(jshint())
      .pipe(jshint.reporter("jshint-stylish"))
});

//gulp.task("compile:js", function() {
//    return gulp.src('./public/js/*.js')
//        .pipe(concat('all.js'))
//        .pipe(gulp.dest('./dist/js'));
//});

gulp.task("browserify", ["jshint"], function() {
    return browserify('./public/js/app')
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(streamify(uglify()))
        .pipe(gulp.dest('./public/dist'))
});

//gulp.task("compile:js", ["jshint"], function() {
//    // single point of entry for app
//    var bundle = browserify("./src/js/main.js").bundle();
//    return bundle
//      .pipe(source("bundle.js"))
//      .pipe(gulp.dest("./public/static/js/"));
//});

gulp.task("compile:css", function() {
    return gulp.src(["./public/scss/*.scss"])
        .pipe(sass())
        .pipe(csslint())
        .pipe(csslint.reporter())
        .pipe(gulp.dest("./public/css"));
});
