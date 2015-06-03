(function() {
  'use strict';

  function UserProfileCtrl($mdDialog, $mdToast, $state, $stateParams, StorageManager) {
    var vm = this;
    var user = StorageManager.getUser();
    vm.username = user.username;

    vm.logout = function(){
      StorageManager.deleteUser();
      StorageManager.deleteToken();
      $state.go('login');
    };

    vm.showModifyUserDialog = function(ev) {
      $mdDialog.show({
        controller: ModifyUserDialogCtrl,
        controllerAs: 'vm',
        templateUrl: 'modifyUserModal.html',
        targetEvent: ev,
        resolve: {
          data: function() {
            return user;
          }
        }
      }).then(function(error) {
          refreshPage();
          vm.showAlert(error);
        },
        function() {});
    };

    vm.showAlert = function(error) {
      if (!error) {
        $mdToast.show(
          $mdToast.simple()
          .content('更新成功')
          .position('top right')
          .hideDelay(1500)
        );
      } else {
        // $mdDialog.show(
        //   $mdDialog.alert()
        //   .title('操作失败')
        //   .content(error.message)
        //   .ariaLabel('Alert Dialog')
        //   .ok('关闭')
        // );
      }
    };

    function refreshPage() {
      $state.transitionTo($state.current, $stateParams, {
        reload: true,
        inherit: false,
        notify: true
      });
    }
  }

  function ModifyUserDialogCtrl($mdDialog, $timeout, StorageManager, data, UserProfileService) {
    var vm = this;
    vm.name = data.username;
    vm.email = data.email;
    vm.group = data.groupName || data.userType;

    vm.ok = function(type) {
      if (type === 'profile') {
        if (!vm.name) {
          return;
        }
        var user = {
          username: vm.name
        };
        UserProfileService.updateUser(user, data._id, function(error) {
          if (error) {
            vm.errortip = error.message;
          } else {
            var profile = {
              _id: data._id,
              username: vm.name,
              email: data.email,
              groupId: data.groupId,
              userType: data.userType,
              groupName: data.groupName
            };
            StorageManager.setUser(profile);
            $mdDialog.hide();
          }
        });
      } else {
        if (!vm.oldpass || !vm.newpass || !vm.renewpass) {
          return;
        }
        if (vm.newpass !== vm.renewpass) {
          vm.errortip = '两次输入的新密码不一致';
        } else if (vm.oldpass === vm.newpass) {
          vm.errortip = '请输入与旧密码不一样的新密码';
        } else if (vm.newpass.length < 6) {
          vm.errortip = '新密码至少为6个字符';
        } else {
          UserProfileService.changePassword(data._id, vm.oldpass, vm.newpass, function(error) {
            if (error) {
              vm.errortip = error.message;
            } else {
              $mdDialog.hide();
            }
          });
        }

        $timeout(function() {
          vm.errortip = '';
        }, 2000);
      }
    };

    vm.cancel = function(event) {
      event.preventDefault();
      $mdDialog.cancel();
    };
  }

  angular
    .module('myou.dashboard')
    .controller('UserProfileCtrl', UserProfileCtrl);
})();
