(function() {
  'use strict';

  /**
   * @ngInject
   */
  function docAndroidOsSdkConfig($stateProvider) {
    $stateProvider
      .state('dashboard.document.androidossdk', {
        abstract: true,
        url: '/androidossdk',
        templateUrl: 'app/dashboard/document/androidossdk/androidossdk.html',
        controller: 'DocAndroidOsSdkCtrl',
        controllerAs: 'vm'
      })
      .state('dashboard.document.androidossdk.getappkey', {
        url: '/getappkey',
        templateUrl: 'app/dashboard/document/androidossdk/content/getappkey.html'
      })
      .state('dashboard.document.androidossdk.importsdk', {
        url: '/importsdk',
        templateUrl: 'app/dashboard/document/androidossdk/content/importsdk.html'
      })
      .state('dashboard.document.androidossdk.configmanifest', {
        url: '/configmanifest',
        templateUrl: 'app/dashboard/document/androidossdk/content/configmanifest.html'
      })
      .state('dashboard.document.androidossdk.updateapi', {
        url: '/updateapi',
        templateUrl: 'app/dashboard/document/androidossdk/content/updateapi.html'
      })
      .state('dashboard.document.androidossdk.updatedemo', {
        url: '/updatedemo',
        templateUrl: 'app/dashboard/document/androidossdk/content/updatedemo.html'
      });
  }

  /**
   * @ngInject
   */
  function DocAndroidOsSdkCtrl($location) {
    var vm = this;
    vm.isActive = function(path) {
      return ($location.path().indexOf(path) > -1);
    };
  }

   angular
     .module('myou.dashboard.document')
     .controller('DocAndroidOsSdkCtrl', DocAndroidOsSdkCtrl)
     .config(docAndroidOsSdkConfig);

})();
