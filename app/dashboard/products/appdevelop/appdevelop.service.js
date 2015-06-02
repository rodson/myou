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

    return AppDevelopService;
  }

  angular
    .module('myou.dashboard.appdevelop')
    .factory('AppDevelopService', AppDevelopService);

})();
