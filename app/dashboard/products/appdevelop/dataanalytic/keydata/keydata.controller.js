(function() {
  'use strict';

  function keyDataConfig($stateProvider) {
    $stateProvider
      .state('dashboard.appdevelop.keydata', {
        url: '/keydata',
        templateUrl: 'app/dashboard/products/appdevelop/dataanalytic/keydata/keydata.html',
        controllerAs: 'vm',
        controller: 'KeyDataCtrl'
      });
  }

  function KeyDataCtrl() {

  }

  angular
    .module('myou.dashboard.appdevelop.dataanalytic')
    .controller('KeyDataCtrl', KeyDataCtrl)
    .config(keyDataConfig);

})();
