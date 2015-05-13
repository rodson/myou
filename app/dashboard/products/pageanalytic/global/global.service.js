(function() {
  'use strict';

  function GlobalService($http, $q, Constant) {
    var globalService = {};

    globalService.globalData = '';

    globalService.getData = function(trickId) {
      var queryString = '?tid=' + trickId;

      return $http.get(Constant.URL.PRODUCTS_GLOBAL + queryString)
        .success(function(data) {
          globalService.globalData = data;
        });
    };

    return globalService;
  }

  angular
    .module('myou.dashboard.pageanalytic')
    .factory('GlobalService', GlobalService);
})();
