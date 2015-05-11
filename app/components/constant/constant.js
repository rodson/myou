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
        PASSWORD_ERROR_MSG: '密码错误',

        APP_NAME_EXIST_CODE: 20224,
        APP_NAME_EXIST_MSG: '产品名已存在'
      },

      PRODUCT_PLATFORM: {
        APP_DEVELOP: 'appdevelop',
        ANDROID_APP: 'android_app',
        WINDOWS_APP: 'windows_app',
        IOS_APP: 'ios_app',

        SYSTEM_UPDATE: 'android_rom',
        PAGE_ANALYTIC: 'website_analytics',
        SERVICE_MONITOR: 'service_monitor',
        WEB_PUBLISH: 'web_app'
      }

    });
})();
