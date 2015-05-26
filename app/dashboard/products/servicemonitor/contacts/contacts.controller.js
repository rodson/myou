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

  function ContactsCtrl($mdDialog, localStorageService, ContactsService) {
    var vm = this;
    var product = localStorageService.get('app');
    var appID = localStorageService.get('appId');

    vm.contacts = [];

    vm.getContacts = function() {
      ContactsService.getProjectContactList(product.appKey, function() {
        vm.contacts = ContactsService.data.contacts;
      });
    };

    vm.showAddContactDialog = function(ev) {
      $mdDialog.show({
        controller: AddContactDialogCtrl,
        controllerAs: 'vm',
        templateUrl: 'addProjectContactModal.html',
        targetEvent: ev,
        resolve: {
          data: function() {
            return {
              appKey: product.appKey,
              appId: appID
            };
          }
        }
      }).then(function(error) {
          vm.showAlert(error);
        },
        function() {});
    };

    vm.showEditContactDialog = function(ev, dt) {
      $mdDialog.show({
        controller: EditContactDialogCtrl,
        controllerAs: 'vm',
        templateUrl: 'addProjectContactModal.html',
        targetEvent: ev,
        resolve: {
          data: function() {
            return {
              appKey: product.appKey,
              contact: dt
            };
          }
        }
      }).then(function(error) {
          vm.showAlert(error);
        },
        function() {});
    };

    vm.showDeleteContactDialog = function(ev, dt) {
      $mdDialog.show({
        controller: DeleteContactModalDialogCtrl,
        controllerAs: 'vm',
        templateUrl: 'deleteContactModal.html',
        targetEvent: ev,
        resolve: {
          data: function() {
            return {
              appKey: product.appKey,
              contact: dt
            };
          }
        }
      }).then(function(error) {
          vm.showAlert(error);
        },
        function() {});
    };

    vm.showAlert = function(error) {
      $mdDialog.show(
        $mdDialog.alert()
        .title(!!error ? 'Error' : 'Success')
        .content(error && error.message)
        .ariaLabel('Alert Dialog')
        .ok('关闭')
      );
      if (!error) {
        vm.getContacts();
      }
    };

    vm.getContacts();
  }

  function AddContactDialogCtrl($mdDialog, data, ContactsService) {
    var vm = this;
    vm.title = '添加联系人';
    vm.ok = function() {
      if (!vm.name || !vm.phone || !vm.email) {
        return;
      }

      var contact = {
        app_id: data.appId,
        name: vm.name,
        phone_number: vm.phone,
        email: vm.email
      };

      ContactsService.createProjectContact(data.appKey, contact, function(error) {
        if (error) {
          $mdDialog.hide(error);
        } else {
          $mdDialog.hide();
        }
      });
    };

    vm.cancel = function(event) {
      event.preventDefault();
      $mdDialog.cancel();
    };
  }

  function EditContactDialogCtrl($mdDialog, data, ContactsService) {
    var vm = this;
    vm.title = '编辑联系人';
    vm.name = data.contact.name;
    vm.phone = data.contact.phone_number;
    vm.email = data.contact.email;

    vm.ok = function() {
      if (!vm.name || !vm.phone || !vm.email) {
        return;
      }

      if (vm.name === data.contact.name && vm.phone === data.contact.phone_number && vm.email === data.contact.email) {
        $mdDialog.cancel();
        return;
      }

      var contact = {
        contact_id: data.contact.contact_id,
        name: vm.name,
        phone_number: vm.phone,
        email: vm.email
      };

      ContactsService.modifyProjectContact(data.appKey, data.contact.contact_id, contact, function(error) {
        if (error) {
          $mdDialog.hide(error);
        } else {
          $mdDialog.hide();
        }
      });
    };

    vm.cancel = function(event) {
      event.preventDefault();
      $mdDialog.cancel();
    };
  }

  function DeleteContactModalDialogCtrl($mdDialog, data, ContactsService) {
    var vm = this;
    vm.name = data.contact.name;

    vm.ok = function() {
      ContactsService.deleteProjectContact(data.appKey, data.contact.contact_id, function(error) {
        $mdDialog.hide(error);
      });
    };

    vm.cancel = function() {
      $mdDialog.cancel();
    };
  }

  angular
    .module('myou.dashboard.servicemonitor')
    .controller('ContactsCtrl', ContactsCtrl)
    .config(ContactsConfig);

})();
