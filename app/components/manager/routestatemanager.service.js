(function() {
  'use strict';

  /**
   * @ngInject
   */
  function RouteStateManager($http, StorageManager, Constant) {
    var RouteStateManager = {};

    RouteStateManager.getApp = function(id) {
      return $http.get(Constant.URL.PRODUCTS + '/' + id)
        .success(function(data) {
          StorageManager.setApp(data);
        });
    };

    return RouteStateManager;
  }

  angular
    .module('myou.shared')
    .factory('RouteStateManager', RouteStateManager);

})();
