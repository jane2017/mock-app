(function() {
  'use strict';

  // Define the `phonecatApp` module
  angular.module('mets.event', ['ui.router', 'mets.common'])
    .config(EventConfig)
    .controller('EventController', EventController);
  
  EventConfig.inject = ['$stateProvider'];
  function EventConfig($stateProvider) {
    $stateProvider.state('event', {
      url: '/event/:id',
      templateUrl: 'event/event.tpl.html',
      controller: 'EventController',
      controllerAs: 'eventCtrl',
     /* params: {
        id: 0
      },*/
      data: {
        pageTitle: 'Event page'
      }
    });
  }

  EventController.$inject = ['apiService', '$stateParams', '$filter'];
  function EventController(apiService, $stateParams, $filter) {
    var eventCtrl = this;
    var service = apiService;
    
    //console.log('in EventController, $stateParams:', $stateParams);
         
    // TO DO: get urgent names from DB
    var urgentNames = [
      "Planned",
      "Unplanned",
      "Emergency",
      "Routing Optimization"
    ];
    
    // TO DO: get state names from DB
    var stateNames = [
      'Begin', 
      'Started',
      'Pending Notification',
      'Pending Update',
      'Pending Cancellation',
      'Pending Reschedule',
      'Pending Resolution',
      'Notified',
      'Cancelled',
      'Rescheduled',
      'Resolved'
    ];
    
    eventCtrl.getStateNames = function () {
      return stateNames;
    };
    
    eventCtrl.getUrgentNames = function () {
      return urgentNames;
    };
    
    eventCtrl.id = $stateParams.id;
    eventCtrl.newEvent = {};
    //console.log('in eventController, id:', eventCtrl.id);
    
    eventCtrl.isReadOnly = function (key, value) {
      var ronly = false;
      if (value !== '' ||
          key === 'stateId') {
        ronly = true;
      }
      return ronly;   
    };
    
    eventCtrl.event = function () {
      service.getEvent(eventCtrl.id)
        .then(function (res) {
          console.log('event controller get event:', res.event);
          eventCtrl.newEvent = res.event;
          return res.event;
        })
        .catch(function (message) {
          console.log("error:", message);
          return [];
        });
    };
    
    eventCtrl.saveEvent = function () {
      console.log("new/updated event:", eventCtrl.newEvent);
      var data = {};
      data.event = eventCtrl.newEvent;
      
      service.updateEvent(data)
        .then(function (res) {
          console.log('event controller update response:', res);
        })
        .catch(function (message) {
          console.log("error:", message);
        });
    };
    
    eventCtrl.opened = {};
    
    eventCtrl.openCal = function ($event, elementOpened) {
      console.log("event:", $event);
      console.log("elem:", elementOpened);
      $event.preventDefault();
      $event.stopPropagation();
      $scope.opened[elementOpened] = !$scope.opened[elementOpened];
    };
    
    eventCtrl.event();
  }
})();
