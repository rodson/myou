(function() {
  'use strict';

  /**
   * @ngInject
   */
  function websiteTrendConfig($stateProvider) {
    $stateProvider
      .state('dashboard.pageanalytic.websitetrend', {
        url: '/websitetrend',
        templateUrl: 'app/dashboard/products/pageanalytic/websitetrend/websitetrend.html',
        controllerAs: 'vm',
        controller: WebsiteTrendCtrl,
        resolve: WebsiteTrendCtrl.resolve
      });
  }

  /**
   * @ngInject
   */
  function WebsiteTrendCtrl(localStorageService, MomentDateService, WebsiteTrendService) {
    var trickId = localStorageService.get('trickId');

    var vm = this;
    vm.step = 8;
    vm.radioChecked = 'today';

    var checkDate = MomentDateService.getToday();

    vm.startdate = checkDate.start;
    vm.enddate = checkDate.end;

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
    getData: function(localStorageService, MomentDateService, WebsiteTrendService, getData) {
      var today = MomentDateService.getToday();
      var trickId = localStorageService.get('trickId');
      return WebsiteTrendService.getData(trickId, today.start, today.end);
    }
  };

  angular
    .module('myou.dashboard.pageanalytic')
    .controller('WebsiteTrendCtrl', WebsiteTrendCtrl)
    .config(websiteTrendConfig);

})();
