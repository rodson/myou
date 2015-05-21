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
    var vm = this;
    vm.contacts = [{
      name: 'wanfeichao',
      phone_number: 13119275648,
      email: 'wanfeichao@cvte.cn'
    }, {
      name: 'wanfeichao1',
      phone_number: 13119275649,
      email: 'wanfeichao@cvte.com'
    }, {
      name: 'wanfeichao2',
      phone_number: 13119275640,
      email: 'wanfeichao@cvte.net'
    }]
  }

  angular
    .module('myou.dashboard.servicemonitor')
    .controller('ContactsCtrl', ContactsCtrl)
    .config(ContactsConfig);

})();
