(function() {
  'use strict';

  function APIStatisCtrl($scope, MomentDateService, APIStatisService) {
    var vm = this;
    vm.checkdate = MomentDateService.getToday().start;
    vm.onedayCount = 0;

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
        text: 'URL数据'
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
      noData: 'No data'
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
        text: 'APP分布'
      },
      noData: 'No data'
    };

    $scope.$watch('vm.checkdate', function(){
      vm.getData();
    });

    vm.getData = function() {
      vm.dataURL = [];
      vm.dataAPP = [];

      APIStatisService.getCount(vm.checkdate, function() {
        vm.onedayCount = APIStatisService.count;
      });

      APIStatisService.getRealtimeStat(vm.checkdate, function() {
        vm.setURLData();
      });

      APIStatisService.getAppStat(vm.checkdate, function() {
        vm.dataAPP = APIStatisService.appcount;

        vm.highchartsAPP.series = [{
          type: 'pie',
          data: APIStatisService.apppie
        }];
      });

      APIStatisService.getUrlStat(vm.checkdate, function() {
        vm.dataURL = APIStatisService.apicount;
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
