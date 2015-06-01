(function() {
  'use strict';

  function appRomConfig($stateProvider) {
    $stateProvider
      .state('dashboard.appdevelop.approm', {
        url: '/appsetting',
        templateUrl: 'app/components/approm/approm.html',
        controllerAs: 'vm',
        controller: 'AppRomCtrl'
      })
      .state('dashboard.systemupdate.approm', {
        url: '/romsetting',
        templateUrl: 'app/components/approm/approm.html',
        controllerAs: 'vm',
        controller: 'AppRomCtrl'
      });
  }

  function AppRomCtrl(MomentDateService, localStorageService, $timeout, AppRomService, $mdDialog, $mdToast) {
    var vm = this;
    vm.app = localStorageService.get('app');

    /***************************** 每分钟下载曲线 start *******************************/
    vm.onedayCount = 0;
    console.log(vm.app);
    vm.checkdate = MomentDateService.getToday().start;

    vm.highchartsURL = {
      options: {
        chart: {
          type: 'line',
          animation: false,
          shadow: false,
          zoomType: 'x',
          panning: true,
          panKey: 'shift',
          resetZoomButton: {
            theme: {
              height: 15
            }
          }
        },
        plotOptions: {
          line: {
            lineWidth: 2,
            states: {
              hover: {
                lineWidth: 2
              }
            }
          },
          series: {
            pointInterval: 60 * 1000, //resultUrl的时间间隔，总共有1440个数据，间隔为1min
          }
        }
      },
      credits: {
        enabled: false
      },
      title: {
        text: ''
      },
      xAxis: {
        type: 'datetime',
        minRange: 12 * 60 * 1000 //最少显示12分钟内的数据
      },
      yAxis: {
        min: 0,
        title: {
          text: '数量'
        },
        plotLines: [{
          value: 0,
          width: 1,
          color: '#808080'
        }]
      },
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
        borderWidth: 0
      },
      noData: 'No data'
    };

    vm.setURLData = function(data) {
      var pointStart = Date.parse(vm.checkdate);
      vm.highchartsURL.series = [];
      var arr = data.map(function(i) {
        return i[1];
      });
      vm.highchartsURL.series.push({
        name: '每分钟更新曲线',
        pointStart: pointStart,
        data: arr
      });

      vm.highchartsURL.options.plotOptions.series.pointStart = pointStart;
    };

    vm.getData = function() {
      AppRomService.getUpdateMinData(vm.app._id, vm.checkdate, function() {
        vm.onedayCount = AppRomService.data.mindata.count;
        vm.setURLData(AppRomService.data.mindata.values);
      });
    };

    vm.getData();

    /***************************** 每分钟下载曲线 end *******************************/

    /***************************** 更新设置 start *******************************/

    vm.limit = false;
    vm.limitCount = 0;
    vm.showError = false;
    vm.isOpenUpdatePolicy = false;
    vm.userInfo = localStorageService.get('user');

    vm.selectAll = function() {
      vm.provinces.forEach(function(dt) {
        dt.value = true;
      });
    };

    vm.deselectAll = function() {
      vm.provinces.forEach(function(dt) {
        dt.value = false;
      });
    };

    vm.unselectAll = function() {
      vm.provinces.forEach(function(dt) {
        dt.value = !dt.value;
      });
    };

    vm.saveUpdateSetting = function($event) {

      var result = {
        allow_all_region: true,
        allow_regions: [],
        enable_minute_update_limit: false,
        minute_update_limit_count: 0
      };

      result.allow_regions = vm.provinces.filter(function(i) {
        return i.value;
      }).map(function(i) {
        return i.label;
      });

      if (vm.provinces.length !== result.allow_regions.length) {
        result.allow_all_region = false;
      } else {
        result.allow_regions = [];
      }

      result.enable_minute_update_limit = vm.limit;
      result.minute_update_limit_count = vm.limitCount;

      var num = /^[1-9]\d*$/;
      if (result.enable_minute_update_limit && !num.test(result.minute_update_limit_count)) {
        vm.showError = true;
        $timeout(function() {
          vm.showError = false;
        }, 2000);
        return;
      }

      if (vm.userInfo.userType !== 'root') {
        delete result.enable_minute_update_limit;
        delete result.minute_update_limit_count;
      }

      AppRomService.putUpdatePolicy(vm.app._id, result, function(error){
        if(error){
          vm.showAlert(error.msg);
          return;
        }
        vm.showAlert('保存成功');
      });
    };

    vm.showAlert = function(msg) {
      $mdToast.show(
        $mdToast.simple()
        .content(msg)
        .position('top right')
        .hideDelay(2500)
      );
    };

    vm.getUpdateSetting = function() {

      AppRomService.getUpdatePolicy(vm.app._id, function() {
        vm.limit = AppRomService.data.mindata.enable_minute_update_limit;
        vm.limitCount = AppRomService.data.mindata.minute_update_limit_count;

        vm.provinces.forEach(function(dt) {
          AppRomService.data.mindata.allow_regions.forEach(function(i) {
            if (dt.label === i) {
              dt.value = true;
            }
          });
        });

        if (AppRomService.data.mindata.allow_all_region) {
          vm.provinces.forEach(function(dt) {
            dt.value = true;
          });
        }
      });
    };

    // vm.getUpdateSetting();

    vm.provinces = [{
      value: false,
      label: '北京市'
    }, {
      value: false,
      label: '天津市'
    }, {
      value: false,
      label: '上海市'
    }, {
      value: false,
      label: '重庆市'
    }, {
      value: false,
      label: '广东省'
    }, {
      value: false,
      label: '江苏省'
    }, {
      value: false,
      label: '山东省'
    }, {
      value: false,
      label: '浙江省'
    }, {
      value: false,
      label: '河南省'
    }, {
      value: false,
      label: '河北省'
    }, {
      value: false,
      label: '山西省'
    }, {
      value: false,
      label: '安徽省'
    }, {
      value: false,
      label: '福建省'
    }, {
      value: false,
      label: '江西省'
    }, {
      value: false,
      label: '湖北省'
    }, {
      value: false,
      label: '湖南省'
    }, {
      value: false,
      label: '四川省'
    }, {
      value: false,
      label: '贵州省'
    }, {
      value: false,
      label: '云南省'
    }, {
      value: false,
      label: '陕西省'
    }, {
      value: false,
      label: '海南省'
    }, {
      value: false,
      label: '甘肃省'
    }, {
      value: false,
      label: '青海省'
    }, {
      value: false,
      label: '辽宁省'
    }, {
      value: false,
      label: '吉林省'
    }, {
      value: false,
      label: '黑龙江省'
    }, {
      value: false,
      label: '广西'
    }, {
      value: false,
      label: '内蒙古'
    }, {
      value: false,
      label: '西藏'
    }, {
      value: false,
      label: '宁夏'
    }, {
      value: false,
      label: '新疆'
    }, {
      value: false,
      label: '香港'
    }, {
      value: false,
      label: '澳门'
    }, {
      value: false,
      label: '台湾省'
    }, {
      value: false,
      label: '国外'
    }];

    /***************************** 更新设置 end *******************************/

  }

  angular
    .module('myou.approm')
    .controller('AppRomCtrl', AppRomCtrl)
    .config(appRomConfig);

})();
