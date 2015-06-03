(function() {
  'use strict';

  angular.module('myou.dashboard.pageanalytic')
    .factory('AreaService', AreaService);

  /**
   * @ngInject
   */
  function AreaService($http, $q, Constant, PieArrayService, AreaMapDataConstant) {
    var areaService = {};

    areaService.data = {};

    /******************************* test data start ******************************/
    // var testData = [{
    //   'country': 'China',
    //   'ip': '1',
    //   'province': '上海市',
    //   'pv': '21',
    //   'uv': '1'
    // }, {
    //   'country': '中国',
    //   'ip': '1',
    //   'province': '吉林省',
    //   'pv': '31',
    //   'uv': '1'
    // }, {
    //   'country': '中国',
    //   'ip': '28',
    //   'province': '广东省',
    //   'pv': '368',
    //   'uv': '65'
    // }, {
    //   'country': 'China',
    //   'ip': '1',
    //   'province': '湖北省',
    //   'pv': '82',
    //   'uv': '1'
    // }, {
    //   'country': '中国',
    //   'ip': '2',
    //   'province': '湖南省',
    //   'pv': '71',
    //   'uv': '2'
    // }, {
    //   'country': '中国',
    //   'ip': '2',
    //   'province': '陕西省',
    //   'pv': '71',
    //   'uv': '2'
    // }];

    // areaService.data.tableData = testData;
    // areaService.data.pv = [];
    // areaService.data.uv = [];
    // areaService.data.ip = [];

    // testData.forEach(function(dt) {

    //   areaService.data.pv.push({
    //     name: dt.province,
    //     value: parseInt(dt.pv)
    //   });
    //   areaService.data.uv.push({
    //     name: dt.province,
    //     value: parseInt(dt.uv)
    //   });
    //   areaService.data.ip.push({
    //     name: dt.province,
    //     value: parseInt(dt.ip)
    //   });
    // });

    // var findHcKeyFromProvince = function(province) {
    //   var length = AreaMapDataConstant.MAP_DATA.features.length;
    //   for(var i = 0; i < length; i++) {
    //     if (AreaMapDataConstant.MAP_DATA.features[i].properties.name === province) {
    //       return AreaMapDataConstant.MAP_DATA.features[i].properties['hc-key'];
    //     }
    //   }
    // };

    // PieArrayService.getLarger(areaService.data.pv);
    // PieArrayService.getLarger(areaService.data.uv);
    // PieArrayService.getLarger(areaService.data.ip);
    /******************************* test data end ******************************/

    areaService.getData = function(start, end, trickId, cb) {
      return $http.get(Constant.URL.PRODUCTS_REGION + '?start_date=' + start + '&end_date=' + end + '&tid=' + trickId)
        .success(function(data) {

          areaService.data.tableData = data;
          areaService.data.pv = [];
          areaService.data.uv = [];
          areaService.data.ip = [];

          data.forEach(function(dt) {
            if (AreaMapDataConstant.PROVICE_DATA.indexOf(dt.province) !== -1) {
              areaService.data.pv.push({
                name: dt.province,
                value: parseInt(dt.pv)
              });
              areaService.data.uv.push({
                name: dt.province,
                value: parseInt(dt.uv)
              });
              areaService.data.ip.push({
                name: dt.province,
                value: parseInt(dt.ip)
              });
            }
          });

          // PieArrayService.getLarger(areaService.data.pv);
          // PieArrayService.getLarger(areaService.data.uv);
          // PieArrayService.getLarger(areaService.data.ip);

          if (cb && typeof(cb) === 'function') {
            cb();
          }
        });
    };

    return areaService;
  }


})();
