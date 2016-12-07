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
    
    homeCtrl.allEvents = [];
    
    homeCtrl.getAll = function () {
      //console.log('current all:', homeCtrl.allEvents);
      return homeCtrl.allEvents;
    };

    homeCtrl.events = function () {
      service.getEvents()
        .then(function (res) {
          console.log('controller get data:', res);
          homeCtrl.allEvents = res.events;
          return homeCtrl.allEvents.events;
        })
        .catch(function (message) {
          console.log("error:", message);
          return [];
        });
    };

    homeCtrl.events();
  }
  
})();


