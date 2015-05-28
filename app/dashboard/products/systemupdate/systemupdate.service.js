(function() {
  'use strict';

  function SystemUpdateService($http, $state, $stateParams, $mdDialog,
    UrlManager, StorageManager, Constant) {

    var SystemUpdateService = {};

    SystemUpdateService.app = {};
    SystemUpdateService.updateInfos = [];
    SystemUpdateService.uploadData = {};

    SystemUpdateService.init = function() {
      SystemUpdateService.app = StorageManager.getApp();
    };

    SystemUpdateService.getUpdateInfos = function() {
      SystemUpdateService.init();

      return $http.get(UrlManager.getAppUpdateInfoUrl(SystemUpdateService.app._id))
        .success(function(updateInfos) {
          SystemUpdateService.updateInfos = updateInfos;
        });
    };

    SystemUpdateService.showUploadDialog = function(ev) {
      return $mdDialog.show({
        controller: 'SystemUploadDialogCtrl',
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

    SystemUpdateService.resetFileUpload = function() {
      SystemUpdateService.uploadData.file = null;
      SystemUpdateService.uploadData.errorMessage = '';
      SystemUpdateService.uploadData.srcVersion = '';
      SystemUpdateService.uploadData.targetVersion = '';
    };

    SystemUpdateService.onFileSelect = function(files) {
      if (!files && !files.length) {
        return false;
      }
      SystemUpdateService.uploadData.progress = 0;
      var file = files[0];
      SystemUpdateService.uploadData.file = file;

      return true;
    };

    SystemUpdateService.getQiniuToken = function(srcVersion, targetVersion, fileName) {
      return $http.get(Constant.URL.QINIU_TOKEN + '?appKey=' + SystemUpdateService.app.appKey +
        '&srcVersion=' + srcVersion + '&targetVersion=' + targetVersion + '&fileName=' + fileName);
    };

    SystemUpdateService.upload = function() {
      if (!SystemUpdateService.uploadData.file) {
        SystemUpdateService.uploadData.errorMessage = '请选择文件';
        return;
      }

      if (!SystemUpdateService.uploadData.md5) {
        SystemUpdateService.uploadData.errorMessage = '请等待MD5计算完成';
        return;
      }

      if (!SystemUpdateService.uploadData.srcVersion) {
        SystemUpdateService.uploadData.errorMessage = '请输入源版本';
        return;
      }

      if (!SystemUpdateService.uploadData.targetVersion) {
        SystemUpdateService.uploadData.errorMessage = '请输入目标版本';
        return;
      }

      var srcVersion = SystemUpdateService.uploadData.srcVersion;
      var targetVersion = SystemUpdateService.uploadData.targetVersion;
      var fileName = SystemUpdateService.uploadData.file.name;

      $mdDialog.show({
        templateUrl: 'uploadProgressDialog.html',
        controller: 'SystemUploadProgressDialogCtrl',
        controllerAs: 'vm',
        clickOutsideToClose: false,
        escapeToClose: false,
        resolve: {
          data: function() {
            return {
              srcVersion: srcVersion,
              targetVersion: targetVersion,
              fileName: fileName
            };
          }
        }
      }).then(function() {
        refreshPage();
      });
    };

    function refreshPage() {
      $state.transitionTo($state.current, $stateParams, {
        reload: true,
        inherit: false,
        notify: true
      });
    }

    return SystemUpdateService;
  }

  angular
    .module('myou.dashboard.systemupdate')
    .factory('SystemUpdateService', SystemUpdateService);

})();
