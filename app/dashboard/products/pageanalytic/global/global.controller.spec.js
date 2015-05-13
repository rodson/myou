'use strict';

describe('GlobalCtrl: ', function() {
  var GlobalService;
  var GlobalCtrl;
  var globalData = {
    ip: 12,
    pv: 88,
    uv: 15
  };

  beforeEach(function() {
    module('myou.dashboard.pageanalytic');

    inject(function($controller, _GlobalService_) {
      GlobalService = _GlobalService_;
      GlobalService.globalData = globalData;
      GlobalCtrl = $controller('GlobalCtrl', {GlobalService: GlobalService});

      spyOn(GlobalService, 'getData');
      GlobalService.getData();
    });
  });

  describe('GlobalCtrl ip, pv, uv: ', function(){
    it('ip === 12', function(){
      expect(GlobalCtrl.ip).toEqual(12);
    });
    it('ip === 88', function(){
      expect(GlobalCtrl.pv).toEqual(88);
    });
    it('ip === 15', function(){
      expect(GlobalCtrl.uv).toEqual(15);
    });
  });

  describe('fn: resolve: ', function(){
    it('GlobalService.getData shoule be called', function(){
      expect(GlobalService.getData).toHaveBeenCalled();
    });
  });

});
