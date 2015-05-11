'use strict';

describe('AddProductCtrl: ', function() {
  var AddProductCtrl;
  var AddProductService;

  beforeEach(function() {
    module('myou.dashboard.addproduct');

    inject(function($controller, $q, _AddProductService_) {
      AddProductService = _AddProductService_;
      AddProductCtrl = $controller('AddProductCtrl', {});

      var deferred = $q.defer();
      spyOn(AddProductService, 'createProduct')
        .and.returnValue(deferred.promise);
    });
  });

  it('should initialize platform to appdevelop', function() {
    expect(AddProductCtrl.platform).toEqual('appdevelop');
  });

  it('should initialize app platform to android_app', function() {
    expect(AddProductCtrl.appPlatform).toEqual('android_app');
  });

  describe('fn: createProduct: ', function() {

    it('should call createProduct on AddProductService if form is valid',
      function() {
      var isValid = true;
      AddProductCtrl.product = {
        name: 'launcher',
        description: 'a launcher',
        platform: 'android_app'
      };
      AddProductCtrl.createProduct(isValid);
      expect(AddProductService.createProduct)
        .toHaveBeenCalledWith(AddProductCtrl.product);
    });

    it('should not call createProduct on AddProductService if form is not valid',
      function() {
      var isValid = false;
      AddProductCtrl.createProduct(isValid);
      expect(AddProductService.createProduct).not.toHaveBeenCalled();
    });
  });
});
