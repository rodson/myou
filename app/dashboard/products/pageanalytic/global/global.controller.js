(function() {
	function globalConfig($stateProvider) {
		$stateProvider
			.state('dashboard.pageanalytic.global', {
				url: '/global',
				templateUrl: 'app/dashboard/products/pageanalytic/global/global.html',
				controllerAs: 'vm',
				controller: 'GlobalCtrl'
			});
	}

	function GlobalCtrl() {

	}

	angular
		.module('myou.dashboard.pageanalytic')
		.controller('GlobalCtrl', GlobalCtrl)
		.config(globalConfig);

})();