(function() {
  'use strict';

  function pageRankingConfig($stateProvider) {
    $stateProvider
      .state('dashboard.pageanalytic.pageranking', {
        url: '/pageranking',
        templateUrl: 'app/dashboard/products/pageanalytic/pageranking/pageranking.html',
        controllerAs: 'vm',
        controller: 'PageRankingCtrl'
      });
  }

  function PageRankingCtrl($mdDialog, dateFilter) {

  }

  angular
    .module('myou.dashboard.pageanalytic')
    .controller('PageRankingCtrl', PageRankingCtrl)
    .config(pageRankingConfig);

})();
