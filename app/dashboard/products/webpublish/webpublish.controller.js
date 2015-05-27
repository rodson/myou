(function() {
  'use strict';

  function webPublishConfig($stateProvider) {
    $stateProvider
      .state('dashboard.webpublish', {
        url: '/webpublish/:id',
        templateUrl: 'app/dashboard/products/webpublish/webpublish.html',
        controllerAs: 'vm',
        controller: 'WebPublishCtrl',
        resolve: WebPublishCtrl.resolve
      });
  }

  function WebPublishCtrl(WebPublishService) {
    var vm = this;

    vm.ips = WebPublishService.ips;
    vm.app = WebPublishService.app;
    vm.updateInfos = WebPublishService.updateInfos;

    vm.showPublishState = function(ip) {
      return WebPublishService.showPublishState(ip);
    };

    vm.showPublishDialog = function(ev, ip) {
      WebPublishService.showPublishDialog(ev, ip);
    };

    vm.updateIps = function() {
      WebPublishService.updateIps();
    };

    vm.isPackageRunning = function(ipItem) {
      return WebPublishService.isPackageRunning(ipItem);
    };

    vm.isPackageStoped = function(ipItem) {
      return WebPublishService.isPackageStoped(ipItem);
    };

    vm.isSelf = function() {
      return WebPublishService.isSelf();
    };

    vm.publishOpt = function(ev, ipItem, action) {
      WebPublishService.publishOpt(ev, ipItem, action);
    };

    vm.showPackageState = function(updateInfo) {
      return WebPublishService.showPackageState(updateInfo);
    };

    vm.isPackageInstalled = function(updateInfo) {
      return WebPublishService.isPackageInstalled(updateInfo);
    };

    vm.installPackage = function(ev, updateInfo) {
      WebPublishService.installPackage(ev, updateInfo);
    };

    vm.showUpdateDescDialog = function(ev, updateInfo) {
      WebPublishService.showUpdateDescDialog(ev, updateInfo);
    };

    vm.showDeleteUpdateDialog = function(ev, updateInfo) {
      WebPublishService.showDeleteUpdateDialog(ev, updateInfo);
    };
  }

  WebPublishCtrl.resolve = {
    getIps: function(WebPublishService) {
      return WebPublishService.getIps();
    },

    getUpdateInfos: function(WebPublishService) {
      return WebPublishService.getUpdateInfos();
    }
  };

  function PublishDialogCtrl($mdDialog, data, WebPublishService, Constant) {
    var vm = this;

    vm.versions = data.versions;
    vm.versionCode = data.initVersion;

    vm.isPublishing = false;
    vm.isDone = false;
    vm.isError = false;

    var ip = data.ip;

    vm.ok = function() {
      if (!vm.versionCode) {
        vm.errorMessage = '没有安装版本';
      } else {
        vm.isPublishing = true;
        var versionId = WebPublishService.getVersionId(vm.versionCode);
        WebPublishService.publishWebApp(versionId, ip, Constant.PACKAGE_ACTION.PUB)
          .success(function(data) {
            vm.isDone = true;
          }).error(function(data) {
            vm.isDone = true;
            vm.isError = true;
          });
      }
    };

    vm.hide = function() {
      $mdDialog.hide();
    };

    vm.cancel = function() {
      $mdDialog.cancel();
    };
  }

  function WebPubUpdateDescDialogCtrl($mdDialog, data, WebPublishService) {
    var vm = this;
    vm.versionDesc = data.versionDesc;

    vm.ok = function() {
      if (vm.versionDesc === data.versionDesc) {
        $mdDialog.cancel();
      } else {
        WebPublishService.modifyAppUpdate(data.updateId, {versionDesc: vm.versionDesc})
          .then(function() {
            $mdDialog.hide(vm.versionDesc);
          });
      }
    };

    vm.cancel = function() {
      $mdDialog.cancel();
    };
  }

  function WebPubDeleteUpdateDialogCtrl($mdDialog, WebPublishService, data) {
    var vm = this;

    vm.versionCode = data.versionCode;

    vm.ok = function() {
      WebPublishService.deleteAppUpdate(data.updateId).then(function() {
        $mdDialog.hide();
      });
    };

    vm.cancel = function() {
      $mdDialog.cancel();
    };
  }

  angular
    .module('myou.dashboard.webpublish')
    .controller('WebPublishCtrl', WebPublishCtrl)
    .controller('PublishDialogCtrl', PublishDialogCtrl)
    .controller('WebPubUpdateDescDialogCtrl', WebPubUpdateDescDialogCtrl)
    .controller('WebPubDeleteUpdateDialogCtrl', WebPubDeleteUpdateDialogCtrl)
    .config(webPublishConfig);

})();
