/*globals angular*/
'use strict';

require('angular');

// Modules
var app = angular.module('sportStore', ['customFilters']);
var customFilters = angular.module('customFilters', []);

// Controllers
app.controller('MainCtrl', ['$scope', require('./controllers/mainController')]);
app.controller('ProductListCtrl', ['$scope', '$filter', require('./controllers/productListControllers')]);

// Filters
customFilters.filter('unique', require('./filters/customFilters.js'));
