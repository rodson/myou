(function() {
  'use strict';

  angular.module('myou.dashboard.pageanalytic')
    .factory('AlertListService', AlertListService);

  function AlertListService($http, $q, Constant) {
    var alertListService = {};
    alertListService.data = {
      statistic: [],
      alert: {}
    };

    /************************** test start **************************/
    var testDataStatic = [{
      'service_address': 'http://121.40.72.175/connector/api/cloud/file/v2/image',
      'http_method': 'POST',
      'all_count': 2,
      'alert_count': 1,
      'alert_percent': 0.5
    }, {
      'service_address': 'http://121.40.72.175/connector/api/cloud/v2/accounts.json',
      'http_method': 'POST',
      'all_count': 55,
      'alert_count': 38,
      'alert_percent': 0.6909
    }];

    var testDataAlert = {
      'total': 300,
      'data': [{
        'service_address': 'http://121.40.72.175/connector/api/cloud/v2/babies/:id/locations.json',
        'http_method': 'GET',
        'status_code': 404,
        'error_message': null,
        'time_cost': 284,
        'ip': '121.8.170.250',
        'platform': 'android_app',
        'report_datetime': '2015-05-20 16:16:00',
        'created_at': '2015-05-20 16:16:00'
      }, {
        'service_address': 'http://121.40.72.175/connector/api/cloud/v2/trackers/:id',
        'http_method': 'GET',
        'status_code': 4200,
        'error_message': null,
        'time_cost': 4184.62,
        'ip': '121.8.170.250',
        'platform': 'ios_app',
        'report_datetime': '2015-05-20 16:15:11',
        'created_at': '2015-05-20 16:15:58'
      }, {
        'service_address': 'http://121.40.72.175/connector/api/cloud/v2/trackers.json',
        'http_method': 'GET',
        'status_code': 200,
        'error_message': null,
        'time_cost': 619,
        'ip': '121.8.170.250',
        'platform': 'android_app',
        'report_datetime': '2015-05-20 16:15:51',
        'created_at': '2015-05-20 16:15:51'
      }]
    };

    alertListService.data.statistic = testDataStatic;
    alertListService.data.alert.total = testDataAlert.total;
    alertListService.data.alert.data = testDataAlert.data;
    alertListService.data.alert.data.forEach(function(str) {
      str.platform = str.platform.replace(/_app$/, '');
    });

    /************************** test end **************************/

    alertListService.getStatisticData = function(appkey, start, end, cb) {
      return $http.get(Constant.URL.PRODUCTS_SERVICE_MONITOR + '/' + appkey + '/alert_data_minute?start_datetime=' + start + '&end_datetime=' + end).success(function(data) {
        alertListService.data.statistic = data;
        if (cb && typeof(cb) === 'function') {
          cb();
        }
      });
    };

    alertListService.getAlertData = function(appkey, start, end, limit, skip, serviceaddr, cb) {
      return $http.get(Constant.URL.PRODUCTS_SERVICE_MONITOR + '/' + appkey + '/alert_list?start_datetime=' + start + '&end_datetime=' + end + '&limit=' + limit + '&skip=' + skip + '&service_address=' + serviceaddr)
        .success(function(data) {
          alertListService.data.alert.total = data.total;
          alertListService.data.alert.data = data.data;

          alertListService.data.alert.data.forEach(function(str) {
            str.platform = str.platform.replace(/_app$/, '');
          });

          if (cb && typeof(cb) === 'function') {
            cb();
          }
        });
    };

    return alertListService;
  }


})();
