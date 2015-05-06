'use strict';

describe('LoginCtrl: ', function() {

  describe('login', function() {
    var LoginService;
    var loginCtrl;

    beforeEach(function() {
      module('myou.login');
    });

    beforeEach(function() {
      inject(function($controller, _LoginService_, $q) {
        var deferred = $q.defer();
        LoginService = _LoginService_;
        spyOn(LoginService, 'login').and.returnValue(deferred.promise);
        loginCtrl = $controller('LoginCtrl',
            {LoginService: LoginService});
      });

    });

    it('should return if valid is false', function() {
      loginCtrl.login(false);
      expect(LoginService.login).not.toHaveBeenCalled();
    });

    it('should call login if valid', function() {
      loginCtrl.login(true);
      expect(LoginService.login).toHaveBeenCalled();
    });
  });

});
