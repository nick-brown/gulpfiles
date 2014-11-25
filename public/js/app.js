/*globals angular*/
'use strict';

//require('../bower_components/angular/angular');
require('angular');

var app = angular.module('sportStore', []);

app.controller('MainCtrl', ['$scope', require('./controllers/mainController')]);
