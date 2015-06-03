(function() {
  'use strict';

  /**
   * @ngInject
   */
  function testDeviceConfig($stateProvider) {
    $stateProvider
      .state('dashboard.appdevelop.testdevice', {
        url: '/testdevice',
        templateUrl: 'app/components/testdevice/testdevice.html',
        controllerAs: 'vm',
        controller: 'TestDeviceCtrl',
        resolve: TestDeviceCtrl.resolve
      })
      .state('dashboard.systemupdate.testdevice', {
        url: '/testdevice',
        templateUrl: 'app/components/testdevice/testdevice.html',
        controllerAs: 'vm',
        controller: 'TestDeviceCtrl',
        resolve: TestDeviceCtrl.resolve
      });
  }

  /**
   * @ngInject
   */
  function TestDeviceCtrl(TestDeviceService) {
    var vm = this;

    vm.testDevices = TestDeviceService.testDevices;

    vm.showAddTestDeviceDialog = function(ev) {
      TestDeviceService.showAddTestDeviceDialog(ev);
    };

    vm.showEditTestDeviceDialog = function(ev, testDevice) {
      TestDeviceService.showEditTestDeviceDialog(ev, testDevice);
    };

    vm.showDeleteTestDeviceDialog = function(ev, testDevice) {
      TestDeviceService.showDeleteTestDeviceDialog(ev, testDevice);
    };
  }

  TestDeviceCtrl.resolve = {
    /**
     * @ngInject
     */
    getTestDevices: function(TestDeviceService, getApp) {
      return TestDeviceService.getTestDevices();
    }
  };

  /**
   * @ngInject
   */
  function AddTestDeviceDialogCtrl($mdDialog, TestDeviceService) {
    var vm = this;

    vm.testDevice = {
      deviceName: '',
      deviceMac: ''
    };

    vm.ok = function() {
      if (!vm.testDevice.deviceName) {
        vm.errorMessage = '请输入设备名';
      } else if (!vm.testDevice.deviceMac) {
        vm.errorMessage = '请输入设备mac地址';
      } else {
        TestDeviceService.createTestDevice(vm.testDevice).success(function() {
          $mdDialog.hide();
        }).error(function(err) {
          vm.errorMessage = err.message;
        });
      }
    };

    vm.cancel = function() {
      $mdDialog.cancel();
    };
  }

  /**
   * @ngInject
   */
  function EditTestDeviceDialogCtrl(TestDeviceService, $mdDialog, data) {
    var vm = this;

    vm.testDevice = data.testDevice;

    vm.ok = function() {
      if (!vm.testDevice.deviceName) {
        vm.errorMessage = '请输入设备名';
      } else if (!vm.testDevice.deviceMac) {
        vm.errorMessage = '请输入设备mac地址';
      } else {
        TestDeviceService.modifyTestDevice(vm.testDevice._id, vm.testDevice).success(function() {
          $mdDialog.hide();
        }).error(function(err) {
          vm.errorMessage = err.message;
        });
      }
    };

    vm.cancel = function() {
      $mdDialog.cancel();
    };
  }

  /**
   * @ngInject
   */
  function DeleteTestDeviceDialogCtrl($mdDialog, TestDeviceService, data) {
    var vm = this;

    vm.testDevice = data.testDevice;

    vm.ok = function() {
      TestDeviceService.deleteTestDevice(vm.testDevice._id).success(function() {
        $mdDialog.hide();
      }).error(function(err) {
        vm.errorMessage = err.message;
      });
    };

    vm.cancel = function() {
      $mdDialog.cancel();
    };
  }

  angular
    .module('myou.testdevice')
    .controller('TestDeviceCtrl', TestDeviceCtrl)
    .controller('AddTestDeviceDialogCtrl', AddTestDeviceDialogCtrl)
    .controller('EditTestDeviceDialogCtrl', EditTestDeviceDialogCtrl)
    .controller('DeleteTestDeviceDialogCtrl', DeleteTestDeviceDialogCtrl)
    .config(testDeviceConfig);

})();
