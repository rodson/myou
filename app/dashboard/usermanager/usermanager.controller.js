(function() {
  'use strict';

  function UserManagerConfig($stateProvider) {
    $stateProvider
      .state('dashboard.usermanager', {
        url: '/usermanager',
        templateUrl: 'app/dashboard/usermanager/usermanager.html',
        controllerAs: 'vm',
        controller: 'UserManagerCtrl',
        resolve: UserManagerCtrl.resolve
      });
  }

  function UserManagerCtrl($state) {
    var vm = this;
  }

  angular
    .module('myou.dashboard.usermaneger')
    .controller('UserManagerCtrl', UserManagerCtrl)
    .config(UserManagerConfig);

})();
