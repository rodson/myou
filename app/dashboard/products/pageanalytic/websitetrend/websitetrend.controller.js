(function() {
	'use strict';

	function websiteTrendConfig($stateProvider) {
		$stateProvider
			.state('dashboard.pageanalytic.websitetrend', {
				url: '/websitetrend',
				templateUrl: 'app/dashboard/products/pageanalytic/websitetrend/websitetrend.html',
				controllerAs: 'vm',
				controller: 'WebsiteTrendCtrl'
			});
	}

	function WebsiteTrendCtrl(dateFilter) {
    var vm = this;
    var format = 'yyyy-MM-dd  HH:mm:ss';
    vm.startdata = dateFilter(new Date(), format);
	}

	angular
		.module('myou.dashboard.pageanalytic')
		.controller('WebsiteTrendCtrl', WebsiteTrendCtrl)
		.config(websiteTrendConfig);

})();
