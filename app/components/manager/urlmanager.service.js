(function() {
  'use strict';

  /**
   * @ngInject
   */
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

    UrlManager.getAnalyzeCustomEventUrl = function(appKey) {
      return Constant.URL.ANALYZE_URL + '/' + appKey + '/custom_events';
    };

    UrlManager.getCustomEventUrl = function(appKey) {
      return Constant.URL.CUSTOMEVENT_API + '/' + appKey + '/custom_events';
    };

    UrlManager.getEventVersionUrl = function(appKey, eventId) {
      return Constant.URL.ANALYZE_URL + '/' + appKey + '/custom_events' +
        '/version_list/' + eventId;
    };

    UrlManager.getEventReportUrl = function(appKey, eventId) {
      return Constant.URL.ANALYZE_URL + '/' + appKey +
        '/custom_events/report/' + eventId;
    };

    UrlManager.getEventLabelUrl = function(appKey, eventId) {
      return Constant.URL.ANALYZE_URL + '/' + appKey +
        '/custom_events/value_stats/' + eventId;
    };

    UrlManager.getUserRetainUrl = function(appKey) {
      return Constant.URL.ANALYZE_URL + '/' + appKey + '/user_retain';
    };

    UrlManager.getDeviceUrl = function(appKey) {
      return Constant.URL.ANALYZE_URL + '/' + appKey + '/device_stats';
    };

    UrlManager.getTestDeviceUrl = function(appId) {
      return Constant.URL.PRODUCTS + '/' + appId + '/testDevices';
    };

    UrlManager.getWebIpUrl = function(appId) {
      return Constant.URL.PRODUCTS + '/' + appId + '/update/webIPs';
    };

    UrlManager.getWebIpRefreshUrl = function(appId) {
      return Constant.URL.PRODUCTS + '/' + appId + '/webapp/publishIps';
    };

    UrlManager.getWebPublishUrl = function(appId, versionId) {
      return Constant.URL.PRODUCTS + '/' + appId +
        '/update/versions/' + versionId + '/publish';
    };

    UrlManager.getUpdateIpUrl = function(appId) {
      return Constant.URL.PRODUCTS + '/' + appId + '/webapp/publishIps';
    };

    return UrlManager;
  }

  angular
    .module('myou.shared')
    .factory('UrlManager', UrlManager);
})();
