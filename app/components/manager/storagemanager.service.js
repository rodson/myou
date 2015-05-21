(function() {
  'use strict';

  function StorageManager(localStorageService) {
    var StorageManager = {};

    StorageManager.getApp = function() {
      return localStorageService.get('app');
    };

    return StorageManager;
  }

  angular
    .module('myou.shared')
    .factory('StorageManager', StorageManager);

})();
