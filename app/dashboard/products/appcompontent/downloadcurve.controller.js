(function() {
  'use strict';

  function downloadCurveConfig($stateProvider) {
    $stateProvider
      .state('dashboard.appcompontent.downloadcurve', {
        url: '/downloadcurve',
        templateUrl: 'app/dashboard/products/appcompontent/downloadcurve.html',
        controllerAs: 'vm',
        controller: 'DownloadCurveCtrl'
      });
  }

  function DownloadCurveCtrl(MomentDateService, localStorageService) {
    var vm = this;
    vm.app = localStorageService.get('app');
    vm.checkdate = MomentDateService.getToday().start;
  }

  angular
    .module('myou.dashboard.appcompontent')
    .controller('DownloadCurveCtrl', DownloadCurveCtrl)
    .config(downloadCurveConfig);

})();
