(function() {
  'use strict';

  angular.module('myou.dashboard.servicemonitor')
    .factory('SettingsService', SettingsService);

  function SettingsService($http, Constant) {
    var MONITOR_CONFIG = 'monitor_config';

    var settingsService = {};

    settingsService.getMonitorConfig = function(appKey, cb) {
      return $http.get(Constant.URL.PRODUCTS_SERVICE_MONITOR + '/' + appKey + '/' + MONITOR_CONFIG)
        .success(function(data) {
          settingsService.data = data;
          cb();
        });
    };

    settingsService.modifyMonitorConfig = function(appKey, config, cb) {
      return $http.put(Constant.URL.PRODUCTS_SERVICE_MONITOR + '/' + appKey + '/' + MONITOR_CONFIG, config)
        .success(function(data) {
          cb(null);
        })
        .error(function(error) {
          cb(error);
        });
    };

    return settingsService;
  }

})();
