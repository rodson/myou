(function() {
  'use strict';

  function webPublishConfig($stateProvider) {
    $stateProvider
      .state('dashboard.webpublish', {
        url: '/webpublish/:id',
        templateUrl: 'app/dashboard/products/webpublish/webpublish.html',
        controllerAs: 'vm',
        controller: 'WebPublishCtrl'
      });
  }

  function WebPublishCtrl() {

  }

  angular
    .module('myou.dashboard.webpublish')
    .controller('WebPublishCtrl', WebPublishCtrl)
    .config(webPublishConfig);

})();
