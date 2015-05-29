(function() {
  'use strict';

  function RomUpdateSettingService($http, $mdDialog, UrlManager,
    StorageManager) {

    var RomUpdateSettingService = {};

    RomUpdateSettingService.app = {};
    RomUpdateSettingService.updateInfos = [];

    RomUpdateSettingService.init = function() {
      RomUpdateSettingService.app = StorageManager.getApp();
    };

    RomUpdateSettingService.getUpdateInfos = function() {
      RomUpdateSettingService.init();

      return $http.get(UrlManager.getAppUpdateInfoUrl(RomUpdateSettingService.app._id))
        .success(function(updateInfos) {
          RomUpdateSettingService.updateInfos = updateInfos;
        });
    };

    return RomUpdateSettingService;
  }

  angular
    .module('myou.dashboard.systemupdate')
    .factory('RomUpdateSettingService', RomUpdateSettingService);

})();
