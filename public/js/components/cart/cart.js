module.exports = angular.module('cart', [])
        .factory('cart', function() {
            'use strict';
            var cartData = [];

            return {
                addProduct: function(id, name, price) {
                    var addToExistingItem = false;
                    // TODO: refactor this to reduce repetition
                    for(var i = 0, len = cartData.lenth; i < len; i++) {
                        if(cartData[i].id === id) {
                            cartData[i].count++;
                            addToExistingItem = true;
                            break;
                        }
                    }
                    if(!addToExistingItem) {
                        cartData.push({ count: 1, id: id, price: price, name: name });
                    }
                },

                removeProduct: function(id) {
                    for(var i = 0, len = cartData.lenth; i < len; i++) {
                        if(cartData[i].id === id) {
                            cartData.splice(i, 1);
                            break;
                        }
                    }
                },

                getProducts: function() {
                    return cartData;
                }
            };
        })
        .directive('cartSummary', ['cart', function(cart) {
            'use strict';
            return {
                restrict: 'E',
                templateUrl: './js/components/cart/cartSummary.html',
                controller: ['$scope', function($scope) {
                    var cartData = cart.getProducts();

                    $scope.total = function() {
                        var total = 0;
                        for(var i = 0, len = cartData.length; i < len; i++) {
                            total += (cartData[i].price * cartData[i].count);
                        }

                        return total;
                    };

                    $scope.itemCount = function() {
                        var totalItems = 0;
                        for(var i = 0, len = cartData.length; i < len; i++) {
                            totalItems += cartData[i].count;
                        }

                        return totalItems;
                    };
                }]
            };
        }]);
