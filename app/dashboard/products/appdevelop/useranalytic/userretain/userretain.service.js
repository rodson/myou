(function() {
  'use strict';

  /**
   * @ngInject
   */
  function UserRetainService($http, $state, $stateParams, StorageManager,
    PlatformManager, UrlManager, MomentDateService) {

    var UserRetainService = {};

    UserRetainService.app = {};
    UserRetainService.radioDate = 'last7days';
    UserRetainService.tableData = [];
    UserRetainService.date = {};

    UserRetainService.getApp = function() {
      UserRetainService.app = StorageManager.getApp();
      return UserRetainService.app;
    };

    UserRetainService.init = function() {
      UserRetainService.getApp();
    };

    UserRetainService.isWindowsApp = function() {
      return PlatformManager.isWindowsApp(UserRetainService.app.platform);
    };

    UserRetainService.getCheckDate = function(selectedDate) {
      var checkDate;
      UserRetainService.radioDate = selectedDate;

      switch (selectedDate) {
        case 'today':
          checkDate = MomentDateService.getToday();
          break;
        case 'yesterday':
          checkDate = MomentDateService.getYesterday();
          break;
        case 'last7days':
          checkDate = MomentDateService.getLast7Day();
          break;
        case 'last30days':
          checkDate = MomentDateService.getLast30Day();
          break;
        default:
          checkDate = MomentDateService.getToday();
          break;
      }
      UserRetainService.date.start = checkDate.start;
      UserRetainService.date.end = checkDate.end;
    };

    UserRetainService.getTableData = function() {
      if (!UserRetainService.date.start) {
        UserRetainService.init();
        UserRetainService.getCheckDate('last7days');
      }

      return $http.get(UrlManager.getUserRetainUrl(UserRetainService.app.appKey) +
        '?start_date=' + UserRetainService.date.start +
        '&end_date=' + UserRetainService.date.end +
        '&platform=' + UserRetainService.app.platform +
        '&stats=user_retain').success(function(data) {
          UserRetainService.tableData = data;
        });
    };

    return UserRetainService;
  }

  angular
    .module('myou.dashboard.appdevelop.useranalytic')
    .factory('UserRetainService', UserRetainService);

})();
