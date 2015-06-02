(function() {
  'use strict';

  function AppDevelopService($http, StorageManager, Constant) {
    var AppDevelopService = {};

    AppDevelopService.getApp = function(id) {
      return $http.get(Constant.URL.PRODUCTS + '/' + id)
        .success(function(data) {
          StorageManager.setApp(data);
        });
    };

    AppDevelopService.updateAppKey = function(id, application, cb) {
      return $http.put(Constant.URL.PRODUCTS + '/' + id, application)
        .success(function(data){
          cb();
        })
        .error(function(error){
          cb(error);
        });

    };

    return AppDevelopService;
  }

  angular
    .module('myou.dashboard.appdevelop')
    .factory('AppDevelopService', AppDevelopService);

})();
