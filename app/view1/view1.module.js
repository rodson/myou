(function() {
  'use strict';

  angular
    .module('app.view1', ['ui.router'])
    .config(view1Config);

  view1Config.$inject = ['$stateProvider'];

  function view1Config($stateProvider) {
    $stateProvider
      .state('view1', {
        url: '/view1',
        templateUrl: 'app/view1/view1.html',
        controller: 'View1Controller'
      });
  }

})();
