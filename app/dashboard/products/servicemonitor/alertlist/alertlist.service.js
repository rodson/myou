(function() {
  'use strict';

  angular.module('myou.dashboard.pageanalytic')
    .factory('DailyDataService', DailyDataService);

  function DailyDataService($http, $q, Constant) {
    var dailyDataService = {};
    dailyDataService.data = {
      alterCount: 0,
      allCount: 0,
      data: []
    };

    /************************** test start **************************/
    var testData = {
      'all_count': 4616,
      'alert_count': 2848,
      'data': [{
        'service_address': 'http://trace.cvtapi.com/connector/api/cloud/v2/babies/:id/locations.json',
        'http_method': 'GET',
        'all_count': 1079,
        'alert_count': 923,
        'alert_percent': 0.8554
      }, {
        'service_address': 'http://121.40.72.175/connector/api/cloud/v2/babies/:id/locations',
        'http_method': 'GET',
        'all_count': 204,
        'alert_count': 204,
        'alert_percent': 1
      }, {
        'service_address': 'http://121.40.72.175/connector/api/cloud/v2/babies/:id/locations.json',
        'http_method': 'GET',
        'all_count': 184,
        'alert_count': 162,
        'alert_percent': 0.8804
      }, {
        'service_address': 'http://121.40.72.175/connector/api/cloud/v2/accounts/:id/follow',
        'http_method': 'GET',
        'all_count': 181,
        'alert_count': 181,
        'alert_percent': 1
      }, {
        'service_address': 'http://trace.cvtapi.com/connector/api/cloud/v2/babies/:id.json',
        'http_method': 'GET',
        'all_count': 181,
        'alert_count': 47,
        'alert_percent': 0.2597
      }, {
        'service_address': 'http://121.40.72.175/connector/api/cloud/v2/accounts/:id/invitations',
        'http_method': 'GET',
        'all_count': 178,
        'alert_count': 178,
        'alert_percent': 1
      }, {
        'service_address': 'http://121.40.72.175/connector/api/cloud/v2/babies/:id/trackers',
        'http_method': 'GET',
        'all_count': 175,
        'alert_count': 175,
        'alert_percent': 1
      }]
    };

    dailyDataService.data.alterCount = testData.alert_count;
    dailyDataService.data.allCount = testData.all_count;
    dailyDataService.data.data = testData.data;
    dailyDataService.data.data.forEach(function(i) {
      i.alert_percent = (i.alert_percent * 100).toFixed(2);
    });
    /************************** test end **************************/

    dailyDataService.getData = function(appkey, datetime, cb) {
      return $http.get(Constant.URL.PRODUCTS_SERVICE_MONITOR + '/' + appkey + '/alert_data_daily?date=' + datetime)
        .success(function(data) {
          dailyDataService.data.alterCount = data.alert_count;
          dailyDataService.data.allCount = data.all_count;
          dailyDataService.data.data = data.data;
          dailyDataService.data.data.forEach(function(i) {
            i.alert_percent = (i.alert_percent * 100).toFIxed(4);
          });

          if (cb && typeof(cb) === 'function') {
            cb();
          }
        });
    };

    return dailyDataService;
  }


})();
