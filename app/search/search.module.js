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
  
  SearchController.$inject = ['apiService', 'commService'];
  function SearchController(apiService, commService) {
    var searchCtrl = this;
    var service = apiService;
    var comm = commService;
    
    searchCtrl.searchData = {
      state1: [],
      state2: [],
      urgent: [],
      hoursAgo: 24,
      startDate: "",
      endDate: "",
      eventId: "all"
    };
    
    searchCtrl.res = {};
    searchCtrl.headers = [];
    
    searchCtrl.getState1Options = function () {
      return comm.getState1Options();
    };

    searchCtrl.getState2Options = function () {
      return comm.getState2Options();
    };
    
    searchCtrl.getUrgentOptions = function () {
      return comm.getUrgentOptions();
    };
    
    searchCtrl.getResult = function () {
      return searchCtrl.res;
    };
    
    searchCtrl.getHeaders = function () {
      return searchCtrl.headers;
    };
    
    searchCtrl.getEvents = function () {
      var rules = {};
      rules.state1 = searchCtrl.searchData.state1;
      rules.state2 = searchCtrl.searchData.state2;
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
