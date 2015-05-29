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

  function RomFileUploadCtrl($scope, RomFileUploadService, SparkMD5Manager) {
    var vm = this;

    RomFileUploadService.init();
    vm.uploadData = RomFileUploadService.uploadData;

    vm.onFileSelect = function(files) {
      if (RomFileUploadService.onFileSelect(files)) {
        SparkMD5Manager.incrementalCalMD5(RomFileUploadService.uploadData.file, function(current, total) {
          $scope.$apply(function() {
            vm.uploadData.progress = Math.min(100, parseInt(100.0 * current / total));
          });
        }, function(err, md5) {
          if (err) {
            $scope.$apply(function() {
              vm.uploadData.errorMessage = err;
            });
          } else {
            $scope.$apply(function() {
              vm.uploadData.md5 = md5;
            });
          }
        });
      }
    };

    vm.upload = function() {
      RomFileUploadService.upload();
    };
  }

  function RomUploadProgressDialogCtrl($mdDialog, data, RomFileUploadService, Upload) {
    var vm = this;
    var uploader;

    vm.progress = 0;
    vm.isSuccess = false;
    vm.isError = false;

    RomFileUploadService.getQiniuToken(data.srcVersion, data.targetVersion, data.fileName)
      .success(function(returnData) {
        var uploadData = {
          'token': returnData.token,
          'key': returnData.key,
          'x:srcVersion': data.srcVersion,
          'x:targetVersion': data.targetVersion,
          'x:appKey': RomFileUploadService.app.appKey,
          'x:updateDesc': RomFileUploadService.uploadData.versionDesc,
          'x:fileName': data.fileName,
          'x:appid': 'myou',
          'x:platform': RomFileUploadService.app.platform,
          'x:id': RomFileUploadService.app._id,
          'x:token': returnData.token,
          'x:fileMd5': RomFileUploadService.uploadData.md5
        };

        uploader = Upload.upload({
          url: returnData.uploadUrl,
          data: uploadData,
          mothod: 'POST',
          file: RomFileUploadService.uploadData.file
        })
        .progress(onProgress)
        .success(onSuccess)
        .error(onError);
      }).error(function() {
        vm.isError = true;
      });

    vm.cancel = function() {
      if (uploader) {
        uploader.abort();
      }
      uploader = null;
      $mdDialog.cancel();
    };

    vm.ok = function() {
      $mdDialog.hide();
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
    .module('myou.dashboard.systemupdate')
    .controller('RomFileUploadCtrl', RomFileUploadCtrl)
    .controller('RomUploadProgressDialogCtrl', RomUploadProgressDialogCtrl)
    .config(romFileUploadConfig);

})();
