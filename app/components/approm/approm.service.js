(function() {
  'use strict';

  /**
   * @ngInject
   */
  function AppRomService($http, Constant) {
    var appRomService = {};
    appRomService.data = {};


    appRomService.putUpdatePolicy = function(appId, updatePlicy, cb) {
      return $http.put(Constant.URL.UPDATE_POLICY + '/' + appId, updatePlicy)
        .success(function(data) {
          cb();
        })
        .error(function(error) {
          cb(error);
        });
    };

    appRomService.getUpdatePolicy = function(appId, cb) {
      return $http.get(Constant.URL.UPDATE_POLICY + '/' + appId)
        .success(function(data) {
          appRomService.data.policy = data;
          cb();
        });
    };

    appRomService.getUpdateMinData = function(appId, date, cb) {
      return $http.get(Constant.URL.PRODUCTS + '/' + appId + '/updateStats?date=' + date)
        .success(function(data) {
          appRomService.data.mindata = data;
          cb();
        });
    };

    return appRomService;
  }

  angular
    .module('myou.approm')
    .factory('AppRomService', AppRomService);
})();
