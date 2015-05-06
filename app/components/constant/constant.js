(function() {
  'use strict';

  angular
    .module('myou.shared')
    .constant('Constant', {
      URL: {
        LOGIN: 'http://localhost:4000/api/in/auth/login',
        CHECK_LOGIN: 'http://localhost:4000/api/in/auth/loggedin',

        PRODUCTS: 'http://localhost:4000/api/in/applications'
      },
      RETURN_DATA: {
        USER_NOT_EXIST_CODE: 20103,
        USER_NOT_EXIST_MSG: '用户不存在',

        PASSWORD_ERROR_CODE: 20104,
        PASSWORD_ERROR_MSG: '密码错误'
      },
    });
})();
