(function() {
  'use strict';

  angular.module('myou.dashboard.pageanalytic')
    .factory('OperatorService', OperatorService);

  function OperatorService($http, $q, Constant){
    var operatorService = {};

    operatorService.getData = function(start, end, trickId, cb){
      return $http.get(Constant.URL.PRODUCTS_ISP + '?start_date=' + start + '&end_date=' + end + '&tid=' + trickId)
        .success(function(data) {
          operatorService.data = data;
          if (cb && typeof(cb) === 'function') {
            cb(operatorService.data);
          }
        });
    };

    return operatorService;
  }


})();
