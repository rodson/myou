(function() {
  'use strict';

  /**
   * @ngInject
   */
  function versionDistributeConfig($stateProvider) {
    $stateProvider
      .state('dashboard.appdevelop.versiondistribute', {
        url: '/versiondistribute',
        templateUrl: 'app/dashboard/products/appdevelop/dataanalytic/versiondistribute/versiondistribute.html',
        controllerAs: 'vm',
        controller: 'VersionDistributeCtrl',
        resolve: VersionDistributeCtrl.resolve
      });
  }

  /**
   * @ngInject
   */
  function VersionDistributeCtrl($scope, VersionDistributeService, MomentDateService) {
    var vm = this;

    VersionDistributeService.init();

    vm.apiCount = VersionDistributeService.apiCount;
    vm.userCount = VersionDistributeService.userCount;

    vm.apiStatDate = VersionDistributeService.getToday();
    vm.versionStatDate = VersionDistributeService.getToday();

    vm.versionTableData = VersionDistributeService.versionTableData;

    vm.apiChartConfig = VersionDistributeService.apiChartConfig;
    vm.versionChartConfig = VersionDistributeService.versionChartConfig;

    vm.apiStatDateChange = function() {
      VersionDistributeService.getApiStat(vm.apiStatDate)
        .then(function() {
          vm.apiCount = VersionDistributeService.apiCount;
        });
    };

    vm.versionStatDateChange = function() {
      VersionDistributeService.getVersionStatPie(vm.versionStatDate)
        .then(function() {
          vm.userCount = VersionDistributeService.userCount;
        });

      VersionDistributeService.getVersionStatTable(vm.versionStatDate)
        .then(function() {
          vm.versionTableData = VersionDistributeService.versionTableData;
        });
      };

    // $scope.$watch('vm.apiStatDate', function(current, original) {
    //   if (current !== original) {
    //     VersionDistributeService.getApiStat(vm.apiStatDate)
    //       .then(function() {
    //         vm.apiCount = VersionDistributeService.apiCount;
    //       });
    //   }
    // });

    // $scope.$watch('vm.versionStatDate', function(current, original) {
    //   if (current !== original) {
    //     VersionDistributeService.getVersionStatPie(vm.versionStatDate)
    //       .then(function() {
    //         vm.userCount = VersionDistributeService.userCount;
    //       });

    //     VersionDistributeService.getVersionStatTable(vm.versionStatDate)
    //       .then(function() {
    //         vm.versionTableData = VersionDistributeService.versionTableData;
    //       });
    //   }
    // });

    vm.test = function() {
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
    getApiStat: function(VersionDistributeService, getApp) {
      return VersionDistributeService.getApiStat();
    },

    /**
     * @ngInject
     */
    getVersionStatPie: function(VersionDistributeService, getApp) {
      return VersionDistributeService.getVersionStatPie();
    },

    /**
     * @ngInject
     */
    getVersionStatTable: function(VersionDistributeService, getApp) {
      return VersionDistributeService.getVersionStatTable();
    }
  };

  angular
    .module('myou.dashboard.appdevelop.dataanalytic')
    .controller('VersionDistributeCtrl', VersionDistributeCtrl)
    .config(versionDistributeConfig);

})();
