module.exports = function($scope, cart) {
    'use strict';
    $scope.cartData = cart.getProducts();

    $scope.total = function() {
        var total = 0;
        for(var i = 0, len = $scope.cartData.length; i < len; i++) {
            var item = $scope.cartData[i];
            total += (item.price * item.count);
        }

        return total;
    };

    $scope.remove = function(id) {
        cart.removeProduct(id);
    };

    $scope.increment = function(item) {
        cart.addProduct(item.id, item.name, item.price);
    };

    $scope.decrement = function(id) {
        // TODO: Wire this up
        cart.decrementProduct(id);
    };
};
