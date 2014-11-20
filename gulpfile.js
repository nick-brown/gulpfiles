var gulp = require('gulp')
//,   browserify = require('gulp-browserify')
//,   source = require('vinyl-source-stream')
,   sass = require('gulp-ruby-sass')
//,   jshint = require('gulp-jshint')
//,   stylish = require('jshint-stylish')
,   csslint = require('gulp-csslint')
//,   livereload = require('./app/livereload')
//,   bodyParser = require('body-parser')
//,   db = require('./config/db');


// TASKS
//==================================================================
gulp.task("default", function() {
    gulp.watch("./app/static/**/*.scss", ["compile:css"]);
    //gulp.watch("./app/**/*.*", livereload);
});

//gulp.task("jshint", function() {
//    return gulp.src(["./src/js/**/*.js"])
//      .pipe(jshint())
//      .pipe(jshint.reporter("jshint-stylish"))
//});

//gulp.task("compile:js", ["jshint"], function() {
//    // single point of entry for app
//    var bundle = browserify("./src/js/main.js").bundle();
//    return bundle
//      .pipe(source("bundle.js"))
//      .pipe(gulp.dest("./public/static/js/"));
//});

gulp.task("compile:css", function() {
    return gulp.src(["./app/static/scss/*.scss"])
      .pipe(sass())
      .pipe(csslint())
      .pipe(csslint.reporter())
      .pipe(gulp.dest("./app/static/css"));
});
