(function() {
  'use strict';

  /**
   * @ngInject
   */
  function addProductConfig($stateProvider) {
    $stateProvider
      .state('dashboard.addproduct', {
        url: '/addproduct',
        templateUrl: 'app/dashboard/addproduct/addproduct.html',
        controllerAs: 'vm',
        controller: 'AddProductCtrl'
      });
  }

  /**
   * @ngInject
   */
  function AddProductCtrl(AddProductService) {
    var vm = this;

    vm.platforms = AddProductService.platforms;
    vm.platform = AddProductService.platforms.APP_DEVELOP;
    vm.appPlatform = AddProductService.platforms.ANDROID_APP;
    vm.product = {};

    vm.createProduct = function(isValid) {
      if (isValid) {
        if (vm.platform === AddProductService.platforms.APP_DEVELOP) {
          vm.product.platform = vm.appPlatform;
        } else {
          vm.product.platform = vm.platform;
        }

        AddProductService.createProduct(vm.product).then(function() {
          vm.createdProduct = AddProductService.createdProduct;
        });
      }
    };

    vm.enterProduct = function() {
      AddProductService.enterProduct();
    };

  }

  angular
    .module('myou.dashboard.addproduct')
    .controller('AddProductCtrl', AddProductCtrl)
    .config(addProductConfig);

})();
