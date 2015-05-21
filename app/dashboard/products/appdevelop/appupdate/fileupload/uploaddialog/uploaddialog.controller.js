(function() {
  'use strict';

  function UploadDialogCtrl($mdDialog, Upload, data, $state) {
    var vm = this;
    var uploader;

    vm.progress = 0;
    vm.isSuccess = false;
    vm.isError = false;

    uploader = Upload.upload({
      url: data.uploadUrl,
      fields: data.appendData,
      file: data.fileValues,
      fileFormDataName: data.fileKeys
    })
    .progress(onProgress)
    .success(onSuccess)
    .error(onError);

    vm.cancel = function() {
      if (uploader) {
        uploader.abort();
      }
      uploader = null;
      $mdDialog.cancel();
    };

    vm.ok = function() {
      $mdDialog.cancel();
      $state.go('dashboard.appdevelop.updatesetting');
    };

    function onProgress(evt) {
      vm.progress = parseInt(100.0 * evt.loaded / evt.total);
    }

    function onSuccess(data) {
      vm.isSuccess = true;
    }

    function onError(data) {
      vm.isError = true;
    }

  }

  angular
    .module('myou.dashboard.appdevelop.appupdate')
    .controller('UploadDialogCtrl', UploadDialogCtrl);

})();
