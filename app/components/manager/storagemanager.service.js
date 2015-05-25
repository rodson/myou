(function() {
  'use strict';

  function StorageManager(localStorageService) {
    var StorageManager = {};

    StorageManager.getApp = function() {
      return localStorageService.get('app');
    };

    StorageManager.setEvent = function(event) {
      localStorageService.set('event', event);
    };

    StorageManager.getEvent = function() {
      return localStorageService.get('event');
    };

    return StorageManager;
  }

  angular
    .module('myou.shared')
    .factory('StorageManager', StorageManager);

})();
