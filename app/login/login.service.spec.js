'use strict';

describe('LoginService', function() {
  var postResponse = {
      'token': 'token',
      'user': 'user'
  };
  var LoginService;
  var Constant;
  var $httpBackend;
  var $state;
  var mockStorageService;

  beforeEach(module('myou.login', function($provide) {
    mockStorageService = {};
    mockStorageService.set = jasmine.createSpy();
    $provide.value('localStorageService', mockStorageService);
  }));

  beforeEach(inject(function(_$httpBackend_, _$state_,
      _LoginService_, _Constant_) {
    $httpBackend = _$httpBackend_;
    $state = _$state_;
    LoginService = _LoginService_;
    Constant = _Constant_;

    spyOn($state, 'go');
  }));

  beforeEach(function() {
    $httpBackend.whenPOST(Constant.URL.LOGIN_URL, {}).respond(postResponse);
  });

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should save token and user by calling set on storageService', function() {
    LoginService.login({});
    $httpBackend.flush();
    expect(mockStorageService.set).toHaveBeenCalledWith('token', 'token');
    expect(mockStorageService.set).toHaveBeenCalledWith('user', 'user');
  });

  it('should go to dashboard state when login successfully', function() {
    LoginService.login({});
    $httpBackend.flush();
    expect($state.go).toHaveBeenCalled();
  });

});
