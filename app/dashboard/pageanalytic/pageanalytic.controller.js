(function() {
  'use strict';

  function pageAnalyticConfig($stateProvider) {
    $stateProvider
      .state('dashboard.pageanalytic', {
        url: '/pageanalytic/:id',
        templateUrl: 'app/dashboard/pageanalytic/pageanalytic.html',
        controllerAs: 'vm',
        controller: 'PageAnalyticCtrl'
      });
  }

  function PageAnalyticCtrl() {

  }

  angular
    .module('myou.dashboard.pageanalytic')
    .controller('PageAnalyticCtrl', PageAnalyticCtrl)
    .config(pageAnalyticConfig);

})();
