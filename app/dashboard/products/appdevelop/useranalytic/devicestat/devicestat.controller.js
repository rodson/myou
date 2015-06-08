(function() {
  'use strict';

  /**
   * @ngInject
   */
  function deviceStatConfig($stateProvider) {
    $stateProvider
      .state('dashboard.appdevelop.devicestat', {
        url: '/devicestat?dev_stats&dev_selected_date',
        templateUrl: 'app/dashboard/products/appdevelop/useranalytic/devicestat/devicestat.html',
        controllerAs: 'vm',
        controller: 'DeviceStatCtrl',
        resolve: DeviceStatCtrl.resolve
      });
  }

  /**
   * @ngInject
   */
  function DeviceStatCtrl(DeviceStatService) {
    var vm = this;

    vm.chartConfig = DeviceStatService.chartConfig;
    vm.radioDate = DeviceStatService.radioDate;
    vm.radioDataType = DeviceStatService.radioDataType;
    vm.date = DeviceStatService.date;

    vm.getCheckDate = function() {
      DeviceStatService.getCheckDate(vm.radioDate);
      DeviceStatService.getBarChartData();
    };

    vm.getCheckDataType = function() {
      DeviceStatService.getCheckDataType(vm.radioDataType);
      DeviceStatService.getBarChartData();
    };

    vm.isAndroidApp = function() {
      return DeviceStatService.isAndroidApp();
    };
  }

  DeviceStatCtrl.resolve = {
    /**
     * @ngInject
     */
    initData: function(getApp, $stateParams, DeviceStatService) {
      return DeviceStatService.init($stateParams.dev_stats, $stateParams.dev_selected_date);
    },

    /**
     * @ngInject
     */
    getBarChartData: function(DeviceStatService, initData) {
      return DeviceStatService.getBarChartData();
    }
  };

  angular
    .module('myou.dashboard.appdevelop.useranalytic')
    .controller('DeviceStatCtrl', DeviceStatCtrl)
    .config(deviceStatConfig);

})();
