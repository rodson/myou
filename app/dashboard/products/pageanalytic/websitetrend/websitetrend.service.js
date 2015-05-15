(function() {
  'use strict';

  angular.module('myou.dashboard.pageanalytic')
    .factory('WebsiteTrendService', WebsiteTrendService);


  function WebsiteTrendService($http, $q, Constant) {

    var websiteTrendService = {};

    websiteTrendService.getData = function(trickId, start, end) {
      return $http.get(URL + '?start_date=' + start + '&end_date=' + end + '&tid=' + trickId)
        .success(function(data){
          websiteTrendService.data = data;
        });
    };

    return websiteTrendService;
  }
})();
