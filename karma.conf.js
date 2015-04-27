'use strict';

module.exports = function (config) {
  config.set({

    basePath: './',

    files: [
      'bower_components/angular/angular.js',
      'bower_components/angular-ui-router/release/angular-ui-router.js',
      'bower_components/angular-mocks/angular-mocks.js',
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
