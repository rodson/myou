(function() {
  'use strict';

  function apiStatisConfig($stateProvider) {

    $stateProvider
      .state('dashboard.apistatis', {
        url: '/apistatis',
        templateUrl: 'app/dashboard/apistatis/apistatis.html'
      });
  }

  angular
    .module('myou.dashboard.apistatis', [
      'ui.router'
    ])
    .config(apiStatisConfig);

})();
