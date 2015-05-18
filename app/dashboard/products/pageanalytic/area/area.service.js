(function() {
  'use strict';

  angular.module('myou.dashboard.pageanalytic')
    .factory('AreaService', AreaService);

  function AreaService($http, $q, Constant) {
    var AreaService = {};

    AreaService.data = {};

    var testData = [{
      'country': 'China',
      'ip': '1',
      'province': '上海市',
      'pv': '2',
      'uv': '1'
    }, {
      'country': '中国',
      'ip': '1',
      'province': '吉林省',
      'pv': '3',
      'uv': '1'
    }, {
      'country': '中国',
      'ip': '28',
      'province': '广东省',
      'pv': '368',
      'uv': '65'
    }, {
      'country': 'China',
      'ip': '1',
      'province': '湖北省',
      'pv': '8',
      'uv': '1'
    }, {
      'country': '中国',
      'ip': '2',
      'province': '湖南省',
      'pv': '7',
      'uv': '2'
    }];

    AreaService.data.tableData = testData;
    AreaService.data.pv = [];
    AreaService.data.uv = [];
    AreaService.data.ip = [];

    testData.forEach(function(dt) {
      AreaService.data.pv.push([dt.country + '.' + dt.province, parseInt(dt.pv)]);
      AreaService.data.uv.push([dt.country + '.' + dt.province, parseInt(dt.ip)]);
      AreaService.data.ip.push([dt.country + '.' + dt.province, parseInt(dt.uv)]);
    });

    AreaService.getData = function(start, end, trickId, cb) {
      return $http.get(Constant.URL.PRODUCTS_REGION + '?start_date=' + start + '&end_date=' + end + '&tid=' + trickId)
        .success(function(data) {

          AreaService.data.tableData = data;
          AreaService.data.pv = [];
          AreaService.data.uv = [];
          AreaService.data.ip = [];

          data.forEach(function(dt) {
            AreaService.data.pv.push([dt.country + '.' + dt.province, parseInt(dt.pv)]);
            AreaService.data.uv.push([dt.country + '.' + dt.province, parseInt(dt.ip)]);
            AreaService.data.ip.push([dt.country + '.' + dt.province, parseInt(dt.uv)]);
          });

          if (cb && typeof(cb) === 'function') {
            cb();
          }
        });
    };

    return AreaService;
  }


})();
