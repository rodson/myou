(function() {
  'use strict';

  /**
   * @ngInject
   */
  function customEventConfig($stateProvider) {
    $stateProvider
      .state('dashboard.appdevelop.customevent', {
        url: '/customevent?selected_version',
        templateUrl: 'app/dashboard/products/appdevelop/dataanalytic/customevent/customevent.html',
        controllerAs: 'vm',
        controller: 'CustomEventCtrl',
        resolve: CustomEventCtrl.resolve
      });
  }

  /**
   * @ngInject
   */
  function CustomEventCtrl(CustomEventService) {
    var vm = this;

    vm.versions = CustomEventService.versions;

    vm.events = CustomEventService.events;

    vm.selectedVersion = CustomEventService.selectedVersion;

    vm.onVersionSelect = function() {
      CustomEventService.onVersionSelect(vm.selectedVersion);
      CustomEventService.getEvents()
        .then(function() {
          vm.events = CustomEventService.events;
        });
    };

    vm.enterEvent = function(event) {
      CustomEventService.enterEvent(event);
    };

    vm.showAddEventDialog = function(ev) {
      CustomEventService.showAddEventDialog(ev);
    };

    vm.showEditEventDialog = function(ev, event) {
      CustomEventService.showEditEventDialog(ev, event);
    };

    vm.showDeleteEventDialog = function(ev, event) {
      CustomEventService.showDeleteEventDialog(ev, event);
    };
  }

  CustomEventCtrl.resolve = {
    /**
     * @ngInject
     */
    initData: function(CustomEventService, $stateParams, getApp) {
      return CustomEventService.init($stateParams.selected_version);
    },
    /**
     * @ngInject
     */
    getEvents: function(CustomEventService, initData) {
      return CustomEventService.getEvents();
    },
    /**
     * @ngInject
     */
    getEventVersions: function(CustomEventService, initData) {
      return CustomEventService.getEventVersions();
    }
  };

  /**
   * @ngInject
   */
  function AddCustomEventDialogCtrl($mdDialog, CustomEventService) {
    var vm = this;

    vm.event = {
      event_id: '',
      event_name: ''
    };

    vm.ok = function() {
      if (!vm.event.event_id) {
        vm.errorMessage = '请输入事件id';
      } else if (!vm.event.event_name) {
        vm.errorMessage = '请输入事件名';
      } else {
        CustomEventService.createEvent(vm.event).success(function() {
          $mdDialog.hide();
        }).error(function(err) {
          vm.errorMessage = err.message;
        });
      }
    };

    vm.cancel = function() {
      $mdDialog.cancel();
    };
  }

  /**
   * @ngInject
   */
  function EditCustomEventDialogCtrl($mdDialog, data, CustomEventService) {
    var vm = this;

    vm.event = data.event;

    vm.ok = function() {
      if (!vm.event.event_id) {
        vm.errorMessage = '请输入事件id';
      } else if (!vm.event.event_name) {
        vm.errorMessage = '请输入事件名';
      } else {
        CustomEventService.modifyEvent(vm.event).success(function() {
          $mdDialog.hide();
        }).error(function(err) {
          vm.errorMessage = err.message;
        });
      }
    };

    vm.cancel = function() {
      $mdDialog.cancel();
    };
  }

  /**
   * @ngInject
   */
  function DeleteCustomEventDialogCtrl($mdDialog, data, CustomEventService) {
    var vm = this;

    vm.event = data.event;

    vm.ok = function() {
      CustomEventService.deleteEvent(vm.event).success(function() {
        $mdDialog.hide();
      }).error(function(err) {
        vm.errorMessage = err.message;
      });
    };

    vm.cancel = function() {
      $mdDialog.cancel();
    };
  }

  angular
    .module('myou.dashboard.appdevelop.dataanalytic')
    .controller('CustomEventCtrl', CustomEventCtrl)
    .controller('AddCustomEventDialogCtrl', AddCustomEventDialogCtrl)
    .controller('EditCustomEventDialogCtrl', EditCustomEventDialogCtrl)
    .controller('DeleteCustomEventDialogCtrl', DeleteCustomEventDialogCtrl)
    .config(customEventConfig);

})();
