(function() {
  'use strict';

  /**
   * @ngInject
   */
  function SystemUpdateService($http, Constant) {
    var SystemUpdateService = {};

    SystemUpdateService.updateAppKey = function(id, application, cb) {
      return $http.put(Constant.URL.PRODUCTS + '/' + id, application)
        .success(function(data){
          cb();
        })
        .error(function(error){
          cb(error);
        });

    };

    return SystemUpdateService;
  }

  angular
    .module('myou.dashboard.systemupdate')
    .factory('SystemUpdateService', SystemUpdateService);

})();
