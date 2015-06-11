(function() {
  'use strict';

  /**
   * @ngInject
   */
  function docMyouGuideConfig($stateProvider) {
    $stateProvider
      .state('dashboard.document.myouguide', {
        abstract: true,
        url: '/myouguide',
        templateUrl: 'app/dashboard/document/myouguide/myouguide.html',
        controller: 'DocMyouGuideCtrl',
        controllerAs: 'vm'
      })
      .state('dashboard.document.myouguide.overview', {
        url: '/overview',
        templateUrl: 'app/dashboard/document/myouguide/content/overview.html'
      })
      .state('dashboard.document.myouguide.createproduct', {
        url: '/createproduct',
        templateUrl: 'app/dashboard/document/myouguide/content/createproduct.html'
      });
  }

  /**
   * @ngInject
   */
  function DocMyouGuideCtrl($location) {
    var vm = this;
    vm.isActive = function(path) {
      return ($location.path().indexOf(path) > -1);
    };
  }

  angular
    .module('myou.dashboard.document.myouguide', [])
    .controller('DocMyouGuideCtrl', DocMyouGuideCtrl)
    .config(docMyouGuideConfig);

})();
