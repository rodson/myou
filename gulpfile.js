'use strict';

// Include gulp & tools we'll use
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var pageSpeed = require('psi');
var reload = browserSync.reload;
var karma = require('karma').server;

var AUTOPREFIXER_BROWSERS = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];

// Config karma for unit testing
gulp.task('karma', function (done) {
  karma.start({
    configFile: __dirname + '/karma.conf.js',
    autoWatch: true,
    singleRun: false
  }, function () {
    done();
  });
});

// Lint JavaScript
gulp.task('jshint', function () {
  return gulp.src('app/**/*.js')
    .pipe(reload({stream: true, once: true}))
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'));
});

// Optimize images
gulp.task('images', function () {
  return gulp.src('assets/images/**/*')
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('dist/assets/images'))
    .pipe($.size({title: 'images'}));
});

// Copy all files at the root level (app)
gulp.task('copy', function () {
  return gulp.src([
    'app/**/*',
  ], {
    dot: true
  }).pipe(gulp.dest('dist/app'))
    .pipe($.size({title: 'copy'}));
});

// Copy web fonts to dist
gulp.task('fonts', function () {
  return gulp.src(['assets/fonts/**'])
    .pipe(gulp.dest('dist/assets/fonts'))
    .pipe($.size({title: 'fonts'}));
});

// Compile and automatically prefix stylesheets
gulp.task('styles', function () {
  return gulp.src([
    'assets/styles/*.scss',
    'assets/styles/components/components.scss'
  ])
    .pipe($.sourcemaps.init())
    .pipe($.changed('.tmp/assets/styles', {extension: '.css'}))
    .pipe($.sass({
      precision: 10,
      onError: console.error.bind(console, 'Sass error:')
    }))
    .pipe($.autoprefixer({browsers: AUTOPREFIXER_BROWSERS}))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('.tmp/assets/styles'))
    // Concatenate and minify styles
    .pipe($.if('*.css', $.csso()))
    .pipe(gulp.dest('dist/assets/styles'))
    .pipe($.size({title: 'styles'}));
});

// Scan your HTML for assets & optimize them
gulp.task('html', function () {
  var assets = $.useref.assets({searchPath: '{.tmp,.}'});

  return gulp.src('./index.html')
    .pipe(assets)
    // Concatenate and minify JavaScript
    .pipe($.if('*.js', $.uglify({preserveComments: 'some'})))
    // Concatenate and minify styles
    // In case you are still using useref build blocks
    .pipe($.if('*.css', $.csso()))
    .pipe(assets.restore())
    .pipe($.useref())
    // Minify any HTML
    .pipe($.if('*.html', $.minifyHtml()))
    // Output files
    .pipe(gulp.dest('dist'))
    .pipe($.size({title: 'html'}));
});

// Clean output directory
gulp.task('clean', del.bind(null, ['.tmp', 'dist/*', '!dist/.git'], {dot: true}));

// Watch files for changes & reload
gulp.task('serve', ['styles'], function () {
  browserSync({
    notify: false,
    // Customize the BrowserSync console logging prefix
    logPrefix: 'AS',
    server: ['.tmp', '.']
  });

  gulp.watch(['./**/*.html'], reload);
  gulp.watch(['assets/styles/**/*.{scss,css}'], ['styles', reload]);
  gulp.watch(['app/**/*.js'], ['jshint']);
  gulp.watch(['assets/images/**/*'], [reload]);
});

// Build and serve the output from the dist build
gulp.task('dist', ['default'], function () {
  browserSync({
    notify: false,
    server: 'dist'
  });
});

gulp.task('dev', ['serve', 'karma']);

// Build production files, the default task
gulp.task('default', ['clean'], function (cb) {
  runSequence('styles', ['jshint', 'html', 'images', 'fonts', 'copy'], cb);
});

// Run PageSpeed Insights
gulp.task('pagespeed', function (cb) {

});
