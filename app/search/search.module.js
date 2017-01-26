(function () {
  'use strict';

  // Define the `mets.home` module
  angular.module('mets.search', ['mets.common'])
    .config(SearchConfig)
    .controller('searchController', SearchController);

  SearchConfig.inject = ['$stateProvider'];
  function SearchConfig($stateProvider) {
    $stateProvider.state('search', {
      url: '/search',
      templateUrl: 'search/search.tpl.html',
      controller: 'searchController',
      controllerAs: 'searchCtrl',
      // resolve: {},
      data: {
        pageTitle: 'Search page'
      }
    });
  }
  
  SearchController.$inject = ['apiService'];
  function SearchController(apiService) {
    var searchCtrl = this;
    var service = apiService;
    
    searchCtrl.searchData = {
      state: [],
      urgent: [],
      hoursAgo: 24,
      startDate: "",
      endDate: "",
      eventId: "all"
    };
    
    var stateOptions = [
      'all',
      'Begin',
      "Started",
      'Pending Notification',
      'Pending Update',
      'Pending Cancellation',
      'Pending Reschedule',
      'Pending Resolution',
      'pending',
      'Notified',
      'Cancelled',
      'Rescheduled',
      'Resolved'
    ];
    
    var urgentOptions = [
      "all",
      "Planned",
      "Unplanned",
      "Emergency",
      "Routing Optimization"
    ];
    
    searchCtrl.res = {};
    searchCtrl.headers = [];
    
    searchCtrl.getStateOptions = function () {
      console.log("called get state:");
      return stateOptions;
    };

    searchCtrl.getUrgentOptions = function () {
      console.log("called get urgent: ");
      return urgentOptions; //Object.keys(urgentOptions);
    };
    
    searchCtrl.getResult = function () {
      return searchCtrl.res;
    };
    
    searchCtrl.getHeaders = function () {
      return searchCtrl.headers;
    };
    
    searchCtrl.getEvents = function () {
      var rules = {};
      rules.state = searchCtrl.searchData.state;
      rules.urgent = searchCtrl.searchData.urgent;
      //console.log("rules:", rules);
      service.searchEvents(rules)
        .then(function (res) {
          console.log('search controller get data:', res);
          searchCtrl.res = res.events;
          searchCtrl.headers = Object.keys(searchCtrl.res[0]);
          //return searchCtrl.res;
        })
        .catch(function (message) {
          console.log("search response error:", message);
          //return [];
        });
    };
    

  }
  
})();
