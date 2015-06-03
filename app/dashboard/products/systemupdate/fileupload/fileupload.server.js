(function() {
  'use strict';

  /**
   * @ngInject
   */
  function RomFileUploadService($http, $mdDialog, $state, UrlManager,
    StorageManager, Constant) {

    var RomFileUploadService = {};

    RomFileUploadService.app = {};
    RomFileUploadService.uploadData = {};

    RomFileUploadService.init = function() {
      RomFileUploadService.app = StorageManager.getApp();

      RomFileUploadService.uploadData.progress = 0;
      RomFileUploadService.uploadData.md5 = null;
      RomFileUploadService.uploadData.errorMessage = '';
      RomFileUploadService.uploadData.srcVersion = '';
      RomFileUploadService.uploadData.targetVersion = '';
      RomFileUploadService.uploadData.versionDesc = '';
      RomFileUploadService.uploadData.errorMessage = '';
      RomFileUploadService.uploadData.file = null;
    };

    RomFileUploadService.onFileSelect = function(files) {
      if (!files && !files.length) {
        return false;
      }
      RomFileUploadService.uploadData.progress = 0;
      RomFileUploadService.uploadData.md5 = null;
      RomFileUploadService.uploadData.errorMessage = '';
      RomFileUploadService.uploadData.file = files[0];

      return true;
    };

    RomFileUploadService.upload = function() {
      if (!RomFileUploadService.uploadData.file) {
        RomFileUploadService.uploadData.errorMessage = '请选择文件';
        return;
      }

      if (!RomFileUploadService.uploadData.md5) {
        RomFileUploadService.uploadData.errorMessage = '请等待MD5计算完成';
        return;
      }

      if (!RomFileUploadService.uploadData.srcVersion) {
        RomFileUploadService.uploadData.errorMessage = '请输入源版本';
        return;
      }

      if (!RomFileUploadService.uploadData.targetVersion) {
        RomFileUploadService.uploadData.errorMessage = '请输入目标版本';
        return;
      }

      var srcVersion = RomFileUploadService.uploadData.srcVersion;
      var targetVersion = RomFileUploadService.uploadData.targetVersion;
      var fileName = RomFileUploadService.uploadData.file.name;

      $mdDialog.show({
        templateUrl: 'uploadProgressDialog.html',
        controller: 'RomUploadProgressDialogCtrl',
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
        $state.go('dashboard.systemupdate.updatesetting');
      });
    };

    RomFileUploadService.getQiniuToken = function(srcVersion, targetVersion, fileName) {
      return $http.get(Constant.URL.QINIU_TOKEN + '?appKey=' + RomFileUploadService.app.appKey +
        '&srcVersion=' + srcVersion + '&targetVersion=' + targetVersion + '&fileName=' + fileName);
    };

    return RomFileUploadService;
  }

  angular
    .module('myou.dashboard.systemupdate')
    .factory('RomFileUploadService', RomFileUploadService);

})();
