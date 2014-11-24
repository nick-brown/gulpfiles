/*globals angular*/
'use strict';

require('../bower_components/angular/angular');

var app = angular.module('sportStore', []);
var mainController = require('./mainController');
var fun = function($scope) {
    $scope.name = 'Nick';
    $scope.model = {
        name: 'Nick'
    };
};

var fun2 = require('./mainController')();

app.controller('MainCtrl', ['$scope', fun2]);
