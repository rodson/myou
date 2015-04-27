(function() {
  'use strict';

  angular
    .module('myou.login', [
      'ui.router',
      'ngMaterial'
    ])
    .config(loginConfig);

  function loginConfig($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/login/login.html',
        controller: 'LoginController'
      });
  }

})();
