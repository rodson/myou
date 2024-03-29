(function() {
  'use strict';

  /**
   * @ngInject
   */
  function errorListsConfig($stateProvider) {
    $stateProvider
      .state('dashboard.appdevelop.errorlists', {
        url: '/errorlists?stats',
        templateUrl: 'app/dashboard/products/appdevelop/erroranalytic/errorlists/errorlists.html',
        controllerAs: 'vm',
        controller: 'ErrorListsCtrl',
        resolve: ErrorListsCtrl.resolve
      });
  }

  /**
   * @ngInject
   */
  function ErrorListsCtrl(StorageManager, $mdSidenav, $mdDialog, initData,
    StateManager, MomentDateService, ErrorListService) {

    var vm = this;

    var KEY_STATS = 'stats';

    vm.radioChecked = initData.stats;
    vm.tableDatas = [];

    var app = StorageManager.getApp();
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
      StateManager.setQueryParams(KEY_STATS, vm.radioChecked);

      if (!ErrorListService.data[vm.radioChecked]) {
        vm.getTableDatas();
        return;
      }
      vm.tableDatas = ErrorListService.data[vm.radioChecked];
    };

    vm.getTableDatas();

    /**************************************** sider page start *****************************************/
    vm.toggleRight = function(navId, dt) {
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

    vm.setErrorFixStatu = function() {
      var fixed = vm.errorStatu === '已修复' ? true : false;
      ErrorListService.changeFixStatu(appKey, vm.crashId, fixed, function(error) {
        if (error) {
          vm.showAlert(error);
          return;
        }
        if(fixed) {
          ErrorListService.moveToFixed(vm.crashId);
          vm.tableDatas = ErrorListService.data.unfix;
        } else {
          ErrorListService.moveToUnfix(vm.crashId);
          vm.tableDatas = ErrorListService.data.fixed;
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

  ErrorListsCtrl.resolve = {
    /**
     * @ngInject
     */
    initData: function(getApp, $stateParams) {
      var initData = {};
      initData.stats = $stateParams.stats;

      return initData;
    }
  };

  angular
    .module('myou.dashboard.appdevelop')
    .controller('ErrorListsCtrl', ErrorListsCtrl)
    .config(errorListsConfig);

})();
