(function() {
  'use strict';

  function UrlManager(Constant) {
    var UrlManager = {};

    UrlManager.getUploadUrl = function(id, platform) {
      return Constant.URL.PRODUCTS + '/' + id +
        '/update/versions' + '?platform=' + platform;
    };

    UrlManager.getAppUpdateInfoUrl = function(id) {
      return Constant.URL.PRODUCTS + '/' + id + '/update/versions';
    };

    UrlManager.getFileSyncUrl = function(platform, appKey, fileName) {
      return Constant.URL.FILE_SYNC + '/' + platform + '/' + appKey + '/' + fileName;
    };

    UrlManager.getUpdateConfigUrl = function(id) {
      return Constant.URL.PRODUCTS + '/' + id + '/updateConfig';
    };

    return UrlManager;
  }

  angular
    .module('myou.shared')
    .factory('UrlManager', UrlManager);
})();
