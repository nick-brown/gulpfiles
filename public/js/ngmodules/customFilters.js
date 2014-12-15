/*globals angular*/
require('angular');

module.exports = angular.module('customFilters', [])
    .filter('unique', require('../filters/unique'))
    .filter('pageCount', require('../filters/pageCount'))
    .filter('range', ['$filter', require('../filters/range')]);
