(function() {
  'use strict';

  angular
    .module('myou.shared')
    .constant('Constant', {

      URL: {
        LOGIN: 'http://localhost:4000/api/in/auth/login',
        CHECK_LOGIN: 'http://localhost:4000/api/in/auth/loggedin',
        FILE_SYNC: 'http://localhost:4000/uploads',

        PRODUCTS: 'http://localhost:4000/api/in/applications',
        PRODUCTS_TRICKID: 'http://localhost:4000/api/analytics/trackid',
        PRODUCTS_OVERVIEW: 'http://localhost:4000/api/analytics/overview',
        PRODUCTS_SUMMARY: 'http://localhost:4000/api/analytics/summary',
        PRODUCTS_PAGERANKING: 'http://localhost:4000/api/analytics/pagerank',
        PRODUCTS_ISP: 'http://localhost:4000/api/analytics/isp',
        PRODUCTS_REGION: 'http://localhost:4000/api/analytics/region',
        PRODUCTS_DEVICE: 'http://localhost:4000/api/analytics/device',
        PRODUCTS_SOURCE: 'http://localhost:4000/api/analytics/source',
        APISTATIS_USAGE: 'http://localhost:4000/api-java/in/api-usage',
        PRODUCTS_SERVICE_MONITOR: 'http://localhost:4000/api/in/monitor',
        ANALYZE_URL: 'http://localhost:4000/api/in/analyze',

        UPDATE_API_STAT: 'http://localhost:4000/api/in/stats/update/applications',
        VERSION_API_STAT: 'http://localhost:4000/api/in/stats/update/versions',
        USERINFO: 'http://localhost:4000/api/in/users',
        USERAUTH: 'http://localhost:4000/api/in/auth',
        USERGROUP: 'http://localhost:4000/api/in/userGroups',
        CUSTOMEVENT_API: 'http://localhost:4000/api/in/events',

        QINIU_TOKEN: 'http://localhost:4000/api/in/qiniu/token',
        UPDATE_POLICY: 'http://localhost:4000/api/in/updatePolicy'
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
