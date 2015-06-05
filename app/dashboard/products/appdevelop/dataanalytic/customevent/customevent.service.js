(function() {
  'use strict';

  /**
   * @ngInject
   */
  function CustomEventService($http, $mdDialog, $state, $stateParams,
    UrlManager, StorageManager, StateManager) {

    var CustomEventService = {};

    CustomEventService.events = [];

    var KEY_SELECTED_VERSION = 'selected_version';

    CustomEventService.init = function(selectedVersion) {
      CustomEventService.app = StorageManager.getApp();
      CustomEventService.selectedVersion = selectedVersion;
    };

    CustomEventService.onVersionSelect = function(selectedVersion) {
      StateManager.setQueryParams(KEY_SELECTED_VERSION, selectedVersion);
      CustomEventService.selectedVersion = selectedVersion;
    };

    CustomEventService.getEvents = function() {
      var queryString = CustomEventService.selectedVersion ? ('?version=' + CustomEventService.selectedVersion) : '';
      return $http.get(UrlManager.getAnalyzeCustomEventUrl(CustomEventService.app.appKey) +
        '/' + queryString).success(function(data) {
          CustomEventService.events = data;
        });
    };

    CustomEventService.getEventVersions = function() {
      return $http.get(UrlManager
        .getEventVersionUrl(CustomEventService.app.appKey, ''))
        .success(function(data) {
          CustomEventService.versions = data;
        });
    };

    CustomEventService.enterEvent = function(event) {
      $state.go('dashboard.appdevelop.eventdetail', { eventId: event.event_db_id, selected_date: 'last7days', stats: 'count'});
    };

    CustomEventService.showAddEventDialog = function(ev) {
      $mdDialog.show({
        controller: 'AddCustomEventDialogCtrl',
        controllerAs: 'vm',
        templateUrl: 'addCustomEventDialog.html',
        targetEvent: ev
      })
      .then(function() {
        // Reload current page
        $state.transitionTo($state.current, $stateParams, {
          reload: true,
          inherit: false,
          notify: true
        });
      });
    };

    CustomEventService.showEditEventDialog = function(ev, event) {
      event = angular.copy(event);

      $mdDialog.show({
        controller: 'EditCustomEventDialogCtrl',
        controllerAs: 'vm',
        templateUrl: 'editCustomEventDialog.html',
        targetEvent: ev,
        resolve: {
          data: function() {
            return {
              event: event
            };
          }
        }
      })
      .then(function() {
        // Reload current page
        $state.transitionTo($state.current, $stateParams, {
          reload: true,
          inherit: false,
          notify: true
        });
      });
    };

    CustomEventService.showDeleteEventDialog = function(ev, event) {
      $mdDialog.show({
        controller: 'DeleteCustomEventDialogCtrl',
        controllerAs: 'vm',
        templateUrl: 'deleteCustomEventDialog.html',
        targetEvent: ev,
        resolve: {
          data: function() {
            return {
              event: event
            };
          }
        }
      })
      .then(function() {
        // Reload current page
        $state.transitionTo($state.current, $stateParams, {
          reload: true,
          inherit: false,
          notify: true
        });
      });
    };

    CustomEventService.createEvent = function(event) {
      return $http.post(UrlManager.getCustomEventUrl(CustomEventService.app.appKey), event);
    };

    CustomEventService.modifyEvent = function(event) {
      return $http.put(UrlManager.getCustomEventUrl(CustomEventService.app.appKey) + '/' +
        event.event_db_id, event);
    };

    CustomEventService.deleteEvent = function(event) {
      return $http.delete(UrlManager.getCustomEventUrl(CustomEventService.app.appKey) + '/' +
        event.event_db_id);
    };

    return CustomEventService;
  }

  angular
    .module('myou.dashboard.appdevelop.dataanalytic')
    .factory('CustomEventService', CustomEventService);

})();
