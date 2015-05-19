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

    vm.showUpdateDescModal = function(ev, updateInfo) {
      UpdateSettingService.showUpdateDescModal(ev, updateInfo);
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
