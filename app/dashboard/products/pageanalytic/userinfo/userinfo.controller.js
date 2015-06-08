(function() {
  'use strict';

  /**
   * @ngInject
   */
  function userInfoConfig($stateProvider) {
    $stateProvider
      .state('dashboard.pageanalytic.userinfo', {
        url: '/userinfo?start_date&end_date',
        templateUrl: 'app/dashboard/products/pageanalytic/userinfo/userinfo.html',
        controllerAs: 'vm',
        controller: 'UserInfoCtrl',
        resolve: UserInfoCtrl.resolve
      });
  }

  /**
   * @ngInject
   */
  function UserInfoCtrl(localStorageService, MomentDateService,
    UserinfoService, StateManager, initData) {

    var vm = this;
    var trickId = localStorageService.get('trickId');

    vm.startdate = initData.startDate;
    vm.enddate = initData.endDate;

    vm.highchartsPie = {
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
            return '<b>' + this.key + '：' + this.y + '</b>，占比：<b>' + this.percentage.toFixed(1) + ' %</b>';
          }
        },
      },
      title: {
        text: '', //'<label style="font-size:14px;">运营商分布</label>',
        align: 'center',
        verticalAlign: 'middle',
        y: Math.ceil(UserinfoService.data.tableData.length / 5 + 1) * (-5)
      },
      noData: '<br>No data'
    };

    vm.getCheckDate = function() {
      var checkDate;

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

    vm.getData = function() {
      StateManager.setQueryParams('start_date', vm.startdate);
      StateManager.setQueryParams('end_date', vm.enddate);
      UserinfoService.getData(vm.startdate, vm.enddate, trickId, function(data) {
        vm.setData();
      });
    };

    vm.setData = function() {
      vm.datas = UserinfoService.data.tableData;
      vm.setPieData();
    };

    vm.setPieData = function() {
      vm.highchartsPie.series = [{
        type: 'pie',
        innerSize: '50%',
        data: UserinfoService.data.pieData
      }];
    };

    /******************************* test start ******************************/
    // vm.setData();
    /******************************* test end ******************************/
    vm.setData();
  }

  UserInfoCtrl.resolve = {
    /**
     * @ngInject
     */
    initData: function(getData, $stateParams) {
      var initData = {};

      initData.startDate = $stateParams.start_date;
      initData.endDate = $stateParams.end_date;

      return initData;
    },
    /**
     * @ngInject
     */
    getData: function(localStorageService, UserinfoService, $stateParams, getData) {
      var startDate = $stateParams.start_date;
      var endDate = $stateParams.end_date;
      var trickId = localStorageService.get('trickId');
      return UserinfoService.getData(startDate, endDate, trickId);
    }
  };

  angular
    .module('myou.dashboard.pageanalytic')
    .controller('UserInfoCtrl', UserInfoCtrl)
    .config(userInfoConfig);

})();
