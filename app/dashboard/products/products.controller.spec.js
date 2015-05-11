'use strict';

describe('ProductsCtrl: ', function() {
  var $state;
  var ProductsService;
  var ProductsCtrl;

  beforeEach(function() {
    module('myou.dashboard.products');

    inject(function(_$state_, $controller, _ProductsService_) {
      $state = _$state_;
      ProductsService = _ProductsService_;
      ProductsCtrl = $controller('ProductsCtrl', {
        $state: $state,
        ProductsService: ProductsService
      });

      spyOn($state, 'go');
      spyOn(ProductsService, 'enterProduct');
    });
  });

  describe('fn: gotoAddProduct: ', function() {
    it('should call $state go when it is invoked', function() {
      ProductsCtrl.gotoAddProduct();
      expect($state.go).toHaveBeenCalledWith('dashboard.addproduct');
    });
  });

  describe('fn: enterProduct: ', function() {
    var product = {
      id: 'fff'
    };

    it('should call enterProduct on ProductsService', function() {
      ProductsCtrl.enterProduct(product);
      expect(ProductsService.enterProduct).toHaveBeenCalledWith(product);
    });
  });
});
