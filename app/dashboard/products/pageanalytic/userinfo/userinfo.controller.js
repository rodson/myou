(function() {
	"use strict"

	function userInfoConfig($stateProvider) {
		$stateProvider
			.state('dashboard.pageanalytic.userinfo', {
				url: '/userinfo',
				templateUrl: 'app/dashboard/products/pageanalytic/userinfo/userinfo.html',
				controllerAs: 'vm',
				controller: 'UserInfoCtrl'
			});
	}

	function UserInfoCtrl() {

	}

	angular
		.module('myou.dashboard.pageanalytic')
		.controller('UserInfoCtrl', UserInfoCtrl)
		.config(userInfoConfig);

})();