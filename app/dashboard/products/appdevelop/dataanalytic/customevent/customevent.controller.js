(function() {
  'use strict';

  function customEventConfig($stateProvider) {
    $stateProvider
      .state('dashboard.appdevelop.customevent', {
        url: '/customevent',
        templateUrl: 'app/dashboard/products/appdevelop/dataanalytic/customevent/customevent.html',
        controllerAs: 'vm',
        controller: 'CustomEventCtrl'
      });
  }

  function CustomEventCtrl(CustomEventService) {
    var vm = this;

    CustomEventService.init();

    vm.events = CustomEventService.events;

  }

  angular
    .module('myou.dashboard.appdevelop.dataanalytic')
    .controller('CustomEventCtrl', CustomEventCtrl)
    .config(customEventConfig);

})();
