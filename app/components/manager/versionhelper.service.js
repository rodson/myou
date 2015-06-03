(function() {
  'use strict';

  /**
   * @ngInject
   */
  function VersionHelper() {
    var VersionHelper = {};

    VersionHelper.compareVersion = function(versionA, versionB) {
      if (!isString(versionA) || !isString(versionB)) {
        throw new Error('Input version not valid, must be string');
      }
      var arrayA = versionA.split('.');
      var arrayB = versionB.split('.');
      if (arrayA.length !== 4 || arrayB.length !== 4) {
        throw new Error('Input version not valid, must format as "3.0.0.48026"');
      }

      for (var i = 0; i < 4; i++) {
        var itemA = arrayA[i];
        var itemB = arrayB[i];
        if (!isInteger(itemA) || !isInteger(itemB)) {
          throw new Error('Input version not valid, must contain only digits"');
        }
        if (itemA === itemB) {
          if (i === 3) {
            return 0;
          }
        } else {
          return itemA < itemB ? -1 : 1;
        }
      }
    };

    return VersionHelper;

    function isString(str) {
      return Object.prototype.toString.call(str).slice(8, -1) === 'String';
    }

    function isInteger(num) {
      return /^(0|[1-9]\d*)$/.test(num);
    }
  }

  angular
    .module('myou.shared')
    .factory('VersionHelper', VersionHelper);

})();
