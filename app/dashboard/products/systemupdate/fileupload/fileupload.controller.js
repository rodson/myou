(function() {
  'use strict';

  function romFileUploadConfig($stateProvider) {
    $stateProvider
      .state('dashboard.systemupdate.fileupload', {
        url: '/fileupload',
        templateUrl: 'app/dashboard/products/systemupdate/fileupload/fileupload.html',
        controllerAs: 'vm',
        controller: 'RomFileUploadCtrl'
      });
  }

  function RomFileUploadCtrl() {

  }

  angular
    .module('myou.dashboard.systemupdate')
    .controller('RomFileUploadCtrl', RomFileUploadCtrl)
    .config(romFileUploadConfig);

})();
