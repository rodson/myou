(function() {
  'use strict';

  /**
   * @ngInject
   */
  function romUpdateSettingConfig($stateProvider) {
    $stateProvider
      .state('dashboard.systemupdate.updatesetting', {
        url: '/updatesetting',
        templateUrl: 'app/dashboard/products/systemupdate/updatesetting/updatesetting.html',
        controllerAs: 'vm',
        controller: 'RomUpdateSettingCtrl',
        resolve: RomUpdateSettingCtrl.resolve
      });
  }

  /**
   * @ngInject
   */
  function RomUpdateSettingCtrl(RomUpdateSettingService) {
    var vm = this;

    RomUpdateSettingService.init();

    vm.updateInfos = RomUpdateSettingService.updateInfos;

    vm.showVersion = function(version) {
      return RomUpdateSettingService.showVersion(version);
    };

    vm.toggleTestUpdatable = function(ev, targetItem, updateInfo) {
      RomUpdateSettingService.toggleTestUpdatable(ev, targetItem, updateInfo);
    };

    vm.toggleUpdatable = function(ev, targetItem, updateInfo) {
      RomUpdateSettingService.toggleUpdatable(ev, targetItem, updateInfo);
    };

    vm.showUpdateDescDialog = function(ev, targetItem) {
      RomUpdateSettingService.showUpdateDescDialog(ev, targetItem);
    };

    vm.showDeleteUpdateDialog = function(ev, targetItem) {
      RomUpdateSettingService.showDeleteUpdateDialog(ev, targetItem);
    };

    vm.showUpdateRuleDialog = function(ev, targetItem) {
      RomUpdateSettingService.showUpdateRuleDialog(ev, targetItem);
    };
  }

  RomUpdateSettingCtrl.resolve = {
    /**
     * @ngInject
     */
    getUpdateInfos: function(RomUpdateSettingService, getApp) {
      return RomUpdateSettingService.getUpdateInfos();
    }
  };

  /**
   * @ngInject
   */
  function RomUpdateDescDialogCtrl($mdDialog, data, RomUpdateSettingService) {
    var vm = this;
    vm.updateDesc = data.updateDesc;

    vm.ok = function() {
      if (vm.updateDesc === data.updateDesc) {
        $mdDialog.cancel();
      } else {
        RomUpdateSettingService.modifyUpdateInfo(data.updateId, {updateDesc: vm.updateDesc})
          .then(function() {
            $mdDialog.hide(vm.updateDesc);
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
  function RomDeleteUpdateDialogCtrl($mdDialog, RomUpdateSettingService, data) {
    var vm = this;

    vm.targetItem = data.targetItem;

    vm.ok = function() {
      RomUpdateSettingService.deleteUpdateInfo(data.updateId).then(function() {
        $mdDialog.hide();
      });
    };

    vm.cancel = function() {
      $mdDialog.cancel();
    };
  }

  /**
   * @ngInject
   */
  function RomUpdateRuleDialogCtrl($mdDialog, RomUpdateSettingService, data) {
    var vm = this;

    vm.targetItem = angular.copy(data.targetItem);

    vm.ok = function() {
      RomUpdateSettingService.toggleSilentDownload(vm.targetItem)
        .success(function() {
          $mdDialog.hide(vm.targetItem.isSilentDownload);
        });
    };

    vm.cancel = function() {
      $mdDialog.cancel();
    };
  }

  angular
    .module('myou.dashboard.systemupdate')
    .controller('RomUpdateSettingCtrl', RomUpdateSettingCtrl)
    .controller('RomUpdateDescDialogCtrl', RomUpdateDescDialogCtrl)
    .controller('RomDeleteUpdateDialogCtrl', RomDeleteUpdateDialogCtrl)
    .controller('RomUpdateRuleDialogCtrl', RomUpdateRuleDialogCtrl)
    .config(romUpdateSettingConfig);

})();
