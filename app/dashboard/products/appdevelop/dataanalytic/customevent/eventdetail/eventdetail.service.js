(function() {
  'use strict';

  function EventDetailService($http, StorageManager, UrlManager, MomentDateService) {
    var EventDetailService = {};

    EventDetailService.app = {};
    EventDetailService.radioDate = 'today';
    EventDetailService.radioDataType = 'count';
    EventDetailService.tableData = [];
    EventDetailService.lineChart = {};

    EventDetailService.chartConfig = {
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
        pointStart: (new Date(EventDetailService.startdate)).getTime(),
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

    EventDetailService.getApp = function() {
      EventDetailService.app = StorageManager.getApp();
      return EventDetailService.app;
    };

    EventDetailService.init = function() {
      EventDetailService.getApp();
      EventDetailService.getCheckDate('today');
    };

    EventDetailService.getCheckDate = function(selectedDate) {
      var checkDate;
      EventDetailService.radioDate = selectedDate;

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
      EventDetailService.startdate = checkDate.start;
      EventDetailService.enddate = checkDate.end;
      EventDetailService.chartConfig.series[0].pointStart = (new Date(checkDate.start)).getTime();
    };

    EventDetailService.getCheckDataType = function(dataType) {
      EventDetailService.radioDataType = dataType;

      switch (dataType) {
        case 'count':
          EventDetailService.chartConfig.series[0].data = EventDetailService.lineChart.event_counts;
          break;
        case 'session':
          EventDetailService.chartConfig.series[0].data = EventDetailService.lineChart.event_count_session_ratios;
          break;
        case 'user':
          EventDetailService.chartConfig.series[0].data = EventDetailService.lineChart.event_unique_user_counts;
          break;
      }
    };

    EventDetailService.getEventData = function(eventId) {
      if (!EventDetailService.startdate) {
        EventDetailService.init();
      }

      return $http.get(UrlManager.getEventReportUrl(EventDetailService.app.appKey, eventId) +
        '?start_date=' + EventDetailService.startdate + '&end_date=' + EventDetailService.enddate)
        .success(function(data) {
          EventDetailService.lineChart = data.line_chart;
          EventDetailService.tableData = data.table;

          EventDetailService.getCheckDataType(EventDetailService.radioDataType);
        });
    };

    return EventDetailService;
  }

  angular
    .module('myou.dashboard.appdevelop.dataanalytic')
    .factory('EventDetailService', EventDetailService);

})();