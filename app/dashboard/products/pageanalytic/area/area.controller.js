(function() {
	'use strict';

	function areaConfig($stateProvider) {
		$stateProvider
			.state('dashboard.pageanalytic.area', {
				url: '/area',
				templateUrl: 'app/dashboard/products/pageanalytic/area/area.html',
				controllerAs: 'vm',
				controller: 'AreaCtrl'
			});
	}

	function AreaCtrl() {

	}

	angular
		.module('myou.dashboard.pageanalytic')
		.controller('AreaCtrl', AreaCtrl)
		.config(areaConfig);

})();
