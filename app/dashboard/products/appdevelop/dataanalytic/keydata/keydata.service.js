(function() {
  'use strict';

  function KeyDataService($http, StorageManager, UrlManager, PlatformManager, MomentDateService) {
    var KeyDataService = {};

    KeyDataService.app = {};

    KeyDataService.radioDate = 'last7days';
    KeyDataService.radioKeyDataType = 'new_user_count';
    KeyDataService.tableData = [];
    KeyDataService.date = {};

    // Key data statistic line char config
    KeyDataService.chartConfig = {
      options: {
        chart: {
          type: 'line'
        },
        colors: ['#157EF4'],
        tooltip: {
          style: {
            padding: 10,
            fontWeight: 'bold'
          },
          pointFormat: 'Value: {point.y}'
        }
      },
      plotOptions: {
        column: {
          color: '#157EF4'
        }
      },
      // Y axis data
      series: [{
        showInLegend: false,
        pointStart: (new Date(KeyDataService.date.start)).getTime(),
        pointInterval: 24 * 3600 * 1000,
        name: '',
        data: []
      }],
      title: {
        text: ' '
      },
      noData: '没有数据',
      // X axis data
      xAxis: {
        type: 'datetime',
        labels: {
          format: '{value:%m-%d}'
        },
        minTickInterval: 24 * 3600 * 1000
      },
      yAxis: {
        allowDecimals: false,
        min: 0,
        title: {
          text: ' '
        }
      },
      useHighStocks: false,
      //function (optional)
      func: function (chart) {
        //setup some logic for the chart
      }
    };

    KeyDataService.getApp = function() {
      KeyDataService.app = StorageManager.getApp();
      return KeyDataService.app;
    };

    KeyDataService.init = function() {
      KeyDataService.getApp();
      KeyDataService.getCheckDate('last7days');
    };


    KeyDataService.isWindowsApp = function() {
      return PlatformManager.isWindowsApp(KeyDataService.app.platform);
    };

    KeyDataService.getCheckDate = function(selectedDate) {
      var checkDate;
      KeyDataService.radioDate = selectedDate;

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
      KeyDataService.date.start = checkDate.start;
      KeyDataService.date.end = checkDate.end;
      KeyDataService.chartConfig.series[0].pointStart = (new Date(checkDate.start)).getTime();
    };

    KeyDataService.getLineChartData = function(stats) {
      if (!KeyDataService.date.start) {
        KeyDataService.init();
      }

      if (!stats) {
        stats = KeyDataService.radioKeyDataType;
      } else {
        KeyDataService.radioKeyDataType = stats;
      }

      return $http.get(UrlManager.getAnalyzeKeyDataUrl(KeyDataService.app.appKey) +
        '?start_date=' + KeyDataService.date.start + '&end_date=' + KeyDataService.date.end +
        '&platform=' + KeyDataService.app.platform + '&stats=' + stats)
        .success(function(data) {
          KeyDataService.chartConfig.series[0].data = data.counts;
        });
    };

    KeyDataService.getTableData = function() {
      if (!KeyDataService.date.start) {
        KeyDataService.init();
      }

      return $http.get(UrlManager.getAnalyzeKeyDataUrl(KeyDataService.app.appKey) +
        '?start_date=' + KeyDataService.date.start + '&end_date=' + KeyDataService.date.end +
        '&platform=' + KeyDataService.app.platform + '&stats=key_data')
        .success(function(data) {
          KeyDataService.tableData = data;
        });
    };

    return KeyDataService;
  }

  angular
    .module('myou.dashboard.appdevelop.dataanalytic')
    .factory('KeyDataService', KeyDataService);
})();
