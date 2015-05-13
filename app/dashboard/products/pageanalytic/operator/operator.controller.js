(function() {
	"use strict"

	function operatorConfig($stateProvider) {
		$stateProvider
			.state('dashboard.pageanalytic.operator', {
				url: '/operator',
				templateUrl: 'app/dashboard/products/pageanalytic/operator/operator.html',
				controllerAs: 'vm',
				controller: 'OperatorCtrl'
			});
	}

	function OperatorCtrl() {

	}

	angular
		.module('myou.dashboard.pageanalytic')
		.controller('OperatorCtrl', OperatorCtrl)
		.config(operatorConfig);

})();