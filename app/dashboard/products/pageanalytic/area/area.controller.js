(function() {
  'use strict';

  function areaConfig($stateProvider) {
    $stateProvider
      .state('dashboard.pageanalytic.area', {
        url: '/area',
        templateUrl: 'app/dashboard/products/pageanalytic/area/area.html',
        controllerAs: 'vm',
        controller: 'AreaCtrl',
        // resolve: AreaCtrl.resolve
      });
  }

  function AreaCtrl(MomentDateService, AreaService, AreaMapDataConstant) {
    var vm = this;

    vm.radioDate = 'today';
    vm.radioPvUvIp = 'pv';

    var checkDate = MomentDateService.getToday();

    vm.startdate = checkDate.start;
    vm.enddate = checkDate.end;

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
        text: '', //'<label style='font-size:14px;'>地域分布</label>',
        align: 'center',
        verticalAlign: 'top',
        y: Math.ceil(AreaService.data.tableData.length / 5 + 1) * (-5)
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
      vm.setMapData();
    };

    vm.getData = function() {
      AreaService.getData(vm.startdate, vm.enddate, 10000014, function(data) {
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
    vm.setData();
    /******************* test end *****************/

    // vm.getData();
  }

  AreaCtrl.resolve = {
    getData: function(MomentDateService, AreaService) {
      var today = MomentDateService.getToday();
      return AreaService.getData(today.start, today.end, 10000014);
    }
  };

  angular
    .module('myou.dashboard.pageanalytic')
    .controller('AreaCtrl', AreaCtrl)
    .config(areaConfig);

})();
