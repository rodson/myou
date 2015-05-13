(function() {
	'use strict';

	function clientInfoConfig($stateProvider) {
		$stateProvider
			.state('dashboard.pageanalytic.clientinfo', {
				url: '/clientinfo',
				templateUrl: 'app/dashboard/products/pageanalytic/clientinfo/clientinfo.html',
				controllerAs: 'vm',
				controller: 'ClientInfoCtrl'
			});
	}

	function ClientInfoCtrl() {

	}

	angular
		.module('myou.dashboard.pageanalytic')
		.controller('ClientInfoCtrl', ClientInfoCtrl)
		.config(clientInfoConfig);

})();
