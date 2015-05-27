(function() {
  'use strict';

  function DeviceStatService($http, $timeout, PlatformManager,
    StorageManager, UrlManager, MomentDateService) {

    var DeviceStatService = {};

    DeviceStatService.app = {};
    DeviceStatService.radioDate = 'today';
    DeviceStatService.radioDataType = 'resolution';
    DeviceStatService.total = 1;

    DeviceStatService.chartConfig = {
      options: {
        chart: {
          type: 'bar'
        },
        colors: ['#157EF4'],
        tooltip: {
          formatter: function() {
            return this.x + ' : ' + this.y + ' (' + (this.y / DeviceStatService.total * 100).toFixed(1) + '%)';
          }
        },
        xAxis: {
          categories: [],
          title: {text: ' '}
        }
      },
      series: [{
        showInLegend: false,
        data: [],
        name: ''
      }],
      title: {
        text: ' '
      },
      loading: false,
      noData: '没有数据',
      yAxis: {
        allowDecimals: false,
        min: 0,
        title: {
          text: ' '
        }
      },
      useHighStocks: false,
      func: function (chart) {
        //setup some logic for the chart
      }
    };

    DeviceStatService.init = function() {
      DeviceStatService.app = StorageManager.getApp();
      DeviceStatService.getCheckDate('today');
    };

    DeviceStatService.isAndroidApp = function() {
      return PlatformManager.isAndroidApp(DeviceStatService.app.platform);
    };

    DeviceStatService.getCheckDate = function(selectedDate) {
      var checkDate;
      DeviceStatService.radioDate = selectedDate;

      switch (selectedDate) {
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
      DeviceStatService.startdate = checkDate.start;
      DeviceStatService.enddate = checkDate.end;
    };

    DeviceStatService.getBarChartData = function(stats) {
      if (!DeviceStatService.startdate) {
        DeviceStatService.init();
      }

      if (!stats) {
        stats = DeviceStatService.radioDataType;
      } else {
        DeviceStatService.radioDataType = stats;
      }

      return $http.get(UrlManager.getDeviceUrl(DeviceStatService.app.appKey) +
        '?start_date=' + DeviceStatService.startdate +
        '&end_date=' + DeviceStatService.enddate +
        '&platform=' + DeviceStatService.app.platform +
        '&stats=' + stats).success(function(data) {
          $timeout(function() {
            DeviceStatService.chartConfig.options.xAxis.categories = data.categories;
          }, 1);
          DeviceStatService.chartConfig.series[0].data = data.data;
          DeviceStatService.total = data.total > 0 ? data.total : 1;
        });
    };

    return DeviceStatService;
  }

  angular
    .module('myou.dashboard.appdevelop.useranalytic')
    .factory('DeviceStatService', DeviceStatService);

})();