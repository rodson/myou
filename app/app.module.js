(function() {
  'use strict';

  function mainConfig($urlRouterProvider, $mdThemingProvider,
      localStorageServiceProvider, $httpProvider) {
    $urlRouterProvider.otherwise('/login');

    localStorageServiceProvider.setPrefix('Myou');

    $httpProvider.interceptors.push('TokenInterceptor');

    // Config default theme
    $mdThemingProvider.theme('default')
      .primaryPalette('blue');
  }

  function TokenInterceptor(localStorageService, StorageManager) {
    return {
      request: function(config) {
        if (StorageManager.getToken()) {
          config.headers.Authorization = 'Bearer ' +
              StorageManager.getToken();
        }
        return config;
      }
    };
  }

  angular
    .module('myou', [
      'ui.router',
      'ngMaterial',
      'ngMdIcons',
      'LocalStorageModule',

      'app.version',

      'myou.login',
      'myou.dashboard'
    ])
    .config(mainConfig)
    .factory('TokenInterceptor', TokenInterceptor);


})();
