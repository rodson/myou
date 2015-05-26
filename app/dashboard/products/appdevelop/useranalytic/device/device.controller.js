(function() {
  'use strict';

  function deviceConfig($stateProvider) {
    $stateProvider
      .state('dashboard.appdevelop.device', {
        url: '/device',
        templateUrl: 'app/dashboard/products/appdevelop/useranalytic/device/device.html',
        controllerAs: 'vm',
        controller: 'DeviceCtrl',
        resolve: DeviceCtrl.resolve
      });
  }

  function DeviceCtrl(DeviceService) {
    var vm = this;

    DeviceService.init();

    vm.chartConfig = DeviceService.chartConfig;
    vm.radioDate = DeviceService.radioDate;
    vm.radioDataType = DeviceService.radioDataType;

    vm.getCheckDate = function() {
      DeviceService.getCheckDate(vm.radioDate);
      DeviceService.getBarChartData(vm.radioDataType);
    };

    vm.getBarChartData = function() {
      DeviceService.getBarChartData(vm.radioDataType);
    };

    vm.isAndroidApp = function() {
      return DeviceService.isAndroidApp();
    };
  }

  DeviceCtrl.resolve = {
    getBarChartData: function(DeviceService) {
      return DeviceService.getBarChartData();
    }
  };

  angular
    .module('myou.dashboard.appdevelop.useranalytic')
    .controller('DeviceCtrl', DeviceCtrl)
    .config(deviceConfig);

})();
