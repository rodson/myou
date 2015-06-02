(function() {
  'use strict';

  function AddProductService($http, $state, $mdToast, localStorageService,
    Constant, StateManager) {

    var AddProductService = {};
    AddProductService.createdProduct = {};
    AddProductService.platforms = Constant.PRODUCT_PLATFORM;

    AddProductService.createProduct = function(product) {
      return $http.post(Constant.URL.PRODUCTS, product)
        .success(function(response) {
          AddProductService.createdProduct = {
            'name': response.name,
            'appKey': response.appKey,
            'platform': response.platform,
            '_id': response._id
          };
        })
        .error(function(error) {
          $mdToast.show(
            $mdToast.simple()
              .content(error.message)
              .position('right top')
              .hideDelay(3000)
          );
        });
    };

    AddProductService.enterProduct = function() {
      localStorageService.set('app', AddProductService.createdProduct);
      StateManager.enterProduct(AddProductService.createdProduct.platform,
        AddProductService.createdProduct._id);
    };

    return AddProductService;
  }

  angular
    .module('myou.dashboard.addproduct')
    .factory('AddProductService', AddProductService);
})();
