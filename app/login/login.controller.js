(function() {
  'use strict';

  function LoginCtrl(LoginService) {
    var vm = this;

    vm.email = '';
    vm.password = '';
    vm.errorMsg = '';
    vm.login = function (isValid, ev) {
      if (!isValid) {
        return;
      }

      LoginService.login({
        email: vm.email,
        password: vm.password
      }, ev, vm.autoLogin);
    };
  }

  function loginConfig($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/login/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'vm'
      });
  }

  angular
    .module('myou.login')
    .controller('LoginCtrl', LoginCtrl)
    .config(loginConfig);

})();
