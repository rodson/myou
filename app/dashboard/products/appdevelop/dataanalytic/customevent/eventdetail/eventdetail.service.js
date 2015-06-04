(function() {
  'use strict';

  /**
   * @ngInject
   */
  function EventDetailService($http, StorageManager, UrlManager, MomentDateService) {
    var EventDetailService = {};

    EventDetailService.app = {};
    EventDetailService.event = {};
    EventDetailService.radioDate = 'last7days';
    EventDetailService.radioDataType = 'count';
    EventDetailService.tableData = [];
    EventDetailService.lineChart = {};
    EventDetailService.eventLabelData = [];
    EventDetailService.date = {};

    EventDetailService.chartConfig = {
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
        pointStart: (new Date(EventDetailService.date.start)).getTime(),
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

    EventDetailService.getApp = function() {
      EventDetailService.app = StorageManager.getApp();
      return EventDetailService.app;
    };

    EventDetailService.getEvent = function() {
      EventDetailService.event = StorageManager.getEvent();
      return EventDetailService.event;
    };

    EventDetailService.getEventInfo = function(eventId) {
      EventDetailService.getApp();
      return $http.get(UrlManager
        .getCustomEventUrl(EventDetailService.app.appKey) + '/' + eventId)
        .success(function(event) {
          StorageManager.setEvent(event);
          EventDetailService.event = event;
        });
    };

    EventDetailService.init = function() {
      EventDetailService.getApp();
      EventDetailService.getEvent();
      EventDetailService.getCheckDate('last7days');
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
      EventDetailService.date.start = checkDate.start;
      EventDetailService.date.end = checkDate.end;
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

    EventDetailService.getEventData = function(eventId, version) {
      EventDetailService.getApp();
      if (!EventDetailService.date.start) {
        EventDetailService.init();
      }
      var queryString = '?start_date=' + EventDetailService.date.start + '&end_date=' + EventDetailService.date.end;

      if (version) {
        queryString = queryString + '&version=' + version;
      }

      return $http.get(UrlManager.getEventReportUrl(EventDetailService.app.appKey, eventId) + queryString)
        .success(function(data) {
          EventDetailService.lineChart = data.line_chart;
          EventDetailService.tableData = data.table;

          EventDetailService.getCheckDataType(EventDetailService.radioDataType);
        });
    };

    EventDetailService.getEventLabelData = function(eventId, version) {
      EventDetailService.getApp();
      if (!EventDetailService.date.start) {
        EventDetailService.init();
      }

      var queryString = '?start_date=' + EventDetailService.date.start + '&end_date=' + EventDetailService.date.end;

      if (version) {
        queryString = queryString + '&version=' + version;
      }

      return $http.get(UrlManager.getEventLabelUrl(EventDetailService.app.appKey, eventId) + queryString)
        .success(function(data) {
          EventDetailService.eventLabelData = data;
        });
    };

    EventDetailService.getEventVersions = function(eventId) {
      EventDetailService.getApp();
      if (!EventDetailService.app) {
        EventDetailService.init();
      }

      eventId = eventId || '';

      return $http.get(UrlManager
        .getEventVersionUrl(EventDetailService.app.appKey, eventId))
        .success(function(data) {
          EventDetailService.versions = data;
        });
    };

    return EventDetailService;
  }

  angular
    .module('myou.dashboard.appdevelop.dataanalytic')
    .factory('EventDetailService', EventDetailService);

})();
