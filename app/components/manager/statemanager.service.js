(function() {
  'use strict';

  /**
   * @ngInject
   */
  function StateManager($state, $location, $timeout, Constant, MomentDateService) {
    var StateManager = {};

    StateManager.enterProduct = function(platform, id) {
      var state = '';
      switch (platform) {
        case Constant.PRODUCT_PLATFORM.ANDROID_APP:
        case Constant.PRODUCT_PLATFORM.WINDOWS_APP:
        case Constant.PRODUCT_PLATFORM.IOS_APP:
          state = 'dashboard.appdevelop.updatesetting';
          $state.go(state, { id: id, test: 'false' });
          break;
        case Constant.PRODUCT_PLATFORM.SYSTEM_UPDATE:
          state = 'dashboard.systemupdate.updatesetting';
          $state.go(state, { id: id, show_test: 'false' });
          break;
        case Constant.PRODUCT_PLATFORM.SERVICE_MONITOR:
          var today = MomentDateService.getToday().start;
          state = 'dashboard.servicemonitor.dailydata';
          $state.go(state, { id: id, stat_date: today });
          break;
        case Constant.PRODUCT_PLATFORM.WEB_PUBLISH:
          state = 'dashboard.webpublish';
          $state.go(state, { id: id });
          break;
        case Constant.PRODUCT_PLATFORM.PAGE_ANALYTIC:
          state = 'dashboard.pageanalytic.global';
          $state.go(state, { id: id });
          break;
      }

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
