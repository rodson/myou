(function() {
  'use strict';

  function APIStatisCtrl($scope, MomentDateService, APIStatisService) {
    var vm = this;
    vm.checkdate = MomentDateService.getToday().start;
    vm.onedayCount = 0;
    vm.showCountInit = 5;

    vm.highchartsURL = {
      options: {
        chart: {
          type: 'line',
          animation: false,
          shadow: false,
          zoomType: 'x',
          panning: true,
          panKey: 'shift',
          resetZoomButton: {
            position: {
              x: 0,
              y: -30
            },
            theme: {
              fill: 'rgb(39,123,221)',
              style: {
                color: 'white'
              },
              r: 0,
              states: {
                hover: {
                  fill: 'rgb(39,123,221)',
                  style: {
                    color: 'white'
                  }
                }
              }
            }
          }
        },
        plotOptions: {
          line: {
            lineWidth: 2,
            states: {
              hover: {
                lineWidth: 2
              }
            }
          },
          series: {
            pointInterval: 60 * 1000
          }
        }
      },
      title: {
        text: 'API实时访问数据'
      },
      xAxis: {
        type: 'datetime',
        minRange: 12 * 60 * 1000
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
      noData: 'No data',
      loading: true
    };

    vm.highchartsAPP = {
      options: {
        chart: {
          type: 'pie'
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
      title: {
        text: 'APP访问分布'
      },
      noData: 'No data',
      loading: true
    };

    vm.highchartsURL.series = [];
    vm.highchartsAPP.series = [];

    var showHide = ['加载更多数据', '隐藏部分数据', 'No data'];

    vm.showOrhide = {
      app: showHide[2],
      url: showHide[2],
      appDownload: showHide[2],
      urlApp: showHide[2]
    };

    vm.initData = function() {
      vm.dataTable = {
        app: [],
        url: [],
        appDownload: [],
        urlApp: []
      };

      vm.dataAll = {
        app: [],
        url: [],
        appDownload: [],
        urlApp: []
      };
    };

    vm.showOrhideMoreData = function(type) {
      if (vm.showOrhide[type] === showHide[0]) {
        vm.showOrhide[type] = showHide[1];
        angular.copy(vm.dataAll[type], vm.dataTable[type]);
      } else if (vm.showOrhide[type] === showHide[1]) {
        vm.showOrhide[type] = showHide[0];
        vm.dataTable[type].length = vm.showCountInit;
      } else {
        return;
      }
    };

    function getMaxData(data) {
      var temp = [];
      angular.copy(data, temp);
      temp.length = temp.length < vm.showCountInit ? temp.length : vm.showCountInit;
      return temp;
    }

    function sortFun(a, b) {
      return b.count - a.count;
    }


    vm.getData = function() {
      vm.initData();

      APIStatisService.getCount(vm.checkdate, function() {
        vm.onedayCount = APIStatisService.count;
      });

      APIStatisService.getRealtimeStat(vm.checkdate, function() {
        vm.setURLData();
      });

      APIStatisService.getAppStat(vm.checkdate, function() {
        vm.showOrhide.app = APIStatisService.appcount.length > vm.showCountInit ? showHide[0] : showHide[2];
        vm.dataAll.app = APIStatisService.appcount.sort(sortFun);
        vm.dataTable.app = getMaxData(vm.dataAll.app);

        vm.highchartsAPP.series = [{
          type: 'pie',
          data: APIStatisService.apppie
        }];
      });

      APIStatisService.getUrlStat(vm.checkdate, function() {
        vm.showOrhide.url = APIStatisService.apicount.length > vm.showCountInit ? showHide[0] : showHide[2];
        vm.dataAll.url = APIStatisService.apicount.sort(sortFun);
        vm.dataTable.url = getMaxData(vm.dataAll.url);
      });

      APIStatisService.getAppDownloadStat(vm.checkdate, function() {
        var data = APIStatisService.apidownload.list.map(function(i) {
          return {
            name: i.name,
            requestCount: i.update_api_request_count,
            count: i.can_download_count
          };
        });
        vm.showOrhide.appDownload = data.length > vm.showCountInit ? showHide[0] : showHide[2];
        vm.dataAll.appDownload = data.sort(sortFun);
        vm.dataTable.appDownload = getMaxData(vm.dataAll.appDownload);
      });

      APIStatisService.getURLAppStat(vm.checkdate, function() {
        vm.showOrhide.urlApp = APIStatisService.apiapp.length > vm.showCountInit ? showHide[0] : showHide[2];
        vm.dataAll.urlApp = APIStatisService.apiapp.sort(sortFun);
        vm.dataTable.urlApp = getMaxData(vm.dataAll.urlApp);
      });
    };

    vm.setURLData = function() {
      var pointStart = Date.parse(vm.checkdate);
      vm.highchartsURL.series = [];
      APIStatisService.realtime.forEach(function(d) {
        var arr = d.list.map(function(i) {
          return i[1];
        });
        vm.highchartsURL.series.push({
          name: d.name,
          pointStart: pointStart,
          data: arr
        });
      });

      vm.highchartsURL.options.plotOptions.series.pointStart = pointStart;
    };

    /************************ for test start *************************/
    // vm.setData = function() {
    //   vm.onedayCount = APIStatisService.count;
    //   vm.setURLData();
    //   vm.dataAPP = APIStatisService.appcount;

    //   vm.highchartsAPP.series = [{
    //     type: 'pie',
    //     data: APIStatisService.apppie
    //   }];
    //   vm.dataURL = APIStatisService.apicount;
    // };

    // vm.setData();
    /************************ for test start *************************/
    vm.getData();
  }

  angular
    .module('myou.dashboard.apistatis')
    .controller('APIStatisCtrl', APIStatisCtrl);

})();
