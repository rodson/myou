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

  function AlertListCtrl($scope, $filter, AlertListService) {
    var vm = this;
    var now = new Date();
    vm.enddate = $filter('date')(now, 'yyyy-MM-dd HH:mm:ss');
    vm.startdate = $filter('date')(now.getTime() - 5 * 60 * 1000, 'yyyy-MM-dd HH:mm:ss');
    vm.radio = 'statistic';
    vm.limit = 40;
    vm.pageCount = 0;
    vm.skip = 0;
    vm.serverAddr = '';
    vm.currentPage = 0;

    vm.getData = function() {
      vm.statisticList = [];
      vm.setStatisticData();
      // vm.getStatisticData();
      // vm.getAlertData();
    };

    vm.getStatisticData = function() {
      AlertListService.getStatisticData('12345', vm.startdate, vm.enddate, function() {
        vm.setStatisticData();
      });
    };

    $scope.$watch('vm.currentPage', function(current, old) {
      if(current !== old){
        vm.skip = vm.currentPage * vm.limit;
        vm.getAlertData();
      }
    });

    vm.getAlertData = function() {
      AlertListService.getAlertData('12345', vm.startdate, vm.enddate, vm.limit, vm.skip, vm.serverAddr || '', function() {
        vm.setALertData();
      });
    };

    vm.setStatisticData = function() {
      vm.statisticList = AlertListService.data.statistic;
    };

    vm.setALertData = function() {
      vm.totalItems = AlertListService.data.alert.total;
      vm.pageCount = Math.ceil(vm.totalItems / vm.limit);
      vm.pageCount = vm.pageCount > 100 ? 100 : vm.pageCount;
      vm.tabs = [];
      for (var i = 1; i <= vm.pageCount; i++) {
        vm.tabs.push({
          index: i
        });
      }
      vm.alertList = AlertListService.data.alert.data;
    };

    /*********************** test start ***************************/
    vm.setStatisticData();
    vm.setALertData();
    /*********************** test end ***************************/
  }

  angular
    .module('myou.dashboard.servicemonitor')
    .controller('AlertListCtrl', AlertListCtrl)
    .config(AlertListConfig);

})();
