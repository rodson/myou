(function() {
  'use strict';

  angular
    .module('myou.login')
    .factory('LoginService', LoginService);

  function LoginService($http, LoginConstant, localStorageService) {

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

        return responseData;
      }

      function loginFailed(error) {
        // TODO:
      }
    }
  }
})();
