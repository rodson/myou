(function() {
  'use strict';

  /**
   * @ngInject
   */
  function versionDistributeConfig($stateProvider) {
    $stateProvider
      .state('dashboard.appdevelop.versiondistribute', {
        url: '/versiondistribute?api_stat_date&version_stat_date',
        templateUrl: 'app/dashboard/products/appdevelop/dataanalytic/versiondistribute/versiondistribute.html',
        controllerAs: 'vm',
        controller: 'VersionDistributeCtrl',
        resolve: VersionDistributeCtrl.resolve
      });
  }

  /**
   * @ngInject
   */
  function VersionDistributeCtrl(VersionDistributeService) {
    var vm = this;

    vm.apiCount = VersionDistributeService.apiCount;
    vm.userCount = VersionDistributeService.userCount;

    vm.apiStatDate = VersionDistributeService.apiStatDate;
    vm.versionStatDate = VersionDistributeService.versionStatDate;

    vm.versionTableData = VersionDistributeService.versionTableData;

    vm.apiChartConfig = VersionDistributeService.apiChartConfig;
    vm.versionChartConfig = VersionDistributeService.versionChartConfig;

    vm.apiStatDateChange = function() {
      VersionDistributeService.apiStatDateChange(vm.apiStatDate);
      VersionDistributeService.getApiStat()
        .then(function() {
          vm.apiCount = VersionDistributeService.apiCount;
        });
    };

    vm.versionStatDateChange = function() {
      VersionDistributeService.versionStatDateChange(vm.versionStatDate);
      VersionDistributeService.getVersionStatPie()
        .then(function() {
          vm.userCount = VersionDistributeService.userCount;
        });

      VersionDistributeService.getVersionStatTable(vm.versionStatDate)
        .then(function() {
          vm.versionTableData = VersionDistributeService.versionTableData;
        });
    };

  }

  VersionDistributeCtrl.resolve = {
    /**
     * @ngInject
     */
    initData: function(getApp, $stateParams, VersionDistributeService) {
      return VersionDistributeService.init($stateParams.api_stat_date, $stateParams.version_stat_date);
    },

    /**
     * @ngInject
     */
    getApiStat: function(VersionDistributeService, initData) {
      return VersionDistributeService.getApiStat();
    },

    /**
     * @ngInject
     */
    getVersionStatPie: function(VersionDistributeService, initData) {
      return VersionDistributeService.getVersionStatPie();
    },

    /**
     * @ngInject
     */
    getVersionStatTable: function(VersionDistributeService, initData) {
      return VersionDistributeService.getVersionStatTable();
    }
  };

  angular
    .module('myou.dashboard.appdevelop.dataanalytic')
    .controller('VersionDistributeCtrl', VersionDistributeCtrl)
    .config(versionDistributeConfig);

})();
