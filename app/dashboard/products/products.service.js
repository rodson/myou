(function() {
  'use strict';

  /**
   * @ngInject
   */
  function ProductsService($http, $mdDialog, Constant, StorageManager,
    $state, $stateParams, StateManager, PlatformManager) {

    var ProductsService = {};
    ProductsService.products = '';

    ProductsService.getProducts = function (ownerId) {
      var queryString = ownerId ? ('?ownerId=' + ownerId) : '';

      return $http.get(Constant.URL.PRODUCTS + queryString)
        .success(function(data) {
          ProductsService.products = data;
        });
    };

    ProductsService.createProduct = function (product) {
      return $http.post(Constant.URL.PRODUCTS, product);
    };

    ProductsService.deleteProduct = function (id) {
      return $http.delete(Constant.URL.PRODUCTS + '/' + id);
    };

    ProductsService.updateProduct = function (id, product) {
      return $http.put(Constant.URL.PRODUCTS + '/' + id, product);
    };

    ProductsService.enterProduct = function(product) {
      StorageManager.setApp(product);
      StateManager.enterProduct(product.platform, product._id);
    };

    ProductsService.showPlatformName = function(platform) {
      return PlatformManager.showPlatformName(platform);
    };

    ProductsService.showEditProductDialog = function(ev, product) {
      var editProduct = angular.copy(product);

      $mdDialog.show({
        controller: 'EditProductDialogCtrl',
        controllerAs: 'vm',
        templateUrl: 'editProductDialog.html',
        targetEvent: ev,
        resolve: {
          data: function() {
            return {
              product: editProduct
            };
          }
        }
      }).then(function(changeProduct) {
        product.name = changeProduct.name;
        product.description = changeProduct.description;
      });
    };

    ProductsService.showDeleteProductDialog = function(ev, product) {
      return $mdDialog.show({
        controller: 'DeleteProductDialogCtrl',
        controllerAs: 'vm',
        templateUrl: 'deleteProductDialog.html',
        targetEvent: ev,
        resolve: {
          data: function() {
            return {
              product: product
            };
          }
        }
      }).then(function() {
        // Reload current page
        $state.transitionTo($state.current, $stateParams, {
          reload: true,
          inherit: false,
          notify: true
        });
      });
    };

    return ProductsService;
  }

  angular
    .module('myou.dashboard.products')
    .factory('ProductsService', ProductsService);

})();
