(function() {
  'use strict';

  /**
   * @ngInject
   */
  function StateManager($state, $location, $timeout, Constant) {
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
          state = 'dashboard.systemupdate.updatesetting';
          break;
        case Constant.PRODUCT_PLATFORM.SERVICE_MONITOR:
          state = 'dashboard.servicemonitor.dailydata';
          break;
        case Constant.PRODUCT_PLATFORM.WEB_PUBLISH:
          state = 'dashboard.webpublish';
          break;
        case Constant.PRODUCT_PLATFORM.PAGE_ANALYTIC:
          state = 'dashboard.pageanalytic.global';
          break;
      }

      $state.go(state, { id: id });
    };

    StateManager.setQueryParams = function(queryKey, queryValue) {
      $state.current.reloadOnSearch = false;

      $location.search(queryKey, queryValue);

      $timeout(function () {
        $state.current.reloadOnSearch = undefined;
      });
    };

    return StateManager;

  }

  angular
    .module('myou.shared')
    .factory('StateManager', StateManager);
})();
