(function() {
  'use strict';

  function testDeviceConfig($stateProvider) {
    $stateProvider
      .state('dashboard.appdevelop.testdevice', {
        url: '/testdevice',
        templateUrl: 'app/dashboard/products/appdevelop/testdevice/testdevice.html',
        controllerAs: 'vm',
        controller: 'TestDeviceCtrl'
      });
  }

  function TestDeviceCtrl() {

  }

  angular
    .module('myou.dashboard.appdevelop.testdevice')
    .controller('TestDeviceCtrl', TestDeviceCtrl)
    .config(testDeviceConfig);

})();
