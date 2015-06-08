(function() {
  'use strict';

  /**
   * @ngInject
   */
  function DeviceStatService($http, $timeout, PlatformManager,
    StorageManager, UrlManager, MomentDateService, StateManager) {

    var DeviceStatService = {};

    var KEY_SELECTED_DATE = 'dev_selected_date';
    var KEY_STATS = 'dev_stats';

    DeviceStatService.app = {};
    DeviceStatService.total = 1;
    DeviceStatService.date = {};

    DeviceStatService.chartConfig = {
      options: {
        chart: {
          type: 'bar'
        },
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
      noData: 'No data',
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

    DeviceStatService.init = function(stats, selected_date) {
      DeviceStatService.app = StorageManager.getApp();
      DeviceStatService.radioDataType = stats;
      DeviceStatService.radioDate = selected_date;
      DeviceStatService.getCheckDate(selected_date);
    };

    DeviceStatService.isAndroidApp = function() {
      return PlatformManager.isAndroidApp(DeviceStatService.app.platform);
    };

    DeviceStatService.getCheckDate = function(selectedDate) {
      StateManager.setQueryParams(KEY_SELECTED_DATE, selectedDate);
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
      DeviceStatService.date.start = checkDate.start;
      DeviceStatService.date.end = checkDate.end;
    };

    DeviceStatService.getCheckDataType = function(stats) {
      StateManager.setQueryParams(KEY_STATS, stats);
      DeviceStatService.radioDataType = stats;
    };

    DeviceStatService.getBarChartData = function() {
      return $http.get(UrlManager.getDeviceUrl(DeviceStatService.app.appKey) +
        '?start_date=' + DeviceStatService.date.start +
        '&end_date=' + DeviceStatService.date.end +
        '&platform=' + DeviceStatService.app.platform +
        '&stats=' + DeviceStatService.radioDataType).success(function(data) {
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
