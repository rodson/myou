(function() {
  'use strict';

  function StateManager($state, Constant) {
    var StateManager = {};

    StateManager.enterProduct = function(platform, id) {
      var state = '';
      switch (platform) {
        case Constant.PRODUCT_PLATFORM.ANDROID_APP:
        case Constant.PRODUCT_PLATFORM.WINDOWS_APP:
        case Constant.PRODUCT_PLATFORM.IOS_APP:
          state = 'dashboard.appdevelop.updatesetting';
          break;
        case Constant.PRODUCT_PLATFORM.SYSTEM_UPDATE:
          state = 'dashboard.systemupdate';
          break;
        case Constant.PRODUCT_PLATFORM.SERVICE_MONITOR:
          state = 'dashboard.servicemonitor';
          break;
        case Constant.PRODUCT_PLATFORM.WEB_PUBLISH:
          state = 'dashboard.webpublish';
          break;
        case Constant.PRODUCT_PLATFORM.PAGE_ANALYTIC:
          state = 'dashboard.pageanalytic';
          break;
      }

      $state.go(state, { id: id });
    };

    return StateManager;

  }

  angular
    .module('myou.shared')
    .factory('StateManager', StateManager);
})();
