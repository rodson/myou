(function() {
  'use strict';

  /**
   * @ngInject
   */
  function KeyDataService($http, StorageManager, UrlManager,
    PlatformManager, MomentDateService, StateManager) {

    var KeyDataService = {};

    KeyDataService.app = {};

    var VALID_STATS_ARRAY = ['new_user_count', 'active_user_count', 'session_count', 'accumulate_user_count'];
    var VALID_DATE_ARRAY = ['today', 'yesterday', 'last7days', 'last30days'];

    var DEFAULT_STATS = 'new_user_count';
    var DEFAULT_DATE = 'last7days';

    var KEY_SELECTED_DATE = 'selected_date';
    var KEY_STATS = 'stats';


    KeyDataService.radioDate = DEFAULT_DATE;
    KeyDataService.radioKeyDataType = DEFAULT_STATS;
    KeyDataService.tableData = [];
    KeyDataService.date = {};

    // Key data statistic line char config
    KeyDataService.chartConfig = {
      options: {
        chart: {
          type: 'line'
        },
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
      loading: false,
      noData: 'No data',
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

    KeyDataService.init = function(stats, selected_date) {
      // Init app info
      KeyDataService.getApp();

      // Init queryString
      if (VALID_STATS_ARRAY.indexOf(stats) > -1) {
        KeyDataService.radioKeyDataType = stats;
      } else {
        KeyDataService.radioKeyDataType = DEFAULT_STATS;
      }
      if (VALID_DATE_ARRAY.indexOf(selected_date) > -1) {
        KeyDataService.radioDate = selected_date;
      } else {
        KeyDataService.radioDate = DEFAULT_DATE;
      }

      // Init startdate and enddate
      KeyDataService.getCheckDate(KeyDataService.radioDate);
    };

    KeyDataService.isWindowsApp = function() {
      return PlatformManager.isWindowsApp(KeyDataService.app.platform);
    };

    KeyDataService.getCheckDate = function(selectedDate) {
      StateManager.setQueryParams(KEY_SELECTED_DATE, selectedDate);
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

    KeyDataService.getCheckDataType = function(stats) {
      StateManager.setQueryParams(KEY_STATS, stats);
      KeyDataService.radioKeyDataType = stats;
    };

    KeyDataService.getLineChartData = function() {
      return $http.get(UrlManager.getAnalyzeKeyDataUrl(KeyDataService.app.appKey) +
        '?start_date=' + KeyDataService.date.start + '&end_date=' + KeyDataService.date.end +
        '&platform=' + KeyDataService.app.platform + '&stats=' + KeyDataService.radioKeyDataType)
        .success(function(data) {
          KeyDataService.chartConfig.series[0].data = data.counts;
        });
    };

    KeyDataService.getTableData = function() {
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
