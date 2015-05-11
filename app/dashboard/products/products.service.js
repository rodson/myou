(function() {
  'use strict';

  function ProductsService($http, Constant, localStorageService,
    StateManager, PlatformManager) {

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
      localStorageService.set('app', product);
      StateManager.enterProduct(product.platform, product._id);
    };

    ProductsService.showPlatformName = function(platform) {
      return PlatformManager.showPlatformName(platform);
    };

    return ProductsService;
  }

  angular
    .module('myou.dashboard.products')
    .factory('ProductsService', ProductsService);

})();
