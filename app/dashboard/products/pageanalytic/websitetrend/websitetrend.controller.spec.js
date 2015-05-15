'use strict';

describe('WebsiteTrendCtrl: ', function() {
  var WebsiteTrendService;
  var MomentDateService;
  var WebsiteTrendCtrl;
  var data = {
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
  var today = {
    start: '2015-05-15',
    end: '2015-05-15'
  };

  beforeEach(function() {
    module('myou.dashboard.pageanalytic');

    inject(function($controller, _WebsiteTrendService_, _MomentDateService_) {
      WebsiteTrendService = _WebsiteTrendService_;
      WebsiteTrendService.data = data;
      MomentDateService = _MomentDateService_;
      WebsiteTrendCtrl = $controller('WebsiteTrendCtrl', {
        MomentDateService: MomentDateService,
        WebsiteTrendService: WebsiteTrendService
      });

      spyOn(WebsiteTrendCtrl, 'setData');
      spyOn(WebsiteTrendService, 'getData');
      WebsiteTrendService.getData(10000014, today.start, today.end);
      WebsiteTrendCtrl.setData(WebsiteTrendService.data);
    });
  });

  describe('variable test: ', function() {
    it('WebsiteTrendCtrl.radioChecked should equal "today"', function() {
      expect(WebsiteTrendCtrl.radioChecked).toEqual('today');
    });
  });

  describe('fn: resolve', function(MomentDateService) {

    it('WebsiteTrendService.getData should be called with (10000014, ' + today.start + ', ' + today.end + ')', function() {
      expect(WebsiteTrendService.getData).toHaveBeenCalledWith(10000014, today.start, today.end);
    });

    it('WebsiteTrendCtrl.setData should be called', function(){
      expect(WebsiteTrendCtrl.setData).toHaveBeenCalledWith(data);
    });
  });

});
