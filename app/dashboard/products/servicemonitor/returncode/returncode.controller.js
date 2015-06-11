(function() {
  'use strict';

  /**
   * @ngInject
   */
  function ReturnCodeConfig($stateProvider) {
    $stateProvider
      .state('dashboard.servicemonitor.returncode', {
        url: '/returncode',
        templateUrl: 'app/dashboard/products/servicemonitor/returncode/returncode.html',
        controllerAs: 'vm',
        controller: ReturnCodeCtrl,
        // resolve: ReturnCodeCtrl.resolve
      });
  }

  /**
   * @ngInject
   */
  function ReturnCodeCtrl(ReturnCodeService, StorageManager, $mdDialog, $mdToast) {
    var vm = this;
    var product = StorageManager.getApp();
    var appKey = product.appKey;

    vm.datas = {};

    vm.getData = function() {
      ReturnCodeService.getReturnCode(appKey, function() {
        vm.datas = ReturnCodeService.data;
      });
    };

    vm.getData();

    vm.showAddReturnCodeModal = function(ev) {
      $mdDialog.show({
        controller: AddReturnCodeCtrl,
        controllerAs: 'vm',
        templateUrl: 'addReturnCodeModal.html',
        targetEvent: ev,
        resolve: {
          appKey: function() {
            return appKey;
          }
        }
      }).then(function(msg) {
          vm.showAlert(msg);
        },
        function() {});
    };

    vm.showEditReturnCodeModal = function(ev, dt) {
      $mdDialog.show({
        controller: EditReturnCodeCtrl,
        controllerAs: 'vm',
        templateUrl: 'addReturnCodeModal.html',
        targetEvent: ev,
        resolve: {
          data: function() {
            return {
              appKey: appKey,
              returnCode: dt
            };
          }
        }
      }).then(function(msg) {
          vm.showAlert(msg);
        },
        function() {});
    };

    vm.showDeleteReturnCodeModal = function(ev, dt) {
      $mdDialog.show({
        controller: DeleteReturnCodeCtrl,
        controllerAs: 'vm',
        templateUrl: 'deleteReturnCodeModal.html',
        targetEvent: ev,
        resolve: {
          data: function() {
            return {
              appKey: appKey,
              returnCode: dt
            };
          }
        }
      }).then(function(msg) {
          vm.showAlert(msg);
        },
        function() {});
    };

    vm.showAlert = function(msg) {
      $mdToast.show(
        $mdToast.simple()
        .content(msg)
        .position('top right')
        .hideDelay(1500)
      );
      vm.getData();
    };

  }

  /**
   * @ngInject
   */
  function AddReturnCodeCtrl($mdDialog, appKey, $timeout, ReturnCodeService) {
    var vm = this;

    vm.title = '添加错误码';
    vm.returnCode = {};

    vm.ok = function() {
      if (!vm.returnCode.error_code) {
        vm.errortip = '请输入错误码';
      } else if (!Number(vm.returnCode.error_code)) {
        vm.errortip = '错误码只能是数字';
      } else {
        var dt = {
          error_code: vm.returnCode.error_code,
          error_code_desc: vm.returnCode.error_code_desc || ''
        };

        ReturnCodeService.postReturnCode(appKey, dt, function(error) {
          if (error) {
            vm.errortip = error.message;
            return;
          }
          $mdDialog.hide('添加成功');
        });
      }

      $timeout(function() {
        vm.errortip = '';
      }, 2000);
    };

    vm.cancel = function(event) {
      event.preventDefault();
      $mdDialog.cancel();
    };
  }

  /**
   * @ngInject
   */
  function EditReturnCodeCtrl($mdDialog, data, $timeout, ReturnCodeService) {
    var vm = this;

    vm.title = '添加错误码';
    vm.returnCode = {
      error_code: data.returnCode.error_code,
      error_code_desc: data.returnCode.error_code_desc,
    };

    vm.ok = function() {
      if (!vm.returnCode.error_code) {
        vm.errortip = '请输入错误码';
      } else if (!Number(vm.returnCode.error_code)) {
        vm.errortip = '错误码只能是数字';
      } else {
        ReturnCodeService.putReturnCode(data.appKey, data.returnCode.id, vm.returnCode, function(error) {
          if (error) {
            vm.errortip = error.message;
            return;
          }
          $mdDialog.hide('修改成功');
        });
      }

      $timeout(function() {
        vm.errortip = '';
      }, 2000);
    };

    vm.cancel = function(event) {
      event.preventDefault();
      $mdDialog.cancel();
    };
  }

  /**
   * @ngInject
   */
  function DeleteReturnCodeCtrl($mdDialog, data, $timeout, ReturnCodeService) {
    var vm = this;
    vm.returnCode = data.returnCode;

    vm.ok = function() {
      ReturnCodeService.deleteReturnCode(data.appKey, vm.returnCode.id, function(error) {
        if (error) {
          vm.errortip = error.message;
          return;
        }
        $mdDialog.hide('删除成功');
      });

      $timeout(function() {
        vm.errorMessage = '';
      }, 4000);
    };

    vm.cancel = function(event) {
      event.preventDefault();
      $mdDialog.cancel();
    };
  }

  angular.module('myou.dashboard.servicemonitor')
    .config(ReturnCodeConfig)
    .controller('ReturnCodeCtrl', ReturnCodeCtrl);

})();
