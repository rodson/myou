(function() {
  'use strict';

  angular
    .module('myou.shared')
    .constant('Constant', {

      URL: {
        LOGIN: '/api/in/auth/login',
        CHECK_LOGIN: '/api/in/auth/loggedin',
        FILE_SYNC: '/uploads',

        PRODUCTS: '/api/in/applications',
        PRODUCTS_TRICKID: '/api/analytics/trackid',
        PRODUCTS_OVERVIEW: '/api/analytics/overview',
        PRODUCTS_SUMMARY: '/api/analytics/summary',
        PRODUCTS_PAGERANKING: '/api/analytics/pagerank',
        PRODUCTS_ISP: '/api/analytics/isp',
        PRODUCTS_REGION: '/api/analytics/region',
        PRODUCTS_DEVICE: '/api/analytics/visitor/device',
        PRODUCTS_SOURCE: '/api/analytics/visitor/source',
        APISTATIS_USAGE: '/api-java/in/api-usage',
        PRODUCTS_SERVICE_MONITOR: '/api/in/monitor',
        ANALYZE_URL: '/api/in/analyze',

        UPDATE_API_STAT: '/api/in/stats/update/applications',
        VERSION_API_STAT: '/api/in/stats/update/versions',
        USERINFO: '/api/in/users',
        USERAUTH: '/api/in/auth',
        USERGROUP: '/api/in/userGroups',
        CUSTOMEVENT_API: '/api/in/events',

        QINIU_TOKEN: '/api/in/qiniu/token',
        UPDATE_POLICY: '/api/in/updatePolicy'
      },

      RETURN_DATA: {
        USER_NOT_EXIST_CODE: 20103,
        USER_NOT_EXIST_MSG: '用户不存在',

        PASSWORD_ERROR_CODE: 20104,
        PASSWORD_ERROR_MSG: '密码错误',

        APP_NAME_EXIST_CODE: 20224,
        APP_NAME_EXIST_MSG: '产品名已存在'
      },

      PACKAGE_STATUS: {
        PUBLISHED: 'publish_done',
        RUNNING: 'service_running',
        STOPED: 'service_stopped'
      },

      PACKAGE_ACTION: {
        PUB: 'pub',
        STOP: 'stop',
        RESTART: 'restart',
        START: 'start'
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
