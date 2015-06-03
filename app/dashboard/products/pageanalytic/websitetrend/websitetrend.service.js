(function() {
  'use strict';

  angular.module('myou.dashboard.pageanalytic')
    .factory('WebsiteTrendService', WebsiteTrendService);

  /**
   * @ngInject
   */
  function WebsiteTrendService($http, $q, Constant) {

    var websiteTrendService = {};

    websiteTrendService.data = {};

    websiteTrendService.getData = function(trickId, start, end, cb) {
      return $http.get(Constant.URL.PRODUCTS_SUMMARY + '?start_date=' + start + '&end_date=' + end + '&tid=' + trickId)
        .success(function(data) {
          var cx = [],
            pv = [],
            ip = [],
            uv = [];
          data.forEach(function(d) {
            cx.unshift(d.date);
            pv.unshift(parseInt(d.pv));
            ip.unshift(parseInt(d.ip));
            uv.unshift(parseInt(d.uv));
          });
          websiteTrendService.data = {
            cx: cx,
            data: [{
              name: 'PV',
              data: pv
            }, {
              name: 'IP',
              data: ip
            }, {
              name: 'UV',
              data: uv
            }]
          };
          if (cb && typeof(cb) === 'function') {
            cb(websiteTrendService.data);
          }
        });
    };

    return websiteTrendService;
  }
})();
