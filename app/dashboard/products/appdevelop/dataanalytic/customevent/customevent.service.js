(function() {
  'use strict';

  function CustomEventService($http, UrlManager, StorageManager) {
    var CustomEventService = {};

    CustomEventService.init = function() {
      CustomEventService.app = StorageManager.getApp();
      CustomEventService.getEvents();
    };

    CustomEventService.getEvents = function(version) {
      var queryString = version ? ('?version=' + version) : '';
      $http.get(UrlManager.getAnalyzeCustomEventUrl(CustomEventService.app.appKey) +
        '/' + queryString).success(function(data) {
          console.log(data);
        });
    };

    return CustomEventService;
  }

  angular
    .module('myou.dashboard.appdevelop.dataanalytic')
    .factory('CustomEventService', CustomEventService);

})();
