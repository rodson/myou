(function() {
  'use strict';

  function eventDetailConfig($stateProvider) {
    $stateProvider
      .state('dashboard.appdevelop.eventdetail', {
        url: '/customevent/:eventId',
        templateUrl: 'app/dashboard/products/appdevelop/dataanalytic/customevent/eventdetail/eventdetail.html',
        controllerAs: 'vm',
        controller: 'EventDetailCtrl',
        resolve: EventDetailCtrl.resolve
      });
  }

  function EventDetailCtrl(EventDetailService, $stateParams) {
    var vm = this;

    var eventId = $stateParams.eventId;

    vm.app = EventDetailService.getApp();
    vm.event = EventDetailService.getEvent();
    vm.radioDate = EventDetailService.radioDate;
    vm.radioDataType = EventDetailService.radioDataType;
    vm.chartConfig = EventDetailService.chartConfig;
    vm.tableData = EventDetailService.tableData;
    vm.eventLabelData = EventDetailService.eventLabelData;
    vm.versions = EventDetailService.versions;
    vm.date = EventDetailService.date;

    vm.getCheckDate = function() {
      EventDetailService.getCheckDate(vm.radioDate);

      EventDetailService.getEventData(eventId).then(function() {
        vm.tableData = EventDetailService.tableData;
      });

      EventDetailService.getEventLabelData(eventId).then(function() {
        vm.eventLabelData = EventDetailService.eventLabelData;
      });
    };

    vm.onVersionSelect = function() {
      EventDetailService.getEventData(eventId, vm.selectedVersion).then(function() {
        vm.tableData = EventDetailService.tableData;
      });

      EventDetailService.getEventLabelData(eventId, vm.selectedVersion).then(function() {
        vm.eventLabelData = EventDetailService.eventLabelData;
      });
    };

    vm.getCheckDataType = function() {
      EventDetailService.getCheckDataType(vm.radioDataType);
    };
  }

  EventDetailCtrl.resolve = {
    getEventData: function($stateParams, EventDetailService, getApp) {
      var eventId = $stateParams.eventId;
      return EventDetailService.getEventData(eventId);
    },

    getEventlabelData: function($stateParams, EventDetailService, getApp) {
      var eventId = $stateParams.eventId;
      return EventDetailService.getEventLabelData(eventId);
    },

    getEventVersions: function($stateParams, EventDetailService, getApp) {
      var eventId = $stateParams.eventId;
      return EventDetailService.getEventVersions(eventId);
    }
  };

  angular
    .module('myou.dashboard.appdevelop.dataanalytic')
    .controller('EventDetailCtrl', EventDetailCtrl)
    .config(eventDetailConfig);

})();
