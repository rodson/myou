(function() {
  'use strict';

  function deviceStatConfig($stateProvider) {
    $stateProvider
      .state('dashboard.appdevelop.devicestat', {
        url: '/devicestat',
        templateUrl: 'app/dashboard/products/appdevelop/useranalytic/devicestat/devicestat.html',
        controllerAs: 'vm',
        controller: 'DeviceStatCtrl',
        resolve: DeviceStatCtrl.resolve
      });
  }

  function DeviceStatCtrl(DeviceStatService) {
    var vm = this;

    DeviceStatService.init();

    vm.chartConfig = DeviceStatService.chartConfig;
    vm.radioDate = DeviceStatService.radioDate;
    vm.radioDataType = DeviceStatService.radioDataType;
    vm.date = DeviceStatService.date;

    vm.getCheckDate = function() {
      DeviceStatService.getCheckDate(vm.radioDate);
      DeviceStatService.getBarChartData(vm.radioDataType);
    };

    vm.getBarChartData = function() {
      DeviceStatService.getBarChartData(vm.radioDataType);
    };

    vm.isAndroidApp = function() {
      return DeviceStatService.isAndroidApp();
    };
  }

  DeviceStatCtrl.resolve = {
    getBarChartData: function(DeviceStatService) {
      return DeviceStatService.getBarChartData();
    }
  };

  angular
    .module('myou.dashboard.appdevelop.useranalytic')
    .controller('DeviceStatCtrl', DeviceStatCtrl)
    .config(deviceStatConfig);

})();
