(function() {
  'use strict';

  function TestDeviceService($http, $state, $stateParams, $mdDialog,
    StorageManager, UrlManager) {

    var TestDeviceService = {};

    TestDeviceService.testDevices = [];

    TestDeviceService.init = function() {
      TestDeviceService.app =  StorageManager.getApp();
    };

    TestDeviceService.getTestDevices = function() {
      TestDeviceService.init();

      return $http.get(UrlManager.getTestDeviceUrl(TestDeviceService.app._id))
        .success(function(data) {
          TestDeviceService.testDevices = data;
        });
    };

    TestDeviceService.createTestDevice = function(testDevice) {
      return $http.post(UrlManager.getTestDeviceUrl(TestDeviceService.app._id), testDevice);
    };

    TestDeviceService.modifyTestDevice = function(testDeviceId, testDevice) {
      return $http.put(UrlManager.getTestDeviceUrl(TestDeviceService.app._id) +
        '/' + testDeviceId, testDevice);
    };

    TestDeviceService.deleteTestDevice = function(testDeviceId) {
      return $http.delete(UrlManager.getTestDeviceUrl(TestDeviceService.app._id) +
        '/' + testDeviceId);
    };

    TestDeviceService.showAddTestDeviceDialog = function(ev) {
      $mdDialog.show({
        controller: 'AddTestDeviceDialogCtrl',
        controllerAs: 'vm',
        templateUrl: 'addTestDeviceDialog.html',
        targetEvent: ev
      })
      .then(function() {
        // Reload current page
        $state.transitionTo($state.current, $stateParams, {
          reload: true,
          inherit: false,
          notify: true
        });
      });
    };

    TestDeviceService.showEditTestDeviceDialog = function(ev, testDevice) {
      testDevice = angular.copy(testDevice);

      $mdDialog.show({
        controller: 'EditTestDeviceDialogCtrl',
        controllerAs: 'vm',
        templateUrl: 'editTestDeviceDialog.html',
        targetEvent: ev,
        resolve: {
          data: function() {
            return {
              testDevice: testDevice
            };
          }
        }
      })
      .then(function() {
        // Reload current page
        $state.transitionTo($state.current, $stateParams, {
          reload: true,
          inherit: false,
          notify: true
        });
      });
    };

    TestDeviceService.showDeleteTestDeviceDialog = function(ev, testDevice) {
      $mdDialog.show({
        controller: 'DeleteTestDeviceDialogCtrl',
        controllerAs: 'vm',
        templateUrl: 'deleteTestDeviceDialog.html',
        targetEvent: ev,
        resolve: {
          data: function() {
            return {
              testDevice: testDevice
            };
          }
        }
      })
      .then(function() {
        // Reload current page
        $state.transitionTo($state.current, $stateParams, {
          reload: true,
          inherit: false,
          notify: true
        });
      });
    };

    return TestDeviceService;
  }

  angular
    .module('myou.testdevice')
    .factory('TestDeviceService', TestDeviceService);

})();
