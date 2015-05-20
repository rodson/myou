(function() {
  'use strict';

  function ContactsConfig($stateProvider) {
    $stateProvider
      .state('dashboard.servicemonitor.contacts', {
        url: '/contacts',
        templateUrl: 'app/dashboard/products/servicemonitor/contacts/contacts.html',
        controllerAs: 'vm',
        controller: 'ContactsCtrl'
      });
  }

  function ContactsCtrl() {

  }

  angular
    .module('myou.dashboard.servicemonitor')
    .controller('ContactsCtrl', ContactsCtrl)
    .config(ContactsConfig);

})();
