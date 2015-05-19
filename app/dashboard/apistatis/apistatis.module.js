(function() {
  'use strict';

  function apiStatisConfig($stateProvider) {
    $stateProvider
      .state('dashboard.apistatis', {
        url: '/apistatis',
        templateUrl: 'app/dashboard/apistatis/apistatis.html',
        controller: 'APIStatisCtrl',
        controllerAs: 'vm'
      });
  }

  angular
    .module('myou.dashboard.apistatis', [
      'ui.router'
    ])
    .config(apiStatisConfig);

})();
