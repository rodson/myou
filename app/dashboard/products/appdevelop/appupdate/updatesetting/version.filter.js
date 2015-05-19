(function() {
  'use strict';

  function versionFilter() {
    return function(version) {
      if (version) {
        return version;
      } else {
        return '未设置';
      }
    };
  }

  angular
    .module('myou.dashboard.appdevelop.appupdate')
    .filter('version', versionFilter);

})();
