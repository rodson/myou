(function() {
  'use strict';

  /**
   * @ngInject
   */
  function VersionDistributeService($http, Constant,
    StateManager, StorageManager, MomentDateService) {

    var VersionDistributeService = {};

    var KEY_API_STAT_DATE = 'api_stat_date';
    var KEY_VERSION_STAT_DATE = 'version_stat_date';

    VersionDistributeService.userCount = 0;
    VersionDistributeService.apiCount = 0;

    VersionDistributeService.app = {};
    VersionDistributeService.versionTableData = [];

    VersionDistributeService.apiChartConfig = {
      options: {
        chart: {
          type: 'line',
          zoomType: 'x',
          panning: true,
          panKey: 'shift'
        },
        tooltip: {
          style: {
            padding: 10,
            fontWeight: 'bold'
          },
          pointFormat: 'Value: {point.y}'
        },
        plotOptions: {
          series: {
            pointInterval: 60 * 1000
          }
        }
      },
      series: [{
        showInLegend: false,
        name: '',
        data: []
      }],
      credits: {
        enabled: false
      },
      title: {
        text: 'API实时统计'
      },
      xAxis: {
        type: 'datetime',
        minRange: 12 * 60 * 1000 // 最少显示12分钟内的数据
      },
      yAxis: {
        title: {
          text: '数量'
        },
        plotLines: [{
          value: 0,
          width: 1,
          color: '#808080'
        }]
      },
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
        borderWidth: 0
      },
      loading: false,
      noData: 'No data'
    };

    VersionDistributeService.versionChartConfig = {
      options: {
        chart: {
          type: 'pie',
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          shadow: false
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: true,
              style: {
                color: 'black'
              }
            },
            showInLegend: true
          }
        },
        tooltip: {
          formatter: function() {
            return this.key + '：<b>' + this.y + '</b>，占比：<b>' + this.percentage.toFixed(1) + ' %</b>';
          }
        }
      },
      series: [{
        data: []
      }],
      title: {
        text: '版本统计'
      },
      noData: '没有数据'
    };

    VersionDistributeService.getApp = function() {
      VersionDistributeService.app = StorageManager.getApp();
    };

    VersionDistributeService.init = function(apiStatDate, versionStatDate) {
      VersionDistributeService.getApp();

      // init queryString
      VersionDistributeService.apiStatDate = apiStatDate;
      VersionDistributeService.versionStatDate = versionStatDate;
    };

    VersionDistributeService.apiStatDateChange = function(apiStatDate) {
      StateManager.setQueryParams(KEY_API_STAT_DATE, apiStatDate);
      VersionDistributeService.apiStatDate = apiStatDate;
    };

    VersionDistributeService.versionStatDateChange = function(versionStatDate) {
      StateManager.setQueryParams(KEY_VERSION_STAT_DATE, versionStatDate);
      VersionDistributeService.versionStatDate = versionStatDate;
    };

    VersionDistributeService.getApiStat = function() {
      return $http.get(Constant.URL.UPDATE_API_STAT + '/' +
        VersionDistributeService.app.appKey + '?date=' + VersionDistributeService.apiStatDate)
        .success(function(data) {
          // Set api stat count
          VersionDistributeService.apiCount = data.count;

          // Set api stat data
          VersionDistributeService.apiChartConfig.series[0].data = data.values.map(function(item) {
            return item[1];
          });

          // Set point start time
          VersionDistributeService.apiChartConfig.series[0].pointStart = Date.parse(VersionDistributeService.apiStatDate);
        });
    };

    VersionDistributeService.getVersionStatPie = function() {

      return $http.get(Constant.URL.VERSION_API_STAT + '?appKey=' +
        VersionDistributeService.app.appKey + '&date=' + VersionDistributeService.versionStatDate +
        '&dataType=' + 'pieChart').success(function(data) {
          // Set user count
          VersionDistributeService.userCount = data.count;

          // Set version data
          VersionDistributeService.versionChartConfig.series[0].data =
            data.versionList.map(function(item) {
            return [item.name, parseInt(item.count)];
          });

        });
    };

    VersionDistributeService.getVersionStatTable = function() {

      return $http.get(Constant.URL.VERSION_API_STAT + '?appKey=' +
        VersionDistributeService.app.appKey + '&date=' + VersionDistributeService.versionStatDate +
        '&dataType=' + 'table').success(function(data) {
          // Set table data
          VersionDistributeService.versionTableData = data;
        });
    };

    return VersionDistributeService;
  }

  angular
    .module('myou.dashboard.appdevelop.dataanalytic')
    .factory('VersionDistributeService', VersionDistributeService);

})();
