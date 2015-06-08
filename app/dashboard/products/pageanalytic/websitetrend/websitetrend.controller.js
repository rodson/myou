(function() {
  'use strict';

  /**
   * @ngInject
   */
  function websiteTrendConfig($stateProvider) {
    $stateProvider
      .state('dashboard.pageanalytic.websitetrend', {
        url: '/websitetrend?start_date&end_date',
        templateUrl: 'app/dashboard/products/pageanalytic/websitetrend/websitetrend.html',
        controllerAs: 'vm',
        controller: WebsiteTrendCtrl,
        resolve: WebsiteTrendCtrl.resolve
      });
  }

  /**
   * @ngInject
   */
  function WebsiteTrendCtrl(localStorageService, MomentDateService,
    WebsiteTrendService, StateManager, initData) {

    var trickId = localStorageService.get('trickId');

    var vm = this;
    vm.step = 8;

    vm.startdate = initData.startDate;
    vm.enddate = initData.endDate;

    vm.highchartsNG = {
      title: {
        text: 'PV/UV/IP趋势'
      },
      xAxis: {
        categories: [],
        labels: {
          staggerLines: 1
        }
      },
      yAxis: {
        title: {
          text: '数量'
        }
      },
      loading: false,
      noData: 'No data'
    };

    vm.getCheckDate = function(){
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
      WebsiteTrendService.getData(trickId, vm.startdate, vm.enddate, function(data) {
        vm.setData(data);
      });
    };

    vm.setData = function(data) {
      if(!data || !data.data || !data.cx) {
        return false;
      }
      vm.highchartsNG.series = data.data;
      vm.highchartsNG.xAxis.labels.step = Math.ceil(data.cx.length / vm.step);
      vm.highchartsNG.xAxis.categories = data.cx;
    };

    /******************************* test start ******************************/
    // vm.setData(WebsiteTrendService.data);
    /******************************* test end ******************************/
    vm.setData(WebsiteTrendService.data);
  }

  WebsiteTrendCtrl.resolve = {
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
    getData: function(localStorageService, MomentDateService, WebsiteTrendService, $stateParams, getData) {
      var trickId = localStorageService.get('trickId');
      var startDate = $stateParams.start_date;
      var endDate = $stateParams.end_date;
      return WebsiteTrendService.getData(trickId, startDate, endDate);
    }
  };

  angular
    .module('myou.dashboard.pageanalytic')
    .controller('WebsiteTrendCtrl', WebsiteTrendCtrl)
    .config(websiteTrendConfig);

})();
