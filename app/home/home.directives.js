(function () {
  "use strict";

  angular.module('mets.home')
    .directive('homeEventTypes', HomeEventTypesDirective);
  
  //HomeEventTypesDirective.inject = [];
  function HomeEventTypesDirective() {
    var ddo = {
      templateUrl: 'home/home-event-types.tpl.html',
      scope: {
        types: '<',
        counts: '<',
        isstate: '<',
        eventFilter: '&'
      }
    };
    return ddo;
  }
  
})();