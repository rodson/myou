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

  function DailyDataCtrl($filter, localStorageService, DailyDataService) {
    var vm = this;
    vm.requestCount = 0;
    vm.alertCount = 0;

    vm.initdata = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss');

    var product = localStorageService.get('app');

    vm.getData = function() {
      DailyDataService.getData(product.appKey, vm.initdata, function() {
        vm.setData();
      });
    };

    vm.setData = function() {
      vm.requestCount = DailyDataService.data.allCount;
      vm.alertCount = DailyDataService.data.alterCount;
      vm.tableDatas = DailyDataService.data.data;
    };

    /************************* test start **************************/
    vm.setData();
    /************************* test end **************************/
  }

  angular
    .module('myou.dashboard.servicemonitor')
    .controller('DailyDataCtrl', DailyDataCtrl)
    .config(DailyDataConfig);

})();
