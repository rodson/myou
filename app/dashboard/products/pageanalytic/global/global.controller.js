(function() {
  'use strict';

  /**
   * @ngInject
   */
	function globalConfig($stateProvider) {
		$stateProvider
			.state('dashboard.pageanalytic.global', {
				url: '/global',
				templateUrl: 'app/dashboard/products/pageanalytic/global/global.html',
				controllerAs: 'vm',
				controller: 'GlobalCtrl',
        resolve: GlobalCtrl.resolve
			});
	}

  /**
   * @ngInject
   */
	function GlobalCtrl(GlobalService) {
    var vm = this;

    vm.ip = GlobalService.globalData.ip || 0;
    vm.pv = GlobalService.globalData.pv || 0;
    vm.uv = GlobalService.globalData.uv || 0;

	}

  GlobalCtrl.resolve = {
    /**
     * @ngInject
     */
    globalData: function(localStorageService, GlobalService, getData){
      var trickId = localStorageService.get('trickId');
      return GlobalService.getData(trickId);
    }
  };

	angular
		.module('myou.dashboard.pageanalytic')
		.controller('GlobalCtrl', GlobalCtrl)
		.config(globalConfig);

})();
