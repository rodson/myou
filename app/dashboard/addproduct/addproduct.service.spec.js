'use strict';

describe('AddProductService: ', function() {
  var AddProductService;
  var Constant;
  var $mdToast;
  var $httpBackend;
  var $state;

  beforeEach(function() {
    module('myou.dashboard.addproduct');

    inject(function(_AddProductService_, _$httpBackend_, _$state_,
      _$mdToast_, _Constant_) {
      AddProductService = _AddProductService_;
      $httpBackend = _$httpBackend_;
      $state = _$state_;
      $mdToast = _$mdToast_;
      Constant = _Constant_;
    });
  });

  beforeEach(function() {
    spyOn($mdToast, 'show');
  });

  describe('fn: createProduct: ', function() {
    var postData = {
      name: 'app'
    };

    it('should send request and show the error msg on toast', function() {
      $httpBackend.whenPOST(Constant.URL.PRODUCTS, postData).respond(401, '');
      AddProductService.createProduct(postData);
      $httpBackend.flush();
      expect($mdToast.show).toHaveBeenCalled();
    });

    it('should response appKey when create product successfully', function() {
      var responseData = {
        appKey: '123456',
        name: 'app',
        _id: 'fasdf',
        platform: 'android_app'
      };
      $httpBackend.whenPOST(Constant.URL.PRODUCTS, postData)
        .respond(responseData);
      AddProductService.createProduct(postData);
      $httpBackend.flush();
      expect($mdToast.show).not.toHaveBeenCalled();
      expect(AddProductService.createdProduct).toEqual(responseData);
    });
  });

  describe('fn: enterProduct: ', function() {

  });

});
