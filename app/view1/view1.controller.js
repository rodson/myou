(function() {
  'use strict';

  angular
    .module('app.view1')
    .controller('View1Controller', View1Controller);

  function View1Controller() {
    console.log('this is the controller of view1');
  }

})();
