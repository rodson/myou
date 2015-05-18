(function() {
  'use strict';

  angular.module('myou.dashboard.pageanalytic')
    .factory('UserinfoService', UserinfoService);

  function UserinfoService($http, $q, Constant) {
    var UserinfoService = {};

    UserinfoService.data = {};

    var testData = [{
      'count': '22',
      'name': '直接访问'
    }, {
      'count': '421',
      'name': '其它'
    }, {
      'count': '5',
      'name': '百度'
    }];

    UserinfoService.data.tableData = testData;
    UserinfoService.data.pieData = [];

    testData.forEach(function(dt) {
      UserinfoService.data.pieData.push([dt.name, parseInt(dt.count)]);
    });

    UserinfoService.getData = function(start, end, trickId, cb) {
      return $http.get(Constant.URL.PRODUCTS_SOURCE + '?start_date=' + start + '&end_date=' + end + '&tid=' + trickId)
        .success(function(data) {
          UserinfoService.data.tableData = data;
          UserinfoService.data.pieData = [];

          data.forEach(function(dt) {
            UserinfoService.data.pieData.push([dt.name, parseInt(dt.count)]);
          });

          if (cb && typeof(cb) === 'function') {
            cb();
          }
        });
    };

    return UserinfoService;
  }


})();
