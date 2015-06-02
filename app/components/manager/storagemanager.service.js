(function() {
  'use strict';

  function StorageManager(localStorageService, $localStorage, $sessionStorage) {
    var KEY_TOKEN = 'myouToken';

    var StorageManager = {};

    StorageManager.setToken = function(token, isLocal) {
      StorageManager.deleteToken();

      if (isLocal) {
        $localStorage[KEY_TOKEN] = token;
      } else {
        $sessionStorage[KEY_TOKEN] = token;
      }
    };

    StorageManager.getToken = function() {
      if ($sessionStorage[KEY_TOKEN]) {
        return $sessionStorage[KEY_TOKEN];
      } else {
        return $localStorage[KEY_TOKEN];
      }
    };

    StorageManager.deleteToken = function() {
      if ($localStorage[KEY_TOKEN]) {
        delete $localStorage[KEY_TOKEN];
      }

      if ($sessionStorage[KEY_TOKEN]) {
        delete $sessionStorage[KEY_TOKEN];
      }
    };

    StorageManager.setApp = function(app) {
      localStorageService.set('app', app);
    };

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
