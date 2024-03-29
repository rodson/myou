'use strict';

describe('LoginService', function() {
  var LoginService;
  var Constant;
  var $httpBackend;
  var $state;
  var $mdToast;
  var mockStorageService;
  var authRequestHandler;

  beforeEach(module('myou.login', function($provide) {
    mockStorageService = {};
    mockStorageService.set = jasmine.createSpy();
    $provide.value('localStorageService', mockStorageService);
  }));

  beforeEach(inject(function(_$httpBackend_, _$state_, _$mdToast_,
      _LoginService_, _Constant_) {
    $httpBackend = _$httpBackend_;
    $state = _$state_;
    $mdToast = _$mdToast_;
    LoginService = _LoginService_;
    Constant = _Constant_;

    spyOn($state, 'go');
    spyOn($mdToast, 'show');
  }));

  beforeEach(function() {
    var postResponse = {
      'token': 'token',
      'user': 'user'
    };
    authRequestHandler =
      $httpBackend.whenPOST(Constant.URL.LOGIN_URL, {name: 'rodson'})
        .respond(postResponse);
  });


  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should show error toast when login failed', function() {
    authRequestHandler.respond(401, '');
    $httpBackend.expectPOST(Constant.URL.LOGIN_URL, {name: 'rodson'});
    LoginService.login({name: 'rodson'});
    $httpBackend.flush();
    expect($mdToast.show).toHaveBeenCalled();
  });

});
