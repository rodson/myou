'use strict';

describe('WebsiteTrendService: ', function() {
  var $httpBackend;
  var Constant;
  var WebsiteTrendService;
  var dataRespond = [{
    'date': '2015-05-15',
    'ip': '2',
    'pv': '8',
    'uv': '1'
  }];

  var data = {
    cx: ['2015-05-15'],
    data: [{
      name: 'PV',
      data: [8]
    }, {
      name: 'IP',
      data: [2]
    }, {
      name: 'UV',
      data: [1]
    }]
  };

  var today = {
    start: '2015-05-15',
    end: '2015-05-15'
  };

  beforeEach(function() {
    module('myou.dashboard.pageanalytic');

    inject(function(_$httpBackend_, _WebsiteTrendService_, _Constant_) {
      WebsiteTrendService = _WebsiteTrendService_;
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

      $httpBackend.expectGET(Constant.URL.PRODUCTS_SUMMARY + '?start_date=' + today.start + '&end_date=' + today.end + '&tid=' + 10000014)
        .respond(dataRespond);
      WebsiteTrendService.getData(10000014, today.start, today.end);
      $httpBackend.flush();
      expect(WebsiteTrendService.data).toEqual(data);

    });
  });

});
