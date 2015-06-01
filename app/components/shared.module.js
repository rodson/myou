(function() {
  'use strict';

  angular
    .module('myou.shared', [
      'ui.router',
      'LocalStorageModule',
      'ngStorage',
      'myou.ui',
      'myou.util',
      'myou.filter',
      'myou.testdevice',
      'myou.approm'
    ]);
})();
