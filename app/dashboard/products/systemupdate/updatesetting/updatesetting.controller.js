(function() {
  'use strict';

  function romUpdateSettingConfig($stateProvider) {
    $stateProvider
      .state('dashboard.systemupdate.updatesetting', {
        url: '/updatesetting',
        templateUrl: 'app/dashboard/products/systemupdate/updatesetting/updatesetting.html',
        controllerAs: 'vm',
        controller: 'RomUpdateSettingCtrl'
      });
  }

  function RomUpdateSettingCtrl() {

  }

  angular
    .module('myou.dashboard.systemupdate')
    .controller('RomUpdateSettingCtrl', RomUpdateSettingCtrl)
    .config(romUpdateSettingConfig);

})();
