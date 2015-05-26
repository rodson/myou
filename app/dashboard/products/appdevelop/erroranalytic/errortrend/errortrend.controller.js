(function() {
  'use strict';

  function errorTrendConfig($stateProvider) {
    $stateProvider
      .state('dashboard.appdevelop.errortrend', {
        url: '/errortrend',
        templateUrl: 'app/dashboard/products/appdevelop/erroranalytic/errortrend/errortrend.html',
        controllerAs: 'vm',
        controller: 'ErrorTrendCtrl'
      });
  }

  function ErrorTrendCtrl(localStorageService, MomentDateService) {
    var vm = this;
    vm.selectedDate = 2;

    var today = MomentDateService.getToday();
    var yesterday = MomentDateService.getYesterday();
    var last7days = MomentDateService.getLast7Day();
    var last30days = MomentDateService.getLast30Day();
    var last60days = MomentDateService.getLast60Day();

    vm.selectDate = [{
      label: '过去60天',
      start: last60days.start,
      end: last60days.end
    }, {
      label: '过去30天',
      start: last30days.start,
      end: last30days.end
    }, {
      label: '过去7天',
      start: last7days.start,
      end: last7days.end
    }, {
      label: '昨天',
      start: yesterday.start,
      end: yesterday.end
    }, {
      label: '今天',
      start: today.start,
      end: today.end
    }];

    vm.selectDateChanged = function() {
      console.log(vm.selectDate[vm.selectedDate]);
    };
  }

  angular
    .module('myou.dashboard.appdevelop')
    .controller('ErrorTrendCtrl', ErrorTrendCtrl)
    .config(errorTrendConfig);

})();
