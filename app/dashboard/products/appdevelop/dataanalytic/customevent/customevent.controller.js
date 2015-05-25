(function() {
  'use strict';

  function customEventConfig($stateProvider) {
    $stateProvider
      .state('dashboard.appdevelop.customevent', {
        url: '/customevent',
        templateUrl: 'app/dashboard/products/appdevelop/dataanalytic/customevent/customevent.html',
        controllerAs: 'vm',
        controller: 'CustomEventCtrl',
        resolve: CustomEventCtrl.resolve
      });
  }

  function CustomEventCtrl(CustomEventService) {
    var vm = this;

    CustomEventService.init();

    vm.versions = CustomEventService.versions;

    vm.events = CustomEventService.events;

    vm.selectedVersion = '';

    vm.onVersionSelect = function() {
      CustomEventService.getEvents(vm.selectedVersion)
        .then(function() {
          vm.events = CustomEventService.events;
        });
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
    getEvents: function(CustomEventService) {
      return CustomEventService.getEvents();
    },

    getEventVersions: function(CustomEventService) {
      return CustomEventService.getEventVersions();
    }
  };

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
