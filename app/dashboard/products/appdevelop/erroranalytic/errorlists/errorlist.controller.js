(function() {
  'use strict';

  function errorListsConfig($stateProvider) {
    $stateProvider
      .state('dashboard.appdevelop.errorlists', {
        url: '/errorlists',
        templateUrl: 'app/dashboard/products/appdevelop/erroranalytic/errorlists/errorlists.html',
        controllerAs: 'vm',
        controller: 'ErrorListsCtrl'
      });
  }

  function ErrorListsCtrl(localStorageService, $mdSidenav, $mdDialog, MomentDateService, ErrorListService) {
    var vm = this;
    vm.radioChecked = 'unfix';
    vm.tableDatas = [];

    var app = localStorageService.get('app');
    var appKey = app.appKey;
    var platform = app.platform;

    vm.isWindowsApp = function() {
      return platform === 'windows_app';
    };

    vm.getTableDatas = function() {
      var fixed = vm.radioChecked === 'unfix' ? false : true;
      ErrorListService.getTableData(appKey, platform, fixed, function() {
        vm.tableDatas = ErrorListService.data[vm.radioChecked];
      });
    };

    vm.selectRadioChanged = function() {
      if (!ErrorListService.data[vm.radioChecked]) {
        vm.getTableDatas();
        return;
      }
      vm.tableDatas = ErrorListService.data[vm.radioChecked];
    };

    vm.getTableDatas();

    /**************************************** sider page start *****************************************/
    vm.toggleRight = function(navId, dt) {
      console.log(dt);
      vm.radioCheckedSider = 'os_version';
      vm.errorStatu = !!dt.fixed ? '已修复' : '未修复';
      vm.errorContext = dt.crash_context;
      vm.crashId = dt.crash_id;

      $mdSidenav(navId).toggle().then(function() {
        vm.getPieChart();
      });
    };

    vm.highchartsPie = {
      options: {
        chart: {
          type: 'pie',
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          width: 450,
          height: 350,
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
            return '<b>' + this.key + '：' + this.y + '</b>，占比：<b>' + this.percentage.toFixed(1) + ' %</b>';
          }
        },
      },
      title: {
        text: '',
        align: 'center',
        verticalAlign: 'middle',
        // y: Math.ceil(UserinfoService.data.tableData.length / 5 + 1) * (-5)
      },
      loading: false,
      noData: 'No data'
    };

    vm.setErrorFix = function() {
      var fixed = vm.errorStatu === '已修复' ? true : false;
      ErrorListService.markToFixed(appKey, vm.crashId, fixed, function(error) {
        if (error) {
          vm.showAlert(error);
        }
      });
    };

    vm.showAlert = function(error) {
      $mdDialog.show(
        $mdDialog.alert()
        .title('Error')
        .content(error.message)
        .ariaLabel('Alert Dialog')
        .ok('关闭')
      ).then(function() {
        if (vm.errorStatu === '已修复') {
          vm.errorStatu = '未修复';
        } else {
          vm.errorStatu = '已修复';
        }
      });
    };

    vm.selectRadioSiderChanged = function() {
      vm.getPieChart();
    };

    vm.getPieChart = function() {
      ErrorListService.getPieChart(appKey, platform, vm.crashId, vm.radioCheckedSider, function() {
        vm.setPieChart();
      });
    };

    vm.setPieChart = function() {
      vm.highchartsPie.series = [{
        type: 'pie',
        innerSize: '50%',
        data: ErrorListService.data.pie
      }];
    };

    // vm.setPieChart();
    /**************************************** sider page end *****************************************/
  }

  angular
    .module('myou.dashboard.appdevelop')
    .controller('ErrorListsCtrl', ErrorListsCtrl)
    .config(errorListsConfig);

})();
