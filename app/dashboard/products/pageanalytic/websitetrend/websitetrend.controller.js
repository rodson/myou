(function() {
  'use strict';

  function websiteTrendConfig($stateProvider) {
    $stateProvider
      .state('dashboard.pageanalytic.websitetrend', {
        url: '/websitetrend',
        templateUrl: 'app/dashboard/products/pageanalytic/websitetrend/websitetrend.html',
        controllerAs: 'vm',
        controller: 'WebsiteTrendCtrl',
        // resolve: WebsiteTrendCtrl.resolve
      });
  }

  function WebsiteTrendCtrl(dateFilter, MomentDateService) {
    var vm = this;
    var format = 'yyyy-MM-dd';

    vm.radioChecked = 'today';

    var checkDate = MomentDateService.getToday();

    vm.startdate = checkDate.start;
    vm.enddate = checkDate.end;

    vm.highchartsNG = {
      title: {
        text: 'PV/UV/IP趋势'
      },
      xAxis: {
        categories: [1, 2, 3, 4, 5],
        labels: {
          staggerLines: 1
        }
      },
      yAxis: {
        title: {
          text: '数量'
        },
        plotLines: [{
          value: 0,
          width: 1,
          color: '#808080'
        }]
      },
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
        borderWidth: 1
      }
    }

    vm.getData = function() {
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

      vm.highchartsNG.series = [{
        name: 'PV',
        data: [1, 2, 3, 4, 5]
      }, {
        name: 'UV',
        data: [2, 3, 4, 5, 6]
      }, {
        name: 'IP',
        data: [3, 4, 5, 6, 7]
      }];

    };

    vm.getData();
  }

  WebsiteTrendCtrl.resolve = {
    getData: function() {
      return vm.getData();
    }
  };

  angular
    .module('myou.dashboard.pageanalytic')
    .controller('WebsiteTrendCtrl', WebsiteTrendCtrl)
    .config(websiteTrendConfig);

})();
