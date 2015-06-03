(function() {
  'use strict';

  angular.module('myou.dashboard.pageanalytic')
    .factory('UserinfoService', UserinfoService);

  /**
   * @ngInject
   */
  function UserinfoService($http, $q, Constant) {
    var userinfoService = {};

    userinfoService.data = {};

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

    userinfoService.data.tableData = testData;
    userinfoService.data.pieData = [];

    testData.forEach(function(dt) {
      userinfoService.data.pieData.push([dt.name, parseInt(dt.count)]);
    });

    userinfoService.getData = function(start, end, trickId, cb) {
      return $http.get(Constant.URL.PRODUCTS_SOURCE + '?start_date=' + start + '&end_date=' + end + '&tid=' + trickId)
        .success(function(data) {
          userinfoService.data.tableData = data;
          userinfoService.data.pieData = [];

          data.forEach(function(dt) {
            userinfoService.data.pieData.push([dt.name, parseInt(dt.count)]);
          });

          if (cb && typeof(cb) === 'function') {
            cb();
          }
        });
    };

    return userinfoService;
  }


})();
