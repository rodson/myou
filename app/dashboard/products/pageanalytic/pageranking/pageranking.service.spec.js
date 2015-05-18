'use strict';

describe('PageRankingService: ', function() {
  var $httpBackend;
  var Constant;
  var PageRankingService;

  beforeEach(function() {
    module('myou.dashboard.pageanalytic');

    inject(function(_$httpBackend_, _PageRankingService_, _Constant_) {
      PageRankingService = _PageRankingService_;
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
      var today = {
        start: '2015-05-15',
        end: '2015-05-15'
      };

      var data = {
        data: 1
      };

      $httpBackend.expectGET(Constant.URL.PRODUCTS_PAGERANKING + '?start_date=' + today.start + '&end_date=' + today.end + '&tid=' + 10000014)
        .respond(data);
      PageRankingService.getData(today.start, today.end, 10000014);
      $httpBackend.flush();
      expect(PageRankingService.data).toEqual(data);

    });
  });

});
