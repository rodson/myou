(function() {
  'use strict';

  angular
    .module('myou.dashboard', [
      'ui.router',
      'ngMaterial'
    ])
    .config(dashboardConfig);

  function dashboardConfig($stateProvider) {
    $stateProvider
      .state('dashboard', {
        abstract: true,
        url: '/dashboard',
        templateUrl: 'app/dashboard/dashboard.html'
      })
      .state('dashboard.document', {
        url: '/document',
        templateUrl: 'app/dashboard/document/document.html'
      })
      .state('dashboard.usermanager', {
        url: '/usermanager',
        templateUrl: 'app/dashboard/usermanager/usermanager.html'
      });
  }
})();
