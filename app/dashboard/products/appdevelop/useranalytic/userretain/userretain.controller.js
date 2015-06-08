(function() {
  'use strict';

  /**
   * @ngInject
   */
  function userRetainConfig($stateProvider) {
    $stateProvider
      .state('dashboard.appdevelop.userretain', {
        url: '/userretain?selected_date',
        templateUrl: 'app/dashboard/products/appdevelop/useranalytic/userretain/userretain.html',
        controllerAs: 'vm',
        controller: 'UserRetainCtrl',
        resolve: UserRetainCtrl.resolve
      });
  }

  /**
   * @ngInject
   */
  function UserRetainCtrl(UserRetainService, $state, $stateParams) {
    var vm = this;

    vm.radioDate = UserRetainService.radioDate;
    vm.tableData = UserRetainService.tableData;
    vm.date = UserRetainService.date;

    vm.getCheckDate = function() {
      UserRetainService.getCheckDate(vm.radioDate);
      UserRetainService.getTableData().then(function() {
        vm.tableData = UserRetainService.tableData;
      });
    };

    vm.formatTableData = function(data) {
      if (data === null) {
        return '-';
      } else {
        return data + '%';
      }
    };

    vm.isWindowsApp = function() {
      return UserRetainService.isWindowsApp();
    };
  }

  UserRetainCtrl.resolve = {
    /**
     * @ngInject
     */
    initData: function(getApp, $stateParams, UserRetainService) {
      return UserRetainService.init($stateParams.selected_date);
    },

    /**
     * @ngInject
     */
    getTableData: function(UserRetainService, initData) {
      return UserRetainService.getTableData();
    }
  };

  angular
    .module('myou.dashboard.appdevelop.useranalytic')
    .controller('UserRetainCtrl', UserRetainCtrl)
    .config(userRetainConfig);

})();
