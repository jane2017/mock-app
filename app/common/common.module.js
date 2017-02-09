(function () {
  "use strict";

  angular.module('mets.common', [])
    .constant('ApiPath', 'https://xxx.com')
    .service('commService', CommService);
  
  function CommService() {
    var commServ = this;
   
    // TO DO: get state names from DB
    var state2Options = [
      'all',
      'pending-editing',
      'pending-for-approval',
      'pending-approved',
      'pending-disapproved',
      'pending-notified',
      'started-notified',
      'started-updated',
      'cancelled-notified',
      'rescheduled-notified',
      'rescheduled-timeup',
      'resolved-notified'
    ];

    var state1Options = [
      'all',
      'pending',
      'started',
      'cancelled',
      'rescheduled',
      'resolved'
    ];

    var urgentOptions = [
      "all",
      "planned",
      "unplanned",
      "emergency",
      "routing-optimization"
    ];
  
    commServ.getState1Options = function () {
      //console.log("called CommService get state1.");
      return state1Options;
    };

    commServ.getState2Options = function () {
      //console.log("called CommService get state2.");
      return state2Options;
    };

    commServ.getUrgentOptions = function () {
      //console.log("called CommService get urgent.");
      return urgentOptions;
    };   
 } 
  
/*    .config('commonConfig', CommonConfig);

  CommonConfig.$inject = ['$httpProvider'];
  function CommonConfig($httpProvider) {
    //$httpProvider.interceptors.push('');
  }*/
})();

