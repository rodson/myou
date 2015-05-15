'use strict';

describe('UrlManager', function() {
  var UrlManager;
  var Constant;

  beforeEach(function() {
    module('myou.shared');

    inject(function(_UrlManager_, _Constant_) {
      UrlManager = _UrlManager_;
      Constant = _Constant_;
    });
  });

  it('should return upload file url', function() {
    var id = 'qwerty';
    var platform = 'android_app';
    var expectedUrl
      = Constant.URL.PRODUCTS + '/qwerty/update/versions?platform=android_app';
    expect(UrlManager.getUploadUrl(id, platform)).toEqual(expectedUrl);
  });

  it('should return app update info url', function() {
    var id = 'qwerty';
    var expectedUrl = Constant.URL.PRODUCTS + '/qwerty/update/versions';
    expect(UrlManager.getAppUpdateInfoUrl(id)).toEqual(expectedUrl);

  });

});
