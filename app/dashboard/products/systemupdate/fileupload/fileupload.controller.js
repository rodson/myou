(function() {
  'use strict';

  /**
   * @ngInject
   */
  function romFileUploadConfig($stateProvider) {
    $stateProvider
      .state('dashboard.systemupdate.fileupload', {
        url: '/fileupload',
        templateUrl: 'app/dashboard/products/systemupdate/fileupload/fileupload.html',
        controllerAs: 'vm',
        controller: 'RomFileUploadCtrl',
        resolve: RomFileUploadCtrl.resolve
      });
  }

  /**
   * @ngInject
   */
  function RomFileUploadCtrl($scope, RomFileUploadService, SparkMD5Manager, StorageManager, $timeout) {
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

    /********************** userself start *********************/
    var model = 0;
    vm.allModel = ['upload', 'userself'];
    vm.nextModel = vm.allModel[1];

    var product = StorageManager.getApp();

    vm.switchModle = function() {
      vm.nextModel = vm.allModel[model++ % 2];
    };

    vm.selfUpload = function() {
      var regUrl = /^((http|https|ftp):\/\/)?(\w(\:\w)?@)?([0-9a-z_-]+\.)*?([a-z0-9-]+\.[a-z]{2,6}(\.[a-z]{2})?(\:[0-9]{2,6})?)((\/[^?#<>\/\\*":]*)+(\?[^#]*)?(#.*)?)?$/i;
      if (!vm.custom.fileName) {
        vm.errorTip = '请输入文件名';
      } else if (!vm.custom.fileSrc) {
        vm.errorTip = '请输入文件地址';
      } else if (!regUrl.test(vm.custom.fileSrc)) {
        vm.errorTip = '请输入正确的URL地址';
      } else if (!vm.custom.fileSize) {
        vm.errorTip = '请输入文件大小';
      } else if (!Number(vm.custom.fileSize)) {
        vm.errorTip = '文件大小框请输入数字';
      } else if (!vm.custom.md5) {
        vm.errorTip = '请输入文件MD5';
      } else if (vm.custom.md5.length !== 32) {
        vm.errorTip = '请输入包含32位字符的MD5，现在为' + vm.custom.md5.length + '位字符';
      } else if (!/^[0-9a-z]{32}$/gi.test(vm.custom.md5)) {
        vm.errorTip = '请输入正确的MD5，由0-9，a-z，A-Z组成';
      } else if (!vm.custom.fileDesc) {
        vm.errorTip = '请输入文件描述';
      } else if (!vm.custom.srcVersion) {
        vm.errorTip = '请输入源版本';
      } else if (!vm.custom.targetVersion) {
        vm.errorTip = '请输入目标版本';
      } else {
        var data = {
          srcVersion: vm.custom.srcVersion,
          targetVersion: vm.custom.targetVersion,
          appKey: product.appKey,
          updateDesc: vm.custom.fileDesc,
          fileName: vm.custom.fileName,
          fsize: Number(vm.custom.fileSize),
          downUrl: vm.custom.fileSrc,
          fileMd5: vm.custom.md5
        };
        RomFileUploadService.selfUpload(product._id, data, function(error) {
          vm.errorTip = error.message;
        });
      }
      $timeout(function() {
        vm.errorTip = '';
      }, 5000);
    };
    /********************** userself end *********************/

  }

  RomFileUploadCtrl.resolve = {
    /**
     * @ngInject
     */
    getData: function(getApp) {
      return getApp;
    }
  };

  /**
   * @ngInject
   */
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
          fields: uploadData,
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
