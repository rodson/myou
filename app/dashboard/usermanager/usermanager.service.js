(function() {
  'use strict';

  /**
   * @ngInject
   */
  function UserInfoService($http, $q, Constant) {
    var userInfoService = {};

    userInfoService.getUsersByGroupId = function(groupId, cb) {
      return $http.get(Constant.URL.USERINFO + '?groupId=' + groupId)
        .success(function(data) {
          userInfoService[groupId] = data;
          cb();
        });
    };

    userInfoService.addUser = function(user, cb) {
      return $http.post(Constant.URL.USERINFO, user)
        .success(function(data) {
          cb();
        })
        .error(function(error) {
          cb(error);
        });
    };

    userInfoService.updateUser = function(user, userId, cb) {
      return $http.put(Constant.URL.USERINFO + '/' + userId, user)
        .success(function(data){
          cb();
        })
        .error(function(error){
          cb(error);
        });
    };

    userInfoService.deleteUser = function(userId, cb) {
      return $http.delete(Constant.URL.USERINFO + '/' + userId)
        .success(function(data){
          cb();
        })
        .error(function(error){
          cb(error);
        });
    };

    return userInfoService;

  }

  /**
   * @ngInject
   */
  function UserGroupService($http, $q, Constant) {
    var userGroupService = {};
    userGroupService.groupList = {};

    userGroupService.createGroup = function(groupName, description, cb) {
      var data = {
        groupName: groupName,
        description: description
      };
      return $http.post(Constant.URL.USERGROUP, data)
        .success(function(data) {
          cb();
        })
        .error(function(error) {
          cb(error);
        });
    };

    userGroupService.getGroupList = function(cb) {
      return $http.get(Constant.URL.USERGROUP)
        .success(function(data) {
          userGroupService.groupList = data;
          cb();
        });
    };

    userGroupService.deleteGroup = function(groupId, cb) {
      return $http.delete(Constant.URL.USERGROUP + '/' + groupId)
        .success(function(data) {
          cb();
        })
        .error(function(error) {
          cb(error);
        });
    };

    userGroupService.editGroup = function(groupId, groupName, description, cb) {
      var data = {
        groupName: groupName,
        description: description
      };
      return $http.put(Constant.URL.USERGROUP + '/' + groupId, data)
        .success(function(data) {
          cb();
        })
        .error(function(error) {
          cb(error);
        });
    };

    userGroupService.getGroup = function(groupId, cb) {
      return $http.get(Constant.URL.USERGROUP + '/' + groupId)
        .success(function(data) {
          /////error here [data]
          userGroupService.groupList = [data];
          cb();
        });
    };

    return userGroupService;

  }

  angular
    .module('myou.dashboard.usermaneger')
    .factory('UserInfoService', UserInfoService)
    .factory('UserGroupService', UserGroupService);

})();
