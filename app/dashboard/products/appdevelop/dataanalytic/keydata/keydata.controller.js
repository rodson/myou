(function() {
  'use strict';

  /**
   * @ngInject
   */
  function keyDataConfig($stateProvider) {
    $stateProvider
      .state('dashboard.appdevelop.keydata', {
        url: '/keydata',
        templateUrl: 'app/dashboard/products/appdevelop/dataanalytic/keydata/keydata.html',
        controllerAs: 'vm',
        controller: 'KeyDataCtrl',
        resolve: KeyDataCtrl.resolve
      });
  }

  /**
   * @ngInject
   */
  function KeyDataCtrl(KeyDataService) {
    var vm = this;

    vm.app = KeyDataService.getApp();
    vm.chartConfig = KeyDataService.chartConfig;
    vm.tableData = KeyDataService.tableData;
    vm.radioDate = KeyDataService.radioDate;
    vm.radioKeyDataType = KeyDataService.radioKeyDataType;
    vm.date = KeyDataService.date;

    vm.getCheckDate = function() {
      KeyDataService.getCheckDate(vm.radioDate);
      KeyDataService.getLineChartData(vm.radioKeyDataType);
      KeyDataService.getTableData().then(function() {
        vm.tableData = KeyDataService.tableData;
      });
    };

    vm.isWindowsApp = function() {
      return KeyDataService.isWindowsApp();
    };

    vm.getLineChartData = function() {
      KeyDataService.getLineChartData(vm.radioKeyDataType);
    };

    vm.getTableData = function() {
      KeyDataService.getTableData().then(function() {
        vm.tableData = KeyDataService.tableData;
      });
    };

  }

  KeyDataCtrl.resolve = {
    /**
     * @ngInject
     */
    getLineChartData: function(KeyDataService, getApp) {
      return KeyDataService.getLineChartData();
    },

    /**
     * @ngInject
     */
    getTableData: function(KeyDataService, getApp) {
      return KeyDataService.getTableData();
    }
  };

  angular
    .module('myou.dashboard.appdevelop.dataanalytic')
    .controller('KeyDataCtrl', KeyDataCtrl)
    .config(keyDataConfig);

})();
