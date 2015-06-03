(function() {
  'use strict';

  angular.module('myou.dashboard.servicemonitor')
    .factory('ServiceMonitorService', ServiceMonitorService);

  /**
   * @ngInject
   */
  function ServiceMonitorService($http, $q, Constant, RouteStateManager, StorageManager) {

    var serviceMonitorService = {};
    serviceMonitorService.data = {};
    serviceMonitorService.data.appId = null;

    var getApp = function(id, cb) {
      RouteStateManager.getApp(id).success(function(data) {
        StorageManager.setApp(data);
        cb(data.appKey);
      });
    };

    serviceMonitorService.getAppId = function(id, cb) {
      getApp(id, function(appkey) {
        $http.get(Constant.URL.PRODUCTS_SERVICE_MONITOR + '/app_id' + '?app_key=' + appkey).success(function(data) {
          serviceMonitorService.data.appId = data.app_id;
          cb();
        });
      });
    };

    return serviceMonitorService;
  }
})();
