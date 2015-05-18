(function() {
  'use strict';

  function clientInfoConfig($stateProvider) {
    $stateProvider
      .state('dashboard.pageanalytic.clientinfo', {
        url: '/clientinfo',
        templateUrl: 'app/dashboard/products/pageanalytic/clientinfo/clientinfo.html',
        controllerAs: 'vm',
        controller: 'ClientInfoCtrl'
      });
  }

  function ClientInfoCtrl(MomentDateService, ClientInfoService) {
    var vm = this;

    vm.radioDate = 'today';
    vm.radioPvUvIp = 'pv';

    var checkDate = MomentDateService.getToday();

    vm.startdate = checkDate.start;
    vm.enddate = checkDate.end;

    vm.highchartsPieOS = {
      options: {
        chart: {
          type: 'pie',
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: false,
              style: {
                color: 'black'
              }
            },
            showInLegend: true
          }
        },
        tooltip: {
          formatter: function() {
            return '<b>' + this.key + '</b><br>' + this.series.name + '：<b>' + this.y + '</b>，占比：<b>' + this.percentage.toFixed(1) + ' %</b>';
          }
        }
      },
      title: {
        text: ''
      },
      noData: '<br>No data'
    };

    vm.highchartsPieBroswer = {
      options: {
        chart: {
          type: 'pie',
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: false,
              style: {
                color: 'black'
              }
            },
            showInLegend: true
          }
        },
        tooltip: {
          formatter: function() {
            return '<b>' + this.key + '</b><br>' + this.series.name + '：<b>' + this.y + '</b>，占比：<b>' + this.percentage.toFixed(1) + ' %</b>';
          }
        }
      },
      title: {
        text: ''
      },
      noData: '<br>No data'
    };

    vm.highchartsPieScreen = {
      options: {
        chart: {
          type: 'pie',
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: false,
              style: {
                color: 'black'
              }
            },
            showInLegend: true
          }
        },
        tooltip: {
          formatter: function() {
            return '<b>' + this.key + '</b><br>' + this.series.name + '：<b>' + this.y + '</b>，占比：<b>' + this.percentage.toFixed(1) + ' %</b>';
          }
        }
      },
      title: {
        text: ''
      },
      noData: '<br>No data'
    };

    vm.setPieData = function() {
      vm.highchartsPieOS.series = [{
        type: 'pie',
        innerSize: '50%',
        name: vm.radioPvUvIp.toUpperCase(),
        data: ClientInfoService.data.dataOs[vm.radioPvUvIp]
      }];

      vm.highchartsPieBroswer.series = [{
        type: 'pie',
        innerSize: '50%',
        name: vm.radioPvUvIp.toUpperCase(),
        data: ClientInfoService.data.dataBr[vm.radioPvUvIp]
      }];

      vm.highchartsPieScreen.series = [{
        type: 'pie',
        innerSize: '50%',
        name: vm.radioPvUvIp.toUpperCase(),
        data: ClientInfoService.data.dataSr[vm.radioPvUvIp]
      }];
    };

    vm.setPieData();
  }

  angular
    .module('myou.dashboard.pageanalytic')
    .controller('ClientInfoCtrl', ClientInfoCtrl)
    .config(clientInfoConfig);

})();
