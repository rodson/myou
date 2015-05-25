(function() {
  'use strict';

  function UserRetainService($http, $state, $stateParams, StorageManager,
    PlatformManager, UrlManager, MomentDateService) {

    var UserRetainService = {};

    UserRetainService.app = {};
    UserRetainService.radioDate = 'today';
    UserRetainService.tableData = [];

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
      UserRetainService.startdate = checkDate.start;
      UserRetainService.enddate = checkDate.end;
    };

    UserRetainService.getTableData = function() {
      if (!UserRetainService.startdate) {
        UserRetainService.init();
        UserRetainService.getCheckDate('today');
      }

      return $http.get(UrlManager.getUserRetainUrl(UserRetainService.app.appKey) +
        '?start_date=' + UserRetainService.startdate +
        '&end_date=' + UserRetainService.enddate +
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
