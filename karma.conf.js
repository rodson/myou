'use strict';

module.exports = function (config) {
  config.set({

    basePath: './',

    files: [
      'bower_components/angular/angular.js',
      'bower_components/jquery/dist/jquery.js',
      'bower_components/angular-animate/angular-animate.js',
      'bower_components/angular-aria/angular-aria.js',
      'bower_components/angular-ui-router/release/angular-ui-router.js',
      'bower_components/angular-material/angular-material.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'bower_components/angular-local-storage/dist/angular-local-storage.js',
      'bower_components/ng-file-upload/ng-file-upload.js',
      'bower_components/zeroclipboard/dist/ZeroClipboard.js',
      'bower_components/ng-clip/src/ngClip.js',
      'bower_components/md-date-time/dist/md-date-time.js',
      'bower_components/angular-moment/angular-moment.js',
      'bower_components/moment/moment.js',
      'bower_components/angular-tablesort/js/angular-tablesort.js',
      'bower_components/highcharts-ng/src/highcharts-ng.js',
      'app/**/*module.js',
      'app/**/*.js'
    ],

    frameworks: ['jasmine'],
    browsers: ['PhantomJS'],
    reporters: ['progress'],
    plugins: [
      'karma-jasmine',
      'karma-phantomjs-launcher',
      'karma-junit-reporter'
    ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }
  });
};
