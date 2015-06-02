(function() {
  'use strict';

  function appDevelopConfig($stateProvider) {
    $stateProvider
      .state('dashboard.appdevelop', {
        abstract: true,
        url: '/appdevelop/:id',
        templateUrl: 'app/dashboard/products/appdevelop/appdevelop.html',
        controllerAs: 'vm',
        controller: 'AppDevelopCtrl',
        resolve: AppDevelopCtrl.resolve
      });
  }

  function AppDevelopCtrl(localStorageService, $location) {
    var vm = this;

    vm.product = localStorageService.get('app');
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

  AppDevelopCtrl.resolve = {
    getApp: function(AppDevelopService, $stateParams) {
      return AppDevelopService.getApp($stateParams.id);
    }
  };

  angular
    .module('myou.dashboard.appdevelop')
    .controller('AppDevelopCtrl', AppDevelopCtrl)
    .config(appDevelopConfig);

})();
