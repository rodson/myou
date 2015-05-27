(function() {
  'use strict';

  function WebPublishService($http, $state, $stateParams, $mdDialog,
    StorageManager, Constant, UrlManager) {

    var WebPublishService = {};

    WebPublishService.app = {};
    WebPublishService.ips = [];
    WebPublishService.updateInfos = [];

    WebPublishService.init = function() {
      WebPublishService.app = StorageManager.getApp();
    };

    WebPublishService.getIps = function() {
      WebPublishService.init();

      return $http.get(UrlManager.getWebIpUrl(WebPublishService.app._id))
        .success(function(ips) {
          WebPublishService.ips = ips;
        });
    };

    WebPublishService.showPublishState = function(ip) {
      switch (ip.status) {
        case Constant.PACKAGE_STATUS.PUBLISHED:
          if (ip.waiting) {
            return '正在发布';
          }
          return '未发布';
        case Constant.PACKAGE_STATUS.RUNNING:
          if (ip.waiting) {
            return '正在启动';
          }
          return '已启动';
        case Constant.PACKAGE_STATUS.STOPED:
          if (ip.waiting) {
            return '正在停止';
          }
          return '已停止';
        default:
          return '未发布';
      }
    };

    WebPublishService.updateIps = function() {
      return $http.post(UrlManager.getUpdateIpUrl(WebPublishService.app._id), {})
        .success(function(ips) {
          refreshPage();
        })
        .error(function(err) {
          $mdDialog.show(
            $mdDialog.alert()
              .content(err.message)
              .ariaLabel('operaion failed')
              .ok('知道了')
          );
        });
    };

    WebPublishService.isPackageStoped = function(ipItem) {
      return ipItem.status === Constant.PACKAGE_STATUS.STOPED;
    };

    WebPublishService.isPackageRunning = function(ipItem) {
      return ipItem.status === Constant.PACKAGE_STATUS.RUNNING;
    };

    WebPublishService.isSelf = function() {
      return WebPublishService.app.name === 'MengYou';
    };

    WebPublishService.publishOpt = function(ev, ipItem, action) {
      showLoadingDialog(ev);

      WebPublishService.publishWebApp(ipItem.versionId, ipItem.ip, action)
        .success(function() {
          $mdDialog.cancel();
          $mdDialog.show(
            $mdDialog.alert()
              .content('发布成功')
              .ariaLabel('operaion success')
              .ok('知道了')
              .targetEvent(ev)
          );
          refreshPage();
        }).error(function(err) {
          $mdDialog.cancel();
          $mdDialog.show(
            $mdDialog.alert()
              .content(err.message)
              .ariaLabel('operaion failed')
              .ok('知道了')
              .targetEvent(ev)
          );
        });

    };

    WebPublishService.showPublishDialog = function(ev, ipItem) {
      var versions = [];
      var updateInfos = WebPublishService.updateInfos;
      var length = updateInfos.length;

      for (var i = 0; i < length; i++) {
        if (updateInfos[i].nginxServerState === 'install_done') {
          versions.push(updateInfos[i].versionCode);
        }
      }

      var initVersion = ipItem.versionCode ? ipItem.versionCode : versions[0];

      $mdDialog.show({
        controller: 'PublishDialogCtrl',
        controllerAs: 'vm',
        templateUrl: 'publishDialog.html',
        clickOutsideToClose: false,
        escapeToClose: false,
        targetEvent: ev,
        resolve: {
          data: function() {
            return {
              versions: versions,
              initVersion: initVersion,
              ip: ipItem.ip
            };
          }
        }
      })
      .then(function() {
        refreshPage();
      });
    };

    WebPublishService.getUpdateInfos = function() {
      WebPublishService.init();

      return $http.get(UrlManager.getAppUpdateInfoUrl(WebPublishService.app._id))
        .success(function(data) {
          WebPublishService.updateInfos = data;
        });
    };

    WebPublishService.getVersionId = function(versionCode) {
      var updateInfos = WebPublishService.updateInfos;
      var length = updateInfos.length;
      for (var i = 0; i < length; i++) {
        if (updateInfos[i].versionCode === versionCode) {
          return updateInfos[i]._id;
        }
      }
    };

    WebPublishService.publishWebApp = function(versionId, ip, action) {
      var data = {
        ip: ip,
        action: action
      };

      return $http.post(UrlManager.getWebPublishUrl(WebPublishService.app._id,
        versionId), data);
    };

    WebPublishService.showPackageState = function(updateInfo) {
      if (updateInfo.nginxServerState === 'install_done') {
        return '已安装';
      } else if (updateInfo.nginxServerState === 'upload_done') {
        return '未安装';
      }
    };

    WebPublishService.isPackageInstalled = function(updateInfo) {
      return updateInfo.nginxServerState === 'install_done';
    };

    WebPublishService.installPackage = function(ev, updateInfo) {
      showLoadingDialog(ev);

      var data = {
        action: 'install'
      };

      return $http.post(UrlManager.getWebPublishUrl(WebPublishService.app._id,
        updateInfo._id), data)
        .success(function() {
          $mdDialog.cancel();
          refreshPage();
          $mdDialog.show(
            $mdDialog.alert()
              .content('安装成功')
              .ariaLabel('operaion success')
              .ok('知道了')
              .targetEvent(ev)
          );

        }).error(function(err) {
          $mdDialog.cancel();
          $mdDialog.show(
            $mdDialog.alert()
              .content(err.message)
              .ariaLabel('operaion failed')
              .ok('知道了')
              .targetEvent(ev)
          );
        });
    };

    function refreshPage() {
      $state.transitionTo($state.current, $stateParams, {
        reload: true,
        inherit: false,
        notify: true
      });
    }

    function showLoadingDialog(ev) {
      $mdDialog.show({
        templateUrl: 'loadingDialog.html',
        clickOutsideToClose: false,
        escapeToClose: false,
        targetEvent: ev
      });
    }

    return WebPublishService;
  }

  angular
    .module('myou.dashboard.webpublish')
    .factory('WebPublishService', WebPublishService);

})();
