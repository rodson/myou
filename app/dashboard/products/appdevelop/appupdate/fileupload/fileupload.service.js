(function() {
  'use strict';

  function FileUploadService(PlatformManager, UrlManager,
    $mdDialog, Upload, Constant) {

    var FileUploadService = {};
    var uploader;

    FileUploadService.uploadData = {};

    FileUploadService.checkAppType = function(platform, type) {
      switch(type) {
        case 'android':
          return PlatformManager.isAndroidApp(platform);
        case 'windows':
          return PlatformManager.isWindowsApp(platform);
        case 'ios':
          return PlatformManager.isIosApp(platform);
        default:
          return false;
      }
    };

    FileUploadService.onFileSelect = function(files, type) {
      if (!files || !files.length) {
        return false;
      }

      var file = files[0];
      var extension = file.name.split('.').pop();

      if (extension === type) {
        FileUploadService.uploadData[type] = file;
      } else {
        var errorMsg = '请选择' + type + '文件';
        $mdDialog.show(
          $mdDialog.alert()
            .content(errorMsg)
            .ariaLabel('select file type')
            .ok('知道了')
        );
      }
    };

    FileUploadService.upload = function(app) {
      switch(app.platform) {
        case Constant.PRODUCT_PLATFORM.ANDROID_APP:
          return uploadAndroidApp(app);
        case Constant.PRODUCT_PLATFORM.WINDOWS_APP:
          return uploadWindowsApp(app);
        case Constant.PRODUCT_PLATFORM.IOS_APP:
          return;
      }
    };

    FileUploadService.abortUpload = function() {
      if (uploader) {
        uploader.abort();
        uploader = null;
      }
    };

    function uploadAndroidApp(app) {
      var errorMsg;

      if (!FileUploadService.uploadData.apk) {
        errorMsg = '请选择apk文件';
        $mdDialog.show(
          $mdDialog.alert()
            .content(errorMsg)
            .ariaLabel('select apk')
            .ok('知道了')
        );
        return errorMsg;
      }

      var uploadFile = {
        apkFile: FileUploadService.uploadData.apk
      };

      var appendData = {
        updateDesc: FileUploadService.uploadData.updateDesc
      };

      doUpload(app, uploadFile, appendData);
    }

    function uploadWindowsApp(app) {
      var errorMsg;
      if (!FileUploadService.uploadData.zip) {
        errorMsg = '请选择zip文件';
        $mdDialog.show(
          $mdDialog.alert()
            .content(errorMsg)
            .ariaLabel('select zip')
            .ok('知道了')
        );
        return errorMsg;
      }

      if (!FileUploadService.uploadData.exe) {
        errorMsg = '请选择exe文件';
        $mdDialog.show(
          $mdDialog.alert()
            .content(errorMsg)
            .ariaLabel('select exe')
            .ok('知道了')
        );
        return errorMsg;
      }

      var uploadFile = {
        zipFile: FileUploadService.uploadData.zip,
        exeFile: FileUploadService.uploadData.exe
      };

      var appendData = {
        updateDesc: FileUploadService.uploadData.updateDesc
      };

      doUpload(app, uploadFile, appendData);
    }

    function doUpload(app, uploadFile, appendData) {
      var uploadUrl = UrlManager.getUploadUrl(app._id, app.platform);
      var fileKeys = [];
      var fileValues = [];

      for (var fileKey in uploadFile) {
        if (uploadFile.hasOwnProperty(fileKey)) {
          fileKeys.push(fileKey);
          fileValues.push(uploadFile[fileKey]);
        }
      }

      $mdDialog.show({
        templateUrl: 'app/dashboard/products/appdevelop/appupdate/fileupload/uploaddialog/uploaddialog.html',
        controller: 'UploadDialogCtrl',
        controllerAs: 'vm',
        clickOutsideToClose: false
      });

      // uploader = Upload.upload({
      //   url: uploadUrl,
      //   fields: appendData,
      //   file: fileValues,
      //   fileFormDataName: fileKeys
      // })
      // .progress(onProgress)
      // .success(onSuccess)
      // .error(onError);

    }

    function onProgress(evt) {
      console.log('progress: ' + parseInt(100.0 * evt.loaded / evt.total) + '% file :'+ evt.config.file.name);
    }

    function onSuccess(data) {
      console.log('upload success');
      console.log(data);

    }

    function onError(data) {
      console.log('upload error');
      console.log(data);
    }


    return FileUploadService;
  }

  angular
    .module('myou.dashboard.appdevelop.appupdate')
    .factory('FileUploadService', FileUploadService);

})();
