(function() {
  'use strict';

  function fileUploadConfig($stateProvider) {
    $stateProvider
      .state('dashboard.appdevelop.fileupload', {
        url: '/fileupload',
        templateUrl: 'app/dashboard/products/appdevelop/appupdate/fileupload/fileupload.html',
        controllerAs: 'vm',
        controller: 'FileUploadCtrl'
      });
  }

  function FileUploadCtrl() {

  }

  angular
    .module('myou.dashboard.appdevelop.appupdate')
    .controller('FileUploadCtrl', FileUploadCtrl)
    .config(fileUploadConfig);

})();
