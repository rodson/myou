(function() {
  'use strict';

  function deviceConfig($stateProvider) {
    $stateProvider
      .state('dashboard.appdevelop.device', {
        url: '/device',
        templateUrl: 'app/dashboard/products/appdevelop/useranalytic/device/device.html',
        controllerAs: 'vm',
        controller: 'DeviceCtrl'
      });
  }

  function DeviceCtrl() {

  }

  angular
    .module('myou.dashboard.appdevelop.useranalytic')
    .controller('DeviceCtrl', DeviceCtrl)
    .config(deviceConfig);

})();
