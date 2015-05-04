'use strict';

describe('LoginService', function() {
  var LoginService;
  var LoginConstant;
  var $httpBackend;

  beforeEach(module('myou.login'));

  beforeEach(inject(function(_$httpBackend_, _LoginService_, _LoginConstant_) {
      $httpBackend = _$httpBackend_;
      LoginService = _LoginService_;
      LoginConstant = _LoginConstant_;
  }));

  it('should send the login data and return the response', function() {
    $httpBackend.expectPOST(LoginConstant.LOGIN_URL, {}).respond({});
    var returnedPromise = LoginService.login({});

    var result;
    returnedPromise.then(function(response) {
      result = response;
    });

    $httpBackend.flush();

  });

});
