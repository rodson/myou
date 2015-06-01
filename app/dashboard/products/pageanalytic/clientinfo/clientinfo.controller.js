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

  function ClientInfoCtrl(localStorageService, MomentDateService, ClientInfoService) {
    var vm = this;
    var trickId = localStorageService.get('trickId');
    vm.radioDate = 'today';
    vm.radioPvUvIp = 'pv';

    var checkDate = MomentDateService.getToday();

    vm.startdate = checkDate.start;
    vm.enddate = checkDate.end;

    vm.highchartsPieOS = {
      options: {
        chart: {
          type: 'pie'
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: false
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
      noData: 'No data'
    };

    vm.highchartsPieBroswer = {
      options: {
        chart: {
          type: 'pie'
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: false
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
      noData: 'No data'
    };

    vm.highchartsPieScreen = {
      options: {
        chart: {
          type: 'pie'
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: false
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
      noData: 'No data'
    };

    vm.getCheckDate = function() {
      switch (vm.radioDate) {
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
      vm.startdate = checkDate.start;
      vm.enddate = checkDate.end;
      vm.getData();
    };

    vm.getCheckPieType = function() {
      vm.setPieData();
    };

    vm.getData = function() {
      ClientInfoService.getDataOs(vm.startdate, vm.enddate, trickId, function(){
        setDataOs();
      });
      ClientInfoService.getDataBr(vm.startdate, vm.enddate, trickId, function() {
        setDataBr();
      });
      ClientInfoService.getDataSr(vm.startdate, vm.enddate, trickId, function() {
        setDataSr();
      });
    };

    var setDataOs = function() {
      vm.datasOs = ClientInfoService.data.dataOs.tableData;
      setPieDataOs();
    };
    var setDataBr = function() {
      vm.datasBr = ClientInfoService.data.dataBr.tableData;
      setPieDataBr();
    };
    var setDataSr = function() {
      vm.datasSr = ClientInfoService.data.dataSr.tableData;
      setPieDataSr();
    };

    var setPieDataOs = function() {
      vm.highchartsPieOS.series = [{
        type: 'pie',
        innerSize: '50%',
        name: vm.radioPvUvIp.toUpperCase(),
        data: ClientInfoService.data.dataOs[vm.radioPvUvIp]
      }];
    };
    var setPieDataBr = function() {
      vm.highchartsPieBroswer.series = [{
        type: 'pie',
        innerSize: '50%',
        name: vm.radioPvUvIp.toUpperCase(),
        data: ClientInfoService.data.dataBr[vm.radioPvUvIp]
      }];
    };
    var setPieDataSr = function() {
      vm.highchartsPieScreen.series = [{
        type: 'pie',
        innerSize: '50%',
        name: vm.radioPvUvIp.toUpperCase(),
        data: ClientInfoService.data.dataSr[vm.radioPvUvIp]
      }];
    };

    vm.setData = function(type) {
      setDataOs();
      setDataBr();
      setDataSr();
    };

    vm.setPieData = function() {
      setPieDataOs();
      setPieDataBr();
      setPieDataSr();
    };

    /******************************* test start ******************************/
    // vm.setData();
    /******************************* test end ******************************/
    vm.getData();
  }

  angular
    .module('myou.dashboard.pageanalytic')
    .controller('ClientInfoCtrl', ClientInfoCtrl)
    .config(clientInfoConfig);

})();
