(function() {
  'use strict';

  angular
    .module('app.view2', ['ui.router'])
    .config(view2Config);

  view2Config.$inject = ['$stateProvider'];

  function view2Config($stateProvider) {
    $stateProvider
      .state('view2', {
        url: '/view2',
        templateUrl: 'app/view2/view2.html',
        controller: 'View2Controller'
      });
  }

})();
