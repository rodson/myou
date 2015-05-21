(function() {
  'use strict';

  angular
    .module('myou.ui.fileUploader', [])
    .directive('rsFileUploader', RsFileUploaderDirective);

  function RsFileUploaderDirective() {
    return {
      restrict: 'EA',
      scope: {
        file: '='
      },
      controller: FileUploadCtrl,
      template: [
        '<span class="filename">{{fileName}}</span>',
        '<label>',
          '<md-button class="btn-lg md-raised md-primary">选择</md-button>',
          '<input type="file" class="file">',
        '</label>'
      ].join(''),
      link: link
    };

    function FileUploadCtrl($scope) {
      $scope.fileName = '未选择任何文件';
    }

    function link(scope, element, attr) {
      scope.$watch('file', function() {
        if (scope.file && scope.file.name) {
          scope.fileName = scope.file.name;
        }
      });
    }
  }

})();
