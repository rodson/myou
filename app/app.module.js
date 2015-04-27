(function() {
  'use strict';

  angular
    .module('myou', [
      'ui.router',
      'app.version',
      'myou.login'
    ])
    .config(mainConfig);

  function mainConfig($urlRouterProvider) {
    $urlRouterProvider.otherwise('/login');
  }

})();
