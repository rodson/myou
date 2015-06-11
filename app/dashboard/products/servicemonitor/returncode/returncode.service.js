(function() {
  'use strict';

  angular.module('myou.dashboard.servicemonitor')
    .factory('ReturnCodeService', ReturnCodeService);

  /**
   * @ngInject
   */
  function ReturnCodeService($http, $q, Constant) {
    var RETURN_CODE = 'error_return_code';

    var returnCodeService = {};

    returnCodeService.getReturnCode = function(appKey, cb) {
      return $http.get(Constant.URL.PRODUCTS_SERVICE_MONITOR + '/' + appKey + '/' + RETURN_CODE)
        .success(function(data) {
          returnCodeService.data = data;
          cb();
        });
    };

    returnCodeService.postReturnCode = function(appKey, data, cb) {
      return $http.post(Constant.URL.PRODUCTS_SERVICE_MONITOR + '/' + appKey + '/' + RETURN_CODE, data)
        .success(function(data) {
          cb();
        })
        .error(function(error) {
          cb(error);
        });
    };

    returnCodeService.putReturnCode = function(appKey, returnCodeId, data, cb) {
      return $http.put(Constant.URL.PRODUCTS_SERVICE_MONITOR + '/' + appKey + '/' + RETURN_CODE + '/' + returnCodeId, data)
        .success(function(data) {
          cb();
        })
        .error(function(error) {
          cb(error);
        });
    };

    returnCodeService.deleteReturnCode = function(appKey, returnCodeId, cb) {
      return $http.delete(Constant.URL.PRODUCTS_SERVICE_MONITOR + '/' + appKey + '/' + RETURN_CODE + '/' + returnCodeId)
        .success(function(data) {
          cb();
        })
        .error(function(error) {
          cb(error);
        });
    };

    return returnCodeService;
  }

})();
