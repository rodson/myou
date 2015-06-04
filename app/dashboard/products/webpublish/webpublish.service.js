(function() {
  'use strict';

  /**
   * @ngInject
   */
  function WebPublishService($http, $state, $stateParams, $mdDialog,
    StorageManager, Constant, UrlManager) {

    var WebPublishService = {};

    var WEBAPP_UPLOAD_DIR = '/data/node-project/upload/appname/';
    var WEBAPP_PUB_DIR = '/data/node-project/';

    WebPublishService.app = {};
    WebPublishService.ips = [];
    WebPublishService.updateInfos = [];
    WebPublishService.uploadData = {};

    WebPublishService.init = function() {
      WebPublishService.app = StorageManager.getApp();
    };

    WebPublishService.initUploadData = function() {
      WebPublishService.uploadData.file = null;
      WebPublishService.uploadData.versionDesc = '';
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

      for (var i = length - 1; i >= 0; i--) {
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

    WebPublishService.showUpdateDescDialog = function(ev, updateInfo) {
      $mdDialog.show({
        controller: 'WebPubUpdateDescDialogCtrl',
        controllerAs: 'vm',
        templateUrl: 'updateDescDialog.html',
        targetEvent: ev,
        resolve: {
          data: function() {
            return {
              versionDesc: updateInfo.versionDesc,
              updateId: updateInfo._id
            };
          }
        }
      })
      .then(function(result) {
        updateInfo.versionDesc = result;
      });
    };

    WebPublishService.showDeleteUpdateDialog = function(ev, updateInfo) {
      return $mdDialog.show({
        controller: 'WebPubDeleteUpdateDialogCtrl',
        controllerAs: 'vm',
        templateUrl: 'deleteUpdateDialog.html',
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
      .then(function() {
        $state.transitionTo($state.current, $stateParams, {
          reload: true,
          inherit: false,
          notify: true
        });
      });
    };

    WebPublishService.modifyAppUpdate = function(updateId, update) {
      return $http.put(UrlManager.getAppUpdateInfoUrl(WebPublishService.app._id) +
        '/' + updateId + '?platform=' + WebPublishService.app.platform, update)
        .success(function() {
          // Ignore this.
        }).error(function(data) {
          $mdDialog.show(
            $mdDialog.alert()
              .title('修改失败')
              .content(data.message)
              .ariaLabel('updatetolatest toggle')
              .ok('知道了')
          );
        });
    };

    WebPublishService.deleteAppUpdate = function(updateId) {
      return $http.delete(UrlManager.getAppUpdateInfoUrl(WebPublishService.app._id) +
        '/' + updateId + '?platform=' + WebPublishService.app.platform)
        .success(function() {
          // Ignore this
        }).error(function(data) {
          $mdDialog.show(
            $mdDialog.alert()
              .title('修改失败')
              .content(data.message)
              .ariaLabel('updatetolatest toggle')
              .ok('知道了')
          );
        });
    };

    WebPublishService.showUploadDialog = function(ev) {
      return $mdDialog.show({
        controller: 'WebPubUploadDialogCtrl',
        controllerAs: 'vm',
        templateUrl: 'uploadDialog.html',
        clickOutsideToClose: false,
        escapeToClose: false,
        targetEvent: ev
      })
      .then(function() {
        $state.transitionTo($state.current, $stateParams, {
          reload: true,
          inherit: false,
          notify: true
        });
      });
    };

    WebPublishService.onFileSelect = function(files) {
      if (!files || !files.length) {
        return false;
      }
      var file = files[0];
      WebPublishService.uploadData.file = file;
    };

    WebPublishService.upload = function() {
      var errorMsg;
      if (!WebPublishService.uploadData.file) {
        errorMsg = '请选择文件';
        return errorMsg;
      }

      var uploadFile = {
        webAppFile: WebPublishService.uploadData.file
      };

      var appendData = {
        versionDesc: WebPublishService.uploadData.versionDesc,
        uploadDir: WEBAPP_UPLOAD_DIR,
        pubDir: WEBAPP_PUB_DIR
      };

      doUpload(uploadFile, appendData);
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

    function doUpload(uploadFile, appendData) {
      var uploadUrl = UrlManager.getUploadUrl(
        WebPublishService.app._id, WebPublishService.app.platform);
      var fileKeys = [];
      var fileValues = [];

      for (var fileKey in uploadFile) {
        if (uploadFile.hasOwnProperty(fileKey)) {
          fileKeys.push(fileKey);
          fileValues.push(uploadFile[fileKey]);
        }
      }

      $mdDialog.show({
        templateUrl: 'uploadProgressDialog.html',
        controller: 'WebPubProgressDialogCtrl',
        controllerAs: 'vm',
        clickOutsideToClose: false,
        escapeToClose: false,
        resolve: {
          data: function() {
            return {
              uploadUrl: uploadUrl,
              appendData: appendData,
              fileValues: fileValues,
              fileKeys: fileKeys
            };
          }
        }
      }).then(function() {
        refreshPage();
      });
    }

    return WebPublishService;
  }

  angular
    .module('myou.dashboard.webpublish')
    .factory('WebPublishService', WebPublishService);

})();
