(function() {
  'use strict';

  function VersionDistributeService($http, Constant, StorageManager, MomentDateService) {
    var VersionDistributeService = {};

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
        colors: ['#157EF4'],
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
      noData: '没有数据'
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

    VersionDistributeService.getToday = function() {
      return MomentDateService.getToday().start;
    };

    VersionDistributeService.init = function() {
      VersionDistributeService.getApp();
    };


    VersionDistributeService.getApiStat = function(date) {
      if (!date) {
        date = VersionDistributeService.getToday();
        VersionDistributeService.init();
      }

      return $http.get(Constant.URL.UPDATE_API_STAT + '/' +
        VersionDistributeService.app.appKey + '?date=' + date)
        .success(function(data) {
          // Set api stat count
          VersionDistributeService.apiCount = data.count;

          // Set api stat data
          VersionDistributeService.apiChartConfig.series[0].data = data.values.map(function(item) {
            return item[1];
          });

          // Set point start time
          VersionDistributeService.apiChartConfig.series[0].pointStart = Date.parse(date);
        });
    };

    VersionDistributeService.getVersionStatPie = function(date, dataType) {
      if (!date) {
        date = VersionDistributeService.getToday();
        VersionDistributeService.init();
      }

      return $http.get(Constant.URL.VERSION_API_STAT + '?appKey=' +
        VersionDistributeService.app.appKey + '&date=' + date +
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

    VersionDistributeService.getVersionStatTable = function(date) {
      if (!date) {
        date = VersionDistributeService.getToday();
        VersionDistributeService.init();
      }

      return $http.get(Constant.URL.VERSION_API_STAT + '?appKey=' +
        VersionDistributeService.app.appKey + '&date=' + date +
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
