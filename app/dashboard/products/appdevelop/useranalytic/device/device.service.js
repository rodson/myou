(function() {
  'use strict';

  function DeviceService($http, $timeout, PlatformManager,
    StorageManager, UrlManager, MomentDateService) {

    var DeviceService = {};

    DeviceService.app = {};
    DeviceService.radioDate = 'today';
    DeviceService.radioDataType = 'resolution';
    DeviceService.total = 1;

    DeviceService.chartConfig = {
      options: {
        chart: {
          type: 'bar'
        },
        colors: ['#157EF4'],
        tooltip: {
          formatter: function() {
            return this.x + ' : ' + this.y + ' (' + (this.y / DeviceService.total * 100).toFixed(1) + '%)';
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

    DeviceService.init = function() {
      DeviceService.app = StorageManager.getApp();
      DeviceService.getCheckDate('today');
    };

    DeviceService.isAndroidApp = function() {
      return PlatformManager.isAndroidApp(DeviceService.app.platform);
    };

    DeviceService.getCheckDate = function(selectedDate) {
      var checkDate;
      DeviceService.radioDate = selectedDate;

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
      DeviceService.startdate = checkDate.start;
      DeviceService.enddate = checkDate.end;
    };

    DeviceService.getBarChartData = function(stats) {
      if (!DeviceService.startdate) {
        DeviceService.init();
      }

      if (!stats) {
        stats = DeviceService.radioDataType;
      } else {
        DeviceService.radioDataType = stats;
      }

      return $http.get(UrlManager.getDeviceUrl(DeviceService.app.appKey) +
        '?start_date=' + DeviceService.startdate +
        '&end_date=' + DeviceService.enddate +
        '&platform=' + DeviceService.app.platform +
        '&stats=' + stats).success(function(data) {
          $timeout(function() {
            DeviceService.chartConfig.options.xAxis.categories = data.categories;
          }, 1);
          DeviceService.chartConfig.series[0].data = data.data;
          DeviceService.total = data.total > 0 ? data.total : 1;
        });
    };

    return DeviceService;
  }

  angular
    .module('myou.dashboard.appdevelop.useranalytic')
    .factory('DeviceService', DeviceService);

})();
