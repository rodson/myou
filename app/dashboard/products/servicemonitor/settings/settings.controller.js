(function() {
  'use strict';

  /**
   * @ngInject
   */
  function SettingsConfig($stateProvider) {
    $stateProvider
      .state('dashboard.servicemonitor.settings', {
        url: '/settings',
        templateUrl: 'app/dashboard/products/servicemonitor/settings/settings.html',
        controllerAs: 'vm',
        controller: 'SettingsCtrl',
        resolve: SettingsCtrl.resolve
      });
  }

  /**
   * @ngInject
   */
  function SettingsCtrl(localStorageService, $mdToast, SettingsService, $timeout) {
    var vm = this;
    var appKey = localStorageService.get('app').appKey;
    var appId = localStorageService.get('appId');
    vm.message = false;
    vm.email = false;

    vm.getMonitorConfig = function() {
      SettingsService.getMonitorConfig(appKey, function() {
        vm.message = SettingsService.data.msg_alert;
        vm.email = SettingsService.data.email_alert;
      });
    };

    vm.getMonitorConfig();

    vm.setMonitor = function() {
      var config = {
        msg_alert: vm.message,
        email_alert: vm.email,
        app_id: appId
      };
      SettingsService.modifyMonitorConfig(appKey, config, function(error) {
        if (error) {
          vm.errortip = error.message;
          vm.getMonitorConfig();

          $timeout(function() {
            vm.errortip = '';
          }, 3000);
          return;
        }
        vm.showAlert('更新成功');
      });
    };

    vm.showAlert = function(msg) {
      $mdToast.show(
        $mdToast.simple()
        .content(msg)
        .position('top right')
        .hideDelay(1500)
      );
    };
  }

  SettingsCtrl.resolve = {
    /**
     * @ngInject
     */
    getAppId: function(getAppId) {
      return getAppId;
    }
  };

  angular
    .module('myou.dashboard.servicemonitor')
    .controller('SettingsCtrl', SettingsCtrl)
    .config(SettingsConfig);

})();
