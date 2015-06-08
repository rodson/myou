(function() {
  'use strict';

  /**
   * @ngInject
   */
  function pageRankingConfig($stateProvider) {
    $stateProvider
      .state('dashboard.pageanalytic.pageranking', {
        url: '/pageranking?start_date&end_date',
        templateUrl: 'app/dashboard/products/pageanalytic/pageranking/pageranking.html',
        controllerAs: 'vm',
        controller: 'PageRankingCtrl',
        resolve: PageRankingCtrl.resolve
      });
  }

  /**
   * @ngInject
   */
  function PageRankingCtrl(localStorageService, MomentDateService,
    initData, StateManager, PageRankingService) {
    var trickId = localStorageService.get('trickId');

    var vm = this;

    vm.startdate = initData.startDate;
    vm.enddate = initData.endDate;

    vm.getCheckDate = function() {
      var checkDate;

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
      StateManager.setQueryParams('start_date', vm.startdate);
      StateManager.setQueryParams('end_date', vm.enddate);
      PageRankingService.getData(vm.startdate, vm.enddate, trickId, function(data) {
        vm.setData(data);
      });
    };

    vm.setData = function(data) {
      vm.datas = data;
    };

    /******************************* test start ******************************/
    // vm.setData(PageRankingService.data);
    /******************************* test end ******************************/
    vm.setData(PageRankingService.data);
  }

  PageRankingCtrl.resolve = {
    /**
     * @ngInject
     */
    initData: function(getData, $stateParams) {
      var initData = {};

      initData.startDate = $stateParams.start_date;
      initData.endDate = $stateParams.end_date;

      return initData;
    },
    /**
     * @ngInject
     */
    getData: function(localStorageService, PageRankingService, $stateParams, getData) {
      var startDate = $stateParams.start_date;
      var endDate = $stateParams.end_date;
      var trickId = localStorageService.get('trickId');
      return PageRankingService.getData(startDate, endDate, trickId);
    }
  };

  angular
    .module('myou.dashboard.pageanalytic')
    .controller('PageRankingCtrl', PageRankingCtrl)
    .config(pageRankingConfig);

})();
