(function() {
  'use strict';

  function UploadDialogCtrl() {
    var vm = this;

    vm.progress = 10;

    vm.abort = function() {

    };

    vm.ok = function() {

    };

  }

  angular
    .module('myou.dashboard.appdevelop.appupdate')
    .controller('UploadDialogCtrl', UploadDialogCtrl);

})();
