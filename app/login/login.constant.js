(function() {
  'use strict';

  angular
    .module('myou.login')
    .constant('LoginConstant', {
      LOGIN_URL: 'http://localhost:4000/api/in/auth/login'
    });
})();
