(function() {
  'use strict';

  /**
   * @ngInject
   */
  function updateSettingConfig($stateProvider) {
    $stateProvider
      .state('dashboard.appdevelop.updatesetting', {
        url: '/updatesetting?test',
        templateUrl: 'app/dashboard/products/appdevelop/appupdate/updatesetting/updatesetting.html',
        controllerAs: 'vm',
        controller: 'UpdateSettingCtrl',
        resolve: UpdateSettingCtrl.resolve
      });
  }

  /**
   * @ngInject
   */
  function UpdateSettingCtrl($scope, UpdateSettingService, initData, StateManager) {
    var vm = this;

    vm.newestUpdate = UpdateSettingService.newestUpdate;
    vm.updateInfos = UpdateSettingService.updateInfos;
    vm.app = UpdateSettingService.getApplication();
    vm.updateConfig = UpdateSettingService.updateConfig;
    vm.test = initData.test;

    vm.showUpdateDescDialog = function(ev, updateInfo) {
      UpdateSettingService.showUpdateDescDialog(ev, updateInfo);
    };

    vm.showDeleteUpdateDialog = function(ev, updateInfo) {
      UpdateSettingService.showDeleteUpdateDialog(ev, updateInfo);
    };

    vm.showUpdateRuleDialog = function(ev, updateInfo, isTest) {
      UpdateSettingService.showUpdateRuleDialog(ev, updateInfo, isTest);
    };

    vm.toggleUpdatable = function(ev, updateInfo, isTest) {
      UpdateSettingService.toggleUpdatable(ev, updateInfo, isTest);
    };

    vm.toggleUpdateToLatest = function(ev) {
      UpdateSettingService.toggleUpdateToLatest();
    };

    vm.isWindowsApp = function() {
      return UpdateSettingService.isWindowsApp();
    };

    $scope.$watch('vm.test', function(current, origin) {
      if (current !== origin) {
        StateManager.setQueryParams('test', current);
      }
    });

  }

  UpdateSettingCtrl.resolve = {
    /**
     * @ngInject
     */
    initData: function(getApp, $stateParams) {
      var initData = {};
      initData.test = $stateParams.test;

      return initData;
    },

    /**
     * @ngInject
     */
    getAppUpdates: function(UpdateSettingService, $stateParams, initData) {
      return UpdateSettingService.getAppUpdates($stateParams.id);
    },

    /**
     * @ngInject
     */
    getUpdateToLatest: function(UpdateSettingService, $stateParams, initData) {
      return UpdateSettingService.getUpdateToLatest($stateParams.id);
    }
  };

  angular
    .module('myou.dashboard.appdevelop.appupdate')
    .controller('UpdateSettingCtrl', UpdateSettingCtrl)
    .config(updateSettingConfig);

})();
