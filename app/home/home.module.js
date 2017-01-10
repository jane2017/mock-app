(function () {
  'use strict';
  
/*  var STATES = {
    BeginOrStarted: ['Begin', 'Started'],
    pending: ['Pending Notification',
              'Pending Update',
              'Pending Cancellation',
              'Pending Reschedule',
              'Pending Resolution'],
    Notified: ['Notified'],
    Cancelled: ['Cancelled'],
    Rescheduled: ['Rescheduled'],
    Resolved: ['Resolved']
  };*/

  // Define the `mets.home` module
  angular.module('mets.home', ['mets.common'])
    .config(HomeConfig)
    .controller('homeController', HomeController);

  HomeConfig.inject = ['$stateProvider'];
  function HomeConfig($stateProvider) {
    $stateProvider.state('home', {
      url: '/home',
      templateUrl: 'home/home.tpl.html',
      controller: 'homeController',
      controllerAs: 'homeCtrl',
      // resolve: {},
      data: {
        pageTitle: 'Home page'
      }
    });
  }
  
  HomeController.$inject = ['apiService'];
  function HomeController(apiService) {
    var homeCtrl = this;
    var service = apiService;
    
    // TO DO: get state names from DB
    var stateNames = [
      "BeginOrStarted",
      "pending",
      "Notified",
      "Cancelled",
      "Rescheduled",
      "Resolved"
    ];
    
     // TO DO: get urgent names from DB
    var urgentNames = [
      "Planned",
      "Unplanned",
      "Emergency",
      "Routing Optimization"
    ];
    
    var states = {
      BeginOrStarted: ['Begin', 'Started'],
      pending: ['Pending Notification',
                'Pending Update',
                'Pending Cancellation',
                'Pending Reschedule',
                'Pending Resolution'],
      Notified: ['Notified'],
      Cancelled: ['Cancelled'],
      Rescheduled: ['Rescheduled'],
      Resolved: ['Resolved']
    };
    
    
    homeCtrl.allEvents = [];
    homeCtrl.headers = [];
    
    //homeCtrl.searchResult = [];
    //homeCtrl.searchHeaders = [];
    
    homeCtrl.getAll = function () {
      //console.log('current all:', homeCtrl.allEvents);
      return homeCtrl.allEvents;
    };

    homeCtrl.getStateNames = function () {
      return stateNames;
    };
    
    homeCtrl.getUrgentNames = function () {
      return urgentNames;
    };
    

    homeCtrl.getEventsByUrgency = function (urgency) {
      // TODO: get from backend or from local?
/*      var data = {
        urgent: urgency,
        state: "all"
      };
      
      service.searchEvents(data)
        .then(function (res) {
          console.log('home controller get search by urgency:', res);
          homeCtrl.searchResult = res.events;
          homeCtrl.searchHeaders = Object.keys(homeCtrl.searchResult[0]);
        })
        .catch(function (message) {
          console.log("home searchEvents response error:", message);
        });*/
      var events = homeCtrl.allEvents;
      var len = 0;
      
      len = events.filter(function (value) {
        return value.urgencyId === urgency;
      }).length;
      
      return len;
    };
    
    homeCtrl.getEventsByState = function (state) {
      // TODO: get from backend or from local?
      var events = homeCtrl.allEvents;
      var len = 0;
      
      var substates = states[state];
      len = events.filter(function(value){
        return substates.indexOf(value.stateId) > -1;
      }).length;
      
      return len;
      
    };
    
    homeCtrl.events = function () {
      service.getEvents()
        .then(function (res) {
          console.log('controller get data:', res);
          homeCtrl.allEvents = res.events;
          homeCtrl.headers = Object.keys(homeCtrl.allEvents[0]);
          console.log('headers:', homeCtrl.headers);
          //return homeCtrl.allEvents.events;
        })
        .catch(function (message) {
          console.log("error:", message);
          //return [];
        });
    };

    // TODO: need a trig to get all/full screen of events
    homeCtrl.events();
  }
  
})();


