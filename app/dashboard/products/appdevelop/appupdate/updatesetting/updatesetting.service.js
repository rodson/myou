(function() {
  'use strict';

  function UpdateSettingService($http, $mdDialog, UrlManager,
    $mdToast, localStorageService, PlatformManager, VersionHelper) {

    var UpdateSettingService = {};
    UpdateSettingService.newestUpdate = {};
    UpdateSettingService.updateInfos = [];
    UpdateSettingService.versions = [];
    UpdateSettingService.app = {};

    UpdateSettingService.getApplication = function() {
      UpdateSettingService.app = localStorageService.get('app');
      return UpdateSettingService.app;
    };

    UpdateSettingService.getAppUpdates = function(id) {
      return $http.get(UrlManager.getAppUpdateInfoUrl(id))
        .success(function(data) {
          UpdateSettingService.updateInfos = data;
          UpdateSettingService.newestUpdate = data[data.length - 1];
          var length = data.length;
          for(var i = length - 1; i >= 0; i--) {
            UpdateSettingService.versions.push(data[i].versionCode);
          }
        });
    };

    UpdateSettingService.modifyAppUpdate = function(updateId, update) {
      return $http.put(UrlManager.getAppUpdateInfoUrl(UpdateSettingService.app._id) +
        '/' + updateId + '?platform=' + UpdateSettingService.app.platform, update)
        .success(function() {
          // Ignore this.
        }).error(function(data) {
          $mdToast.show(
            $mdToast.simple()
              .content(data.message)
              .position('right top')
              .hideDelay(3000)
          );
        });
    };

    UpdateSettingService.deleteAppUpdate = function(updateId) {
      return $http.delete(UrlManager.getAppUpdateInfoUrl(UpdateSettingService.app._id) +
        '/' + updateId + '?platform=' + UpdateSettingService.app.platform)
        .success(function() {
          // Ignore this
        }).error(function(data) {
          $mdToast.show(
            $mdToast.simple()
              .content(data.message)
              .position('right top')
              .hideDelay(3000)
          );
        });
    };

    UpdateSettingService.showUpdateDescDialog = function(ev, updateInfo) {
      $mdDialog.show({
        controller: 'UpdateDescDialogCtrl',
        controllerAs: 'vm',
        templateUrl: 'app/dashboard/products/appdevelop/appupdate/updatesetting/updatedescdialog/updatedescdialog.html',
        targetEvent: ev,
        resolve: {
          data: function() {
            return {
              updateDesc: updateInfo.updateDesc,
              updateId: updateInfo._id
            };
          }
        }
      })
      .then(function(result) {
        updateInfo.updateDesc = result;
      });
    };

    UpdateSettingService.showDeleteUpdateDialog = function(ev, updateInfo) {
      $mdDialog.show({
        controller: 'DeleteUpdateDialogCtrl',
        controllerAs: 'vm',
        templateUrl: 'app/dashboard/products/appdevelop/appupdate/updatesetting/deleteupdatedialog/deleteupdatedialog.html',
        targetEvent: ev,
        resolve: {
          data: function() {
            return {
              versionCode: updateInfo.versionCode,
              updateId: updateInfo._id
            };
          }
        }
      })
      .then(function(result) {
        // TODO: update version list
      });
    };

    UpdateSettingService.showUpdateRuleDialog = function(ev, updateInfo, isTest) {
      var versions = UpdateSettingService.versions;
      var length = versions.length;
      var versionCode = updateInfo.versionCode;
      var validVersions = [];

      if (PlatformManager.isWindowsApp(UpdateSettingService.app.platform)) {
        for (var i = 0; i < length; i++) {
          if (VersionHelper.compareVersion(versions[i], versionCode) === 1) {
            validVersions.push(versions[i]);
          }
        }
      } else if (PlatformManager.isAndroidApp(UpdateSettingService.app.platform)) {
        for (var i = 0; i < length; i++) {
          if (versions[i] > versionCode) {
            validVersions.push(versions[i]);
          }
        }
      }

      $mdDialog.show({
        controller: 'UpdateRuleDialogCtrl',
        controllerAs: 'vm',
        templateUrl: 'app/dashboard/products/appdevelop/appupdate/updatesetting/updateruledialog/updateruledialog.html',
        targetEvent: ev,
        resolve: {
          data: function() {
            return {
              versions: validVersions,
              isTest: isTest
            };
          }
        }
      })
      .then(function(result) {
        // TODO:
      });
    };

    return UpdateSettingService;

  }

  angular
    .module('myou.dashboard.appdevelop.appupdate')
    .factory('UpdateSettingService', UpdateSettingService);

})();
