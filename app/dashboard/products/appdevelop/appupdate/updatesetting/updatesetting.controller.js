(function() {
  'use strict';

  function updateSettingConfig($stateProvider) {
    $stateProvider
      .state('dashboard.appdevelop.updatesetting', {
        url: '/updatesetting',
        templateUrl: 'app/dashboard/products/appdevelop/appupdate/updatesetting/updatesetting.html',
        controllerAs: 'vm',
        controller: 'UpdateSettingCtrl',
        resolve: UpdateSettingCtrl.resolve
      });
  }

  function UpdateSettingCtrl(UpdateSettingService) {
    var vm = this;

    vm.newestUpdate = UpdateSettingService.newestUpdate;
    vm.updateInfos = UpdateSettingService.updateInfos;
    vm.app = UpdateSettingService.getApplication();
    vm.test = 'false';

    vm.showUpdateDescDialog = function(ev, updateInfo) {
      UpdateSettingService.showUpdateDescDialog(ev, updateInfo);
    };

    vm.showDeleteUpdateDialog = function(ev, updateInfo) {
      UpdateSettingService.showDeleteUpdateDialog(ev, updateInfo)
        .then(function() {
          vm.newestUpdate = UpdateSettingService.newestUpdate;
          vm.updateInfos = UpdateSettingService.updateInfos;
        });
    };

    vm.showUpdateRuleDialog = function(ev, updateInfo, isTest) {
      UpdateSettingService.showUpdateRuleDialog(ev, updateInfo, isTest);
    };

    vm.toggleUpdatable = function(ev, updateInfo, isTest) {
      UpdateSettingService.toggleUpdatable(ev, updateInfo);
    };

  }

  UpdateSettingCtrl.resolve = {
    getAppUpdates: function(UpdateSettingService, $stateParams) {
      return UpdateSettingService.getAppUpdates($stateParams.id);
    }
  };

  angular
    .module('myou.dashboard.appdevelop.appupdate')
    .controller('UpdateSettingCtrl', UpdateSettingCtrl)
    .config(updateSettingConfig);

})();
