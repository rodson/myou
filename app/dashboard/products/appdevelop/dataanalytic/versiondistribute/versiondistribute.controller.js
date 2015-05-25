(function() {
  'use strict';

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

    $scope.$watch('vm.apiStatDate', function(current, original) {
      if (current !== original) {
        VersionDistributeService.getApiStat(vm.apiStatDate)
          .then(function() {
            vm.apiCount = VersionDistributeService.apiCount;
          });
      }
    });

    $scope.$watch('vm.versionStatDate', function(current, original) {
      if (current !== original) {
        VersionDistributeService.getVersionStatPie(vm.versionStatDate)
          .then(function() {
            vm.userCount = VersionDistributeService.userCount;
          });

        VersionDistributeService.getVersionStatTable(vm.versionStatDate)
          .then(function() {
            vm.versionTableData = VersionDistributeService.versionTableData;
          });
      }
    });

    vm.test = function() {
      VersionDistributeService.getVersionStatTable(vm.versionStatDate)
        .then(function() {
          vm.versionTableData = VersionDistributeService.versionTableData;
        });
    };

  }

  VersionDistributeCtrl.resolve = {
    getApiStat: function(VersionDistributeService) {
      return VersionDistributeService.getApiStat();
    },

    getVersionStatPie: function(VersionDistributeService) {
      return VersionDistributeService.getVersionStatPie();
    },

    getVersionStatTable: function(VersionDistributeService) {
      return VersionDistributeService.getVersionStatTable();
    }
  };

  angular
    .module('myou.dashboard.appdevelop.dataanalytic')
    .controller('VersionDistributeCtrl', VersionDistributeCtrl)
    .config(versionDistributeConfig);

})();
