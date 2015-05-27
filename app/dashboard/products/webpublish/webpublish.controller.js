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

    vm.isPackageRunning = function(ipItem) {
      return WebPublishService.isPackageRunning(ipItem);
    };

    vm.isPackageStoped = function(ipItem) {
      return WebPublishService.isPackageStoped(ipItem);
    };

    vm.isSelf = function() {
      return WebPublishService.isSelf();
    };

    vm.publishOpt = function(ipItem, action) {
      WebPublishService.publishOpt(ipItem, action);
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

  function PubishOptCtrl($mdDialog, WebPublishService, data) {
    WebPublishService.publishWebApp(data.ipItem.versionId, data.ipItem.ip, data.action)
      .success(function() {
        $mdDialog.hide(0);
      }).error(function(err) {
        $mdDialog.hide(err.message);
      });
  }

  angular
    .module('myou.dashboard.webpublish')
    .controller('WebPublishCtrl', WebPublishCtrl)
    .controller('PublishDialogCtrl', PublishDialogCtrl)
    .controller('PubishOptCtrl', PubishOptCtrl)
    .config(webPublishConfig);

})();
