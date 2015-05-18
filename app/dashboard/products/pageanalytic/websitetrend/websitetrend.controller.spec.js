'use strict';

describe('WebsiteTrendCtrl: ', function() {
  var WebsiteTrendService;
  var MomentDateService;
  var WebsiteTrendCtrl;

  beforeEach(function() {
    module('myou.dashboard.pageanalytic');

    inject(function($controller, _WebsiteTrendService_, _MomentDateService_) {
      WebsiteTrendService = _WebsiteTrendService_;
      MomentDateService = _MomentDateService_;
      WebsiteTrendCtrl = $controller('WebsiteTrendCtrl', {
        MomentDateService: MomentDateService,
        WebsiteTrendService: WebsiteTrendService
      });

    });
  });

  describe('variable: ', function() {
    it('step should equal 8', function() {
      expect(WebsiteTrendCtrl.step).toBe(8);
    });

    it('radioChecked should equal "today"', function() {
      expect(WebsiteTrendCtrl.radioChecked).toEqual('today');
    });

    it('startdate & enddate should equal "MomentDateService.getToday()"', function() {
      var today = MomentDateService.getToday();
      expect(WebsiteTrendCtrl.startdate).toEqual(today.start);
      expect(WebsiteTrendCtrl.enddate).toEqual(today.end);
    });
  });

  describe('fn: setData', function() {
    var data1 = {
      data: [{
        name: 'PV',
        data: [1, 2, 3, 4]
      }]
    };
    var data2 = {
      cx: [1, 2, 3, 4]
    };
    var data3 = {
      cx: [1, 2, 3, 4],
      data: [{
        name: 'PV',
        data: [1, 2, 3, 4]
      }, {
        name: 'IP',
        data: [2, 3, 4, 5]
      }, {
        name: 'UV',
        data: [3, 4, 5, 6]
      }]
    };

    it('WebsiteTrendCtrl.setData should be called', function() {
      spyOn(WebsiteTrendCtrl, 'setData').and.callThrough();
      var return1 = WebsiteTrendCtrl.setData(null);
      var return2 = WebsiteTrendCtrl.setData(data1);
      var return3 = WebsiteTrendCtrl.setData(data2);
      WebsiteTrendCtrl.setData(data3);

      expect(WebsiteTrendCtrl.setData).toHaveBeenCalledWith(null);
      expect(return1).toBe(false);
      expect(WebsiteTrendCtrl.setData).toHaveBeenCalledWith(data1);
      expect(return2).toBe(false);
      expect(WebsiteTrendCtrl.setData).toHaveBeenCalledWith(data2);
      expect(return3).toBe(false);
      expect(WebsiteTrendCtrl.setData).toHaveBeenCalledWith(data3);
      expect(WebsiteTrendCtrl.highchartsNG.series).toBe(data3.data);
      expect(WebsiteTrendCtrl.highchartsNG.xAxis.categories).toBe(data3.cx);
      expect(WebsiteTrendCtrl.highchartsNG.xAxis.labels.step).toBe(Math.ceil(data3.cx.length / WebsiteTrendCtrl.step));
    });
  });

  describe('fn: getData', function() {
    it('when WebsiteTrendCtrl.getData is called,' +
      'WebsiteTrendService.getData and WebsiteTrendCtrl.setData should be called', function() {
        spyOn(WebsiteTrendCtrl, 'getData').and.callThrough();
        spyOn(WebsiteTrendService, 'getData');

        WebsiteTrendCtrl.getData();
        expect(WebsiteTrendCtrl.getData).toHaveBeenCalled();
        expect(WebsiteTrendService.getData).toHaveBeenCalled();
      });
  });

  describe('fn: getCheckDate', function() {
    it('when radioChecked is changed,' +
      'WebsiteTrendCtrl.getCheckDate should be called and ' +
      'startdate && enddate should be changed and ' +
      'WebsiteTrendCtrl.getData should be called', function() {
        spyOn(WebsiteTrendCtrl, 'getCheckDate').and.callThrough();
        spyOn(WebsiteTrendCtrl, 'getData');

        WebsiteTrendCtrl.radioChecked = 'today';
        var day = MomentDateService.getToday();
        WebsiteTrendCtrl.getCheckDate();
        expect(WebsiteTrendCtrl.startdate).toBe(day.start);
        expect(WebsiteTrendCtrl.enddate).toBe(day.end);
        expect(WebsiteTrendCtrl.getCheckDate).toHaveBeenCalled();
        expect(WebsiteTrendCtrl.getData).toHaveBeenCalled();

        WebsiteTrendCtrl.radioChecked = 'yesterday';
        var day = MomentDateService.getYesterday();
        WebsiteTrendCtrl.getCheckDate();
        expect(WebsiteTrendCtrl.startdate).toBe(day.start);
        expect(WebsiteTrendCtrl.enddate).toBe(day.end);
        expect(WebsiteTrendCtrl.getCheckDate).toHaveBeenCalled();
        expect(WebsiteTrendCtrl.getData).toHaveBeenCalled();
      });
  });

});
