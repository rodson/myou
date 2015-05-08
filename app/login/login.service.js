(function() {
  'use strict';

  function LoginService($http, $state, $mdDialog, Constant,
      localStorageService) {

    var LoginService = {};

    LoginService.login = function (data, ev) {
      return $http.post(Constant.URL.LOGIN, data)
        .success(loginComplete)
        .error(loginFailed);

      function loginComplete(response) {
        var responseData = response;

        // Save data to local storage
        localStorageService.set('token', responseData.token);
        localStorageService.set('user', responseData.user);

        $state.go('dashboard.products');
      }

      function loginFailed(error) {
        var errorData = error;
        var errorMsg = '';

        if (errorData.code === Constant.RETURN_DATA.USER_NOT_EXIST_CODE) {
          errorMsg = Constant.RETURN_DATA.USER_NOT_EXIST_MSG;
        } else if (errorData.code === Constant.RETURN_DATA.PASSWORD_ERROR_CODE) {
          errorMsg = Constant.RETURN_DATA.PASSWORD_ERROR_MSG;
        }

        $mdDialog.show(
          $mdDialog.alert()
            .title('登录失败')
            .content(errorMsg)
            .ariaLabel('登录失败')
            .ok('确定')
            .targetEvent(ev)
        );
      }
    };

    return LoginService;
  }

  angular
    .module('myou.login')
    .factory('LoginService', LoginService);

})();
