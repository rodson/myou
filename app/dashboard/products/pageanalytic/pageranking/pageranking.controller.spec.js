'use strict';

describe('PageRankingCtrl: ', function() {
  var PageRankingCtrl;
  var PageRankingService;
  var MomentDateService;

  beforeEach(function() {
    module('myou.dashboard.pageanalytic');

    inject(function($controller, _PageRankingService_, _MomentDateService_) {
      PageRankingService = _PageRankingService_;
      MomentDateService = _MomentDateService_;
      PageRankingCtrl = $controller('PageRankingCtrl', {
        MomentDateService: MomentDateService,
        PageRankingService: PageRankingService
      });

    });
  });

  describe('variable: ', function() {

    // it('radioChecked should equal "today"', function() {
    //   expect(PageRankingCtrl.radioChecked).toEqual('today');
    // });

    // it('startdate & enddate should equal "MomentDateService.getToday()"', function() {
    //   var today = MomentDateService.getToday();
    //   expect(PageRankingCtrl.startdate).toEqual(today.start);
    //   expect(PageRankingCtrl.enddate).toEqual(today.end);
    // });
  });

  describe('fn: setData', function() {
    // var data = {};

    // it('PageRankingCtrl.setData should be called', function() {
    //   spyOn(PageRankingCtrl, 'setData').and.callThrough();
    //   PageRankingCtrl.setData(data);

    //   expect(PageRankingCtrl.setData).toHaveBeenCalledWith(data);
    //   expect(PageRankingCtrl.datas).toBe(data);
    // });
  });

  describe('fn: getData', function() {
    // it('when PageRankingCtrl.getData is called,' +
    //   'PageRankingService.getData and PageRankingCtrl.setData should be called', function() {
    //     spyOn(PageRankingCtrl, 'getData').and.callThrough();
    //     spyOn(PageRankingService, 'getData');

    //     PageRankingCtrl.getData();
    //     expect(PageRankingCtrl.getData).toHaveBeenCalled();
    //     expect(PageRankingService.getData).toHaveBeenCalled();
    //   });
  });

  describe('fn: getCheckDate', function() {
    // it('when radioChecked is changed,' +
    //   'PageRankingCtrl.getCheckDate should be called and ' +
    //   'startdate && enddate should be changed and ' +
    //   'PageRankingCtrl.getData should be called', function() {
    //     spyOn(PageRankingCtrl, 'getCheckDate').and.callThrough();
    //     spyOn(PageRankingCtrl, 'getData');

    //     PageRankingCtrl.radioChecked = 'today';
    //     var day = MomentDateService.getToday();
    //     PageRankingCtrl.getCheckDate();
    //     expect(PageRankingCtrl.startdate).toBe(day.start);
    //     expect(PageRankingCtrl.enddate).toBe(day.end);
    //     expect(PageRankingCtrl.getCheckDate).toHaveBeenCalled();
    //     expect(PageRankingCtrl.getData).toHaveBeenCalled();

    //     PageRankingCtrl.radioChecked = 'yesterday';
    //     var day = MomentDateService.getYesterday();
    //     PageRankingCtrl.getCheckDate();
    //     expect(PageRankingCtrl.startdate).toBe(day.start);
    //     expect(PageRankingCtrl.enddate).toBe(day.end);
    //     expect(PageRankingCtrl.getCheckDate).toHaveBeenCalled();
    //     expect(PageRankingCtrl.getData).toHaveBeenCalled();
    //   });
  });

});
