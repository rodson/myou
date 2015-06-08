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
  function ServiceMonitorCtrl($filter, $state, localStorageService,
    ServiceMonitorService, MomentDateService) {

    var vm = this;
    vm.product = localStorageService.get('app');
    vm.isActive = function(li) {
      return $state.current.name === 'dashboard.servicemonitor.' + li;
    };

    vm.today = MomentDateService.getToday().start;
    var now = new Date();
    vm.enddate = $filter('date')(now, 'yyyy-MM-dd HH:mm:ss');
    vm.startdate = $filter('date')(now.getTime() - 5 * 60 * 1000, 'yyyy-MM-dd HH:mm:ss');

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
    getApp: function(RouteStateManager, $stateParams) {
      return RouteStateManager.getApp($stateParams.id);
    },
    /**
     * @ngInject
     */
    getAppId: function(localStorageService, ServiceMonitorService, getApp){
      return ServiceMonitorService.getAppId(getApp.data.appKey, function(){
        localStorageService.set('appId', ServiceMonitorService.data.appId);
      });
    },
  };

  angular
    .module('myou.dashboard.servicemonitor')
    .controller('ServiceMonitorCtrl', ServiceMonitorCtrl)
    .config(serviceMonitorConfig);

})();
