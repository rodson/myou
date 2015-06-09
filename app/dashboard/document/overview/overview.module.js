(function() {
  'use strict';

  /**
   * @ngInject
   */
  function docOverviewConfig($stateProvider) {

    $stateProvider
      .state('dashboard.document.overview', {
        url: '/overview',
        templateUrl: 'app/dashboard/document/overview/overview.html'
      });
  }

  angular
    .module('myou.dashboard.document')
    .config(docOverviewConfig);

})();
