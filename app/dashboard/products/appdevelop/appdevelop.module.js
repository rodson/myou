(function() {
  'use strict';

  angular
    .module('myou.dashboard.appdevelop', [
      'ui.router',
      'LocalStorageModule',
      'tableSort',

      'myou.shared',

      'myou.dashboard.appdevelop.appupdate',
      'myou.dashboard.appdevelop.dataanalytic'
    ]);

})();
