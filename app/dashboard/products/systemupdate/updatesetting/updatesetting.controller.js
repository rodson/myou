(function() {
  'use strict';

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

  function RomUpdateSettingCtrl(RomUpdateSettingService) {
    var vm = this;

    RomUpdateSettingService.init();

    vm.updateInfos = RomUpdateSettingService.updateInfos;

    vm.showVersion = function(version) {
      return RomUpdateSettingService.showVersion(version);
    };

    vm.toggleSilentDownload = function(ev, targetItem) {
      RomUpdateSettingService.toggleSilentDownload(ev, targetItem);
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
  }

  RomUpdateSettingCtrl.resolve = {
    getUpdateInfos: function(RomUpdateSettingService) {
      return RomUpdateSettingService.getUpdateInfos();
    }
  };

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

  angular
    .module('myou.dashboard.systemupdate')
    .controller('RomUpdateSettingCtrl', RomUpdateSettingCtrl)
    .controller('RomUpdateDescDialogCtrl', RomUpdateDescDialogCtrl)
    .controller('RomDeleteUpdateDialogCtrl', RomDeleteUpdateDialogCtrl)
    .config(romUpdateSettingConfig);

})();
