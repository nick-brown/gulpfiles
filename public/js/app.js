/*globals angular*/
'use strict';

require('angular');
require('./ngmodules/customFilters');
require('./components/cart/cart');

// Modules
var app = angular.module('sportStore', ['customFilters', 'cart']);

// Controllers
app
    .controller('MainCtrl', ['$scope', '$http', 'dataUrl', require('./controllers/mainController')])
    .controller('ProductListCtrl', [
        '$scope',
        '$filter',
        'productListActiveClass',
        'productListPageCount',
        require('./controllers/productListControllers')
    ]);


// Constants
app
    .constant('productListPageCount', 3)
    .constant('dataUrl', 'http://localhost:8080/api/products')
    .constant('productListActiveClass', 'btn-primary');
