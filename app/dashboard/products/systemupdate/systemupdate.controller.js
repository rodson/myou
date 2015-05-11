(function() {
  'use strict';

  function systemUpdateConfig($stateProvider) {
    $stateProvider
      .state('dashboard.systemupdate', {
        url: '/systemupdate/:id',
        templateUrl: 'app/dashboard/products/systemupdate/systemupdate.html',
        controllerAs: 'vm',
        controller: 'SystemUpdateCtrl'
      });
  }

  function SystemUpdateCtrl() {

  }

  angular
    .module('myou.dashboard.systemupdate')
    .controller('SystemUpdateCtrl', SystemUpdateCtrl)
    .config(systemUpdateConfig);

})();
