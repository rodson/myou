(function() {
  'use strict';

  function mainConfig($urlRouterProvider, $mdThemingProvider,
      localStorageServiceProvider, $httpProvider) {
    $urlRouterProvider.otherwise('/login');

    localStorageServiceProvider.setPrefix('Myou');

    $httpProvider.interceptors.push('TokenInterceptor');

    // Config default theme
    $mdThemingProvider.definePalette('holoLight', {
      '50': '277BDD',
      '100': '277BDD',
      '200': '277BDD',
      '300': '277BDD',
      '400': '277BDD',
      '500': '277BDD',
      '600': '277BDD',
      '700': '277BDD',
      '800': '277BDD',
      '900': '277BDD',
      'A100': '277BDD',
      'A200': '277BDD',
      'A400': '277BDD',
      'A700': '277BDD',
      'contrastDefaultColor': 'light',
      'contrastDarkColors': ['50', '100',
       '200', '300', '400', 'A100'],
      'contrastLightColors': undefined
    });
    $mdThemingProvider.theme('default')
      .primaryPalette('holoLight');
  }

  function TokenInterceptor(localStorageService) {
    return {
      request: function(config) {
        if (localStorageService.get('token')) {
          config.headers.Authorization = 'Bearer ' +
              localStorageService.get('token');
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
