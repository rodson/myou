(function() {
  'use strict';

  function userRetainConfig($stateProvider) {
    $stateProvider
      .state('dashboard.appdevelop.userretain', {
        url: '/userretain',
        templateUrl: 'app/dashboard/products/appdevelop/useranalytic/userretain/userretain.html',
        controllerAs: 'vm',
        controller: 'UserRetainCtrl'
      });
  }

  function UserRetainCtrl() {

  }

  angular
    .module('myou.dashboard.appdevelop.useranalytic')
    .controller('UserRetainCtrl', UserRetainCtrl)
    .config(userRetainConfig);

})();
