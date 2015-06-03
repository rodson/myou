(function() {
  'use strict';

  /**
   * @ngInject
   */
  function UserProfileService($http, Constant) {
    var userProfileService = {};

    userProfileService.updateUser = function(user, userId, cb) {
      return $http.put(Constant.URL.USERINFO + '/' + userId, user)
        .success(function() {
          cb();
        })
        .error(function(error) {
          cb(error);
        });
    };

    userProfileService.verifyPassword = function(password, cb) {
      var data = {
        password: password
      };
      return $http.post(Constant.URL.USERAUTH + '/verifypassword', data)
        .success(function(){
          cb();
        })
        .error(function(error){
          cb(error);
        });
    };

    userProfileService.changePassword = function(userId, password, newpassword, cb) {
      userProfileService.verifyPassword(password, function(error){
        if(error){
          return cb(error);
        }
        var data = {
          password: newpassword
        };
        userProfileService.updateUser(data, userId, cb);
      });
    };

    return userProfileService;
  }

  angular
    .module('myou.dashboard')
    .factory('UserProfileService', UserProfileService);
})();
