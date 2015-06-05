(function() {
  'use strict';

  angular
    .module('myou.ui.datatimePicker', [
      'mdDateTime'
    ])
    .directive('datatimePicker', DatatimePicker);

  /**
   * @ngInject
   */
  function DatatimePicker() {
    return {
      restrict: 'EA',
      scope: {
        initDatatime: '=',
        startDatetime: '=',
        endDatetime: '=',
        displayMode: '@',
        timeQuantum: '@',
        dateChanged: '&'
      },
      template: '<md-button class="md-raised md-primary" ng-click="showDatatimeimePickDialog($event)">{{ timeQuantum ? startDatetime + " 到 " + endDatetime : initDatatime }}</md-button>',
      controller: controller
    };

    /**
     * @ngInject
     */
    function controller($scope, dateFilter, $mdDialog) {
      if ($scope.displayMode === 'full') {
        var format = 'yyyy-MM-dd HH:mm:ss';
      } else {
        var format = 'yyyy-MM-dd';
      }

      $scope.$watch('initDatatime', function() {
        if (typeof($scope.dateChanged) === 'function') {
          $scope.dateChanged();
        }
      });

      $scope.showDatatimeimePickDialog = function(ev) {
        var template;
        if ($scope.timeQuantum) {
          template = ['<md-dialog aria-label="日期时间选择" ',
            'style="-webkit-flex-direction: row;-ms-flex-direction: row; flex-direction: row;">',
            '<time-date-picker ng-model="vm.dateValue" orientation="true" ',
            'on-save="vm.save($value)" display-mode="date" on-cancel="vm.cancel()" ',
            'style="margin-top: -37%;">',
            '<ng-transclude></ng-transclude>',
            '</time-date-picker>',
            '<time-date-picker ng-model="vm.dateValue" orientation="true" ',
            'on-save="vm.save($value)" display-mode="date" on-cancel="vm.cancel()" ',
            'style="margin-top: -37%;">',
            '<ng-transclude></ng-transclude>',
            '</time-date-picker>',
            '</md-dialog>'
          ].join('');
        } else {
          template = ['<md-dialog aria-label="日期时间选择">',
            '<time-date-picker ng-model="vm.dateValue" display-twentyfour="true" ',
            'on-save="vm.save($value)" display-mode={{vm.displayMode}} on-cancel="vm.cancel()">',
            '</time-date-picker>',
            '</md-dialog>'
          ].join('');
        }

        $mdDialog.show({
          controller: DialogController,
          controllerAs: 'vm',
          template: template,
          targetEvent: ev,
          transclude: true,
          resolve: {
            data: function() {
              return {
                displayMode: $scope.displayMode || 'full',
                showButtons: $scope.showButtons
              };
            }
          }
        }).then(function(answer) {
          $scope.initDatatime = dateFilter(new Date(answer), format);
        }, function() {});
      };

      /**
       * @ngInject
       */
      function DialogController($mdDialog, data) {
        var vm = this;

        vm.showButtons = data.showButtons;
        vm.displayMode = data.displayMode;

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
