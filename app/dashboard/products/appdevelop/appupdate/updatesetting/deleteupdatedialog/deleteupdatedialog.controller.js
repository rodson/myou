(function() {
  'use strict';

  /**
   * @ngInject
   */
  function DeleteUpdateDialogCtrl($mdDialog, UpdateSettingService, data) {
    var vm = this;

    vm.versionCode = data.versionCode;

    vm.ok = function() {
      UpdateSettingService.deleteAppUpdate(data.updateId).then(function() {
        $mdDialog.hide();
      });
    };

    vm.cancel = function() {
      $mdDialog.cancel();
    };
  }

  angular
    .module('myou.dashboard.appdevelop.appupdate')
    .controller('DeleteUpdateDialogCtrl', DeleteUpdateDialogCtrl);

})();
