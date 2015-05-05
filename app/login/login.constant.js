(function() {
  'use strict';

  angular
    .module('myou.login')
    .constant('LoginConstant', {
      LOGIN_URL: 'http://localhost:4000/api/in/auth/login',

      USER_NOT_EXIST_CODE: 20103,
      USER_NOT_EXIST_MSG: '用户不存在',

      PASSWORD_ERROR_CODE: 20104,
      PASSWORD_ERROR_MSG: '密码错误'
    });
})();
