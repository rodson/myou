(function() {
  'use strict';

  function UrlManager(Constant) {
    var UrlManager = {};

    UrlManager.getUploadUrl = function(id, platform) {
      return Constant.URL.PRODUCTS + '/' + id + '/update/versions' + '?platform=' + platform;
    };

    return UrlManager;
  }

  angular
    .module('myou.shared')
    .factory('UrlManager', UrlManager);
})();
