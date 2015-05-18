(function() {
  'use strict';

  angular
    .module('myou.ui.dropdown', [])
    .directive('rsDropdown', RsDropdownDirective);

  function RsDropdownDirective() {
    return {
      restrict: 'EA',
      transclude: true,
      template: [
        '<rs-dropdown">',
          '<span class="drop-label extra-width">',
            '<img src="assets/images/material-other/ic_more_vert_18px.svg" alt="more" />',
          '</span>',
          '<div class="drop-content">',
            '<ul ng-transclude></ul>',
          '</div>',
        '</rs-dropdown>'
      ].join('')
    };

  }

})();
