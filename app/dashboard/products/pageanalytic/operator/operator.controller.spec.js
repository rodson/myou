'use strict';

describe('OperatorCtrl: ', function() {
  var OperatorService;
  var MomentDateService;
  var OperatorCtrl;

  beforeEach(function() {
    module('myou.dashboard.pageanalytic');

    inject(function($controller, _OperatorService_, _MomentDateService_) {
      OperatorService = _OperatorService_;
      MomentDateService = _MomentDateService_;
      OperatorCtrl = $controller('OperatorCtrl', {
        MomentDateService: MomentDateService,
        OperatorService: OperatorService
      });

    });
  });

  describe('variable: ', function() {
    // it('radioPvUvIp should equal "pv"', function() {
    //   expect(OperatorCtrl.radioPvUvIp).toBe('pv');
    // });

    // it('radioDate should equal "today"', function() {
    //   expect(OperatorCtrl.radioDate).toBe('today');
    // });

    // it('startdate & enddate should equal "MomentDateService.getToday()"', function() {
    //   var today = MomentDateService.getToday();
    //   expect(OperatorCtrl.startdate).toEqual(today.start);
    //   expect(OperatorCtrl.enddate).toEqual(today.end);
    // });
  });

  describe('fn: setData', function() {
    // var testData = [{
    //   'ip': '9',
    //   'isp': '电信',
    //   'pv': '156',
    //   'uv': '26'
    // }, {
    //   'ip': '2',
    //   'isp': '联通',
    //   'pv': '8',
    //   'uv': '2'
    // }, {
    //   'ip': '1',
    //   'isp': '铁通',
    //   'pv': '31',
    //   'uv': '1'
    // }];

    // var data = {};
    // data.tableData = testData;
    // data.pv = [];
    // data.uv = [];
    // data.ip = [];

    // testData.forEach(function(dt) {
    //   data.pv.push([dt.isp, parseInt(dt.pv)]);
    //   data.uv.push([dt.isp, parseInt(dt.ip)]);
    //   data.ip.push([dt.isp, parseInt(dt.uv)]);
    // });

    // it('OperatorCtrl.setData should be called', function() {
    //   spyOn(OperatorCtrl, 'setData').and.callThrough();
    //   spyOn(OperatorCtrl, 'setPieData');
    //   OperatorCtrl.setData();

    //   expect(OperatorCtrl.setData).toHaveBeenCalled();
    //   expect(OperatorCtrl.setPieData).toHaveBeenCalled();
    //   expect(OperatorCtrl.datas).toBe(OperatorService.data.tableData);
    // });
  });

  describe('fn: getData', function() {
    // it('when OperatorCtrl.getData is called,' +
    //   'OperatorService.getData should be called', function() {
    //     spyOn(OperatorCtrl, 'getData').and.callThrough();
    //     spyOn(OperatorService, 'getData');

    //     OperatorCtrl.getData();
    //     expect(OperatorCtrl.getData).toHaveBeenCalled();
    //     expect(OperatorService.getData).toHaveBeenCalled();
    //   });
  });

  describe('fn: getCheckDate', function() {
    // it('when radioDate is changed,' +
    //   'OperatorCtrl.getCheckDate should be called and ' +
    //   'startdate && enddate should be changed and ' +
    //   'OperatorCtrl.getData should be called', function() {
    //     spyOn(OperatorCtrl, 'getCheckDate').and.callThrough();
    //     spyOn(OperatorCtrl, 'getData');

    //     OperatorCtrl.radioDate = 'today';
    //     var day = MomentDateService.getToday();
    //     OperatorCtrl.getCheckDate();
    //     expect(OperatorCtrl.startdate).toBe(day.start);
    //     expect(OperatorCtrl.enddate).toBe(day.end);
    //     expect(OperatorCtrl.getCheckDate).toHaveBeenCalled();
    //     expect(OperatorCtrl.getData).toHaveBeenCalled();

    //     OperatorCtrl.radioDate = 'yesterday';
    //     var day = MomentDateService.getYesterday();
    //     OperatorCtrl.getCheckDate();
    //     expect(OperatorCtrl.startdate).toBe(day.start);
    //     expect(OperatorCtrl.enddate).toBe(day.end);
    //     expect(OperatorCtrl.getCheckDate).toHaveBeenCalled();
    //     expect(OperatorCtrl.getData).toHaveBeenCalled();
    //   });
  });

  describe('fn: getCheckPieType', function() {
    // it('when radioOperator is changed,' +
    //   'OperatorCtrl.getCheckPieType should be called and ' +
    //   'OperatorCtrl.setPieData should be called', function() {
    //     spyOn(OperatorCtrl, 'getCheckPieType').and.callThrough();
    //     spyOn(OperatorCtrl, 'setPieData');

    //     OperatorCtrl.radioOperator = 'pv';
    //     OperatorCtrl.getCheckPieType();
    //     expect(OperatorCtrl.getCheckPieType).toHaveBeenCalled();
    //     expect(OperatorCtrl.setPieData).toHaveBeenCalled();

    //     OperatorCtrl.radioDate = 'ip';
    //     OperatorCtrl.getCheckPieType();
    //     expect(OperatorCtrl.getCheckPieType).toHaveBeenCalled();
    //     expect(OperatorCtrl.setPieData).toHaveBeenCalled();
    //   });
  });

});
