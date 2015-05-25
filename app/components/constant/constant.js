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
        PRODUCTS_TRICKID: 'http://myoutest.cvte.com/api/analytics/trackid',
        PRODUCTS_OVERVIEW: 'http://myoutest.cvte.com/api/analytics/overview',
        PRODUCTS_SUMMARY: 'http://myoutest.cvte.com/api/analytics/summary',
        PRODUCTS_PAGERANKING: 'http://myoutest.cvte.com/api/analytics/pagerank',
        PRODUCTS_ISP: 'http://myoutest.cvte.com/api/analytics/isp',
        PRODUCTS_REGION: 'http://myoutest.cvte.com/api/analytics/region',
        PRODUCTS_DEVICE: 'http://myoutest.cvte.com/api/analytics/device',
        PRODUCTS_SOURCE: 'http://myoutest.cvte.com/api/analytics/source',
        APISTATIS_USAGE: 'http://myoutest.cvte.com/api-java/in/api-usage',
        PRODUCTS_SERVICE_MONITOR: 'http://localhost:4000/api/in/monitor',
        ANALYZE_URL: 'http://localhost:4000/api/in/analyze',

        UPDATE_API_STAT: 'http://localhost:4000/api/in/stats/update/applications',
        VERSION_API_STAT: 'http://localhost:4000/api/in/stats/update/versions',

        USERINFO: 'http://localhost:4000/api/in/users',
        USERGROUP: 'http://localhost:4000/api/in/userGroups',
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
