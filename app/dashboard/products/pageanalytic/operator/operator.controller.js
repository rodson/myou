(function() {
  'use strict';

  function operatorConfig($stateProvider) {
    $stateProvider
      .state('dashboard.pageanalytic.operator', {
        url: '/operator',
        templateUrl: 'app/dashboard/products/pageanalytic/operator/operator.html',
        controllerAs: 'vm',
        controller: 'OperatorCtrl',
        // resolve: OperatorCtrl.resolve
      });
  }

  function OperatorCtrl(MomentDateService, OperatorService) {
    var vm = this;

    vm.radioChecked = 'today';

    var checkDate = MomentDateService.getToday();

    vm.startdate = checkDate.start;
    vm.enddate = checkDate.end;

    vm.highchartsOperator = {
      options: {
        chart: {
          type: 'pie',
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: true,
              style: {
                color: 'black'
              }
            },
            showInLegend: true
          }
        },
        tooltip: {
          formatter: function() {
            return this.series.name + '：<b>' + this.y + '</b>，占比：<b>' + this.percentage.toFixed(1) + ' %</b>';
          }
        },
      },
      title: {
        text: '运营商分布'
      },
      noData: 'No data'
    };

    vm.highchartsOperator.series = [{
      type: 'pie',
      data: [
        ['联通', 11],
        ['移动', 21],
        ['电信', 31],
        ['珠海', 25],
        ['海南', 25],
        ['男孩', 25]
      ]
    }];

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
      OperatorService.getData(vm.startdate, vm.enddate, 10000014, function(data) {
        vm.setData(data);
      });
    };

    vm.setData = function(data) {
      vm.datas = data;
      vm.datas = [{
        isp: '联通',
        ip: 12,
        pv: 40,
        uv: 13
      }, {
        isp: '移动',
        ip: 12,
        pv: 40,
        uv: 13
      }, {
        isp: '电信',
        ip: 12,
        pv: 40,
        uv: 13
      }, {
        isp: '珠海',
        ip: 12,
        pv: 40,
        uv: 13
      }, {
        isp: '海珠',
        ip: 12,
        pv: 40,
        uv: 13
      }, {
        isp: '海南',
        ip: 12,
        pv: 40,
        uv: 13
      }];
    };
    vm.setData(OperatorService.data);
  }

  OperatorCtrl.resolve = {
    getData: function(MomentDateService, PageRankingService) {
      var today = MomentDateService.getToday();
      return PageRankingService.getData(today.start, today.end, 10000014);
    }
  };

  angular
    .module('myou.dashboard.pageanalytic')
    .controller('OperatorCtrl', OperatorCtrl)
    .config(operatorConfig);

})();
