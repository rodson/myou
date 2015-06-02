(function() {
  'use strict';

  function systemUpdateConfig($stateProvider) {
    $stateProvider
      .state('dashboard.systemupdate', {
        abstract: true,
        url: '/systemupdate/:id',
        templateUrl: 'app/dashboard/products/systemupdate/systemupdate.html',
        controllerAs: 'vm',
        controller: 'SystemUpdateCtrl',
        resolve: SystemUpdateCtrl.resolve
      });
  }

  function SystemUpdateCtrl(StorageManager, $location) {
    var vm = this;

    vm.product = StorageManager.getApp();
    vm.isActive = function(parent, path) {
      return ($location.path().indexOf(parent) > -1 && $location.path().indexOf(path) > -1);
    };

    vm.show = function() {
      vm.showAppKey = true;
    };

    vm.hide = function() {
      vm.showAppKey = false;
    };
  }

  SystemUpdateCtrl.resolve = {
    getApp: function(RouteStateManager, $stateParams) {
      return RouteStateManager.getApp($stateParams.id);
    }
  };

  angular
    .module('myou.dashboard.systemupdate')
    .controller('SystemUpdateCtrl', SystemUpdateCtrl)
    .config(systemUpdateConfig);

})();
