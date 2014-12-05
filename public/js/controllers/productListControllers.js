module.exports = function($scope, $filter) {
    'use strict';

    var selectedCategory = null;

    $scope.selectCategory = function(newCategory) {
        selectedCategory = newCategory; 
    };

    $scope.categoryFilterFn = function(product) {
        return selectedCategory == null || product.category == selectedCategory;
    };
};
