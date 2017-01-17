(function() {
  'use strict';

  // Define the `phonecatApp` module
  angular.module('mets.event', ['ui.router', 'mets.common'])
    .config(EventConfig)
    .controller('EventController', EventController);
  
  EventConfig.inject = ['$stateProvider'];
  function EventConfig($stateProvider) {
    $stateProvider.state('event', {
      url: '/event',
      templateUrl: 'event/event.tpl.html',
      controller: 'EventController',
      controllerAs: 'eventCtrl',
      params: {
        id: 0
      },
      // resolve: {},
      data: {
        pageTitle: 'Event page'
      }
    });
  }

  EventController.$inject = ['apiService', '$stateParams'];
  function EventController(apiService, $stateParams) {
    var eventCtrl = this;
    var service = apiService;
    
    //console.log('in EventController, $stateParams:', $stateParams);
    
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
    
    eventCtrl.event();
  }
})();
