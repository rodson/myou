(function() {
  'use strict';

  angular
    .module('myou.login')
    .controller('LoginController', LoginController);

  function LoginController(LoginService, $mdDialog) {
    var vm = this;

    vm.email = '';
    vm.password = '';
    vm.errorMsg = '';
    vm.login = login;

    function login(isValid, ev) {
      if (!isValid) {
        return;
      }

      LoginService.login({
        email: vm.email,
        password: vm.password
      }).then(function(errorMsg) {
        if (errorMsg) {
          $mdDialog.show(
            $mdDialog.alert()
              .title('登录失败')
              .content(errorMsg)
              .ariaLabel('登录失败')
              .ok('确定')
              .targetEvent(ev)
          );
        }
      });
    }

  }
})();
