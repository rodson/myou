(function() {
  'use strict';

	function globalConfig($stateProvider) {
		$stateProvider
			.state('dashboard.pageanalytic.global', {
				url: '/global',
				templateUrl: 'app/dashboard/products/pageanalytic/global/global.html',
				controllerAs: 'vm',
				controller: 'GlobalCtrl',
        // resolve: GlobalCtrl.resolve
			});
	}

	function GlobalCtrl(GlobalService) {
    var vm = this;

    vm.ip = GlobalService.globalData.ip;
    vm.pv = GlobalService.globalData.pv;
    vm.uv = GlobalService.globalData.uv;

	}

  GlobalCtrl.resolve = {
    globalData: function(localStorageService, GlobalService){
      var trickId = localStorageService.get('trickId');
      return GlobalService.getData(trickId);
    }
  };

	angular
		.module('myou.dashboard.pageanalytic')
		.controller('GlobalCtrl', GlobalCtrl)
		.config(globalConfig);

})();
