(function() {
  'use strict';

  function UserManagerConfig($stateProvider) {
    $stateProvider
      .state('dashboard.usermanager', {
        url: '/usermanager',
        templateUrl: 'app/dashboard/usermanager/usermanager.html',
        controllerAs: 'vm',
        controller: 'UserManagerCtrl',
        resolve: UserManagerCtrl.resolve
      });
  }

  function UserManagerCtrl(localStorageService, $mdDialog, $mdToast, UserGroupService, UserInfoService) {
    var vm = this;
    vm.userInfo = localStorageService.get('user');

    vm.isAdmin = function() {
      return vm.userInfo.userType === 'root';
    };

    vm.isManager = function(user) {
      return user.userType !== 'user';
    };

    vm.getGroupList = function() {
      if (vm.userInfo.userType === 'root') {
        UserGroupService.getGroupList(function() {
          vm.groupData = UserGroupService.groupList;
          vm.groupData.forEach(function(d) {
            UserInfoService.getUsersByGroupId(d._id, function() {
              d.members = UserInfoService[d._id];
            });
          });
        });
      } else {
        UserGroupService.getGroup(vm.userInfo.groupId, function() {
          vm.groupData = UserGroupService.groupList;
          vm.groupData.forEach(function(d) {
            UserInfoService.getUsersByGroupId(d._id, function() {
              d.members = UserInfoService[d._id];
            });
          });
        });
      }
    };

    vm.showAddGroupDialog = function(ev, dt) {
      $mdDialog.show({
        controller: AddGroupDialogCtrl,
        controllerAs: 'vm',
        templateUrl: 'addGroupModal.html',
        targetEvent: ev
      }).then(function(msg) {
          vm.showAlert(msg);
        },
        function() {});
    };

    vm.showEditGroupDialog = function(ev, dt) {
      $mdDialog.show({
        controller: EditGroupDialogCtrl,
        controllerAs: 'vm',
        templateUrl: 'addGroupModal.html',
        targetEvent: ev,
        resolve: {
          data: function() {
            return dt;
          }
        }
      }).then(function(msg) {
          vm.showAlert(msg);
        },
        function() {});
    };

    vm.showDeleteGroupDialog = function(ev, dt) {
      $mdDialog.show({
        controller: DeleteGroupDialogCtrl,
        controllerAs: 'vm',
        templateUrl: 'deleteGroupModal.html',
        targetEvent: ev,
        resolve: {
          data: function() {
            return dt;
          }
        }
      }).then(function(msg) {
          vm.showAlert(msg);
        },
        function() {});
    };

    vm.showAddMemberDialog = function(ev, dt) {
      $mdDialog.show({
        controller: AddMemberDialogCtrl,
        controllerAs: 'vm',
        templateUrl: 'addMemberModal.html',
        targetEvent: ev,
        resolve: {
          data: function() {
            return dt;
          }
        }
      }).then(function(msg) {
          vm.showAlert(msg);
        },
        function() {});
    };

    vm.showEditMemberDialog = function(ev, dt) {
      $mdDialog.show({
        controller: EditMemberDialogCtrl,
        controllerAs: 'vm',
        templateUrl: 'addMemberModal.html',
        targetEvent: ev,
        resolve: {
          data: function() {
            return dt;
          }
        }
      }).then(function(msg) {
          vm.showAlert(msg);
        },
        function() {});
    };

    vm.showDeleteMemberDialog = function(ev, dt) {
      $mdDialog.show({
        controller: DeleteMemberDialogCtrl,
        controllerAs: 'vm',
        templateUrl: 'deleteMemberModal.html',
        targetEvent: ev,
        resolve: {
          data: function() {
            return dt;
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
      vm.getGroupList();
    };

    vm.getGroupList();
  }

  function AddGroupDialogCtrl($mdDialog, $timeout, UserGroupService) {
    var vm = this;
    vm.title = '添加分组';

    vm.ok = function() {
      if (!vm.groupName || !vm.groupDesc) {
        return;
      }
      UserGroupService.createGroup(vm.groupName, vm.groupDesc, function(error) {
        if (error) {
          vm.errortip = error.message;
          return;
        }
        $mdDialog.hide('添加成功');
      });
      $timeout(function() {
        vm.errortip = '';
      }, 2000);
    };

    vm.cancel = function(event) {
      event.preventDefault();
      $mdDialog.cancel();
    };
  }

  function EditGroupDialogCtrl($mdDialog, data, $timeout, UserGroupService) {
    var vm = this;
    vm.title = '编辑分组';
    vm.groupName = data.groupName;
    vm.groupDesc = data.description;

    vm.ok = function() {
      if (!vm.groupName || !vm.groupDesc) {
        return;
      }

      UserGroupService.editGroup(data._id, vm.groupName, vm.groupDesc, function(error) {
        if (error) {
          vm.errortip = error.message;
          return;
        }
        $mdDialog.hide('更新成功');
      });
      $timeout(function() {
        vm.errortip = '';
      }, 2000);
    };

    vm.cancel = function(event) {
      event.preventDefault();
      $mdDialog.cancel();
    };
  }

  function DeleteGroupDialogCtrl($mdDialog, data, $timeout, UserGroupService) {
    var vm = this;
    vm.grupName = data.groupName;

    vm.ok = function() {
      UserGroupService.deleteGroup(data._id, function(error) {
        if (error) {
          vm.errortip = error.message;
          return;
        }
        $mdDialog.hide('删除成功');
      });
      $timeout(function() {
        vm.errortip = '';
      }, 2000);
    };

    vm.cancel = function() {
      $mdDialog.cancel();
    };
  }

  function AddMemberDialogCtrl($mdDialog, data, $timeout, UserInfoService) {
    var vm = this;
    vm.userType = 'user';

    vm.title = '添加成员';
    vm.addMember = true;

    vm.user = {
      groupId: data._id
    };

    vm.ok = function() {
      if (!vm.memberName || !vm.memberMail || !vm.password) {
        return;
      }
      if (vm.repassword !== vm.password) {
        vm.errortip = '两次输入的密码不一致';
      } else {
        vm.user.username = vm.memberName;
        vm.user.email = vm.memberMail;
        vm.user.password = vm.password;
        vm.user.userType = vm.userType;

        UserInfoService.addUser(vm.user, function(error) {
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

  function EditMemberDialogCtrl($mdDialog, data, $timeout, UserInfoService) {
    var vm = this;
    console.log(data);
    vm.title = '编辑成员';
    vm.addMember = false;
    vm.userType = data.userType;
    vm.memberName = data.username;
    vm.memberMail = data.email;

    vm.ok = function() {
      if (!vm.memberName) {
        return;
      }
      var user = {};
      user.username = vm.memberName;
      user.userType = vm.userType;
      UserInfoService.updateUser(user, data._id, function(error) {
        if (error) {
          vm.errortip = error.message;
          return;
        }
        $mdDialog.hide('更新成功');
      });
      $timeout(function() {
        vm.errortip = '';
      }, 2000);
    };

    vm.cancel = function(event) {
      event.preventDefault();
      $mdDialog.cancel();
    };
  }

  function DeleteMemberDialogCtrl($mdDialog, data, $timeout, UserInfoService) {
    var vm = this;
    vm.memberName = data.username;

    vm.ok = function() {
      UserInfoService.deleteUser(data._id, function(error) {
        if (error) {
          vm.errortip = error.message;
          return;
        }
        $mdDialog.hide('删除成功');
      });
      $timeout(function() {
        vm.errortip = '';
      }, 2000);
    };

    vm.cancel = function() {
      $mdDialog.cancel();
    };
  }

  angular
    .module('myou.dashboard.usermaneger')
    .controller('UserManagerCtrl', UserManagerCtrl)
    .config(UserManagerConfig);

})();
