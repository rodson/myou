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

  function SettingsCtrl() {

  }

  angular
    .module('myou.dashboard.servicemonitor')
    .controller('SettingsCtrl', SettingsCtrl)
    .config(SettingsConfig);

})();
