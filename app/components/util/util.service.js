(function() {
  'use strict';

  angular
    .module('myou.util.service', [])
    .factory('MomentDateService', MomentDateService);

  function MomentDateService() {
    var moment = window.moment;
    var momentDateService = {};

    momentDateService.getToday = function() {
      return {
        start: moment().format('YYYY-MM-DD'),
        end: moment().format('YYYY-MM-DD')
      };
    };
    momentDateService.getYesterday = function() {
      return {
        start: moment().subtract(1, 'd').format('YYYY-MM-DD'),
        end: moment().subtract(1, 'd').format('YYYY-MM-DD')
      };
    };
    momentDateService.getLast7Day = function() {
      return {
        start: moment().subtract(6, 'd').format('YYYY-MM-DD'),
        end: moment().format('YYYY-MM-DD')
      };
    };
    momentDateService.getLast30Day = function() {
      return {
        start: moment().subtract(29, 'd').format('YYYY-MM-DD'),
        end: moment().format('YYYY-MM-DD')
      };
    };
    momentDateService.IsDateAvaliable = function(start, end) {
      return moment(end).isAfter(start) || start === end;
    };

    return momentDateService;
  }

})();
