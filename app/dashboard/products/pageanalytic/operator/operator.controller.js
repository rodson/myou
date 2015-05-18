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

    vm.radioDate = 'today';
    vm.radioOperator = 'pv';

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
              enabled: false,
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
        text: '<label style="font-size:14px;">运营商分布</label>',
        align: 'center',
        verticalAlign: 'middle',
        y: -10
      },
      noData: '<br>No data'
    };

    vm.getCheckDate = function() {
      switch (vm.radioDate) {
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

    vm.getCheckPieType = function() {
      vm.setPieData();
    };

    vm.getData = function() {
      OperatorService.getData(vm.startdate, vm.enddate, 10000014, function(data) {
        vm.setData();
      });
    };

    vm.setData = function() {
      vm.datas = OperatorService.data.tableData;
      vm.setPieData();
    };

    vm.setPieData = function() {
      vm.highchartsOperator.series = [{
        type: 'pie',
        innerSize: '50%',
        name: vm.radioOperator.toUpperCase(),
        data: OperatorService.data[vm.radioOperator]
      }];
    };

    vm.setData();
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
