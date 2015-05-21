(function() {
  'use strict';

  function keyDataConfig($stateProvider) {
    $stateProvider
      .state('dashboard.appdevelop.keydata', {
        url: '/keydata',
        templateUrl: 'app/dashboard/products/appdevelop/dataanalytic/keydata/keydata.html',
        controllerAs: 'vm',
        controller: 'KeyDataCtrl',
        resolve: KeyDataCtrl.resolve
      });
  }

  function KeyDataCtrl(MomentDateService, KeyDataService) {
    var vm = this;

    vm.radioChecked = 'today';

    var checkDate = MomentDateService.getToday();

    vm.getCheckDate = function() {
      switch (vm.radioChecked) {
        case 'today':
          checkDate = MomentDateService.getToday();
          break;
        case 'yesterday':
          checkDate = MomentDateService.getYesterday();
          break;
        case 'last7days':
          checkDate = MomentDateService.getLast7Day();
          break;
        case 'last30days':
          checkDate = MomentDateService.getLast30Day();
          break;
        default:
          checkDate = MomentDateService.getToday();
          break;
      }
      vm.startdate = checkDate.start;
      vm.enddate = checkDate.end;
      vm.getData();
    };

  }

  KeyDataCtrl.resolve = {
  };

  angular
    .module('myou.dashboard.appdevelop.dataanalytic')
    .controller('KeyDataCtrl', KeyDataCtrl)
    .config(keyDataConfig);

})();
