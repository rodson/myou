(function() {
  'use strict';

  angular.module('myou.dashboard.pageanalytic')
    .factory('OperatorService', OperatorService);

  function OperatorService($http, $q, Constant) {
    var operatorService = {};

    operatorService.data = {};

    /******************************* test data start ******************************/
    // var testData = [{
    //   'ip': '9',
    //   'isp': '电信',
    //   'pv': '156',
    //   'uv': '26'
    // }, {
    //   'ip': '2',
    //   'isp': '联通',
    //   'pv': '8',
    //   'uv': '2'
    // }, {
    //   'ip': '1',
    //   'isp': '铁通',
    //   'pv': '31',
    //   'uv': '1'
    // }, {
    //   'ip': '1',
    //   'isp': '铁通1',
    //   'pv': '31',
    //   'uv': '1'
    // }, {
    //   'ip': '1',
    //   'isp': '铁通2',
    //   'pv': '31',
    //   'uv': '1'
    // }];

    // operatorService.data.tableData = testData;
    // operatorService.data.pv = [];
    // operatorService.data.uv = [];
    // operatorService.data.ip = [];

    // testData.forEach(function(dt) {
    //   operatorService.data.pv.push([dt.isp, parseInt(dt.pv)]);
    //   operatorService.data.uv.push([dt.isp, parseInt(dt.ip)]);
    //   operatorService.data.ip.push([dt.isp, parseInt(dt.uv)]);
    // });
    /******************************* test data end ******************************/

    operatorService.getData = function(start, end, trickId, cb) {
      return $http.get(Constant.URL.PRODUCTS_ISP + '?start_date=' + start + '&end_date=' + end + '&tid=' + trickId)
        .success(function(data) {
          operatorService.data.tableData = data;
          operatorService.data.pv = [];
          operatorService.data.uv = [];
          operatorService.data.ip = [];

          data.forEach(function(dt) {
            operatorService.data.pv.push([dt.isp, parseInt(dt.pv)]);
            operatorService.data.uv.push([dt.isp, parseInt(dt.ip)]);
            operatorService.data.ip.push([dt.isp, parseInt(dt.uv)]);
          });

          if (cb && typeof(cb) === 'function') {
            cb();
          }
        });
    };

    return operatorService;
  }


})();
