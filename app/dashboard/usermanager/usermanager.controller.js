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

  function UserManagerCtrl(localStorageService, $mdDialog, UserGroupService, UserInfoService) {
    var vm = this;
    vm.userInfo = localStorageService.get('user');

    console.log(vm.userInfo);

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
          vm.groupData.forEach(function(d){
            UserInfoService.getUsersByGroupId(d._id, function(){
              d.members = UserInfoService[d._id];
            });
          });
        });
      } else {
        UserGroupService.getGroup(vm.userInfo.groupId, function() {
          vm.groupData = UserGroupService.groupList;
          vm.groupData.forEach(function(d){
            UserInfoService.getUsersByGroupId(d._id, function(){
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
      }).then(function(error) {
          vm.showAlert(error);
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
      }).then(function(error) {
          vm.showAlert(error);
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
      }).then(function(error) {
          vm.showAlert(error);
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
      }).then(function(error) {
          vm.showAlert(error);
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
      }).then(function(error) {
          vm.showAlert(error);
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
      }).then(function(error) {
          vm.showAlert(error);
        },
        function() {});
    };

    vm.showAlert = function(error) {
      if (error) {
        $mdDialog.show(
          $mdDialog.alert()
          .title(!error ? 'Success' : 'Error')
          .content(error && error.message)
          .ariaLabel('Alert Dialog')
          .ok('关闭')
        );
      } else {
        vm.getGroupList();
      }
    };

    vm.getGroupList();
  }

  function AddGroupDialogCtrl($mdDialog, UserGroupService) {
    var vm = this;
    vm.title = '添加分组';

    vm.ok = function() {
      if (!vm.groupName || !vm.groupDesc) {
        return;
      }
      UserGroupService.createGroup(vm.groupName, vm.groupDesc, function(error) {
        $mdDialog.hide(error);
      });
    };

    vm.cancel = function(event) {
      event.preventDefault();
      $mdDialog.cancel();
    };
  }

  function EditGroupDialogCtrl($mdDialog, data, UserGroupService) {
    var vm = this;
    vm.title = '编辑分组';
    vm.groupName = data.groupName;
    vm.groupDesc = data.description;

    vm.ok = function() {
      if (!vm.groupName || !vm.groupDesc) {
        return;
      }

      UserGroupService.editGroup(data._id, vm.groupName, vm.groupDesc, function(error) {
        $mdDialog.hide(error);
      });
    };

    vm.cancel = function(event) {
      event.preventDefault();
      $mdDialog.cancel();
    };
  }

  function DeleteGroupDialogCtrl($mdDialog, data, UserGroupService) {
    var vm = this;
    vm.grupName = data.groupName;

    vm.ok = function() {
      UserGroupService.deleteGroup(data._id, function(error) {
        $mdDialog.hide(error);
      });
    };

    vm.cancel = function() {
      $mdDialog.cancel();
    };
  }

  function AddMemberDialogCtrl($mdDialog, data, UserInfoService) {
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
        return;
      }
      vm.user.username = vm.memberName;
      vm.user.email = vm.memberMail;
      vm.user.password = vm.password;
      vm.user.userType = vm.userType;

      UserInfoService.addUser(vm.user, function(error){
        $mdDialog.hide(error);
      });
    };

    vm.cancel = function(event) {
      event.preventDefault();
      $mdDialog.cancel();
    };
  }

  function EditMemberDialogCtrl($mdDialog, data, UserInfoService) {
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
      UserInfoService.updateUser(user, data._id, function(error){
        $mdDialog.hide(error);
      });
    };

    vm.cancel = function(event) {
      event.preventDefault();
      $mdDialog.cancel();
    };
  }

  function DeleteMemberDialogCtrl($mdDialog, data, UserInfoService) {
    var vm = this;
    vm.memberName = data.username;

    vm.ok = function() {
      UserInfoService.deleteUser(data._id, function(error){
        $mdDialog.hide(error);
      });
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
