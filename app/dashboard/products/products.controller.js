(function() {
  'use strict';

  /**
   * @ngInject
   */
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

  /**
   * @ngInject
   */
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

    vm.showEditProductDialog = function(ev, product) {
      ProductsService.showEditProductDialog(ev, product);
    };

    vm.showDeleteProductDialog = function(ev, product) {
      ProductsService.showDeleteProductDialog(ev, product);
    };
  }

  ProductsCtrl.resolve = {

    /**
     * @ngInject
     */
    getProducts: function(ProductsService) {
      return ProductsService.getProducts();
    }
  };

  /**
   * @ngInject
   */
  function EditProductDialogCtrl(data, $mdDialog, ProductsService, PlatformManager) {
    var vm = this;

    vm.product = data.product;

    vm.isWebApp = function() {
      return PlatformManager.isWebApp(vm.product.platform);
    };

    vm.ok = function() {
      ProductsService.updateProduct(vm.product._id, vm.product)
        .success(function(data) {
          $mdDialog.hide(data);
        }).error(function(err) {
          vm.errorMessage = err.message;
        });
    };

    vm.cancel = function() {
      $mdDialog.cancel();
    };
  }

  /**
   * @ngInject
   */
  function DeleteProductDialogCtrl(data, $mdDialog, ProductsService) {
    var vm = this;

    vm.product = data.product;

    vm.ok = function() {
      ProductsService.deleteProduct(vm.product._id)
        .success(function() {
          $mdDialog.hide();
        }).error(function(err) {
          vm.errorMessage = err.message;
        });
    };

    vm.cancel = function() {
      $mdDialog.cancel();
    };
  }

  angular
    .module('myou.dashboard.products')
    .controller('ProductsCtrl', ProductsCtrl)
    .controller('EditProductDialogCtrl', EditProductDialogCtrl)
    .controller('DeleteProductDialogCtrl', DeleteProductDialogCtrl)
    .config(productsConfig);

})();
