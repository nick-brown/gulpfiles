/*globals __dirname*/

// MODULES
//==============================================================================

var gulp       = require('gulp')
,   browserify = require('browserify')
,   source     = require('vinyl-source-stream')
,   sass       = require('gulp-sass')
,   uglify     = require('gulp-uglify')
,   streamify  = require('gulp-streamify')
,   jshint     = require('gulp-jshint')
,   csslint    = require('gulp-csslint')
,   livereload = require('gulp-livereload')
,   jade       = require('gulp-jade')
,   rev        = require('gulp-rev')
,   mincss     = require('gulp-minify-css')
,   es         = require('event-stream')
,   inject     = require('gulp-inject')
,   gulpif     = require('gulp-if')
,   argv       = require('yargs').argv;


// CONSTANTS
//==============================================================================

var PUBLIC          = __dirname + '/public'
,   DIST            = __dirname + '/dist'
,   POINT_OF_ENTRY  = PUBLIC + '/js/app'
,   BOWER_HOME      = PUBLIC + '/bower_components'
,   PROD            = !!argv.production || !!argv.prod ? true : false;

var PATHS = {
    src: {
        js    : PUBLIC + '/js/**/*.js',
        scss  : PUBLIC + '/scss/*.scss',
        jade  : PUBLIC + '/**/*.jade',
        html  : PUBLIC + '/**/*.html',
        bower : [
            BOWER_HOME + '/**/*.css',
            '!' + BOWER_HOME + '/**/*.css.map',
            '!' + BOWER_HOME + '/**/*.min.css'
        ]
    },

    dest: {
        js     : DIST + '/js',
        css    : DIST + '/css' ,
        vendor : DIST + '/vendor'
    }
};



// STREAMS
//==============================================================================

var jsStream = function() {
    'use strict';
    return browserify( [POINT_OF_ENTRY], { debug: !PROD })
        .bundle()
        .pipe( source('bundle.js') )
        .pipe( gulpif( PROD, streamify( uglify() ) ) )
        .pipe( streamify( rev() ) )
        .pipe( gulp.dest( PATHS.dest.js ));
};

var cssStream = function() {
    'use strict';
   return gulp.src( PATHS.src.scss )
        .pipe( sass() )
        .pipe( csslint() )
        .pipe( csslint.reporter() )
        .pipe( gulpif( PROD, mincss() ) )
        .pipe( streamify( rev() ) )
        .pipe( gulp.dest( PATHS.dest.css ) );
};

var vendorStream = function() {
    'use strict';
    return gulp.src( PATHS.src.bower )
        .pipe( gulpif( PROD, mincss() ) )
        .pipe( streamify( rev() ) )
        .pipe( gulp.dest( PATHS.dest.vendor ) );
};


// TASKS
//==============================================================================
gulp.task('default', ['compile', 'watch']);

gulp.task('watch', function() {
    'use strict';
    gulp.watch(PATHS.src.scss, ['compile:css']);

    gulp.watch(PATHS.src.js, ['compile:js']);

    gulp.watch(PATHS.src.jade, ['compile']);
});

gulp.task('lint:js', function() {
    'use strict';
    return gulp.src( PATHS.src.js )
        .pipe( jshint() )
        .pipe( jshint.reporter('jshint-stylish') );
});

gulp.task('compile:js', ['lint:js'], jsStream);

gulp.task('compile:css', cssStream);

gulp.task('compile:bower', vendorStream);

gulp.task('compile', ['lint:js'], function() {
    'use strict';

    var injector = inject( es.merge(jsStream(), cssStream(), vendorStream()), { 
        ignorePath: '/dist'
    });

    return gulp.src( PATHS.src.jade )
        .pipe( injector )
        .pipe( jade({ pretty: !PROD }) )
        .pipe( gulp.dest( DIST ) )
        .pipe( livereload() );

    // TODO: fix injector to work on html and jade simultaneously
    //return gulp.src( PATHS.src.html )
    //    .pipe( injector )
    //    .pipe( gulp.dest( DIST ) );
});
