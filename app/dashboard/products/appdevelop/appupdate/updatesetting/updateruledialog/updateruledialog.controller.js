(function() {
  'use strict';

  function UpdateRuleDialogCtrl(data) {
    var vm = this;

    vm.isTest = data.isTest;
    vm.versions = data.versions;
    vm.targetVersion = '';

    vm.ok = function() {

    };

    vm.cancel = function() {

    };
  }

  angular
    .module('myou.dashboard.appdevelop.appupdate')
    .controller('UpdateRuleDialogCtrl', UpdateRuleDialogCtrl);

})();
