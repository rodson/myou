'use strict';

describe('LoginService', function() {
  var postResponse = {
      'token': 'token',
      'user': 'user'
  };
  var LoginService;
  var LoginConstant;
  var $httpBackend;
  var mockStorageService;

  beforeEach(module('myou.login', function($provide) {
    mockStorageService = {};
    mockStorageService.set = jasmine.createSpy();
    $provide.value('localStorageService', mockStorageService);
  }));

  beforeEach(inject(function(_$httpBackend_, _LoginService_, _LoginConstant_) {
      $httpBackend = _$httpBackend_;
      LoginService = _LoginService_;
      LoginConstant = _LoginConstant_;
  }));

  beforeEach(function() {
    $httpBackend.whenPOST(LoginConstant.LOGIN_URL, {}).respond(postResponse);
  });

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should send the login data and return the response', function() {
    var returnedPromise = LoginService.login({});

    var result;
    returnedPromise.then(function(response) {
      result = response;
    });

    $httpBackend.flush();

    expect(result).toEqual(postResponse);
  });

  it('should save token and user by calling set on storageService', function() {
    LoginService.login({});
    $httpBackend.flush();
    expect(mockStorageService.set).toHaveBeenCalledWith('token', 'token');
    expect(mockStorageService.set).toHaveBeenCalledWith('user', 'user');
  });

});
