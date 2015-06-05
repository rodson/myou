(function() {
  'use strict';

  /**
   * @ngInject
   */
  function keyDataConfig($stateProvider) {
    $stateProvider
      .state('dashboard.appdevelop.keydata', {
        url: '/keydata?stats&selected_date',
        templateUrl: 'app/dashboard/products/appdevelop/dataanalytic/keydata/keydata.html',
        controllerAs: 'vm',
        controller: 'KeyDataCtrl',
        resolve: KeyDataCtrl.resolve,
        defaultQueryParams: {
          stats: 'new_user_count',
          selected_date: 'last7days'
        }
      });
  }

  /**
   * @ngInject
   */
  function KeyDataCtrl(KeyDataService) {
    var vm = this;

    vm.chartConfig = KeyDataService.chartConfig;
    vm.tableData = KeyDataService.tableData;

    vm.radioDate = KeyDataService.radioDate;
    vm.radioKeyDataType = KeyDataService.radioKeyDataType;

    vm.date = KeyDataService.date;

    vm.getCheckDate = function() {
      KeyDataService.getCheckDate(vm.radioDate);
      KeyDataService.getLineChartData();
      KeyDataService.getTableData().then(function() {
        vm.tableData = KeyDataService.tableData;
      });
    };

    vm.getCheckDataType = function() {
      KeyDataService.getCheckDataType(vm.radioKeyDataType);
      KeyDataService.getLineChartData();
    };

    vm.isWindowsApp = function() {
      return KeyDataService.isWindowsApp();
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
    initData: function(getApp, $stateParams, KeyDataService) {
      return KeyDataService.init($stateParams.stats, $stateParams.selected_date);
    },

    /**
     * @ngInject
     */
    getLineChartData: function(KeyDataService, initData) {
      return KeyDataService.getLineChartData();
    },

    /**
     * @ngInject
     */
    getTableData: function(KeyDataService, initData) {
      return KeyDataService.getTableData();
    }
  };

  angular
    .module('myou.dashboard.appdevelop.dataanalytic')
    .controller('KeyDataCtrl', KeyDataCtrl)
    .config(keyDataConfig);

})();
