(function() {
  'use strict';

  function APIStatisService($http, $q, Constant) {
    var apiStatisService = {};
    apiStatisService.count = 0;
    apiStatisService.realtime = [];
    apiStatisService.apicount = [];
    apiStatisService.apppie = [];
    apiStatisService.appcount = [];

    /******************************** test data start***************************/
    // apiStatisService.count = 123333;

    // var xxx = [];
    // for (var i = 0; i < 1440; i++) {
    //   xxx.push([i, Math.floor(i * Math.random() / 100)]);
    // }

    // var yyy = xxx.map(function(i) {
    //   return [i[0], i[1] * 2];
    // });

    // var data = [{
    //   name: '升级',
    //   list: xxx
    // }, {
    //   name: '数据上报',
    //   list: yyy
    // }];
    // apiStatisService.realtime = data;

    // var data = {
    //   'table_data': [{
    //     'count': 30511,
    //     'name': 'UserActionMonitor'
    //   }, {
    //     'count': 23679,
    //     'name': 'R1056J'
    //   }, {
    //     'count': 12676,
    //     'name': '2982_UserAction'
    //   }, {
    //     'count': 8297,
    //     'name': 'MindLinker5508'
    //   }, {
    //     'count': 5901,
    //     'name': 'RTK2982-OTA'
    //   }, {
    //     'count': 3215,
    //     'name': '2984D_AliOS'
    //   }, {
    //     'count': 1778,
    //     'name': 'test111111'
    //   }],
    //   'pie_chart_data': [{
    //     'count': 30511,
    //     'name': 'UserActionMonitor'
    //   }, {
    //     'count': 23679,
    //     'name': 'R1056J'
    //   }, {
    //     'count': 12676,
    //     'name': '2982_UserAction'
    //   }, {
    //     'count': 8297,
    //     'name': 'MindLinker5508'
    //   }, {
    //     'count': 5901,
    //     'name': 'RTK2982-OTA'
    //   }, {
    //     'count': '10523',
    //     'name': '其他'
    //   }]
    // };
    // apiStatisService.appcount = data.table_data;
    // apiStatisService.apppie = data.pie_chart_data.map(function(dt) {
    //   return [dt.name, parseInt(dt.count)];
    // });


    // var data = [{
    //   'count': 55362,
    //   'name': '数据上报'
    // }, {
    //   'count': 36180,
    //   'name': '升级'
    // }, {
    //   'count': 2193,
    //   'name': '网站统计'
    // }, {
    //   'count': 1139,
    //   'name': '返回码'
    // }];
    // apiStatisService.apicount = data;
    /******************************** test data end ***************************/

    apiStatisService.getCount = function(date, cb) {
      return $http.get(Constant.URL.APISTATIS_USAGE + '?date=' + date + '&view_type=all').success(function(data) {
        apiStatisService.count = data.count;
        cb();
      });
    };

    apiStatisService.getRealtimeStat = function(date, cb) {
      return $http.get(Constant.URL.APISTATIS_USAGE + '?date=' + date + '&view_type=realtime').success(function(data) {
        apiStatisService.realtime = data;
        cb();
      });
    };
    apiStatisService.getAppStat = function(date, cb) {
      return $http.get(Constant.URL.APISTATIS_USAGE + '?date=' + date + '&view_type=app').success(function(data) {
        apiStatisService.appcount = data.table_data;
        apiStatisService.apppie = data.pie_chart_data.map(function(dt) {
          return [dt.name, parseInt(dt.count)];
        });
        cb();
      });
    };
    apiStatisService.getUrlStat = function(date, cb) {
      return $http.get(Constant.URL.APISTATIS_USAGE + '?date=' + date + '&view_type=api').success(function(data) {
        apiStatisService.apicount = data;
        cb();
      });
    };

    return apiStatisService;

  }

  angular
    .module('myou.dashboard.apistatis')
    .factory('APIStatisService', APIStatisService);

})();
