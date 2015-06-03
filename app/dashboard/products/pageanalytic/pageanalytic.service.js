(function() {
  'use strict';

  angular.module('myou.dashboard.pageanalytic')
    .factory('PageAnalyticService', PageAnalyticService);

  /**
   * @ngInject
   */
  function PageAnalyticService($http, $q, Constant, RouteStateManager, StorageManager) {

    var pageAnalyticService = {};

    pageAnalyticService.trickId = 0;

    var getApp = function(id, cb) {
      RouteStateManager.getApp(id).success(function(data) {
        StorageManager.setApp(data);
        cb(data.appKey);
      });
    };

    pageAnalyticService.getData = function(id, cb) {
      getApp(id, function(appkey) {
        $http.get(Constant.URL.PRODUCTS_TRICKID + '?appkey=' + appkey)
          .success(function(data) {
            pageAnalyticService.trickId = data.track_id;
            cb();
          });
      });
    };

    return pageAnalyticService;
  }
})();
