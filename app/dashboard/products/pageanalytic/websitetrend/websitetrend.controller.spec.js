'use strict';

describe('WebsiteTrentCtrl: ', function() {
  var WebsiteTrendService;
  var WebsiteTrentCtrl;
  var data = {

  };

  beforeEach(function() {
    module('myou.dashboard.pageanalytic');

    inject(function($controller, _WebsiteTrendService_) {
      WebsiteTrendService = _WebsiteTrendService_;
      // GlobalService.data = data;
      // GlobalCtrl = $controller('GlobalCtrl', {GlobalService: GlobalService});

      // spyOn(GlobalService, 'getData');
      // GlobalService.getData();
    });
  });

  // describe('fn: resolve: ', function(){
  //   it('GlobalService.getData shoule be called', function(){
  //     expect(GlobalService.getData).toHaveBeenCalled();
  //   });
  // });

});
