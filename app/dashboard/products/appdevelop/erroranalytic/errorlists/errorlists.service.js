(function() {
  'use strict';

  /**
   * @ngInject
   */
  function ErrorListService($http, Constant) {
    var CRASH_LIST = '/crash_list';

    var errorListService = {};
    errorListService.data = {};

    // var testData = {
    //   data: [{
    //     'crash_id': '2d7c8400-0db6-4adf-87dd-e880b674ade2',
    //     'crash_context': '未能找到路径“C:\\Users\\shun\\AppData\\Roaming\\EasiMedia\\Cache\\c0baef07d865472da0a09f63f3041603\\Slides\\未能找到路径“C:\\Users\\shun\\AppData\\Roaming\\EasiMedia\\Cache\\c0baef07d865472da0a09f63f3041603\\Slides\\未能找到路径“C:\\Users\\shun\\AppData\\Roaming\\EasiMedia\\Cache\\c0baef07d865472da0a09f63f3041603\\Slides\\未能找到路径“C:\\Users\\shun\\AppData\\Roaming\\EasiMedia\\Cache\\c0baef07d865472da0a09f63f3041603\\Slides\\未能找到路径“C:\\Users\\shun\\AppData\\Roaming\\EasiMedia\\Cache\\c0baef07d865472da0a09f63f3041603\\Slides\\未能找到路径“C:\\Users\\shun\\AppData\\Roaming\\EasiMedia\\Cache\\c0baef07d865472da0a09f63f3041603\\Slides\\未能找到路径“C:\\Users\\shun\\AppData\\Roaming\\EasiMedia\\Cache\\c0baef07d865472da0a09f63f3041603\\Slides\\未能找到路径“C:\\Users\\shun\\AppData\\Roaming\\EasiMedia\\Cache\\c0baef07d865472da0a09f63f3041603\\Slides\\499ac7b2e6ee4e72aa8e75cc9bfb6149”的一部分。',
    //     'crash_context_digest': '未能找到路径“C:\\Users\\shun\\AppData\\Roaming\\EasiMedia\\Cache\\c0baef07d865472da0a09f63f3041603\\Slides\\499ac7b2e6ee4e72aa8e75cc9bfb6149”的一部分。',
    //     'app_version': 'Ver. 1.0.1.1932',
    //     'count': 1,
    //     'last_crash_date_time': '2015-05-26 16:25:02',
    //     'first_crash_date_time': '2015-05-26 16:25:02',
    //     'fixed': 0
    //   }, {
    //     'crash_id': 'ce1adbfd-37bd-4eb1-bc86-dc5419c88ad5',
    //     'crash_context': '未能找到文件“C:\\Users\\Administrator\\AppData\\Roaming\\EasiMedia\\Cache\\6ec2049c7ba44168b58961ee3cef3a42\\Slides\\Slide_0.xml”。',
    //     'crash_context_digest': '未能找到文件“C:\\Users\\Administrator\\AppData\\Roaming\\EasiMedia\\Cache\\6ec2049c7ba44168b58961ee3cef3a42\\Slides\\Slide_0.xml”。',
    //     'app_version': 'Ver. 1.0.1.1932',
    //     'count': 1,
    //     'last_crash_date_time': '2015-05-27 09:25:25',
    //     'first_crash_date_time': '2015-05-27 09:25:25',
    //     'fixed': 0
    //   }, {
    //     'crash_id': '87ad2ea8-63d7-4bf3-984d-b8aebe28713b',
    //     'crash_context': '文件“C:\\Users\\shun\\Documents\\Easimedia\\MyTemplate\\2_HThumbnail.png”已经存在。',
    //     'crash_context_digest': '文件“C:\\Users\\shun\\Documents\\Easimedia\\MyTemplate\\2_HThumbnail.png”已经存在。',
    //     'app_version': 'Ver. 1.0.1.1932',
    //     'count': 1,
    //     'last_crash_date_time': '2015-05-26 10:14:52',
    //     'first_crash_date_time': '2015-05-26 10:14:52',
    //     'fixed': 0
    //   }]
    // };

    // var testFixedData = {
    //   data: [{
    //     crash_id: '12345',
    //     crash_context_digest: 'FixNullPointerException',
    //     crash_context: 'fsdk\nfjsk\nljfklasjklfj',
    //     app_version: '1.0',
    //     count: 30,
    //     fixed: true,
    //     first_crash_date_time: '2015-02-01',
    //     last_crash_date_time: '2015-02-02'
    //   }, {
    //     crash_id: '12346',
    //     crash_context_digest: 'FixRuntimeException',
    //     app_version: '1.0',
    //     count: 20,
    //     fixed: true,
    //     first_crash_date_time: '2015-02-01',
    //     last_crash_date_time: '2015-02-02'
    //   }]
    // };

    errorListService.getTableData = function(appKey, platform, fixed, cb) {
      return $http.get(Constant.URL.ANALYZE_URL + '/' + appKey + CRASH_LIST + '?platform=' + platform + '&fixed=' + fixed)
        .success(function(data) {
          if (fixed) {
            errorListService.data.fixed = data;
          } else {
            errorListService.data.unfix = data;
          }
          cb();
        });
    };

    errorListService.getPieChart = function(appKey, platform, crash_id, stats, cb) {
      return $http.get(Constant.URL.ANALYZE_URL + '/' + appKey + CRASH_LIST + '/' + crash_id + '/crash_device_stats' + '?platform=' + platform + '&stats=' + stats)
        .success(function(data) {
          errorListService.data.pie = data;
        });
    };

    errorListService.markToFixed = function(appKey, crash_id, isFix, cb) {
      var data = {
        fixed: isFix
      };
      return $http.put(Constant.URL.ANALYZE_URL + '/' + appKey + CRASH_LIST + '/' + crash_id, data)
        .success(function() {
          cb();
        })
        .error(function(error) {
          cb(error);
        });
    };

    return errorListService;

  }

  angular.module('myou.dashboard.appdevelop')
    .factory('ErrorListService', ErrorListService);

})();
