(function() {
  'use strict';

  angular
    .module('myou.login')
    .controller('LoginController', LoginController);

  function LoginController() {
    console.log('this is login view');
  }
})();
