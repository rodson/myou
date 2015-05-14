'use strict';

describe('FileUploadCtrl: ', function() {
  var FileUploadService;
  var FileUploadCtrl;
  var localStorageService;

  beforeEach(function() {
    module('myou.dashboard.appdevelop.appupdate');

    inject(function($controller, _localStorageService_, _FileUploadService_) {

      localStorageService = _localStorageService_;
      FileUploadService = _FileUploadService_;

      spyOn(localStorageService, 'get');
      spyOn(FileUploadService, 'checkAppType');
      spyOn(FileUploadService, 'onFileSelect');
      spyOn(FileUploadService, 'upload');

      FileUploadCtrl = $controller('FileUploadCtrl', {
        FileUploadService: FileUploadService,
        localStorageService: localStorageService
      });
    });

  });

  it('should get the application info from localstorage', function() {
    expect(localStorageService.get).toHaveBeenCalledWith('app');
  });

  describe('fn: checkAppType ', function() {
    var type;
    beforeEach(function() {
      type = 'type';
      FileUploadCtrl.app = {
        platform: 'platform'
      };
    });

    it('should call checkAppType on FileUploadService', function() {
      FileUploadCtrl.checkAppType(type);
      expect(FileUploadService.checkAppType)
        .toHaveBeenCalledWith(FileUploadCtrl.app.platform, type);
    });
  });

  describe('fn: onFileSelect ', function() {
    it('should call onFileSelect on FileUploadService', function() {
      var files = '';
      var type = '';
      FileUploadCtrl.onFileSelect(files, type);
      expect(FileUploadService.onFileSelect)
        .toHaveBeenCalledWith(files, type);
    });
  });

  describe('fn: upload ', function() {
    it('should call upload on FileUploadService', function() {
      FileUploadCtrl.app = {
        platform: 'app'
      };
      FileUploadCtrl.upload();
      expect(FileUploadService.upload)
        .toHaveBeenCalledWith(FileUploadCtrl.app);
    });

  });

});
