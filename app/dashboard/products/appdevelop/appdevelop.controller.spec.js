'use strict';

describe('AppDevelopCtrl: ', function() {
  var AppDevelopCtrl;
  var localStorageService;
  var $location;

  beforeEach(function() {
    module('myou.dashboard.appdevelop');

    inject(function($controller, _$location_, _localStorageService_) {
      localStorageService = _localStorageService_;
      $location = _$location_;
      AppDevelopCtrl = $controller('AppDevelopCtrl', {
        $location: $location,
        localStorageService: localStorageService
      });
    });
  });

  describe('fn: isActive ', function() {

    beforeEach(function() {
      $location.path('/updatesetting');
    });

    it('should return true if the path is matched', function() {
      expect(AppDevelopCtrl.isActive('updatesetting')).toBe(true);
    });

    it('should return false if the path is not matched', function() {
      expect(AppDevelopCtrl.isActive('keydata')).toBe(false);
    });
  });

});
