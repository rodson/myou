(function() {
  'use strict';

  function updateSettingConfig($stateProvider) {
    $stateProvider
      .state('dashboard.appdevelop.updatesetting', {
        url: '/updatesetting',
        templateUrl: 'app/dashboard/products/appdevelop/appupdate/updatesetting/updatesetting.html',
        controllerAs: 'vm',
        controller: 'UpdateSettingCtrl'
      });
  }

  function UpdateSettingCtrl() {
    var vm = this;

  }

  angular
    .module('myou.dashboard.appdevelop.appupdate')
    .controller('UpdateSettingCtrl', UpdateSettingCtrl)
    .config(updateSettingConfig);

})();
