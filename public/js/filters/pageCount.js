/*globals angular*/
require('angular');

module.exports = function() {
    'use strict';
    return function(data, size) {
        if(angular.isArray(data)) {
            var result = [];
            for(var i = 0; i < Math.ceil(data.length / size); i++) {
                result.push(i);
            }

            return result;
        } else {
            return data;
        }
    };
};
