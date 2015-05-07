(function() {
  'use strict';

  function addProductConfig($stateProvider) {
    $stateProvider
      .state('dashboard.addproduct', {
        url: '/addproduct',
        templateUrl: 'app/dashboard/addproduct/addproduct.html',
        controllerAs: 'vm',
        controller: 'AddProductCtrl'
      });
  }

  function AddProductCtrl() {

  }

  angular
    .module('myou.dashboard.addproduct')
    .controller('AddProductCtrl', AddProductCtrl)
    .config(addProductConfig);

})();
