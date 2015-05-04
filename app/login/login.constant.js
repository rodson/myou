(function() {
  'use strict';

  angular
    .module('myou.login')
    .constant('LoginConstant', {
      LOGIN_URL: 'http://localhost:5000/api/in/auth/login'
    });
})();
