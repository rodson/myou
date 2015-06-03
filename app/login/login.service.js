(function() {
  'use strict';

  /**
   * @ngInject
   */
  function LoginService($http, $state, $mdToast, $location,
      Constant, StorageManager) {

    var LoginService = {};

    LoginService.login = function (data, ev, autoLogin) {
      return $http.post(Constant.URL.LOGIN, data)
        .success(loginComplete)
        .error(loginFailed);

      function loginComplete(response) {
        var responseData = response;

        // Save data to local storage
        StorageManager.setToken(responseData.token, autoLogin);
        StorageManager.setUser(responseData.user);

        var currentPath = StorageManager.getPath();
        if (currentPath) {
          $location.path(currentPath);
          StorageManager.deletePath();
        } else {
          $state.go('dashboard.products');
        }
      }

      function loginFailed(error) {
        var errorData = error;
        var errorMsg = '';

        if (errorData.code === Constant.RETURN_DATA.USER_NOT_EXIST_CODE) {
          errorMsg = Constant.RETURN_DATA.USER_NOT_EXIST_MSG;
        } else if (errorData.code === Constant.RETURN_DATA.PASSWORD_ERROR_CODE) {
          errorMsg = Constant.RETURN_DATA.PASSWORD_ERROR_MSG;
        }

        $mdToast.show(
          $mdToast.simple()
            .content(errorMsg)
            .position('right top')
            .hideDelay(3000)
        );
      }
    };

    return LoginService;
  }

  angular
    .module('myou.login')
    .factory('LoginService', LoginService);

})();
