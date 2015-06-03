(function() {
  'use strict';

  /**
   * @ngInject
   */
  function ErrorTrendService($http, Constant) {
    var CRASH_REPORT = '/crash_report/overview';

    var errorTrendService = {};
    errorTrendService.data = {};

    errorTrendService.getLineChart = function(appKey, startDate, endDate, platform, stats, cb) {
      return $http.get(Constant.URL.ANALYZE_URL + '/' + appKey + CRASH_REPORT + '?start_date=' + startDate +
          '&end_date=' + endDate + '&platform=' + platform + '&stats=' + stats)
        .success(function(data) {
          errorTrendService.data[stats] = data;
          cb();
        });
    };

    errorTrendService.getTableData = function(appKey, startDate, endDate, platform, cb) {
      return $http.get(Constant.URL.ANALYZE_URL + '/' + appKey + CRASH_REPORT + '?start_date=' + startDate +
          '&end_date=' + endDate + '&platform=' + platform + '&stats=table_data')
        .success(function(data) {
          errorTrendService.data.table_data = data;
          cb();
        });
    };

    return errorTrendService;

  }

  angular.module('myou.dashboard.appdevelop')
    .factory('ErrorTrendService', ErrorTrendService);

})();
