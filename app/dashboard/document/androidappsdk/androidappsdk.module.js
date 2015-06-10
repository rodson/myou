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
        templateUrl: 'app/dashboard/document/androidappsdk/content/getappkey.html'
      })
      .state('dashboard.document.androidappsdk.importsdk', {
        url: '/importsdk',
        templateUrl: 'app/dashboard/document/androidappsdk/content/importsdk.html'
      })
      .state('dashboard.document.androidappsdk.configmanifest', {
        url: '/configmanifest',
        templateUrl: 'app/dashboard/document/androidappsdk/content/configmanifest.html'
      })
      .state('dashboard.document.androidappsdk.sessionstats', {
        url: '/sessionstats',
        templateUrl: 'app/dashboard/document/androidappsdk/content/sessionstats.html'
      })
      .state('dashboard.document.androidappsdk.customevent', {
        url: '/customevent',
        templateUrl: 'app/dashboard/document/androidappsdk/content/customevent.html'
      })
      .state('dashboard.document.androidappsdk.otherstats', {
        url: '/otherstats',
        templateUrl: 'app/dashboard/document/androidappsdk/content/otherstats.html'
      })
      .state('dashboard.document.androidappsdk.appupdate', {
        url: '/appupdate',
        templateUrl: 'app/dashboard/document/androidappsdk/content/appupdate.html'
      })
      .state('dashboard.document.androidappsdk.customupdate', {
        url: '/customupdate',
        templateUrl: 'app/dashboard/document/androidappsdk/content/customupdate.html'
      })
      .state('dashboard.document.androidappsdk.servicemonitor', {
        url: '/servicemonitor',
        templateUrl: 'app/dashboard/document/androidappsdk/content/servicemonitor.html'
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
