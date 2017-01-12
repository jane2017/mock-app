(function () {
  "use strict";

  angular.module('mets.common')
    //.controller('eventTableController', EventTableDirectiveController)
    .directive('eventTable', EventTableDirective)
    .directive('eventItemOption', EventItemOptionDirective)
    .directive('eventItemEdit', EventItemEditDirective);
  
  function EventItemOptionDirective() {
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
  
  function EventItemEditDirective() {
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
  
  EventTableDirective.inject = ['$compile'];
  function EventTableDirective($compile) {
    var ddo = {
      templateUrl: 'common/event-table.tpl.html',
      scope: {
        events: '<',
        headers: '<'
      }
/*      controller: EventTableDirectiveController,
      controllerAs: eventTblDirCtrl,
      bindToController: true,
      transclude: true*/
/*      link: function(scope, element, attrs, ctrl) {
        console.log('scope:', scope);
        console.log('element:', element);
        console.log('attrs:', attrs);
        console.log('ctrl:', ctrl);
        console.log('element.find:', element.find('td.ng-repeat'));
        var html = "<a ui-sref='event'>{{value}}</a>";
        var e = $compile(html)(scope);
        //if (event.name == "eventOid") {
        console.log('new elem:', e);
        element.replaceWith(e);
        //}
      }*/
    };
    return ddo;
  }
  
/*  function EventTableDirectiveController() {
    var eventTblDirCtrl = this;
    
    eventTblDirCtrl.isLink = function (data) {
      if (data == 'eventOid') {
        return true;
      }
      return false;
    };
  }*/
})();