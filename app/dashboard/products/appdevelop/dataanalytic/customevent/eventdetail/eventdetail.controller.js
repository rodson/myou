(function() {
  'use strict';

  function eventDetailConfig($stateProvider) {
    $stateProvider
      .state('dashboard.appdevelop.eventdetail', {
        url: '/customevent/:eventId',
        templateUrl: 'app/dashboard/products/appdevelop/dataanalytic/customevent/eventdetail/eventdetail.html',
        controllerAs: 'vm',
        controller: 'EventDetailCtrl'
      });
  }

  function EventDetailCtrl() {

  }

  angular
    .module('myou.dashboard.appdevelop.dataanalytic')
    .controller('EventDetailCtrl', EventDetailCtrl)
    .config(eventDetailConfig);

})();
