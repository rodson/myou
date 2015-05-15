'use strict';

describe('UpdateSettingService', function() {
  var UpdateSettingService;
  var UrlManager;
  var $httpBackend;

  beforeEach(function() {
    module('myou.dashboard.appdevelop.appupdate');

    inject(function(_UpdateSettingService_, _UrlManager_, _$httpBackend_) {
      $httpBackend = _$httpBackend_;
      UpdateSettingService = _UpdateSettingService_;
      UrlManager = _UrlManager_;
    });
  });

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('fn: getAppUpdates', function() {
    it('should return all updates for specific id', function() {
      var id = 'qwerty';
      var url = UrlManager.getAppUpdateInfoUrl(id);
      var expectedRespond = [
        {
          name: 'version1',
          version: '1'
        },
        {
          name: 'version2',
          version: '2'
        }
      ];
      $httpBackend.expectGET(url).respond(expectedRespond);
      UpdateSettingService.getAppUpdates(id);
      $httpBackend.flush();
      expect(UpdateSettingService.updateInfos).toEqual(expectedRespond);
      expect(UpdateSettingService.newestUpdate).toEqual({
        name: 'version2',
        version: '2'
      });
    });
  });
});
