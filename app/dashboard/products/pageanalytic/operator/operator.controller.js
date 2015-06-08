(function() {
  'use strict';

  /**
   * @ngInject
   */
  function operatorConfig($stateProvider) {
    $stateProvider
      .state('dashboard.pageanalytic.operator', {
        url: '/operator?start_date&end_date&stats',
        templateUrl: 'app/dashboard/products/pageanalytic/operator/operator.html',
        controllerAs: 'vm',
        controller: 'OperatorCtrl',
        resolve: OperatorCtrl.resolve
      });
  }

  /**
   * @ngInject
   */
  function OperatorCtrl(localStorageService, MomentDateService,
    OperatorService, StateManager, initData) {

    var vm = this;
    var trickId = localStorageService.get('trickId');

    vm.radioPvUvIp = initData.stats;

    vm.startdate = initData.startDate;
    vm.enddate = initData.endDate;

    vm.highchartsPie = {
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
            return '<b>' + this.key + '</b><br>' + this.series.name + '：<b>' + this.y + '</b>，占比：<b>' + this.percentage.toFixed(1) + ' %</b>';
          }
        },
      },
      title: {
        text: '',
      },
      noData: 'No data'
    };

    vm.getCheckDate = function() {
      var checkDate;

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
      StateManager.setQueryParams('stats', vm.radioPvUvIp);
      vm.setPieData();
    };

    vm.getData = function() {
      StateManager.setQueryParams('start_date', vm.startdate);
      StateManager.setQueryParams('end_date', vm.enddate);
      OperatorService.getData(vm.startdate, vm.enddate, trickId, function(data) {
        vm.setData();
      });
    };

    vm.setData = function() {
      vm.datas = OperatorService.data.tableData;
      vm.setPieData();
    };

    vm.setPieData = function() {
      vm.highchartsPie.series = [{
        type: 'pie',
        innerSize: '50%',
        name: vm.radioPvUvIp.toUpperCase(),
        data: OperatorService.data[vm.radioPvUvIp]
      }];
    };

    /******************************* test start ******************************/
    // vm.setData();
    /******************************* test end ******************************/
    vm.setData();
  }

  OperatorCtrl.resolve = {
    /**
     * @ngInject
     */
    initData: function(getData, $stateParams) {
      var initData = {};

      initData.startDate = $stateParams.start_date;
      initData.endDate = $stateParams.end_date;
      initData.stats = $stateParams.stats;

      return initData;
    },

    /**
     * @ngInject
     */
    getData: function(localStorageService, OperatorService, $stateParams, getData) {
      var startDate = $stateParams.start_date;
      var endDate = $stateParams.end_date;
      var trickId = localStorageService.get('trickId');
      return OperatorService.getData(startDate, endDate, trickId);
    }
  };

  angular
    .module('myou.dashboard.pageanalytic')
    .controller('OperatorCtrl', OperatorCtrl)
    .config(operatorConfig);

})();
