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

  function FileUploadCtrl(FileUploadService, PlatformManager) {
    var vm = this;

    vm.isAndroidApp = function(platform) {
      return PlatformManager.isAndroidApp(platform);
    };

    vm.isWindowsApp = function(platform) {
      return PlatformManager.isWindowsApp(platform);
    };

    vm.isIosApp = function(platform) {
      return PlatformManager.isIosApp(platform);
    };

  }

  angular
    .module('myou.dashboard.appdevelop.appupdate')
    .controller('FileUploadCtrl', FileUploadCtrl)
    .config(fileUploadConfig);

})();
