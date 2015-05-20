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
      if (!id) {
        id = UpdateSettingService.app._id;
      }

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

    UpdateSettingService.modifyUpdateRule = function(updateId, srcRule, destRule, isTest) {
      // Reset updatable if update rule is changed
      if (PlatformManager.isAndroidApp(UpdateSettingService.app.platform)) {
        destRule.targetVersion = parseInt(destRule.targetVersion);
        if (destRule.targetVersion !== srcRule.targetVersion ||
          destRule.isDiff !== srcRule.isDiff) {

          destRule.updatable = false;

        }
      } else if (PlatformManager.isWindowsApp(UpdateSettingService.app.platform)) {
        if (VersionHelper.compareVersion(destRule.targetVersion, srcRule.targetVersion) !== 0 ||
          destRule.isDiff !== srcRule.isDiff) {

          destRule.updatable = false;

        }
      }

      // Set post data
      var updateBody = {};
      var ruleField = isTest ? 'testRule' : 'rule';
      updateBody[ruleField] = destRule;

      return UpdateSettingService.modifyAppUpdate(updateId, updateBody);

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
      return $mdDialog.show({
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

      // Set update rule
      var rule = isTest ? updateInfo.testRule : updateInfo.rule;

      // Initialize rule if it's not set
      if (!rule) {
        rule = {
          targetVersion: versions[0],
          updatable: false,
          isSilentDownload: false,
          isDiff: true
        };
      }

      rule = angular.copy(rule);

      $mdDialog.show({
        controller: 'UpdateRuleDialogCtrl',
        controllerAs: 'vm',
        templateUrl: 'app/dashboard/products/appdevelop/appupdate/updatesetting/updateruledialog/updateruledialog.html',
        targetEvent: ev,
        resolve: {
          data: function() {
            return {
              versions: validVersions,
              isTest: isTest,
              updateId: updateInfo._id,
              rule: rule
            };
          }
        }
      })
      .then(function(rule) {
        if (isTest) {
          updateInfo.testRule = rule;
        } else {
          updateInfo.rule = rule;
        }
      });
    };

    UpdateSettingService.toggleUpdatable = function(ev, updateInfo) {
      // 如果没有设置配置信息，弹出提示框并返回
      if (!updateInfo.rule.targetVersion) {
        $mdDialog.show(
          $mdDialog.alert()
            .title('启动失败')
            .content('请先配置升级信息')
            .ariaLabel('updatable toggle')
            .ok('知道了')
            .targetEvent(ev)
        );
        updateInfo.rule.updatable = !updateInfo.rule.updatable;
        return;
      }

      var updatable = updateInfo.rule.updatable;
      if (!updatable) {
        // 发送关闭更新请求
        UpdateSettingService.modifyAppUpdate(updateInfo._id, {rule: updateInfo.rule})
          .error(function() {
            updateInfo.rule.updatable = !updateInfo.rule.updatable;
          });
      } else {
        var srcVersion = updateInfo.versionCode;
        var targetVersion = updateInfo.rule.targetVersion;
        var isDiff = updateInfo.rule.isDiff;

        // 检查文件是否已经同步好
        checkFileSync(srcVersion, targetVersion, isDiff).success(function() {
          // 文件同步好，发送打开更新请求
          UpdateSettingService.modifyAppUpdate(updateInfo._id, {rule: updateInfo.rule})
            .error(function() {
              updateInfo.rule.updatable = !updateInfo.rule.updatable;
            });
        }).error(function() {
          // 文件未同步好
          $mdDialog.show(
            $mdDialog.alert()
              .title('启动失败')
              .content('下载服务器数据同步大概需要2分钟，请稍后再试')
              .ariaLabel('updatable toggle')
              .ok('知道了')
              .targetEvent(ev)
          );
          updateInfo.rule.updatable = !updateInfo.rule.updatable;
        });
      }

    };

    function checkFileSync(srcVersion, targetVersion, isDiff) {
      var fileName = '';
      if (PlatformManager.isAndroidApp(UpdateSettingService.app.platform)) {
        if (isDiff) {
          fileName = srcVersion + '-' + targetVersion + '.patch';
        } else {
          fileName = targetVersion + '.apk';
        }
      } else if(PlatformManager.isWindowsApp(UpdateSettingService.app.platform)) {
        if (isDiff) {
          fileName = srcVersion + '-' + targetVersion + '.zip';
        } else {
          fileName = targetVersion + '.exe';
        }
      }

      var fileSyncUrl = UrlManager.getFileSyncUrl(UpdateSettingService.app.platform, UpdateSettingService.app.appKey, fileName);
      return $http.head(fileSyncUrl);
    }

    return UpdateSettingService;

  }

  angular
    .module('myou.dashboard.appdevelop.appupdate')
    .factory('UpdateSettingService', UpdateSettingService);

})();
