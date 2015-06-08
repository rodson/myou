(function() {
  'use strict';

  /**
   * @ngInject
   */
  function DailyDataConfig($stateProvider) {
    $stateProvider
      .state('dashboard.servicemonitor.dailydata', {
        url: '/dailydata?stat_date',
        templateUrl: 'app/dashboard/products/servicemonitor/dailydata/dailydata.html',
        controllerAs: 'vm',
        controller: 'DailyDataCtrl',
        resolve: DailyDataCtrl.resolve
      });
  }

  /**
   * @ngInject
   */
  function DailyDataCtrl($filter, StorageManager,
    DailyDataService, StateManager, initData) {

    var vm = this;
    vm.requestCount = 0;
    vm.alertCount = 0;

    vm.initdata = initData.statDate;

    var product = StorageManager.getApp();

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

    vm.dateChanged = function() {
      StateManager.setQueryParams('stat_date', vm.initdata);
      vm.getData();
    };

    /************************* test start **************************/
    // vm.setData();
    /************************* test end **************************/

    // vm.getData();
  }

  DailyDataCtrl.resolve = {
    /**
     * @ngInject
     */
    initData: function(getAppId, $stateParams) {
      var initData = {};
      initData.statDate = $stateParams.stat_date;

      return initData;
    }
  };

  angular
    .module('myou.dashboard.servicemonitor')
    .controller('DailyDataCtrl', DailyDataCtrl)
    .config(DailyDataConfig);

})();
