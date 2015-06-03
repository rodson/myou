(function() {
  'use strict';

  angular.module('myou.dashboard.pageanalytic')
    .factory('PageAnalyticService', PageAnalyticService);

  /**
   * @ngInject
   */
  function PageAnalyticService($http, $q, Constant) {

    var pageAnalyticService = {};

    pageAnalyticService.trickId = 0;

    pageAnalyticService.getData = function(appkey, cb) {
      return $http.get(Constant.URL.PRODUCTS_TRICKID + '?appkey=' + appkey)
        .success(function(data) {
          pageAnalyticService.trickId = data.track_id;
          cb();
        });
    };

    return pageAnalyticService;
  }
})();
