/*globals angular*/
'use strict';

require('angular');

// Modules
var app = angular.module('sportStore', ['customFilters']);
var customFilters = angular.module('customFilters', []);

// Controllers
app
    .controller('MainCtrl', ['$scope', require('./controllers/mainController')])
    .controller('ProductListCtrl', ['$scope', '$filter', 'productListActiveClass', require('./controllers/productListControllers')])
    .constant('productListActiveClass', 'btn-primary');

// Filters
customFilters.filter('unique', require('./filters/customFilters.js'));
