(function() {
  'use strict';

  angular
    .module('myou.login')
    .factory('LoginService', LoginService);

  function LoginService($http, $state, LoginConstant, localStorageService) {

    return {
      login: login,
    };

    function login(data) {
      return $http.post(LoginConstant.LOGIN_URL, data)
        .then(loginComplete)
        .catch(loginFailed);

      function loginComplete(response) {
        var responseData = response.data;

        // Save data to local storage
        localStorageService.set('token', responseData.token);
        localStorageService.set('user', responseData.user);

        $state.go('dashboard.usermanager');
      }

      function loginFailed(error) {
        var errorData = error.data;

        if (errorData.code === LoginConstant.USER_NOT_EXIST_CODE) {
          return LoginConstant.USER_NOT_EXIST_MSG;
        } else if (errorData.code === LoginConstant.PASSWORD_ERROR_CODE) {
          return LoginConstant.PASSWORD_ERROR_MSG;
        }
      }
    }
  }
})();
