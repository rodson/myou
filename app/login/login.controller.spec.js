'use strict';

describe('LoginController', function() {

  describe('login', function() {
    var mockLoginService;
    var loginController;

    beforeEach(function() {

      module('myou.login', function($provide) {
        mockLoginService = {};
        mockLoginService.login = jasmine.createSpy();
        $provide.value('LoginService', mockLoginService);
      });

      inject(function($controller, _LoginService_) {
        mockLoginService = _LoginService_;
        loginController = $controller('LoginController',
            {LoginService: mockLoginService});
      });
    });

    it('should return if valid is false', function() {
      loginController.login(false);
      expect(mockLoginService.login).not.toHaveBeenCalled();
    });

    it('should call login if valid', function() {
      loginController.email = 'rodson@cvte.com';
      loginController.password = 'rodson';

      loginController.login(true);
      expect(mockLoginService.login).toHaveBeenCalledWith({
        email: 'rodson@cvte.com',
        password: 'rodson'
      });
    });
  });

});
