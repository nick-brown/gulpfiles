// MODULES
//==============================================================================

var gulp       = require('gulp')
,   browserify = require('browserify')
,   source     = require('vinyl-source-stream')
,   sass       = require('gulp-sass')
,   gutil      = require('gulp-util')
,   uglify     = require('gulp-uglify')
,   streamify  = require('gulp-streamify')
,   concat     = require('gulp-concat')
,   jshint     = require('gulp-jshint')
,   stylish    = require('jshint-stylish')
,   csslint    = require('gulp-csslint')
,   livereload = require('gulp-livereload')
,   jade       = require('gulp-jade')
,   rev        = require('gulp-rev')
,   mincss     = require('gulp-minify-css')
,   es         = require('event-stream')
,   inject     = require('gulp-inject');


// CONSTANTS
//==============================================================================

var PUBLIC         = __dirname + '/public'
,   DIST           = __dirname + '/dist'
,   POINT_OF_ENTRY = PUBLIC + '/js/app'
,   BOWER_HOME     = PUBLIC + '/bower_components';

var PATHS = {
    src: {
        scss: PUBLIC + '/scss/*.scss',
        js: PUBLIC + '/js/**/*.js',
        jade: PUBLIC + '/**/*.jade',
        html: PUBLIC + '/**/*.html',
        bower: [BOWER_HOME + '/**/*.css', '!' + BOWER_HOME + '/**/*.min.css']
    },

    dest: {
        css: DIST + '/css' ,
        js: DIST + '/js',
        vendor: DIST + '/vendor'
    }
};


// STREAMS
//==============================================================================

var jsStream = function() {
    return browserify( POINT_OF_ENTRY )
        .bundle()
        .pipe( source('bundle.js' ))
        .pipe( streamify( uglify() ) )
        .pipe( streamify( rev() ) )
        .pipe( gulp.dest( PATHS.dest.js ));
};

var cssStream = function() {
   return gulp.src( PATHS.src.scss )
        .pipe( sass() )
        .pipe( csslint() )
        .pipe( csslint.reporter() )
        .pipe( streamify( rev() ) )
        .pipe( gulp.dest( PATHS.dest.css ) );
};

var vendorStream = function() {
    return gulp.src( PATHS.src.bower )
        .pipe( mincss() )
        .pipe( gulp.dest( PATHS.dest.vendor ) );
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

    gulp.watch(PATHS.src.scss, ['compile:css'], server);
    gulp.watch(PATHS.src.js, ['compile:js'], server);
    gulp.watch(PATHS.src.html, ['publish'], server);
    gulp.watch(PATHS.src.jade, ['jade'], server);
});

gulp.task('lint:js', function() {
    return gulp.src( PATHS.src.js )
        .pipe( jshint() )
        .pipe( jshint.reporter('jshint-stylish') );
});

gulp.task('compile:js', ['lint:js'], jsStream);

gulp.task('compile:bower', vendorStream);

gulp.task('compile:jade', function() {
    return gulp.src( PATHS.src.jade )
        .pipe( jade() )
        .pipe( gulp.dest(DIST) );
});

gulp.task('compile', ['lint:js'], function() {
    var injector = inject( es.merge( jsStream(), cssStream(), vendorStream() ) );

    // TODO: fix injector to work on html and jade simultaneously
    //gulp.src( PATHS.src.jade )
    //    .pipe( injector )
    //    .pipe( jade() )
    //    .pipe( gulp.dest( DIST ) );

    return gulp.src( PATHS.src.html )
        .pipe( injector )
        .pipe( gulp.dest( DIST ) );
});
