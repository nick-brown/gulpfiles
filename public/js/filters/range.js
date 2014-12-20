require('angular');

module.exports = function($filter) {
    'use strict';
    return function(data, page, size) {
        if(angular.isArray(data) && angular.isNumber(page) && angular.isNumber(size)) {
            var startIndex = (page - 1) * size;
            if(data.length < startIndex) {
                return [];
            }

            return $filter('limitTo')(data.splice(startIndex), size);
        }

        return data;
    };
};
