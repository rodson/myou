(function() {
  'use strict';

  function bytesFilter() {
    return function(bytes, precision) {
      if (bytes === 0 || bytes === '0') {
        return '0 KB';
      }
      if (isNaN(parseFloat(bytes)) || !isFinite(bytes)) {
        return '-';
      }
      if (typeof precision === 'undefined') {
        precision = 1;
      }
      var units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
      var number = Math.floor(Math.log(bytes) / Math.log(1024));
      return (bytes / Math.pow(1024, Math.floor(number)))
        .toFixed(precision) + ' ' + units[number];
    };
  }

  angular
    .module('myou.filter.bytes', [])
    .filter('bytes', bytesFilter);
})();
