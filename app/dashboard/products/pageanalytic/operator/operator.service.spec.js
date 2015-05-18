'use strict';

describe('OperatorService: ', function() {
  var $httpBackend;
  var Constant;
  var OperatorService;

  var dataRespond = [{
    'ip': '9',
    'isp': '电信',
    'pv': '156',
    'uv': '26'
  }, {
    'ip': '2',
    'isp': '联通',
    'pv': '8',
    'uv': '2'
  }, {
    'ip': '1',
    'isp': '铁通',
    'pv': '31',
    'uv': '1'
  }];

  var data = {};
  data.tableData = dataRespond;
  data.pv = [];
  data.uv = [];
  data.ip = [];

  dataRespond.forEach(function(dt) {
    data.pv.push([dt.isp, parseInt(dt.pv)]);
    data.uv.push([dt.isp, parseInt(dt.ip)]);
    data.ip.push([dt.isp, parseInt(dt.uv)]);
  });

  var today = {
    start: '2015-05-15',
    end: '2015-05-15'
  };

  beforeEach(function() {
    module('myou.dashboard.pageanalytic');

    inject(function(_$httpBackend_, _OperatorService_, _Constant_) {
      OperatorService = _OperatorService_;
      $httpBackend = _$httpBackend_;
      Constant = _Constant_;
    });
  });

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('fn: getData: ', function() {

    it('should return data', function() {

      $httpBackend.expectGET(Constant.URL.PRODUCTS_ISP + '?start_date=' + today.start + '&end_date=' + today.end + '&tid=' + 10000014)
        .respond(dataRespond);
      OperatorService.getData(today.start, today.end, 10000014);
      $httpBackend.flush();
      expect(OperatorService.data).toEqual(data);

    });
  });

});
