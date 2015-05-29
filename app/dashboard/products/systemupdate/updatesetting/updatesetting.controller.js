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
  }

  RomUpdateSettingCtrl.resolve = {
    getUpdateInfos: function(RomUpdateSettingService) {
      return RomUpdateSettingService.getUpdateInfos();
    }
  };

  angular
    .module('myou.dashboard.systemupdate')
    .controller('RomUpdateSettingCtrl', RomUpdateSettingCtrl)
    .config(romUpdateSettingConfig);

})();
