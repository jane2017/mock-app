(function () {
  "use strict";

  angular.module('mets.search')
    //.controller('eventTableController', EventTableDirectiveController)
    .directive('searchOptions', SearchOptionsDirective);
  
  SearchOptionsDirective.inject = [];
  function SearchOptionsDirective() {
    var ddo = {
      templateUrl: 'search/search.options.html',
      scope: {
        options: '&',
        value: '=',
        defaultValue: '<',
        label: '@'
      }
/*      transclude: true*/
    };
    return ddo;
  }
})();