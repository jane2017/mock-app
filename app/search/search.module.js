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
    
    // to be done
  }
  
})();
