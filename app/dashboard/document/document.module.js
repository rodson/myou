(function() {
  'use strict';

  /**
   * @ngInject
   */
  function documentConfig($stateProvider) {

    $stateProvider
      .state('dashboard.document', {
        abstract: true,
        url: '/document',
        templateUrl: 'app/dashboard/document/document.html'
      });
  }

  angular
    .module('myou.dashboard.document', [
      'ui.router',
      'ngMaterial',

      'myou.shared'
    ])
    .config(documentConfig);

})();
