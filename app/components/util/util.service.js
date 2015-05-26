(function() {
  'use strict';

  angular
    .module('myou.util.service', [])
    .factory('MomentDateService', MomentDateService)
    .factory('PieArrayService', PieArrayService);

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
    momentDateService.getLast60Day = function() {
      return {
        start: moment().subtract(59, 'd').format('YYYY-MM-DD'),
        end: moment().format('YYYY-MM-DD')
      };
    };
    momentDateService.IsDateAvaliable = function(start, end) {
      return moment(end).isAfter(start) || start === end;
    };

    return momentDateService;
  }

  //适合数据格式为[['', int],['', int],['', int]]
  function PieArrayService() {
    var pieArrayService = {};

    var compare = function(a, b) {
      return b[1] - a[1];
    };

    pieArrayService.sort = function(list) {
      return list.sort(compare);
    };

    pieArrayService.getLarger = function(list, count) {
      count = count || 5;
      var listSorted = pieArrayService.sort(list);
      if(listSorted.length > count) {
        var c = 0;
        for(var i = count - 1; i < listSorted.length; i++){
          c += listSorted[i][1];
        }
        listSorted.length = count - 1;
        listSorted.push(['其他', c]);
      }
      return listSorted;
    };

    return pieArrayService;
  }

})();
