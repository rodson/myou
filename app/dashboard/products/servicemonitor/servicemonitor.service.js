(function() {
  'use strict';

  angular.module('myou.dashboard.servicemonitor')
    .factory('ServiceMonitorService', ServiceMonitorService);

  /**
   * @ngInject
   */
  function ServiceMonitorService($http, $q, Constant) {

    var serviceMonitorService = {};
    serviceMonitorService.data = {};
    serviceMonitorService.data.appId = null;

    serviceMonitorService.getAppId = function(appKey) {
      return $http.get(Constant.URL.PRODUCTS_SERVICE_MONITOR + '/app_id' + '?app_key=' + appKey).success(function(data) {
        serviceMonitorService.data.appId = data.app_id;
      });
    };

    return serviceMonitorService;
  }
})();
