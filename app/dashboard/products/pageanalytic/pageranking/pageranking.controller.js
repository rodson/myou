(function() {
  'use strict';

  function pageRankingConfig($stateProvider) {
    $stateProvider
      .state('dashboard.pageanalytic.pageranking', {
        url: '/pageranking',
        templateUrl: 'app/dashboard/products/pageanalytic/pageranking/pageranking.html',
        controllerAs: 'vm',
        controller: 'PageRankingCtrl',
        // resolve: PageRankingCtrl.resolve
      });
  }

  function PageRankingCtrl(MomentDateService, PageRankingService) {
    var vm = this;

    vm.radioChecked = 'today';

    var checkDate = MomentDateService.getToday();

    vm.startdate = checkDate.start;
    vm.enddate = checkDate.end;

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

    vm.getData = function() {
      PageRankingService.getData(vm.startdate, vm.enddate, 10000014, function(data) {
        vm.setData(data);
      });
    };

    vm.setData = function(data) {
      vm.datas = data;
    };
    vm.setData(PageRankingService.data);
  }

  PageRankingCtrl.resolve = {
    getData: function(MomentDateService, PageRankingService) {
      var today = MomentDateService.getToday();
      return PageRankingService.getData(today.start, today.end, 10000014);
    }
  };

  angular
    .module('myou.dashboard.pageanalytic')
    .controller('PageRankingCtrl', PageRankingCtrl)
    .config(pageRankingConfig);

})();
