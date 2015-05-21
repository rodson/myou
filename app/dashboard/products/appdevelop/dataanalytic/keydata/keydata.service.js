(function() {
  'use strict';

  function KeyDataService($http, localStorageService, UrlManager) {
    var KeyDataService = {};

    KeyDataService.getLineChart = function(startdate, enddate, stats) {
    };

    KeyDataService.getTableData = function() {

    };

    return KeyDataService;
  }

  angular
    .module('myou.dashboard.appdevelop.dataanalytic')
    .factory('KeyDataService', KeyDataService);
})();
