(function() {
  'use strict';

  angular
    .module('myou.dashboard.appdevelop', [
      'ui.router',
      'LocalStorageModule',

      'myou.shared',

      'myou.dashboard.appdevelop.appupdate',
      'myou.dashboard.appdevelop.dataanalytic',
      'myou.dashboard.appdevelop.useranalytic'
    ]);

})();
