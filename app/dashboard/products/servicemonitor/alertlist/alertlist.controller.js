(function() {
  'use strict';

  function AlertListConfig($stateProvider) {
    $stateProvider
      .state('dashboard.servicemonitor.alertlist', {
        url: '/alertlist',
        templateUrl: 'app/dashboard/products/servicemonitor/alertlist/alertlist.html',
        controllerAs: 'vm',
        controller: 'AlertListCtrl'
      });
  }

  function AlertListCtrl() {

  }

  angular
    .module('myou.dashboard.servicemonitor')
    .controller('AlertListCtrl', AlertListCtrl)
    .config(AlertListConfig);

})();
