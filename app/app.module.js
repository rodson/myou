(function() {
  'use strict';

  angular
    .module('app', [
      'ui.router',
      'ngMaterial',
      'app.version',
      'app.view1',
      'app.view2'
    ])
    .config(mainConfig);

  function mainConfig($urlRouterProvider) {
    $urlRouterProvider.otherwise('/view1');
  }

})();
