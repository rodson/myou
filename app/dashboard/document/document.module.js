(function() {
  'use strict';

  /**
   * @ngInject
   */
  function documentConfig($stateProvider) {

    $stateProvider
      .state('dashboard.document', {
        url: '/document',
        templateUrl: 'app/dashboard/document/document.html'
      });
  }

  angular
    .module('myou.dashboard.document', [
      'ui.router'
    ])
    .config(documentConfig);

})();
