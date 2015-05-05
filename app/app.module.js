(function() {
  'use strict';

  angular
    .module('myou', [
      'ui.router',
      'ngMaterial',
      'LocalStorageModule',

      'app.version',

      'myou.login',
      'myou.dashboard'
    ])
    .config(mainConfig);

  function mainConfig($urlRouterProvider, $mdThemingProvider,
      localStorageServiceProvider) {
    $urlRouterProvider.otherwise('/login');

    localStorageServiceProvider.setPrefix('Myou');

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

})();
