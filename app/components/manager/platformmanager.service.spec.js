'use strict';
describe('shared: PlatformManager', function() {
  var PlatformManager;
  var Constant;

  beforeEach(function() {
    module('myou.shared');

    inject(function(_PlatformManager_, _Constant_) {
      PlatformManager = _PlatformManager_;
      Constant = _Constant_;
    });
  });

  describe('fn: showPlatformName ', function() {

    it('should return Android应用 when passing androidapp', function() {
      var result = PlatformManager
        .showPlatformName(Constant.PRODUCT_PLATFORM.ANDROID_APP);
      expect(result).toEqual('Android应用');
    });

    it('should return Windows应用 when passing windowsapp', function() {
      var result = PlatformManager
        .showPlatformName(Constant.PRODUCT_PLATFORM.WINDOWS_APP);
      expect(result).toEqual('Windows应用');
    });

    it('should return IOS应用 when passing iosapp', function() {
      var result = PlatformManager
        .showPlatformName(Constant.PRODUCT_PLATFORM.IOS_APP);
      expect(result).toEqual('IOS应用');
    });

    it('should return 系统升级 when passing systemupdate', function() {
      var result = PlatformManager
        .showPlatformName(Constant.PRODUCT_PLATFORM.SYSTEM_UPDATE);
      expect(result).toEqual('系统升级');
    });

    it('should return 接口监控 when passing servicemonitor', function() {
      var result = PlatformManager
        .showPlatformName(Constant.PRODUCT_PLATFORM.SERVICE_MONITOR);
      expect(result).toEqual('接口监控');
    });

    it('should return WEB发布 when passing webpublish', function() {
      var result = PlatformManager
        .showPlatformName(Constant.PRODUCT_PLATFORM.WEB_PUBLISH);
      expect(result).toEqual('WEB发布');
    });

    it('should return 页面分析 when passing pageanalytic', function() {
      var result = PlatformManager
        .showPlatformName(Constant.PRODUCT_PLATFORM.PAGE_ANALYTIC);
      expect(result).toEqual('页面分析');
    });
  });

  describe('fn isXXXApp: ', function() {
    it('should return true if the platform is android app', function() {
      expect(PlatformManager
        .isAndroidApp(Constant.PRODUCT_PLATFORM.ANDROID_APP)).toBe(true);
    });

    it('should return false if the platform is not android app', function() {
      expect(PlatformManager
        .isAndroidApp(Constant.PRODUCT_PLATFORM.WINDOWS_APP)).toBe(false);
    });

    it('should return true if the platform is windows app', function() {
      expect(PlatformManager
        .isWindowsApp(Constant.PRODUCT_PLATFORM.WINDOWS_APP)).toBe(true);
    });

    it('should return false if the platform is not windows app', function() {
      expect(PlatformManager
        .isWindowsApp(Constant.PRODUCT_PLATFORM.IOS_APP)).toBe(false);
    });

    it('should return true if the platform is ios app', function() {
      expect(PlatformManager
        .isIosApp(Constant.PRODUCT_PLATFORM.IOS_APP)).toBe(true);
    });

    it('should return false if the platform is not ios app', function() {
      expect(PlatformManager
        .isIosApp(Constant.PRODUCT_PLATFORM.ANDROID_APP)).toBe(false);
    });
  });
});
