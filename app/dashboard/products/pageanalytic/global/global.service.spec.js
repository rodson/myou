'use strict';

describe('GlobalService: ', function() {
  var $httpBackend;
  var Constant;
  var GlobalService;

  beforeEach(function() {
    module('myou.dashboard.pageanalytic');

    inject(function(_$httpBackend_, _GlobalService_, _Constant_) {
      GlobalService = _GlobalService_;
      $httpBackend = _$httpBackend_;
      Constant = _Constant_;
    });
  });

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('fn: getData: ', function() {

    it('should return globalData', function() {
      var globalData = {
        ip: 5,
        pv: 8,
        uv: 2
      };

      $httpBackend.expectGET(Constant.URL.PRODUCTS_OVERVIEW + '?tid=10000000')
        .respond(globalData);
      GlobalService.getData('10000000');
      $httpBackend.flush();
      expect(GlobalService.globalData).toEqual(globalData);

    });
  });

});
