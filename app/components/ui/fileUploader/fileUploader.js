(function() {
  'use strict';

  angular
    .module('myou.ui.fileUploader', [])
    .directive('rsFileUploader', RsFileUploaderDirective);

  function RsFileUploaderDirective() {
    return {
      restrict: 'EA',
      scope: true,
      template: [
        '<span class="filename">未选择任何文件</span>',
        '<label>',
          '<div class="select">选择</div>',
          '<input type="file" class="file">',
        '</label>'
      ].join(''),
      link: link
    };

    function link(scope, element, attr) {
      var fileInput = element.find('input');
      var selectedFile = element.find('span');
      fileInput.on('change', function() {
        var filePath = this.value;
        if (filePath) {
          var m = filePath.match(/([^\/\\]+)$/);
          var fileName = m[1];
          selectedFile.html(fileName);
        } else {
          selectedFile.html('未选择任何文件');
        }
      });
    }
  }

})();
