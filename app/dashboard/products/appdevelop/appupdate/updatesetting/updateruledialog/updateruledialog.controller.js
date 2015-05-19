(function() {
  'use strict';

  function UpdateRuleDialogCtrl($mdDialog, data, UpdateSettingService) {
    var vm = this;

    vm.isTest = data.isTest;
    vm.versions = data.versions;
    vm.rule = data.rule;

    var originRule = angular.copy(data.rule);

    vm.ok = function() {
      UpdateSettingService.modifyUpdateRule(data.updateId, originRule, vm.rule, vm.isTest)
        .then(function() {
          $mdDialog.hide(vm.rule);
        });
    };

    vm.cancel = function() {
      $mdDialog.cancel();
    };
  }

  angular
    .module('myou.dashboard.appdevelop.appupdate')
    .controller('UpdateRuleDialogCtrl', UpdateRuleDialogCtrl);

})();
