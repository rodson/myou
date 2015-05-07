(function() {
  'use strict';

  function productsConfig($stateProvider) {
    $stateProvider
      .state('dashboard.appdevelop', {
        url: '/appdevelop',
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
