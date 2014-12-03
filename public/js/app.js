/*globals angular*/
'use strict';

require('angular');

var app = angular.module('sportStore', []);

// Controllers
app.controller('MainCtrl', ['$scope', require('./controllers/mainController')]);

// Filters
//angular.module('customFilters', []).filter('uniq', require('./filters/customFilters.js'));
app.filter('unique', require('./filters/customFilters.js'));
