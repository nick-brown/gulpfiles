module.exports = function($scope, $http, $location, dataUrl, orderUrl, cart) {
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

    $scope.sendOrder = function(shippingDetails) {
        // Deep copy the object so we don't wreck it for the rest of the app
        var order = angular.copy(shippingDetails);
        order.products = cart.getProducts();

        $http.post(orderUrl, order)
            .success(function(data) {
                $scope.data.orderId = data.doc._id;
                cart.getProducts().length = 0;
            })

            .error(function(err) {
                $scope.data.orderError = err;
            })

            .finally(function() {
                $location.path('/complete');
            });
    };
};
