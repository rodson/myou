(function() {
  'use strict';

  function serviceMonitorConfig($stateProvider) {
    $stateProvider
      .state('dashboard.servicemonitor', {
        url: '/servicemonitor/:id',
        templateUrl: 'app/dashboard/servicemonitor/servicemonitor.html',
        controllerAs: 'vm',
        controller: 'ServiceMonitorCtrl'
      });
  }

  function ServiceMonitorCtrl() {

  }

  angular
    .module('myou.dashboard.servicemonitor')
    .controller('ServiceMonitorCtrl', ServiceMonitorCtrl)
    .config(serviceMonitorConfig);

})();
