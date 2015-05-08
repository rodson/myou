(function() {
  'use strict';

  function dashboardConfig($stateProvider, $httpProvider) {
    $stateProvider
      .state('dashboard', {
        abstract: true,
        url: '/dashboard',
        templateUrl: 'app/dashboard/dashboard.html',
        resolve: {
          loggedIn: checkLoggedIn
        }
      });
  }

  function checkLoggedIn($q, $state, $http, localStorageService, Constant) {
    var deferred = $q.defer();
    $http.get(Constant.URL.CHECK_LOGIN)
      .success(function() {
        deferred.resolve();
      }).error(function() {
        deferred.reject();
        if (localStorageService.get('token')) {
          localStorageService.remove('token');
          localStorageService.remove('user');
        }
        $state.go('login');
      });

    return deferred.promise;
  }

  angular
    .module('myou.dashboard', [
      'ui.router',
      'ngMaterial',
      'LocalStorageModule',

      'myou.shared',

      'myou.dashboard.products',
      'myou.dashboard.addproduct',
      'myou.dashboard.document'
    ])
    .config(dashboardConfig);

})();
