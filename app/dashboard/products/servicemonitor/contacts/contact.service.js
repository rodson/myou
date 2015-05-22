(function() {
  'use strict';

  angular.module('myou.dashboard.servicemonitor')
    .factory('ContactsService', ContactsService);


  function ContactsService($http, Constant) {
    var PROJECT_CONTACTS = 'project_contacts';

    var contactsService = {};
    contactsService.data = {};

    contactsService.getProjectContactList = function(appKey, cb) {
      return $http.get(Constant.URL.PRODUCTS_SERVICE_MONITOR + '/' + appKey + '/' + PROJECT_CONTACTS)
        .success(function(data) {
          contactsService.data.contacts = data;
          cb();
        });
    };

    contactsService.createProjectContact = function(appKey, contact, cb) {
      return $http.post(Constant.URL.PRODUCTS_SERVICE_MONITOR + '/' + appKey + '/' + PROJECT_CONTACTS, contact)
        .success(function(data) {
          cb(null);
        })
        .error(function(error) {
          console.log(error);
          cb(error);
        });
    };

    contactsService.modifyProjectContact = function(appKey, contactId, contact, cb) {
      return $http.put(Constant.URL.PRODUCTS_SERVICE_MONITOR + '/' + appKey + '/' + PROJECT_CONTACTS + '/' + contactId, contact)
        .success(function(data) {
          cb(null);
        })
        .error(function(error) {
          cb(error);
        });
    };

    contactsService.deleteProjectContact = function(appKey, contactId, cb) {
      return $http.delete(Constant.URL.PRODUCTS_SERVICE_MONITOR + '/' + appKey + '/' + PROJECT_CONTACTS + '/' + contactId)
        .success(function(data) {
          cb(null);
        })
        .error(function(error) {
          cb(error);
        });
    };

    return contactsService;
  }
})();
