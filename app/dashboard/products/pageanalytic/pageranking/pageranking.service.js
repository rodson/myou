(function() {
  'use strict';

  angular.module('myou.dashboard.pageanalytic')
    .factory('PageRankingService', PageRankingService);

  function PageRankingService($http, $q, Constant){
    var pageRankingService = {};

    pageRankingService.getData = function(start, end, trickId, cb){
      return $http.get(Constant.URL.PRODUCTS_PAGERANKING + '?start_date=' + start + '&end_date=' + end + '&tid=' + trickId)
        .success(function(data) {
          pageRankingService.data = data;
          if (cb && typeof(cb) === 'function') {
            cb(pageRankingService.data);
          }
        });
    };

    return pageRankingService;
  }


})();
