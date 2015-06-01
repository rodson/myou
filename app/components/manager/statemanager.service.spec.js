'use strict';

describe('shared: StateManager', function() {
  var StateManager;
  var $state;
  var Constant;

  beforeEach(function() {
    module('myou.shared');

    inject(function(_$state_, _StateManager_, _Constant_) {
      $state = _$state_;
      StateManager = _StateManager_;
      Constant = _Constant_;
    });

    spyOn($state, 'go');
  });

  describe('fn: enterProduct ', function() {

    it('should call go on $state with appdevelop when androidapp', function() {
      var platform = Constant.PRODUCT_PLATFORM.ANDROID_APP;
      var id = 'qwerty';
      StateManager.enterProduct(platform, id);
      expect($state.go)
        .toHaveBeenCalledWith('dashboard.appdevelop.updatesetting', {id: id});
    });

    it('should call go on $state with appdevelop when windowsapp', function() {
      var platform = Constant.PRODUCT_PLATFORM.WINDOWS_APP;
      var id = 'qwerty';
      StateManager.enterProduct(platform, id);
      expect($state.go)
        .toHaveBeenCalledWith('dashboard.appdevelop.updatesetting', {id: id});
    });

    it('should call go on $state with appdevelop when iosapp', function() {
      var platform = Constant.PRODUCT_PLATFORM.IOS_APP;
      var id = 'qwerty';
      StateManager.enterProduct(platform, id);
      expect($state.go)
        .toHaveBeenCalledWith('dashboard.appdevelop.updatesetting', {id: id});
    });

    it('should call go on $state with systemupdate.updatesetting when systemupdate', function() {
      var platform = Constant.PRODUCT_PLATFORM.SYSTEM_UPDATE;
      var id = 'qwerty';
      StateManager.enterProduct(platform, id);
      expect($state.go).toHaveBeenCalledWith('dashboard.systemupdate.updatesetting', {id: id});
    });

    it('should call go on $state with servicemonitor when servicemonitor', function() {
      var platform = Constant.PRODUCT_PLATFORM.SERVICE_MONITOR;
      var id = 'qwerty';
      StateManager.enterProduct(platform, id);
      expect($state.go).toHaveBeenCalledWith('dashboard.servicemonitor.dailydata', {id: id});
    });

    it('should call go on $state with webpublish when webpublish', function() {
      var platform = Constant.PRODUCT_PLATFORM.WEB_PUBLISH;
      var id = 'qwerty';
      StateManager.enterProduct(platform, id);
      expect($state.go).toHaveBeenCalledWith('dashboard.webpublish', {id: id});
    });

    it('should call go on $state with pageanalytic when pageanalytic', function() {
      var platform = Constant.PRODUCT_PLATFORM.PAGE_ANALYTIC;
      var id = 'qwerty';
      StateManager.enterProduct(platform, id);
      expect($state.go).toHaveBeenCalledWith('dashboard.pageanalytic.global', {id: id});
    });

  });

});
