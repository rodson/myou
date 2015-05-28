(function() {
  'use strict';

  function systemUpdateConfig($stateProvider) {
    $stateProvider
      .state('dashboard.systemupdate', {
        url: '/systemupdate/:id',
        templateUrl: 'app/dashboard/products/systemupdate/systemupdate.html',
        controllerAs: 'vm',
        controller: 'SystemUpdateCtrl',
        resolve: SystemUpdateCtrl.resolve
      });
  }

  function SystemUpdateCtrl(SystemUpdateService) {
    var vm = this;

    SystemUpdateService.init();

    vm.app = SystemUpdateService.app;
    vm.updateInfos = SystemUpdateService.updateInfos;

    vm.showUploadDialog = function(ev) {
      SystemUpdateService.showUploadDialog(ev);
    };
  }

  SystemUpdateCtrl.resolve = {
    getUpdateInfos: function(SystemUpdateService) {
      return SystemUpdateService.getUpdateInfos();
    }
  };

  function SystemUploadDialogCtrl($scope, $mdDialog, SystemUpdateService, SparkMD5Manager) {
    var vm = this;

    vm.uploadData = SystemUpdateService.uploadData;

    SystemUpdateService.resetFileUpload();

    vm.onFileSelect = function(files) {
      vm.uploadData.progress = 0;
      vm.uploadData.md5 = null;
      vm.uploadData.errorMessage = '';
      if (SystemUpdateService.onFileSelect(files)) {
        SparkMD5Manager.incrementalCalMD5(SystemUpdateService.uploadData.file, function(current, total) {
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
      SystemUpdateService.upload();
    };

    vm.cancel = function() {
      $mdDialog.cancel();
    };

  }

  function SystemUploadProgressDialogCtrl($mdDialog, data, SystemUpdateService, Upload) {
    var vm = this;
    var uploader;

    vm.progress = 0;
    vm.isSuccess = false;
    vm.isError = false;

    SystemUpdateService.getQiniuToken(data.srcVersion, data.targetVersion, data.fileName)
      .success(function(returnData) {
        var uploadData = {
          'token': returnData.token,
          'key': returnData.key,
          'x:srcVersion': data.srcVersion,
          'x:targetVersion': data.targetVersion,
          'x:appKey': SystemUpdateService.app.appKey,
          'x:updateDesc': SystemUpdateService.uploadData.updateDesc,
          'x:fileName': data.fileName,
          'x:appid': 'myou',
          'x:platform': SystemUpdateService.app.platform,
          'x:id': SystemUpdateService.app._id,
          'x:token': returnData.token,
          'x:fileMd5': SystemUpdateService.uploadData.md5
        };

        uploader = Upload.upload({
          url: returnData.uploadUrl,
          data: uploadData,
          mothod: 'POST',
          file: SystemUpdateService.uploadData.file
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
    .controller('SystemUpdateCtrl', SystemUpdateCtrl)
    .controller('SystemUploadDialogCtrl', SystemUploadDialogCtrl)
    .controller('SystemUploadProgressDialogCtrl', SystemUploadProgressDialogCtrl)
    .config(systemUpdateConfig);

})();
