/*globals angular*/
'use strict';

require('angular');

// Modules
var app = angular.module('sportStore', ['customFilters']);
var customFilters = angular.module('customFilters', []);

// Controllers
app
    .controller('MainCtrl', ['$scope', require('./controllers/mainController')])
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
    .constant('productListActiveClass', 'btn-primary');

// Filters
customFilters
    .filter('unique', require('./filters/unique'))
    .filter('range', ['$filter', require('./filters/range')])
    .filter('pageCount', require('./filters/pageCount'));

