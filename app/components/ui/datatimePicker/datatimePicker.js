(function() {
  'use strict';

  angular
    .module('myou.ui.datatimePicker', [
      'mdDateTime'
    ])
    .directive('datatimePicker', DatatimePicker);

  function DatatimePicker() {
    return {
      restrict: 'EA',
      scope: {
        initDatatime: '='
      },
      template: '<md-button class="md-raised md-primary" ng-click="showDatatimeimePickDialog($event)">{{ initDatatime }}</md-button>',
      controller: controller
    };

    function controller($scope, dateFilter, $mdDialog) {
      var format = 'yyyy-MM-dd  HH:mm:ss';

      $scope.showDatatimeimePickDialog = function(ev) {
        $mdDialog.show({
          controller: DialogController,
          controllerAs: 'vm',
          template: ['<md-dialog aria-label="日期时间选择">',
            '<time-date-picker ng-model="dateValue" display-twentyfour="true" on-save="vm.save($value)" on-cancel="vm.cancel()">',
            '</time-date-picker>',
            '</md-dialog>'
          ].join(''),
          targetEvent: ev,
        }).then(function(answer) {
          $scope.initDatatime = dateFilter(new Date(answer), format);
        }, function() {});
      };

      function DialogController($mdDialog) {
        var vm = this;

        vm.save = function(value) {
          $mdDialog.hide(value);
        };
        vm.cancel = function() {
          $mdDialog.cancel();
        };
      }
    }
  }

})();
