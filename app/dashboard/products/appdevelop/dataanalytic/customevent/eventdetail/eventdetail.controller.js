(function() {
  'use strict';

  /**
   * @ngInject
   */
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

  /**
   * @ngInject
   */
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
    /**
     * @ngInject
     */
    getEventInfo: function(EventDetailService, $stateParams, getApp) {
      return EventDetailService.getEventInfo($stateParams.eventId);
    },

    /**
     * @ngInject
     */
    getEventData: function($stateParams, EventDetailService, getApp) {
      var eventId = $stateParams.eventId;
      return EventDetailService.getEventData(eventId);
    },

    /**
     * @ngInject
     */
    getEventlabelData: function($stateParams, EventDetailService, getApp) {
      var eventId = $stateParams.eventId;
      return EventDetailService.getEventLabelData(eventId);
    },

    /**
     * @ngInject
     */
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
