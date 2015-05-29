(function() {
  'use strict';

  function RomUpdateSettingService($http, $mdDialog, UrlManager, $state, $stateParams,
    StorageManager) {

    var RomUpdateSettingService = {};

    RomUpdateSettingService.app = {};
    RomUpdateSettingService.updateInfos = [];

    RomUpdateSettingService.init = function() {
      RomUpdateSettingService.app = StorageManager.getApp();
    };

    RomUpdateSettingService.getUpdateInfos = function() {
      RomUpdateSettingService.init();

      return $http.get(UrlManager.getAppUpdateInfoUrl(RomUpdateSettingService.app._id))
        .success(function(updateInfos) {
          RomUpdateSettingService.updateInfos = updateInfos;
        });
    };

    RomUpdateSettingService.showVersion = function(version) {
      if (version) {
        return version;
      } else {
        return '未设置';
      }
    };

    RomUpdateSettingService.toggleSilentDownload = function(ev, targetItem) {
      modifyUpdateInfo(targetItem._id, {isSilentDownload: targetItem.isSilentDownload})
        .error(function(err) {
          targetItem.isSilentDownload = !targetItem.isSilentDownload;
          showDialog(ev, '修改失败', err.message);
        });
    };

    RomUpdateSettingService.toggleTestUpdatable = function(ev, targetItem, updateInfo) {
      modifyUpdateInfo(targetItem._id, {testUpdatable: targetItem.testUpdatable})
        .success(function() {
          if (targetItem.testUpdatable) {
            updateInfo.testTargetVersion = targetItem.targetVersion;
          } else {
            updateInfo.testTargetVersion = '';
          }
        })
        .error(function(err) {
          targetItem.testUpdatable = !targetItem.testUpdatable;
          showDialog(ev, '修改失败', err.message);
        });
    };

    RomUpdateSettingService.toggleUpdatable = function(ev, targetItem, updateInfo) {
      modifyUpdateInfo(targetItem._id, {updatable: targetItem.updatable})
        .success(function() {
          if (targetItem.updatable) {
            updateInfo.targetVersion = targetItem.targetVersion;
          } else {
            updateInfo.targetVersion = '';
          }
        })
        .error(function(err) {
          targetItem.updatable = !targetItem.updatable;
          showDialog(ev, '修改失败', err.message);
        });
    };

    RomUpdateSettingService.showUpdateDescDialog = function(ev, targetItem) {
      $mdDialog.show({
        controller: 'RomUpdateDescDialogCtrl',
        controllerAs: 'vm',
        templateUrl: 'updateDescDialog.html',
        targetEvent: ev,
        resolve: {
          data: function() {
            return {
              updateDesc: targetItem.updateDesc,
              updateId: targetItem._id
            };
          }
        }
      })
      .then(function(result) {
        targetItem.updateDesc = result;
      });
    };

    RomUpdateSettingService.showDeleteUpdateDialog = function(ev, targetItem) {
      return $mdDialog.show({
        controller: 'RomDeleteUpdateDialogCtrl',
        controllerAs: 'vm',
        templateUrl: 'deleteUpdateDialog.html',
        targetEvent: ev,
        resolve: {
          data: function() {
            return {
              targetItem: targetItem,
              updateId: targetItem._id
            };
          }
        }
      })
      .then(function() {
        $state.transitionTo($state.current, $stateParams, {
          reload: true,
          inherit: false,
          notify: true
        });
      });
    };

    RomUpdateSettingService.modifyUpdateInfo = function(versionId, updateItem) {
      return modifyUpdateInfo(versionId, updateItem);
    };

    RomUpdateSettingService.deleteUpdateInfo = function(versionId) {
      return $http.delete(UrlManager.getAppUpdateInfoUrl(RomUpdateSettingService.app._id) +
        '/' + versionId + '?platform=' + RomUpdateSettingService.app.platform);
    };

    function modifyUpdateInfo(versionId, updateItem) {
      return $http.put(UrlManager.getAppUpdateInfoUrl(RomUpdateSettingService.app._id) +
        '/' + versionId + '?platform=' + RomUpdateSettingService.app.platform, updateItem);
    }

    function showDialog(ev, title, message) {
      $mdDialog.show(
        $mdDialog.alert()
          .title(title)
          .content(message)
          .ariaLabel('result dialog')
          .ok('知道了')
          .targetEvent(ev)
      );
    }

    return RomUpdateSettingService;
  }

  angular
    .module('myou.dashboard.systemupdate')
    .factory('RomUpdateSettingService', RomUpdateSettingService);

})();
