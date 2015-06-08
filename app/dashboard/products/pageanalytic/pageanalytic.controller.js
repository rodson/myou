(function() {
  'use strict';

  /**
   * @ngInject
   */
  function pageAnalyticConfig($stateProvider) {
    $stateProvider
      .state('dashboard.pageanalytic', {
        abstract: true,
        url: '/pageanalytic/:id',
        templateUrl: 'app/dashboard/products/pageanalytic/pageanalytic.html',
        controllerAs: 'vm',
        controller: 'PageAnalyticCtrl',
        resolve: PageAnalyticCtrl.getData
      });
  }

  /**
   * @ngInject
   */
  function PageAnalyticCtrl(localStorageService, $location, $mdDialog, $mdToast, MomentDateService) {
    var vm = this;

    vm.product = localStorageService.get('app');
    vm.trickId = localStorageService.get('trickId');

    var checkDate = MomentDateService.getLast7Day();
    vm.startDate = checkDate.start;
    vm.endDate = checkDate.end;

    vm.isActive = function(path) {
      return $location.path().indexOf(path) > -1;
    };

    vm.showCopyCodeDialog = function(ev) {
      $mdDialog.show({
        controller: DialogController,
        controllerAs: 'vm',
        templateUrl: 'getCaCode.html',
        targetEvent: ev,
        resolve: {
          data: function() {
            return {
              trickid: vm.trickId,
            };
          }
        }
      }).then(function(answer) {
        $mdToast.show(
          $mdToast.simple()
          .content('复制成功')
          .position('top right')
          .hideDelay(1500)
        );
      }, function() {});
    };

    /**************************** start test *****************************/
    // $state.go('dashboard.pageanalytic.global');
    // vm.trickId = 10000015;
    // localStorageService.set('trickId', vm.trickId);
    /**************************** end test *****************************/
  }

  PageAnalyticCtrl.getData = {
    /**
     * @ngInject
     */
    getApp: function(RouteStateManager, $stateParams) {
      return RouteStateManager.getApp($stateParams.id);
    },
    /**
     * @ngInject
     */
    getData: function(localStorageService, PageAnalyticService, getApp) {
      return PageAnalyticService.getData(getApp.data.appKey, function() {
        localStorageService.set('trickId', PageAnalyticService.trickId);
      });
    }
  };

  /**
   * @ngInject
   */
  function DialogController($mdDialog, data) {
    var vm = this;
    vm.trickId = data.trickid;
    vm.textareaVal = '<script type="text/javascript" charset="UTF-8">!function(a){var b,c;window.Ca=window.Ca||{},window.Ca.tid=a,b=document.createElement("script"),c=document.getElementsByTagName("script")[0],b.async=1,b.src="//myou.cvte.com/analytics/ca.js",c.parentNode.insertBefore(b,c)}("' + vm.trickId + '"); </script>';

    vm.copy = function() {
      $mdDialog.hide();
      return vm.textareaVal;
    };
    vm.close = function() {
      $mdDialog.cancel();
    };
  }

  angular
    .module('myou.dashboard.pageanalytic')
    .controller('PageAnalyticCtrl', PageAnalyticCtrl)
    .controller('DialogController', DialogController)
    .config(pageAnalyticConfig);

})();
