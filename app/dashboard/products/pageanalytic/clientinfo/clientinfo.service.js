(function() {
  'use strict';

  angular.module('myou.dashboard.pageanalytic')
    .factory('ClientInfoService', ClientInfoService);

  function ClientInfoService($http, $q, Constant) {
    var clientInfoService = {};

    clientInfoService.data = {};

    var testDataOS = [{
      'ip': '2',
      'name': 'Android',
      'pv': '8',
      'uv': '2'
    }, {
      'ip': '2',
      'name': 'iOS',
      'pv': '18',
      'uv': '3'
    }, {
      'ip': '1',
      'name': 'Linux',
      'pv': '3',
      'uv': '1'
    }, {
      'ip': '2',
      'name': 'OS X',
      'pv': '21',
      'uv': '2'
    }, {
      'ip': '32',
      'name': 'Windows',
      'pv': '429',
      'uv': '69'
    }];

    var testDataBroswer = [{
      'ip': '2',
      'name': 'Android browser',
      'pv': '8',
      'uv': '2'
    }, {
      'ip': '25',
      'name': 'Chrome',
      'pv': '309',
      'uv': '29'
    }, {
      'ip': '1',
      'name': 'Firefox',
      'pv': '14',
      'uv': '1'
    }, {
      'ip': '6',
      'name': 'IE',
      'pv': '68',
      'uv': '40'
    }, {
      'ip': '1',
      'name': 'Maxthon',
      'pv': '2',
      'uv': '1'
    }, {
      'ip': '2',
      'name': 'Mobile Safari',
      'pv': '18',
      'uv': '3'
    }, {
      'ip': '3',
      'name': 'Sogou Explorer',
      'pv': '60',
      'uv': '2'
    }];

    var testDataScreen = [{
      'ip': '1',
      'name': '1080x1920',
      'pv': '3',
      'uv': '1'
    }, {
      'ip': '1',
      'name': '1152x864',
      'pv': '22',
      'uv': '1'
    }, {
      'ip': '1',
      'name': '1196x720',
      'pv': '5',
      'uv': '1'
    }, {
      'ip': '2',
      'name': '1280x1024',
      'pv': '10',
      'uv': '1'
    }, {
      'ip': '1',
      'name': '1280x768',
      'pv': '5',
      'uv': '1'
    }, {
      'ip': '1',
      'name': '1280x800',
      'pv': '19',
      'uv': '1'
    }, {
      'ip': '11',
      'name': '1366x768',
      'pv': '128',
      'uv': '30'
    }, {
      'ip': '12',
      'name': '1440x900',
      'pv': '186',
      'uv': '11'
    }, {
      'ip': '3',
      'name': '1600x900',
      'pv': '21',
      'uv': '3'
    }, {
      'ip': '1',
      'name': '1680x1050',
      'pv': '16',
      'uv': '1'
    }, {
      'ip': '1',
      'name': '1725x970',
      'pv': '3',
      'uv': '3'
    }, {
      'ip': '5',
      'name': '1920x1080',
      'pv': '40',
      'uv': '20'
    }, {
      'ip': '1',
      'name': '320x568',
      'pv': '8',
      'uv': '1'
    }, {
      'ip': '1',
      'name': '375x667',
      'pv': '10',
      'uv': '2'
    }, {
      'ip': '1',
      'name': '720x1280',
      'pv': '3',
      'uv': '1'
    },{
      'ip': '1',
      'name': '1280x800',
      'pv': '19',
      'uv': '1'
    }, {
      'ip': '11',
      'name': '1366x768',
      'pv': '128',
      'uv': '30'
    }, {
      'ip': '12',
      'name': '1440x900',
      'pv': '186',
      'uv': '11'
    }, {
      'ip': '3',
      'name': '1600x900',
      'pv': '21',
      'uv': '3'
    }, {
      'ip': '1',
      'name': '1680x1050',
      'pv': '16',
      'uv': '1'
    }, {
      'ip': '1',
      'name': '1725x970',
      'pv': '3',
      'uv': '3'
    }, {
      'ip': '5',
      'name': '1920x1080',
      'pv': '40',
      'uv': '20'
    }, {
      'ip': '1',
      'name': '320x568',
      'pv': '8',
      'uv': '1'
    }, {
      'ip': '1',
      'name': '375x667',
      'pv': '10',
      'uv': '2'
    }, {
      'ip': '1',
      'name': '720x1280',
      'pv': '3',
      'uv': '1'
    }];

    clientInfoService.data.dataOs = {
      ip: [],
      pv: [],
      uv: []
    };
    clientInfoService.data.dataBr = {
      ip: [],
      pv: [],
      uv: []
    };
    clientInfoService.data.dataSr = {
      ip: [],
      pv: [],
      uv: []
    };

    testDataOS.forEach(function(dt) {
      clientInfoService.data.dataOs.pv.push([dt.name, parseInt(dt.pv)]);
      clientInfoService.data.dataOs.uv.push([dt.name, parseInt(dt.ip)]);
      clientInfoService.data.dataOs.ip.push([dt.name, parseInt(dt.uv)]);
    });

    testDataBroswer.forEach(function(dt) {
      clientInfoService.data.dataBr.pv.push([dt.name, parseInt(dt.pv)]);
      clientInfoService.data.dataBr.uv.push([dt.name, parseInt(dt.ip)]);
      clientInfoService.data.dataBr.ip.push([dt.name, parseInt(dt.uv)]);
    });

    testDataScreen.forEach(function(dt) {
      clientInfoService.data.dataSr.pv.push([dt.name, parseInt(dt.pv)]);
      clientInfoService.data.dataSr.uv.push([dt.name, parseInt(dt.ip)]);
      clientInfoService.data.dataSr.ip.push([dt.name, parseInt(dt.uv)]);
    });

    clientInfoService.getData = function(start, end, trickId, cb) {
      return $http.get(Constant.URL.PRODUCTS_DEVICE + '?start_date=' + start + '&end_date=' + end + '&tid=' + trickId)
        .success(function(data) {

          data.forEach(function(dt) {
            clientInfoService.data.pv.push([dt.isp, parseInt(dt.pv)]);
            clientInfoService.data.uv.push([dt.isp, parseInt(dt.ip)]);
            clientInfoService.data.ip.push([dt.isp, parseInt(dt.uv)]);
          });

          if (cb && typeof(cb) === 'function') {
            cb();
          }
        });
    };

    return clientInfoService;
  }


})();
