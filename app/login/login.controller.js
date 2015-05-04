(function() {
  'use strict';

  angular
    .module('myou.login')
    .controller('LoginController', LoginController);

  function LoginController(LoginService) {
    var vm = this;

    vm.email = '';
    vm.password = '';
    vm.login = login;

    function login(isValid) {
      if (!isValid) {
        return;
      }

      LoginService.login({
        email: vm.email,
        password: vm.password
      });
    }

  }
})();
