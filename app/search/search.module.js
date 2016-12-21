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
      state: "all",
      urgent: "all",
      hoursAgo: 24,
      startDate: new Date,
      endDate: new Date,
      eventId: "all"
    };
    
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
    
    var urgentOptions = {
      planned: "Planned",
      unplanned: "Unplanned",
      emergency: "Emergency",
      routingOpt: "Routing Optimization",
    };
    
    searchCtrl.res = {};
    
    searchCtrl.getStateOptions = function () {
      //console.log("get state:", searchCtrl.searchData);
      return Object.keys(states);
    }

    searchCtrl.getUrgentOptions = function () {
      //console.log("get urgent: ", searchCtrl.searchData);
      return Object.keys(urgentOptions);
    }
    
    searchCtrl.getResult = function() {
      return searchCtrl.res;
    }
    
    searchCtrl.getEvents = function () {
      var rules = {};
      rules.state = (searchCtrl.searchData.state != 'all')?states[searchCtrl.searchData.state] : 'all';
      rules.urgent = (searchCtrl.searchData.urgent != 'all')?  urgentOptions[searchCtrl.searchData.urgent] : 'all';
      console.log("rules:", rules);
      service.searchEvents(rules)
        .then(function (res) {
          console.log('search controller get data:', res);
          searchCtrl.res = res.events;
        searchCtrl
          return searchCtrl.res;
        })
        .catch(function (message) {
          console.log("search response error:", message);
          return [];
        });
    };
    // to be done
  }
  
})();
