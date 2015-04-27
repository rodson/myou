(function () {
  'use strict';

  angular
    .module('app.version')
    .directive('appVersion', appVersion);

  appVersion.$inject = ['version'];

  function appVersion(version) {
    return function (scope, element, attrs) {
      element.text(version);
    };
  }
})();
