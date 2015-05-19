(function() {
  'use strict';

  function UpdateSettingService($http, $mdDialog, UrlManager,
    $mdToast, localStorageService) {

    var UpdateSettingService = {};
    UpdateSettingService.newestUpdate = {};
    UpdateSettingService.updateInfos = [];
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

    UpdateSettingService.showUpdateDescModal = function(ev, updateInfo) {
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

      });
    };

    return UpdateSettingService;
  }

  angular
    .module('myou.dashboard.appdevelop.appupdate')
    .factory('UpdateSettingService', UpdateSettingService);

})();
