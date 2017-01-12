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
    homeCtrl.subEvents = [];
    homeCtrl.headers = [];
    homeCtrl.statesCount = {};
    homeCtrl.urgencyCount = {};
    
    //homeCtrl.searchResult = [];
    //homeCtrl.searchHeaders = [];
    
    homeCtrl.getEvents = function () {
      //console.log('current all:', homeCtrl.allEvents);
      return homeCtrl.subEvents;
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
      
      homeCtrl.subEvents = events.filter(function (value) {
        return value.urgencyId === urgency;
      });
      
      //console.log("urgency subevents:", urgency, homeCtrl.subEvents);
    };
    
    homeCtrl.getEventsByState = function (state) {
      // TODO: get from backend or from local?
      var events = homeCtrl.allEvents;
      
      var substates = states[state];
      homeCtrl.subEvents = events.filter(function(value){
        return substates.indexOf(value.stateId) > -1;
      });
      //console.log("state subevents:", state, homeCtrl.subEvents);
    };
   
    homeCtrl.getStateCategory = function (state) {
      var cat = "none";
      
      angular.forEach(states, function(value, key) {
        if (value.indexOf(state) > -1) {
          cat = key;
        }
      });
      return cat;
    }
    
    function updateCounts() {
      homeCtrl.urgentCounts = {};
      homeCtrl.stateCounts = {};
      angular.forEach(homeCtrl.allEvents, function (value, key) {
        //console.log("each event:", key, value);
        // update urgency
        if (homeCtrl.urgentCounts[value.urgencyId]) {
          homeCtrl.urgentCounts[value.urgencyId] += 1;
        }
        else {
          homeCtrl.urgentCounts[value.urgencyId] = 1;
        }
        // update state
        var cat = homeCtrl.getStateCategory(value.stateId);
        if (cat != "none" && homeCtrl.stateCounts[cat]) {
          //console.log("add state:", cat, value.stateId)
          homeCtrl.stateCounts[cat] += 1;
        }
        else if (cat != "none") {
          //console.log("first state:", cat, value.stateId)
          homeCtrl.stateCounts[cat] = 1;
        }
        else {
          console.log("non exist state:", value.stateId)
        }
      });
    }
    
    homeCtrl.events = function () {
      service.getEvents()
        .then(function (res) {
          //console.log('controller get data:', res);
          homeCtrl.allEvents = res.events;
          homeCtrl.subEvents = res.events;
          homeCtrl.headers = Object.keys(homeCtrl.allEvents[0]);
          updateCounts();
        })
        .catch(function (message) {
          console.log("error:", message);
        });
    };

    // TODO: need a trig to get all/full screen of events
    homeCtrl.events();
  }
  
})();


