(function() {
  'use strict';

  /**
   * @ngInject
   */
  function serviceMonitorConfig($stateProvider) {
    $stateProvider
      .state('dashboard.servicemonitor', {
        abstract: true,
        url: '/servicemonitor/:id',
        templateUrl: 'app/dashboard/products/servicemonitor/servicemonitor.html',
        controllerAs: 'vm',
        controller: 'ServiceMonitorCtrl',
        resolve: ServiceMonitorCtrl.getAppId
      });
  }

  /**
   * @ngInject
   */
  function ServiceMonitorCtrl($state, localStorageService, ServiceMonitorService) {
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

    // $state.go('dashboard.servicemonitor.dailydata');
  }

  ServiceMonitorCtrl.getAppId = {
    /**
     * @ngInject
     */
    getAppId: function(localStorageService, $stateParams, ServiceMonitorService){
      ServiceMonitorService.getAppId($stateParams.id, function(){
        localStorageService.set('appId', ServiceMonitorService.data.appId);
      });
    },
  };

  angular
    .module('myou.dashboard.servicemonitor')
    .controller('ServiceMonitorCtrl', ServiceMonitorCtrl)
    .config(serviceMonitorConfig);

})();
