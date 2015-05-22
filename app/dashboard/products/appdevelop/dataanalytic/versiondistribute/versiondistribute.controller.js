(function() {
  'use strict';

  function versionDistributeConfig($stateProvider) {
    $stateProvider
      .state('dashboard.appdevelop.versiondistribute', {
        url: '/versiondistribute',
        templateUrl: 'app/dashboard/products/appdevelop/dataanalytic/versiondistribute/versiondistribute.html',
        controllerAs: 'vm',
        conroller: 'VersionDistributeCtrl'
      });
  }

  function VersionDistributeCtrl() {

  }

  angular
    .module('myou.dashboard.appdevelop.dataanalytic')
    .controller('VersionDistributeCtrl', VersionDistributeCtrl)
    .config(versionDistributeConfig);

})();
