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
        initDatatime: '=',
        displayMode: '@'
      },
      template: '<md-button class="md-raised md-primary" ng-click="showDatatimeimePickDialog($event)">{{ initDatatime }}</md-button>',
      controller: controller
    };

    function controller($scope, dateFilter, $mdDialog) {
      if($scope.displayMode === 'full'){
        var format = 'yyyy-MM-dd  HH:mm:ss';
      } else {
        var format = 'yyyy-MM-dd';
      }


      $scope.showDatatimeimePickDialog = function(ev) {
        $mdDialog.show({
          controller: DialogController,
          controllerAs: 'vm',
          template: ['<md-dialog aria-label="日期时间选择">',
            '<time-date-picker ng-model="dateValue" display-twentyfour="true" on-save="vm.save($value)" display-mode={{vm.displayMode}} on-cancel="vm.cancel()">',
            '</time-date-picker>',
            '</md-dialog>'
          ].join(''),
          targetEvent: ev,
          resolve: {
            displayMode: function(){
              return $scope.displayMode || 'full';
            }
          }
        }).then(function(answer) {
          $scope.initDatatime = dateFilter(new Date(answer), format);
        }, function() {});
      };

      function DialogController($mdDialog, displayMode) {
        var vm = this;

        vm.displayMode = displayMode;

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
