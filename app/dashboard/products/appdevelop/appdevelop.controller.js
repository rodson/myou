(function() {
  'use strict';

  function appDevelopConfig($stateProvider) {
    $stateProvider
      .state('dashboard.appdevelop', {
        abstract: true,
        url: '/appdevelop/:id',
        templateUrl: 'app/dashboard/products/appdevelop/appdevelop.html',
        controllerAs: 'vm',
        controller: 'AppDevelopCtrl'
      });
  }

  function AppDevelopCtrl(localStorageService, $location) {
    var vm = this;

    vm.product = localStorageService.get('app');
    vm.isActive = function(path) {
      return $location.path().indexOf(path) > -1;
    };
  }

  angular
    .module('myou.dashboard.appdevelop')
    .controller('AppDevelopCtrl', AppDevelopCtrl)
    .config(appDevelopConfig);

})();
