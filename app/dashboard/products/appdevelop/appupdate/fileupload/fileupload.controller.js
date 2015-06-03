(function() {
  'use strict';

  /**
   * @ngInject
   */
  function fileUploadConfig($stateProvider) {
    $stateProvider
      .state('dashboard.appdevelop.fileupload', {
        url: '/fileupload',
        templateUrl: 'app/dashboard/products/appdevelop/appupdate/fileupload/fileupload.html',
        controllerAs: 'vm',
        controller: 'FileUploadCtrl',
        resolve: FileUploadCtrl.resolve
      });
  }

  /**
   * @ngInject
   */
  function FileUploadCtrl(FileUploadService, localStorageService, $mdDialog) {

    var vm = this;

    vm.app = localStorageService.get('app');

    FileUploadService.init();

    vm.uploadData = FileUploadService.uploadData;

    vm.checkAppType = function(type) {
      return FileUploadService.checkAppType(vm.app.platform, type);
    };

    vm.onFileSelect = function(files, type) {
      FileUploadService.onFileSelect(files, type);
    };

    vm.upload = function() {
      FileUploadService.upload(vm.app);
    };

    vm.abortUpload = function() {
      FileUploadService.abortUpload();
    };
  }

  FileUploadCtrl.resolve = {
    /**
     * @ngInject
     */
    getData: function(getApp) {
      return getApp;
    }
  };

  angular
    .module('myou.dashboard.appdevelop.appupdate')
    .controller('FileUploadCtrl', FileUploadCtrl)
    .config(fileUploadConfig);

})();
