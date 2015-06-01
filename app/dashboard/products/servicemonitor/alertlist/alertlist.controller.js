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

  function AlertListCtrl($filter, localStorageService, AlertListService) {
    var vm = this;
    var appKey = localStorageService.get('app').appKey;

    var now = new Date();
    vm.enddate = $filter('date')(now, 'yyyy-MM-dd HH:mm:ss');
    vm.startdate = $filter('date')(now.getTime() - 5 * 60 * 1000, 'yyyy-MM-dd HH:mm:ss');
    vm.radio = 'statistic';

    vm.limit = 20;
    vm.skip = 0;
    vm.currentPage = 1;
    vm.pageCount = 0;

    vm.serverAddr = '';

    vm.getData = function() {
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

    /*********************** test start ***************************/
    // vm.setStatisticData();
    // vm.setALertData();
    /*********************** test end ***************************/

    vm.getData();
  }

  angular
    .module('myou.dashboard.servicemonitor')
    .controller('AlertListCtrl', AlertListCtrl)
    .config(AlertListConfig);

})();
