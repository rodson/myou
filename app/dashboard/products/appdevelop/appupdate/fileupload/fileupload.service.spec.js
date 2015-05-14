'use strict';

describe('FileUploadService: ', function() {
  var FileUploadService;
  var Constant;
  var $mdToast;

  beforeEach(function() {
    module('myou.dashboard.appdevelop.appupdate');

    inject(function(_FileUploadService_, _$mdToast_, _Constant_) {
      FileUploadService = _FileUploadService_;
      $mdToast = _$mdToast_;
      Constant = _Constant_;

      spyOn($mdToast, 'show');
    });
  });

  describe('fn: checkAppType ', function() {
    it('should return true if type equals to platform', function() {
      expect(FileUploadService.checkAppType(
        Constant.PRODUCT_PLATFORM.ANDROID_APP, 'android')).toBe(true);
      expect(FileUploadService.checkAppType(
        Constant.PRODUCT_PLATFORM.WINDOWS_APP, 'windows')).toBe(true);
      expect(FileUploadService.checkAppType(
        Constant.PRODUCT_PLATFORM.IOS_APP, 'ios')).toBe(true);
    });

    it('should return false if type does not equal to platform', function() {
      expect(FileUploadService.checkAppType(
        Constant.PRODUCT_PLATFORM.ANDROID_APP, 'windows')).toBe(false);
      expect(FileUploadService.checkAppType(
        Constant.PRODUCT_PLATFORM.WINDOWS_APP, 'ios')).toBe(false);
      expect(FileUploadService.checkAppType(
        Constant.PRODUCT_PLATFORM.IOS_APP, 'android')).toBe(false);
    });
  });

  describe('fn: onFileSelect ', function() {
    it('should return false if files is not valid', function() {
      var files;
      expect(FileUploadService.onFileSelect(files)).toBe(false);
      files = [];
      expect(FileUploadService.onFileSelect(files)).toBe(false);
    });

    it('should show err msg when file extension is not valid', function() {
      var files = [];
      var file = {name: 'launcher.app'};
      files.push(file);
      FileUploadService.onFileSelect(files, 'apk');
      expect($mdToast.show).toHaveBeenCalled();
    });

    it('should add to upload data if file extension is valid', function() {
      var files = [];
      var file = {name: 'launcher.apk'};
      files.push(file);
      FileUploadService.onFileSelect(files, 'apk');
      expect(FileUploadService.uploadData.apk).toEqual(file);
    });
  });

  describe('fn: upload ', function() {
    it('should show err msg if upload data is invalid', function() {
      var result;
      FileUploadService.uploadData = {
      };

      result = FileUploadService
        .upload({platform: Constant.PRODUCT_PLATFORM.ANDROID_APP});
      expect($mdToast.show).toHaveBeenCalled();
      expect(result).toEqual('请选择apk文件');

      result = FileUploadService
        .upload({platform: Constant.PRODUCT_PLATFORM.WINDOWS_APP});
      expect($mdToast.show).toHaveBeenCalled();
      expect(result).toEqual('请选择zip文件');

      FileUploadService.uploadData.zip = 'zip';
      result = FileUploadService
        .upload({platform: Constant.PRODUCT_PLATFORM.WINDOWS_APP});
      expect($mdToast.show).toHaveBeenCalled();
      expect(result).toEqual('请选择exe文件');
    });
  });
});
