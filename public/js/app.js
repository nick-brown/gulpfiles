/*globals angular*/
'use strict';

require('angular');

// Modules
var app = angular.module('sportStore', ['customFilters', 'cart'])
,   customFilters = angular.module('customFilters', [])
,   cart = require('./components/cart/cart');

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

// Filters
customFilters
    .filter('unique', require('./filters/unique'))
    .filter('range', ['$filter', require('./filters/range')])
    .filter('pageCount', require('./filters/pageCount'));

