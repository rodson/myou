(function() {
  'use strict';

  angular
    .module('myou.login', [
      'ui.router',
      'ngMaterial',
      'LocalStorageModule'
    ])
    .config(loginConfig);

  function loginConfig($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/login/login.html',
        controller: 'LoginController',
        controllerAs: 'vm'
      });
  }

})();
