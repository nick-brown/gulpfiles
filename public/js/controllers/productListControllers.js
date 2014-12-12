module.exports = function($scope, $filter, productListActiveClass, productListPageCount) {
    'use strict';

    var selectedCategory = null;

    $scope.selectCategory = function(newCategory) {
        selectedCategory = newCategory; 
        $scope.selectedPage = 1;
    };

    $scope.categoryFilterFn = function(product) {
        return selectedCategory === null || product.category === selectedCategory;
    };

    $scope.getCategoryClass = function(category) {
        return selectedCategory === category ? productListActiveClass : '';
    }

    $scope.selectPage = function(newPage) {
        $scope.selectedPage = newPage;
    };

    $scope.getPageClass = function(page) {
        return $scope.selectedPage === page ? productListActiveClass : '';
    };

    $scope.selectedPage = 1;
    $scope.pageSize = productListPageCount;
};
