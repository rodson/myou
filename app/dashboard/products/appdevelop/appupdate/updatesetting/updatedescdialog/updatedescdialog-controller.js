(function() {
  'use strict';

  /**
   * @ngInject
   */
  function UpdateDescDialogCtrl($mdDialog, data, UpdateSettingService) {
    var vm = this;
    vm.updateDesc = data.updateDesc;

    vm.ok = function() {
      if (vm.updateDesc === data.updateDesc) {
        $mdDialog.cancel();
      } else {
        UpdateSettingService.modifyAppUpdate(data.updateId, {updateDesc: vm.updateDesc})
          .then(function() {
            $mdDialog.hide(vm.updateDesc);
          });
      }
    };

    vm.cancel = function() {
      $mdDialog.cancel();
    };

  }

  angular
    .module('myou.dashboard.appdevelop.appupdate')
    .controller('UpdateDescDialogCtrl', UpdateDescDialogCtrl);

})();
