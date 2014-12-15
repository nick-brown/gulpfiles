module.exports = function($scope, $http, dataUrl) {
    'use strict';
    $scope.data = {};

    $http.get(dataUrl)
        .success(function(data) {
            $scope.data.products = data;
        })
        .error(function(message, httpStatus) {
            $scope.data.error = {
                'status': httpStatus,
                'message': message
            };
        });
};
