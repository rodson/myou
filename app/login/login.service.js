(function() {
  'use strict';

  angular
    .module('myou.login')
    .factory('LoginService', LoginService);

  function LoginService($http, LoginConstant) {

    return {
      login: login,
    };

    function login(data) {
      return $http.post(LoginConstant.LOGIN_URL, data)
        .then(loginComplete)
        .catch(loginFailed);

      function loginComplete(response) {
        return response.data;
      }

      function loginFailed(error) {
        // TODO:
      }
    }
  }
})();
