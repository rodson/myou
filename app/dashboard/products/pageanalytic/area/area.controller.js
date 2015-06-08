(function() {
  'use strict';

  /**
   * @ngInject
   */
  function areaConfig($stateProvider) {
    $stateProvider
      .state('dashboard.pageanalytic.area', {
        url: '/area?start_date&end_date&stats',
        templateUrl: 'app/dashboard/products/pageanalytic/area/area.html',
        controllerAs: 'vm',
        controller: 'AreaCtrl',
        resolve: AreaCtrl.resolve
      });
  }

  /**
   * @ngInject
   */
  function AreaCtrl(localStorageService, MomentDateService,
    AreaService, AreaMapDataConstant, StateManager, initData) {

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

    /******************* test map start *****************/

    vm.highchartsMap = {
      loading: false,
      noData: 'No data',
      options: {
        chart: {
          height: 450,
        },
        mapNavigation: {
          enabled: false,
          buttonOptions: {
            verticalAlign: 'bottom'
          }
        },
        colorAxis: {
          min: 0
        },
        legend: {
          enabled: true,
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'middle',
          x: -20
        }
      },
      chartType: 'map',
      title: {
        text: ''
      },
      series: [{
        data: AreaService.data[vm.radioPvUvIp],
        mapData: AreaMapDataConstant.MAP_DATA,
        joinBy: 'name',
        name: vm.radioPvUvIp.toUpperCase(),
        states: {
          hover: {
            color: '#BADA55'
          }
        },
        dataLabels: {
          enabled: true,
          format: '{point.name}'
        }
      }]
    };

    /******************* test map end *****************/

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
      vm.setMapData();
    };

    vm.getData = function() {
      StateManager.setQueryParams('start_date', vm.startdate);
      StateManager.setQueryParams('end_date', vm.enddate);
      AreaService.getData(vm.startdate, vm.enddate, trickId, function(data) {
        vm.setData();
      });
    };

    vm.setData = function() {
      vm.datas = AreaService.data.tableData;
      vm.setPieData();
      vm.setMapData();
    };

    vm.setPieData = function() {
      vm.highchartsPie.series = [{
        type: 'pie',
        innerSize: '50%',
        name: vm.radioPvUvIp.toUpperCase(),
        data: AreaService.data[vm.radioPvUvIp]
      }];
    };

    vm.setMapData = function() {
      vm.highchartsMap.series = [{
        data: AreaService.data[vm.radioPvUvIp],
        mapData: AreaMapDataConstant.MAP_DATA,
        joinBy: 'name',
        name: vm.radioPvUvIp.toUpperCase(),
        states: {
          hover: {
            color: '#BADA55'
          }
        },
        dataLabels: {
          enabled: true,
          format: '{point.name}'
        }
      }];
    };
    /******************* test start *****************/
    // vm.setData();
    /******************* test end *****************/

    vm.setData();
  }

  AreaCtrl.resolve = {
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
    getData: function(localStorageService, AreaService, $stateParams, getData) {
      var startDate = $stateParams.start_date;
      var endDate = $stateParams.end_date;
      var trickId = localStorageService.get('trickId');
      return AreaService.getData(startDate, endDate, trickId);
    }
  };

  angular
    .module('myou.dashboard.pageanalytic')
    .controller('AreaCtrl', AreaCtrl)
    .config(areaConfig);

})();
