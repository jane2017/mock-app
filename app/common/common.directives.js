(function () {
  "use strict";

  angular.module('mets.common')
    .directive('eventTable', EventTableDirective)
    .directive('eventEditOption', EventEditOptionDirective);
   /* .directive('eventEditInput', EventEditInputDirective);*/
  
  function EventEditOptionDirective() {
    var ddo = {
      templateUrl: 'common/event-options.tpl.html',
      scope: {
        options: '&',
        bindValue: '=',
//        defaultValue: '<',
        label: '@'
      }
    };
    return ddo;
  }
  
/*  function EventEditInputDirective() {
    var ddo = {
      templateUrl: 'common/event-inputs.tpl.html',
      scope: {
        bindValue: '=',
//        defaultValue: '<',
        label: '@',
        dateFormat: '@',
        isTime: '<'
      }
    };
    return ddo;
  }*/
  
  EventTableDirective.inject = ['$compile'];
  function EventTableDirective($compile) {
    var ddo = {
      templateUrl: 'common/event-table.tpl.html',
      scope: {
        events: '<',
        headers: '<'
      }
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