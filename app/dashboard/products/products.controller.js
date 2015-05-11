(function() {
  'use strict';

  function productsConfig($stateProvider) {
    $stateProvider
      .state('dashboard.products', {
        url: '/products',
        templateUrl: 'app/dashboard/products/products.html',
        controllerAs: 'vm',
        controller: 'ProductsCtrl',
        resolve: ProductsCtrl.resolve
      });
  }

  function ProductsCtrl($state, ProductsService) {
    var vm = this;

    vm.products = ProductsService.products;

    vm.gotoAddProduct = function() {
      $state.go('dashboard.addproduct');
    };

    vm.enterProduct = function(product) {
      ProductsService.enterProduct(product);
    };

    vm.showPlatformName = function(platform) {
      return ProductsService.showPlatformName(platform);
    };
  }

  ProductsCtrl.resolve = {
    getProducts: function(ProductsService) {
      return ProductsService.getProducts();
    }
  };

  angular
    .module('myou.dashboard.products')
    .controller('ProductsCtrl', ProductsCtrl)
    .config(productsConfig);

})();
