'use strict';

describe('AddProductService: ', function() {
  var AddProductService;
  var Constant;
  var StateManager;
  var $mdToast;
  var $httpBackend;
  var $state;

  beforeEach(function() {
    module('myou.dashboard.addproduct');

    inject(function(_AddProductService_, _$httpBackend_, _$state_,
      _$mdToast_, _Constant_, _StateManager_) {
      AddProductService = _AddProductService_;
      $httpBackend = _$httpBackend_;
      $state = _$state_;
      $mdToast = _$mdToast_;
      Constant = _Constant_;
      StateManager = _StateManager_;
    });
  });

  beforeEach(function() {
    spyOn($mdToast, 'show');
    spyOn(StateManager, 'enterProduct');
  });

  describe('fn: createProduct: ', function() {

  });

  describe('fn: enterProduct: ', function() {
  });

});
