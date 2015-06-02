(function() {
  'use strict';

  function systemUpdateConfig($stateProvider) {
    $stateProvider
      .state('dashboard.systemupdate', {
        abstract: true,
        url: '/systemupdate/:id',
        templateUrl: 'app/dashboard/products/systemupdate/systemupdate.html',
        controllerAs: 'vm',
        controller: 'SystemUpdateCtrl',
        resolve: SystemUpdateCtrl.resolve
      });
  }

  function SystemUpdateCtrl(localStorageService, StorageManager, $location, $timeout, $stateParams, $mdToast, SystemUpdateService) {
    var vm = this;

    vm.product = StorageManager.getApp();
    vm.isActive = function(parent, path) {
      return ($location.path().indexOf(parent) > -1 && $location.path().indexOf(path) > -1);
    };

    vm.show = function() {
      vm.showAppKey = true;
    };

    vm.hide = function() {
      vm.showAppKey = false;
    };

    vm.modifyAppKey = function() {
      if (vm.showAppKey) {
        vm.showAppKey = false;

        $timeout(function() {
          vm.showModify = true;
        }, 600);
      } else {
        vm.showModify = true;
      }
    };

    vm.saveAppKey = function() {
      if (vm.product.appKey.length !== 40) {
        vm.errorTip = '长度错误：应为40位字符组成，现在为' + vm.product.appKey.length + '个字符';
        $timeout(function() {
          vm.errorTip = '';
        }, 3400);
        return;
      }
      if (!/^[0-9a-z]{40}$/g.test(vm.product.appKey)) {
        vm.errorTip = 'AppKey只能由1-9，a-z组成';
        $timeout(function() {
          vm.errorTip = '';
        }, 3400);
        return;
      }

      var dataUpdate = {
        appKey: vm.product.appKey
      };

      SystemUpdateService.updateAppKey($stateParams.id, dataUpdate, function(error) {
        if (error) {
          vm.errorTip = error.message;
          $timeout(function() {
            vm.errorTip = '';
          }, 3400);
          return;
        }
        localStorageService.set('app', vm.product);
        vm.showAlert('更新成功');
      });
    };

    vm.showAlert = function(msg) {
      $mdToast.show(
        $mdToast.simple()
        .content(msg)
        .position('top right')
        .hideDelay(1500)
      );
    };
  }

  SystemUpdateCtrl.resolve = {
    getApp: function(RouteStateManager, $stateParams) {
      return RouteStateManager.getApp($stateParams.id);
    }
  };

  angular
    .module('myou.dashboard.systemupdate')
    .controller('SystemUpdateCtrl', SystemUpdateCtrl)
    .config(systemUpdateConfig);

})();
