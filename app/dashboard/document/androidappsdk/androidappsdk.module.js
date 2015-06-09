(function() {
  'use strict';

  /**
   * @ngInject
   */
  function docAndroidAppSdkConfig($stateProvider) {
    $stateProvider
      .state('dashboard.document.androidappsdk', {
        abstract: true,
        url: '/androidappsdk',
        templateUrl: 'app/dashboard/document/androidappsdk/androidappsdk.html',
        controller: 'DocAndroidAppSdkCtrl',
        controllerAs: 'vm'
      })
      .state('dashboard.document.androidappsdk.getappkey', {
        url: '/getappkey',
        templateUrl: 'app/dashboard/document/androidappsdk/integrate/getappkey.html'
      })
      .state('dashboard.document.androidappsdk.importsdk', {
        url: '/importsdk',
        templateUrl: 'app/dashboard/document/androidappsdk/integrate/importsdk.html'
      })
      .state('dashboard.document.androidappsdk.configmanifest', {
        url: '/configmanifest',
        templateUrl: 'app/dashboard/document/androidappsdk/integrate/configmanifest.html'
      });
  }

  /**
   * @ngInject
   */
  function DocAndroidAppSdkCtrl($location) {
    var vm = this;
    vm.isActive = function(path) {
      return ($location.path().indexOf(path) > -1);
    };
  }

   angular
     .module('myou.dashboard.document')
     .controller('DocAndroidAppSdkCtrl', DocAndroidAppSdkCtrl)
     .config(docAndroidAppSdkConfig);

})();
