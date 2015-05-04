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
      '50': '40BAFA',
      '100': '40BAFA',
      '200': '40BAFA',
      '300': '40BAFA',
      '400': '40BAFA',
      '500': '40BAFA',
      '600': '40BAFA',
      '700': '40BAFA',
      '800': '40BAFA',
      '900': '40BAFA',
      'A100': '40BAFA',
      'A200': '40BAFA',
      'A400': '40BAFA',
      'A700': '40BAFA',
      'contrastDefaultColor': 'light',
      'contrastDarkColors': ['50', '100',
       '200', '300', '400', 'A100'],
      'contrastLightColors': undefined
    });
    $mdThemingProvider.theme('default')
      .primaryPalette('holoLight');
  }

})();
