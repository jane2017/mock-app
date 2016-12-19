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
    
    searchCtrl.searchData = {};
    
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
    
    searchCtrl.getStateOptions = function () {
      return Object.keys(states);
    }

    searchCtrl.getUrgentOptions = function () {
      return Object.keys(urgentOptions);
    }
    
    // to be done
  }
  
})();
