(function() {
  'use strict';

  angular
    .module('myou.dashboard', [
      'ui.router'
    ])
    .config(dashboardConfig);

  function dashboardConfig($stateProvider) {
    $stateProvider
      .state('dashboard', {
        url: '/dashboard',
        templateUrl: 'app/dashboard/dashboard.html'
      });
  }
})();
