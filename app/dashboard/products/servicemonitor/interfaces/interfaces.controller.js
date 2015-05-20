(function() {
  'use strict';

  function InterfacesConfig($stateProvider) {
    $stateProvider
      .state('dashboard.servicemonitor.interfaces', {
        url: '/interfaces',
        templateUrl: 'app/dashboard/products/servicemonitor/interfaces/interfaces.html',
        controllerAs: 'vm',
        controller: 'InterfacesCtrl'
      });
  }

  function InterfacesCtrl() {

  }

  angular
    .module('myou.dashboard.servicemonitor')
    .controller('InterfacesCtrl', InterfacesCtrl)
    .config(InterfacesConfig);

})();
