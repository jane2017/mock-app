(function () {
  "use strict";

  angular.module('mets.search')
    //.controller('eventTableController', EventTableDirectiveController)
    .directive('searchOptions', SearchOptionsDirective)
    .directive('searchInput', SearchInputDirective);
  
  //SearchOptionsDirective.inject = [];
  function SearchOptionsDirective() {
    var ddo = {
      templateUrl: 'search/search.options.html',
      scope: {
        options: '&',
        bindValue: '=',
        defaultValue: '<',
        label: '@'
      }
    };
    return ddo;
  }
  
  //SearchInputDirective.inject = [];
  function SearchInputDirective() {
    var ddo = {
      templateUrl: 'search/search.input.html',
      scope: {
        bindValue: '=',
        defaultValue: '<',
        label: '@',
        dateFormat: '@',
        isTime: '<'
      }
    };
    return ddo;
  }
  
})();