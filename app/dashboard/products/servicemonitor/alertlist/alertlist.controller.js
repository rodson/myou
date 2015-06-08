(function() {
  'use strict';

  /**
   * @ngInject
   */
  function AlertListConfig($stateProvider) {
    $stateProvider
      .state('dashboard.servicemonitor.alertlist', {
        url: '/alertlist?start_date&end_date&stats',
        templateUrl: 'app/dashboard/products/servicemonitor/alertlist/alertlist.html',
        controllerAs: 'vm',
        controller: 'AlertListCtrl',
        resolve: AlertListCtrl.resolve
      });
  }

  /**
   * @ngInject
   */
  function AlertListCtrl($scope, $filter, StorageManager,
    AlertListService, StateManager, initData) {

    var vm = this;
    var appKey = StorageManager.getApp().appKey;

    vm.enddate = initData.endDate;
    vm.startdate = initData.startDate;
    vm.radio = initData.stats;

    vm.limit = 20;
    vm.skip = 0;
    vm.currentPage = 1;
    vm.pageCount = 0;

    vm.serverAddr = '';

    vm.getData = function() {
      StateManager.setQueryParams('start_date', vm.startdate);
      StateManager.setQueryParams('end_date', vm.enddate);
      vm.getStatisticData();
      vm.getAlertData();
    };

    vm.getStatisticData = function() {
      AlertListService.getStatisticData(appKey, vm.startdate, vm.enddate, function() {
        vm.setStatisticData();
      });
    };

    vm.getNextPage = function(page) {
      vm.skip = (page - 1) * vm.limit;
      vm.getAlertData();
    };

    vm.getAlertData = function(addr) {
      if(addr){
        vm.serverAddr = addr;
      }
      AlertListService.getAlertData(appKey, vm.startdate, vm.enddate, vm.limit, vm.skip, vm.serverAddr || '', function() {
        vm.setALertData();
      });
    };

    vm.setStatisticData = function() {
      vm.statisticList = AlertListService.data.statistic;
    };

    vm.setALertData = function() {
      vm.totalItems = AlertListService.data.alert.total;
      vm.pageCount = vm.totalItems / vm.limit;
      vm.alertList = AlertListService.data.alert.data;
    };

    $scope.$watch('vm.radio', function(current, origin) {
      if (current !== origin) {
        StateManager.setQueryParams('stats', current);
      }
    });

    /*********************** test start ***************************/
    // vm.setStatisticData();
    // vm.setALertData();
    /*********************** test end ***************************/

    vm.getData();
  }

  AlertListCtrl.resolve = {
    /**
     * @ngInject
     */
    initData: function(getAppId, $stateParams) {
      var initData = {};

      initData.startDate = $stateParams.start_date;
      initData.endDate = $stateParams.end_date;
      initData.stats = $stateParams.stats;

      return initData;
    }
  };

  angular
    .module('myou.dashboard.servicemonitor')
    .controller('AlertListCtrl', AlertListCtrl)
    .config(AlertListConfig);

})();
