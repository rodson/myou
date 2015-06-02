(function() {
  'use strict';

  angular.module('myou.dashboard.pageanalytic')
    .factory('ClientInfoService', ClientInfoService);

  function ClientInfoService($http, $q, Constant, PieArrayService) {
    var clientInfoService = {};

    clientInfoService.data = {};
    clientInfoService.data.dataOs = {
      tableData: [],
      ip: [],
      pv: [],
      uv: []
    };

    clientInfoService.data.dataBr = {
      tableData: [],
      ip: [],
      pv: [],
      uv: []
    };

    clientInfoService.data.dataSr = {
      tableData: [],
      ip: [],
      pv: [],
      uv: []
    };

    /******************************* test data start ******************************/
    // var testDataOS = [{
    //   'ip': '2',
    //   'name': 'Android',
    //   'pv': '8',
    //   'uv': '2'
    // }, {
    //   'ip': '2',
    //   'name': 'iOS',
    //   'pv': '18',
    //   'uv': '3'
    // }, {
    //   'ip': '1',
    //   'name': 'Linux',
    //   'pv': '3',
    //   'uv': '1'
    // }, {
    //   'ip': '2',
    //   'name': 'OS X',
    //   'pv': '21',
    //   'uv': '2'
    // }, {
    //   'ip': '32',
    //   'name': 'Windows',
    //   'pv': '429',
    //   'uv': '69'
    // }, {
    //   'ip': '2',
    //   'name': 'OS X',
    //   'pv': '21',
    //   'uv': '2'
    // }];

    // var testDataBroswer = [{
    //   'ip': '2',
    //   'name': 'Android browser',
    //   'pv': '8',
    //   'uv': '2'
    // }, {
    //   'ip': '25',
    //   'name': 'Chrome',
    //   'pv': '309',
    //   'uv': '29'
    // }, {
    //   'ip': '1',
    //   'name': 'Firefox',
    //   'pv': '14',
    //   'uv': '1'
    // }, {
    //   'ip': '6',
    //   'name': 'IE',
    //   'pv': '68',
    //   'uv': '40'
    // }, {
    //   'ip': '1',
    //   'name': 'Maxthon',
    //   'pv': '2',
    //   'uv': '1'
    // }, {
    //   'ip': '2',
    //   'name': 'Mobile Safari',
    //   'pv': '18',
    //   'uv': '3'
    // }];

    // var testDataScreen = [{
    //   'ip': '1',
    //   'name': '1080x1920',
    //   'pv': '3',
    //   'uv': '1'
    // }, {
    //   'ip': '1',
    //   'name': '1152x864',
    //   'pv': '22',
    //   'uv': '1'
    // }, {
    //   'ip': '1',
    //   'name': '1196x720',
    //   'pv': '5',
    //   'uv': '1'
    // }, {
    //   'ip': '2',
    //   'name': '1280x1024',
    //   'pv': '10',
    //   'uv': '1'
    // }, {
    //   'ip': '1',
    //   'name': '1280x768',
    //   'pv': '5',
    //   'uv': '1'
    // }, {
    //   'ip': '1',
    //   'name': '1280x800',
    //   'pv': '19',
    //   'uv': '1'
    // }, {
    //   'ip': '11',
    //   'name': '1366x768',
    //   'pv': '128',
    //   'uv': '30'
    // }];

    // clientInfoService.data.dataOs = {
    //   tableData: [],
    //   ip: [],
    //   pv: [],
    //   uv: []
    // };

    // clientInfoService.data.dataBr = {
    //   tableData: [],
    //   ip: [],
    //   pv: [],
    //   uv: []
    // };

    // clientInfoService.data.dataSr = {
    //   tableData: [],
    //   ip: [],
    //   pv: [],
    //   uv: []
    // };

    // clientInfoService.data.dataOs.tableData = testDataOS;
    // testDataOS.forEach(function(dt) {
    //   clientInfoService.data.dataOs.pv.push([dt.name, parseInt(dt.pv)]);
    //   clientInfoService.data.dataOs.uv.push([dt.name, parseInt(dt.uv)]);
    //   clientInfoService.data.dataOs.ip.push([dt.name, parseInt(dt.ip)]);
    // });

    // PieArrayService.getLarger(clientInfoService.data.dataOs.pv);
    // PieArrayService.getLarger(clientInfoService.data.dataOs.uv);
    // PieArrayService.getLarger(clientInfoService.data.dataOs.ip);

    // clientInfoService.data.dataBr.tableData = testDataBroswer;
    // testDataBroswer.forEach(function(dt) {
    //   clientInfoService.data.dataBr.pv.push([dt.name, parseInt(dt.pv)]);
    //   clientInfoService.data.dataBr.uv.push([dt.name, parseInt(dt.uv)]);
    //   clientInfoService.data.dataBr.ip.push([dt.name, parseInt(dt.ip)]);
    // });

    // PieArrayService.getLarger(clientInfoService.data.dataBr.pv);
    // PieArrayService.getLarger(clientInfoService.data.dataBr.uv);
    // PieArrayService.getLarger(clientInfoService.data.dataBr.ip);

    // clientInfoService.data.dataSr.tableData = testDataScreen;
    // testDataScreen.forEach(function(dt) {
    //   clientInfoService.data.dataSr.pv.push([dt.name, parseInt(dt.pv)]);
    //   clientInfoService.data.dataSr.uv.push([dt.name, parseInt(dt.uv)]);
    //   clientInfoService.data.dataSr.ip.push([dt.name, parseInt(dt.ip)]);
    // });

    // PieArrayService.getLarger(clientInfoService.data.dataSr.pv);
    // PieArrayService.getLarger(clientInfoService.data.dataSr.uv);
    // PieArrayService.getLarger(clientInfoService.data.dataSr.ip);
    /******************************* test data end ******************************/

    clientInfoService.getDataOs = function(start, end, trickId, cb) {
      return $http.get(Constant.URL.PRODUCTS_DEVICE + '?start_date=' + start + '&end_date=' + end + '&tid=' + trickId + '&type=os_family_name')
        .success(function(data) {

          clientInfoService.data.dataOs = {
            tableData: [],
            ip: [],
            pv: [],
            uv: []
          };

          clientInfoService.data.dataOs.tableData = data;
          data.forEach(function(dt) {
            clientInfoService.data.dataOs.pv.push([dt.name, parseInt(dt.pv)]);
            clientInfoService.data.dataOs.uv.push([dt.name, parseInt(dt.uv)]);
            clientInfoService.data.dataOs.ip.push([dt.name, parseInt(dt.ip)]);
          });

          PieArrayService.getLarger(clientInfoService.data.dataOs.pv);
          PieArrayService.getLarger(clientInfoService.data.dataOs.uv);
          PieArrayService.getLarger(clientInfoService.data.dataOs.ip);

          if (cb && typeof(cb) === 'function') {
            cb();
          }
        });
    };

    clientInfoService.getDataBr = function(start, end, trickId, cb) {
      return $http.get(Constant.URL.PRODUCTS_DEVICE + '?start_date=' + start + '&end_date=' + end + '&tid=' + trickId + '&type=browser_name')
        .success(function(data) {

          clientInfoService.data.dataBr = {
            tableData: [],
            ip: [],
            pv: [],
            uv: []
          };

          clientInfoService.data.dataBr.tableData = data;
          data.forEach(function(dt) {
            clientInfoService.data.dataBr.pv.push([dt.name, parseInt(dt.pv)]);
            clientInfoService.data.dataBr.uv.push([dt.name, parseInt(dt.uv)]);
            clientInfoService.data.dataBr.ip.push([dt.name, parseInt(dt.ip)]);
          });

          PieArrayService.getLarger(clientInfoService.data.dataBr.pv);
          PieArrayService.getLarger(clientInfoService.data.dataBr.uv);
          PieArrayService.getLarger(clientInfoService.data.dataBr.ip);

          if (cb && typeof(cb) === 'function') {
            cb();
          }
        });
    };

    clientInfoService.getDataSr = function(start, end, trickId, cb) {
      return $http.get(Constant.URL.PRODUCTS_DEVICE + '?start_date=' + start + '&end_date=' + end + '&tid=' + trickId + '&type=sr')
        .success(function(data) {

          clientInfoService.data.dataSr = {
            tableData: [],
            ip: [],
            pv: [],
            uv: []
          };

          clientInfoService.data.dataSr.tableData = data;
          data.forEach(function(dt) {
            clientInfoService.data.dataSr.pv.push([dt.name, parseInt(dt.pv)]);
            clientInfoService.data.dataSr.uv.push([dt.name, parseInt(dt.uv)]);
            clientInfoService.data.dataSr.ip.push([dt.name, parseInt(dt.ip)]);
          });

          PieArrayService.getLarger(clientInfoService.data.dataSr.pv);
          PieArrayService.getLarger(clientInfoService.data.dataSr.uv);
          PieArrayService.getLarger(clientInfoService.data.dataSr.ip);

          if (cb && typeof(cb) === 'function') {
            cb();
          }
        });
    };

    return clientInfoService;
  }


})();
