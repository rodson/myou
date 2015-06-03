'use strict';

describe('ProductsService: ', function() {
  var $httpBackend;
  var ProductsService;
  var Constant;
  var StateManager;

  beforeEach(function() {
    module('myou.dashboard.products');

    inject(function(_$httpBackend_, _ProductsService_,
      _StateManager_, _Constant_) {

      $httpBackend = _$httpBackend_;
      ProductsService = _ProductsService_;
      Constant = _Constant_;
      StateManager = _StateManager_;

    });
  });

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('fn: getProduct: ', function() {

    it('should return all products when ownerId is not passed', function() {
      var allProducts = {
        result: 'all products'
      };

      $httpBackend.expectGET(Constant.URL.PRODUCTS).respond(allProducts);
      ProductsService.getProducts();
      $httpBackend.flush();
      expect(ProductsService.products).toEqual(allProducts);
    });

    it('should return products of specific group when ownerId is passed',
      function() {

      var groupProducts = {
        result: 'group product'
      };

      $httpBackend.expectGET(Constant.URL.PRODUCTS + '?ownerId=abc')
        .respond(groupProducts);
      ProductsService.getProducts('abc');
      $httpBackend.flush();
      expect(ProductsService.products).toEqual(groupProducts);

    });
  });

  describe('fn: enterProduct: ', function() {
    beforeEach(function() {
      spyOn(StateManager, 'enterProduct');
    });

    it('should call enterProduct on StateManager', function() {
      var product = {
        platform: 'android_app',
        _id: 'qwerty'
      };

      ProductsService.enterProduct(product);
      expect(StateManager.enterProduct)
        .toHaveBeenCalledWith('android_app', 'qwerty');
    });

  });

});
