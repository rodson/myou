'use strict';

describe('FileUploadCtrl: ', function() {
  var PlatformManager;
  var FileUploadService;
  var FileUploadCtrl;

  beforeEach(function() {
    module('myou.dashboard.appdevelop.appupdate');

    inject(function($controller,
      _PlatformManager_, _FileUploadService_) {

      PlatformManager = _PlatformManager_;
      FileUploadService = _FileUploadService_;
      FileUploadCtrl = $controller('FileUploadCtrl', {
        FileUploadService: FileUploadService,
        PlatformManager: PlatformManager
      });
    });

    spyOn(PlatformManager, 'isAndroidApp');
    spyOn(PlatformManager, 'isWindowsApp');
    spyOn(PlatformManager, 'isIosApp');
  });

  describe('fn: isXXXApp', function() {
    it('should call isAndroidApp on PlatformManager', function() {
      FileUploadCtrl.isAndroidApp('platform');
      expect(PlatformManager.isAndroidApp).toHaveBeenCalledWith('platform');
    });

    it('should call isWindowsApp on PlatformManager', function() {
      FileUploadCtrl.isWindowsApp('platform');
      expect(PlatformManager.isWindowsApp).toHaveBeenCalledWith('platform');
    });

    it('should call isIosApp on PlatformManager', function() {
      FileUploadCtrl.isIosApp('platform');
      expect(PlatformManager.isIosApp).toHaveBeenCalledWith('platform');
    });
  });

});
