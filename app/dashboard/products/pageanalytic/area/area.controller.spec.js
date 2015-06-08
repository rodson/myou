'use strict';

describe('AreaCtrl', function() {
  var AreaService;
  var MomentDateService;
  var AreaCtrl;

  beforeEach(function() {
    module('myou.dashboard.pageanalytic');

    inject(function($controller, _AreaService_, _MomentDateService_) {
      AreaService = _AreaService_;
      MomentDateService = _MomentDateService_;
      AreaCtrl = $controller('AreaCtrl', {
        MomentDateService: MomentDateService,
        AreaService: AreaService
      });

    });
  });

  describe('variable: ', function() {

    // it('radioDate should equal "today"', function() {
    //   expect(AreaCtrl.radioDate).toBe('today');
    // });

    // it('radioPvUvIp should equal "today"', function() {
    //   expect(AreaCtrl.radioPvUvIp).toBe('pv');
    // });

    // it('startdate & enddate should equal "MomentDateService.getToday()"', function() {
    //   var today = MomentDateService.getToday();
    //   expect(AreaCtrl.startdate).toBe(today.start);
    //   expect(AreaCtrl.enddate).toBe(today.end);
    // });
  });

  describe('fn: getCheckDate', function() {
    // it('when radioDate is changed,' +
    //   'AreaCtrl.getCheckDate should be called and ' +
    //   'startdate && enddate should be changed and ' +
    //   'AreaCtrl.getData should be called', function() {
    //     spyOn(AreaCtrl, 'getCheckDate').and.callThrough();
    //     spyOn(AreaCtrl, 'getData');

    //     AreaCtrl.radioDate = 'today';
    //     var day = MomentDateService.getToday();
    //     AreaCtrl.getCheckDate();
    //     expect(AreaCtrl.startdate).toBe(day.start);
    //     expect(AreaCtrl.enddate).toBe(day.end);
    //     expect(AreaCtrl.getCheckDate).toHaveBeenCalled();
    //     expect(AreaCtrl.getData).toHaveBeenCalled();

    //     AreaCtrl.radioDate = 'yesterday';
    //     var day = MomentDateService.getYesterday();
    //     AreaCtrl.getCheckDate();
    //     expect(AreaCtrl.startdate).toBe(day.start);
    //     expect(AreaCtrl.enddate).toBe(day.end);
    //     expect(AreaCtrl.getCheckDate).toHaveBeenCalled();
    //     expect(AreaCtrl.getData).toHaveBeenCalled();
    //   });
  });

  describe('fn: getCheckPieType', function() {
    // it('when radioPvUvIp is changed,' +
    //   'AreaCtrl.getCheckPieType should be called and ' +
    //   'AreaCtrl.setPieData should be called', function() {
    //     spyOn(AreaCtrl, 'getCheckPieType').and.callThrough();
    //     spyOn(AreaCtrl, 'setPieData');

    //     AreaCtrl.radioDate = 'pv';
    //     AreaCtrl.getCheckPieType();
    //     expect(AreaCtrl.getCheckPieType).toHaveBeenCalled();
    //     expect(AreaCtrl.setPieData).toHaveBeenCalled();

    //     AreaCtrl.radioDate = 'uv';
    //     AreaCtrl.getCheckPieType();
    //     expect(AreaCtrl.getCheckPieType).toHaveBeenCalled();
    //     expect(AreaCtrl.setPieData).toHaveBeenCalled();
    //   });
  });

  describe('fn: getData', function() {
    // it('when AreaCtrl.getData is called,' +
    //   'AreaService.getData should be called', function() {
    //     spyOn(AreaCtrl, 'getData').and.callThrough();
    //     spyOn(AreaService, 'getData');

    //     AreaCtrl.getData();
    //     expect(AreaCtrl.getData).toHaveBeenCalled();
    //     expect(AreaService.getData).toHaveBeenCalled();
    //   });
  });

  describe('fn: setData', function() {
    // it('when AreaCtrl.setData is called,' +
    //   'AreaCtrl.setPieData should be called and ' +
    //   'AreaCtrl.highchartsPie.series[0] should be set', function() {

    //     spyOn(AreaCtrl, 'setData').and.callThrough();
    //     spyOn(AreaCtrl, 'setPieData').and.callThrough();

    //     AreaCtrl.setData();

    //     expect(AreaCtrl.datas).toBe(AreaService.data.tableData);
    //     expect(AreaCtrl.setData).toHaveBeenCalled();
    //     expect(AreaCtrl.setPieData).toHaveBeenCalled();
    //     expect(AreaCtrl.highchartsPie.series[0].type).toBe('pie');
    //     expect(AreaCtrl.highchartsPie.series[0].innerSize).toBe('50%');
    //     expect(AreaCtrl.highchartsPie.series[0].name).toBe(AreaCtrl.radioPvUvIp.toUpperCase());
    //     expect(AreaCtrl.highchartsPie.series[0].data).toBe(AreaService.data[AreaCtrl.radioPvUvIp]);
    //   });
  });

});
