(function () {
  'use strict';

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
  
  HomeController.$inject = ['apiService', 'commService'];
  function HomeController(apiService, commService) {
    var homeCtrl = this;
    var service = apiService;
    var comm = commService;
      
    homeCtrl.allEvents = [];
    homeCtrl.subEvents = [];
    homeCtrl.headers = [];
    homeCtrl.statesCount = {};
    homeCtrl.urgencyCount = {};
    
    homeCtrl.getEvents = function () {
      //console.log('current all:', homeCtrl.allEvents);
      return homeCtrl.subEvents;
    };

    homeCtrl.getState1Names = function () {
      return comm.getState1Options();
    };
    
    homeCtrl.getState2Names = function () {
      return comm.getState2Options();
    };
    
    homeCtrl.getUrgentNames = function () {
      return comm.getUrgentOptions();
    };

    homeCtrl.getEventsByUrgency = function (urgency) {
      var events = homeCtrl.allEvents;
      
      homeCtrl.subEvents = events.filter(function (value) {
        return value.urgencyId === urgency;
      });
    };
    
    homeCtrl.getEventsByState1 = function (state1) {
      var events = homeCtrl.allEvents;
      
      homeCtrl.subEvents = events.filter(function (value) {
        return value.state1 === state1;
      });
    };
   
    homeCtrl.getEventsByState2 = function (state2) {
      var events = homeCtrl.allEvents;
      
      homeCtrl.subEvents = events.filter(function (value) {
        return value.state2 === state2;
      });
    };
    
    function updateCounts() {
      homeCtrl.urgentCounts = {};
      homeCtrl.stateCounts = {};
      angular.forEach(homeCtrl.allEvents, function (value, key) {
        // update urgency
        if (homeCtrl.urgentCounts[value.urgencyId]) {
          homeCtrl.urgentCounts[value.urgencyId] += 1;
        } else {
          homeCtrl.urgentCounts[value.urgencyId] = 1;
        }
        // update state1
        if (homeCtrl.stateCounts[value.state1]) {
          homeCtrl.stateCounts[value.state1] += 1;
        } else {
          homeCtrl.stateCounts[value.state1] = 1;
        }
        
        // update state2
        if (homeCtrl.stateCounts[value.state2]) {
          homeCtrl.stateCounts[value.state2] += 1;
        } else {
          homeCtrl.stateCounts[value.state2] = 1;
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


