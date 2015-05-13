(function() {
  'use strict';

  function PlatformManager(Constant) {
    var PlatformManager = {};

    PlatformManager.showPlatformName = function(platform) {
      var name;
      switch (platform) {
        case Constant.PRODUCT_PLATFORM.ANDROID_APP:
          name = 'Android应用';
          break;
        case Constant.PRODUCT_PLATFORM.WINDOWS_APP:
          name = 'Windows应用';
          break;
        case Constant.PRODUCT_PLATFORM.IOS_APP:
          name = 'IOS应用';
          break;
        case Constant.PRODUCT_PLATFORM.SYSTEM_UPDATE:
          name = '系统升级';
          break;
        case Constant.PRODUCT_PLATFORM.SERVICE_MONITOR:
          name = '接口监控';
          break;
        case Constant.PRODUCT_PLATFORM.WEB_PUBLISH:
          name = 'WEB发布';
          break;
        case Constant.PRODUCT_PLATFORM.PAGE_ANALYTIC:
          name = '页面分析';
          break;
      }
      return name;
    };

    return PlatformManager;
  }

  angular
    .module('myou.shared')
    .factory('PlatformManager', PlatformManager);
})();