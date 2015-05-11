(function() {
  'use strict';

  function appDevelopConfig($stateProvider) {
    $stateProvider
      .state('dashboard.appdevelop', {
        url: '/appdevelop/:id',
        templateUrl: 'app/dashboard/products/appdevelop/appdevelop.html',
        controllerAs: 'vm',
        controller: 'AppDevelopCtrl'
      });
  }

  function AppDevelopCtrl() {

  }

  angular
    .module('myou.dashboard.appdevelop')
    .controller('AppDevelopCtrl', AppDevelopCtrl)
    .config(appDevelopConfig);

})();
