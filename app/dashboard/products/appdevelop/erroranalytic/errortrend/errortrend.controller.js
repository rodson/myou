(function() {
  'use strict';

  /**
   * @ngInject
   */
  function errorTrendConfig($stateProvider) {
    $stateProvider
      .state('dashboard.appdevelop.errortrend', {
        url: '/errortrend?selected_date&stats',
        templateUrl: 'app/dashboard/products/appdevelop/erroranalytic/errortrend/errortrend.html',
        controllerAs: 'vm',
        controller: 'ErrorTrendCtrl',
        resolve: ErrorTrendCtrl.resolve
      });
  }

  /**
   * @ngInject
   */
  function ErrorTrendCtrl(StorageManager, MomentDateService, ErrorTrendService,
    StateManager, initData) {

    var vm = this;

    var KEY_SELECTED_DATE = 'selected_date';
    var KEY_STATS = 'stats';

    vm.selectedDate = initData.selectedDate;
    vm.radioChecked = initData.stats;
    vm.tableDatas = [];

    var app = StorageManager.getApp();
    var appKey = app.appKey;
    var platform = app.platform;
    var step = 8;

    var today = MomentDateService.getToday();
    var yesterday = MomentDateService.getYesterday();
    var last7days = MomentDateService.getLast7Day();
    var last30days = MomentDateService.getLast30Day();
    var last60days = MomentDateService.getLast60Day();

    vm.selectDate = [{
      label: '过去60天',
      start: last60days.start,
      end: last60days.end
    }, {
      label: '过去30天',
      start: last30days.start,
      end: last30days.end
    }, {
      label: '过去7天',
      start: last7days.start,
      end: last7days.end
    }, {
      label: '昨天',
      start: yesterday.start,
      end: yesterday.end
    }, {
      label: '今天',
      start: today.start,
      end: today.end
    }];

    vm.highchartsNG = {
      title: {
        text: ''
      },
      xAxis: {
        categories: [],
        labels: {
          staggerLines: 1
        }
      },
      yAxis: {
        title: {
          text: '数量'
        }
      },
      series: [{
        showInLegend: false
      }],
      loading: false,
      noData: 'No data'
    };

    vm.selectRadioChanged = function() {
      StateManager.setQueryParams(KEY_STATS, vm.radioChecked);
      vm.setHighcharsData();
    };

    vm.selectDateChanged = function() {
      StateManager.setQueryParams(KEY_SELECTED_DATE, vm.selectedDate);
      ErrorTrendService.data.crash_count = null;
      ErrorTrendService.data.crash_count_per_session = null;
      vm.updateHighChartsData();
      vm.updateTableData();
    };

    vm.updateHighChartsData = function() {
      var day = vm.selectDate[vm.selectedDate];
      ErrorTrendService.getLineChart(appKey, day.start, day.end, platform, vm.radioChecked, function() {
        vm.setHighcharsData();
      });
    };

    vm.updateTableData = function() {
      var day = vm.selectDate[vm.selectedDate];
      ErrorTrendService.getTableData(appKey, day.start, day.end, platform, function() {
        vm.tableDatas = ErrorTrendService.data.table_data;
      });
    };

    vm.setHighcharsData = function() {
      var data = ErrorTrendService.data[vm.radioChecked];
      if(!data) {
        vm.updateHighChartsData();
        return;
      }
      vm.highchartsNG.series[0].data = data.data;
      vm.highchartsNG.xAxis.labels.step = Math.ceil(data.dates.length / step);
      vm.highchartsNG.xAxis.categories = data.dates;
    };

    vm.selectDateChanged();
  }

  ErrorTrendCtrl.resolve = {
    /**
     * @ngInject
     */
    initData: function(getApp, $stateParams) {
      var initData = {};
      initData.selectedDate = $stateParams.selected_date;
      initData.stats = $stateParams.stats;
      return initData;
    }
  };

  angular
    .module('myou.dashboard.appdevelop')
    .controller('ErrorTrendCtrl', ErrorTrendCtrl)
    .config(errorTrendConfig);

})();
