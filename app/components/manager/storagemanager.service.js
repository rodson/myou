(function() {
  'use strict';

  /**
   * @ngInject
   */
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

    StorageManager.setUser = function(user) {
      $localStorage.user = user;
    };

    StorageManager.getUser = function() {
      return $localStorage.user;
    };

    StorageManager.deleteUser = function() {
      delete $localStorage.user;
    };

    StorageManager.setApp = function(app) {
      localStorageService.set('app', app);
    };

    StorageManager.getApp = function() {
      return localStorageService.get('app');
    };

    StorageManager.setPath = function(path) {
      localStorageService.set('currentpath', path);
    };

    StorageManager.getPath = function() {
      return localStorageService.get('currentpath');
    };

    StorageManager.deletePath = function() {
      localStorageService.remove('currentpath');
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
