(function() {
  'use strict';

  require('angular');
  require('angular-route');
  require('./ngmodules/customFilters');
  require('./components/cart/cart');

  // Modules
  //===========================================================================
  var app = angular.module('sportStore', ['customFilters', 'cart', 'ngRoute']);

  // Modules
  //===========================================================================
  app
    // takes a function which is executed when the module is loaded but before
    // the application is executed -- good for one-off configuration tasks
    .config(function($routeProvider) {
        $routeProvider.when('/complete', {
            templateUrl: '/js/views/thankYou.html'
        });

        $routeProvider.when('/checkout', {
            templateUrl: '/js/views/checkoutSummary.html'
        });

        $routeProvider.when('/placeorder', {
            templateUrl: '/js/views/placeOrder.html'
        });

        $routeProvider.when('/products', {
            templateUrl: '/js/views/productList.html'
        });

        $routeProvider.otherwise({
            templateUrl: '/js/views/productList.html'
        });
    });

  // Controllers
  //===========================================================================
  app
    .controller('MainCtrl', ['$scope', '$http', 'dataUrl', require('./controllers/mainController')])
    .controller('CartSummaryCtrl', ['$scope', 'cart', require('./controllers/cartSummaryController')])
    .controller('CheckoutCtrls', ['$scope', 'cart', require('./controllers/checkoutControllers')])
    .controller('ProductListCtrl', [
        '$scope',
        '$filter',
        'productListActiveClass',
        'productListPageCount',
        'cart',
        require('./controllers/productListControllers')
    ]);


  // Constants
  //===========================================================================
  app
    .constant('productListPageCount', 3)
    .constant('dataUrl', 'http://localhost:8080/api/products')
    .constant('productListActiveClass', 'btn-primary');
}());
