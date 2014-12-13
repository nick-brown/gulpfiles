module.exports = function($scope, $http, dataUrl) {
    'use strict';
    $scope.data = {};

    $http.get(dataUrl)
        .success(function(data) {
            $scope.data.products = data;
        })
        .error(function(error) {
            $scope.data.error = error;
        });
};
