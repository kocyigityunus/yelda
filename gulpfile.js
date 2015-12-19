var gulp = require('gulp');
var source = require('vinyl-source-stream'); // Used to stream bundle for further handling
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var colors = require('colors/safe');
var browserSync = require("browser-sync").create();

var onError = function(err){
  console.log( colors.red(err) );
};

gulp.task('app', function() {
  var bundler = browserify({
    entries: ['./public/javascript/app/app.jsx'],
    debug: true, // Gives us sourcemapping
  })
  .transform( babelify , { presets: ["es2015", "react"] } );

  bundler.exclude('react');
  bundler.exclude('react-dom');
  bundler.exclude('react-router');
  bundler.exclude('jquery');
  //bundler.exclude('elemental');
  //bundler.exclude('zepto-node');

    var watcher  = watchify(bundler);
    return watcher

    .on('update', function () { // When any files update
        var updateStart = Date.now();
        console.log('Updating!');
        watcher.bundle() // Create new bundle that uses the cache for high performance
        .on('error', onError )
        .pipe(source('app.js'))
        .on('error', onError )
        .pipe(gulp.dest('./public/build/'));
        console.log( colors.green( 'Updated! ' + (Date.now() - updateStart) + ' ms' ) );
        console.log( colors.random( new Date() + '' ) );
        // reload browser sync
        browserSync.reload();
    })
    .bundle() // Create the initial bundle when starting the task
    .on('error', onError )
    .pipe(source('app.js'))
    .on('error', onError )
    //.pipe(buffer()) // for uglifying
    //.pipe(uglify()) // for uglifying
    .pipe(gulp.dest('./public/build/'))
    .on('error', onError );
});

gulp.task('bundle', function() {

    var bundler = browserify();

    bundler.require('react');
    bundler.require('react-dom');
    bundler.require('react-router');
    bundler.require('jquery');
    //bundler.require('elemental');
    //bundler.require('zepto-node');

    var watcher  = watchify(bundler);
    return watcher
    .bundle()
    .on('error', onError )
    .pipe(source('bundle.js'))
    .pipe(buffer()) // for uglifying
    .pipe(uglify()) // for uglifying
    .pipe(gulp.dest('./public/build/'))
    .on('error', onError );

});

gulp.task('browser-sync', function(){


  browserSync.init({
        port : 3100,
        proxy: {
          target: "localhost:3500",
        },
    });

  /*
  browserSync({
    server: {
        baseDir: './build',
        middleware: function (req, res, next) {
            console.log('Adding CORS header for ' + req.method + ': ' + req.url);
            res.setHeader('Access-Control-Allow-Origin', '*');
            next();
        }
    }
    });
    */
});

//gulp.task('default', ['app', 'bundle'] );
gulp.task('default', ['app','bundle','browser-sync'] );
