(function() {
  'use strict';

  function SettingsConfig($stateProvider) {
    $stateProvider
      .state('dashboard.servicemonitor.settings', {
        url: '/settings',
        templateUrl: 'app/dashboard/products/servicemonitor/settings/settings.html',
        controllerAs: 'vm',
        controller: 'SettingsCtrl'
      });
  }

  function SettingsCtrl(localStorageService, $mdDialog, SettingsService) {
    var vm = this;
    var appKey = localStorageService.get('app').appKey;
    var appId = localStorageService.get('appId');

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
        if(error) {
          vm.showAlert(error);
          vm.getContacts();
        }
      });
    };

    vm.showAlert = function(error) {
      $mdDialog.show(
        $mdDialog.alert()
        .title('Error')
        .content(error.message)
        .ariaLabel('Alert Dialog')
        .ok('关闭')
      );
    };
  }

  angular
    .module('myou.dashboard.servicemonitor')
    .controller('SettingsCtrl', SettingsCtrl)
    .config(SettingsConfig);

})();
