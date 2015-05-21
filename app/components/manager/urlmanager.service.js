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

    UrlManager.getAnalyzeKeyDataUrl = function(appKey) {
      return Constant.URL.ANALYZE_URL + '/' + appKey + '/key_data';
    };

    return UrlManager;
  }

  angular
    .module('myou.shared')
    .factory('UrlManager', UrlManager);
})();
