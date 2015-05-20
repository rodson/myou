(function() {
  'use strict';

  function DailyDataConfig($stateProvider) {
    $stateProvider
      .state('dashboard.servicemonitor.dailydata', {
        url: '/dailydata',
        templateUrl: 'app/dashboard/products/servicemonitor/dailydata/dailydata.html',
        controllerAs: 'vm',
        controller: 'DailyDataCtrl'
      });
  }

  function DailyDataCtrl() {

  }

  angular
    .module('myou.dashboard.servicemonitor')
    .controller('DailyDataCtrl', DailyDataCtrl)
    .config(DailyDataConfig);

})();
