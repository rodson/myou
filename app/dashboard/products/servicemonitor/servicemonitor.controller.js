(function() {
  'use strict';

  function serviceMonitorConfig($stateProvider) {
    $stateProvider
      .state('dashboard.servicemonitor', {
        url: '/servicemonitor/:id',
        templateUrl: 'app/dashboard/products/servicemonitor/servicemonitor.html',
        controllerAs: 'vm',
        controller: 'ServiceMonitorCtrl',
        resolve: ServiceMonitorCtrl.getAppId
      });
  }

  function ServiceMonitorCtrl($state, localStorageService, ServiceMonitorService) {

    localStorageService.set('appId', ServiceMonitorService.data.appId);

    var vm = this;
    vm.product = localStorageService.get('app');
    vm.isActive = function(li) {
      return $state.current.name === 'dashboard.servicemonitor.' + li;
    };

    vm.showAppKey = false;

    vm.show = function() {
      vm.showAppKey = true;
    };

    vm.hide = function() {
      vm.showAppKey = false;
    };

    $state.go('dashboard.servicemonitor.dailydata');
  }

  ServiceMonitorCtrl.getAppId = {
    getAppId: function(localStorageService, ServiceMonitorService){
      var appKey = localStorageService.get('app').appKey;
      return ServiceMonitorService.getAppId(appKey);
    },
  };

  angular
    .module('myou.dashboard.servicemonitor')
    .controller('ServiceMonitorCtrl', ServiceMonitorCtrl)
    .config(serviceMonitorConfig);

})();
