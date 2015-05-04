'use strict';

describe('LoginController', function() {

  describe('login', function() {
    var LoginService;
    var loginController;

    beforeEach(function() {
      module('myou.login');
    });

    beforeEach(function() {
      inject(function($controller, _LoginService_, $q) {
        var deferred = $q.defer();
        LoginService = _LoginService_;
        spyOn(LoginService, 'login').and.returnValue(deferred.promise);
        loginController = $controller('LoginController',
            {LoginService: LoginService});
      });

    });

    it('should return if valid is false', function() {
      loginController.login(false);
      expect(LoginService.login).not.toHaveBeenCalled();
    });

    it('should call login if valid', function() {
      loginController.email = 'rodson@cvte.com';
      loginController.password = 'rodson';

      loginController.login(true);
      expect(LoginService.login).toHaveBeenCalledWith({
        email: 'rodson@cvte.com',
        password: 'rodson'
      });
    });
  });

});
