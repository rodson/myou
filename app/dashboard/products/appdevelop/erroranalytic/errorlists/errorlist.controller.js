(function() {
  'use strict';

  function errorListsConfig($stateProvider) {
    $stateProvider
      .state('dashboard.appdevelop.errorlists', {
        url: '/errorlists',
        templateUrl: 'app/dashboard/products/appdevelop/erroranalytic/errorlists/errorlists.html',
        controllerAs: 'vm',
        controller: 'ErrorListsCtrl'
      });
  }

  function ErrorListsCtrl(localStorageService) {
    var vm = this;

  }

  angular
    .module('myou.dashboard.appdevelop')
    .controller('ErrorListsCtrl', ErrorListsCtrl)
    .config(errorListsConfig);

})();
