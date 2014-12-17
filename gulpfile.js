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
,   buffer = require('gulp-buffer');


// CONSTANTS
//==============================================================================

var PUBLIC = __dirname + '/public'
,   DIST = __dirname + '/dist'
,   POINT_OF_ENTRY = PUBLIC + '/js/app'
,   BOWER_HOME = PUBLIC + '/bower_components';

var PATHS = {
    src: {
        scss: PUBLIC + '/scss/*.scss',
        js: PUBLIC + '/js/**/*.js',
        jade: PUBLIC + '/**/*.jade',
        html: PUBLIC + '/**/*.html',
        bower: BOWER_HOME + '**/*.css'
    },

    dest: {
        css: DIST + '/css' ,
        js: DIST + '/js',
        vendor: DIST + '/vendor'
    }
};


// TASKS
//==============================================================================
gulp.task('default', [
  'compile:js',
  'compile:css',
  'compile:bower',
  'publish',
  'compile:jade',
  'watch'
]);

gulp.task('watch', function() {
    var server = livereload();

    gulp.watch(PATHS.src.scss, ['compile:css']);
    gulp.watch(PATHS.src.js, ['compile:js']);
    gulp.watch(PATHS.src.html, ['publish']);
    gulp.watch(PATHS.src.jade, ['jade']);
});

gulp.task('jshint', function() {
    return gulp.src( PATHS.src.js )
        .pipe( jshint() )
        .pipe( jshint.reporter('jshint-stylish') );
});

gulp.task('publish', function() {
    return gulp.src( PATHS.src.html )
        .pipe( gulp.dest(DIST) )
        .pipe( livereload() );
});

gulp.task('compile:jade', function() {
    return gulp.src( PATHS.src.jade )
        .pipe( jade() )
        .pipe( gulp.dest(DIST) )
        .pipe( livereload() );
});

gulp.task('compile:bower', function() {
    return gulp.src( PATHS.src.bower )
        .pipe( gulp.dest(PATHS.dest.vendor) )
        .pipe( livereload() );
});

gulp.task('compile:js', ['jshint'], function() {
    return browserify( POINT_OF_ENTRY )
        .bundle()
        .pipe( source('bundle.js') ) 
        .pipe( streamify(uglify()) )
        .pipe( buffer() )
        .pipe( rev() )
        .pipe( gulp.dest(PATHS.dest.js) )
        
        // build manifest
        //.pipe(rev.manifest())
        //.pipe(gulp.dest('./dist/js'))
        .pipe( livereload() );
});

gulp.task('compile:css', function() {
    return gulp.src( PATHS.src.scss )
        .pipe( sass() )
        .pipe( csslint() )
        .pipe( csslint.reporter() )
        .pipe( buffer() )
        .pipe( rev() )
        .pipe( gulp.dest(PATHS.dest.css) )
        .pipe( livereload() );
});
