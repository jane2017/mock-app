'use strict';

// Define the `mets` module
angular.module('mets', [
  'ngAnimate',
  'ui.router',
  'mets.common',
  'mets.services.api',
  'mets.home',
  'mets.event',
  'mets.search',
  'mets.admin'
])
.config(function metsConfig($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/home');
})
.run(['$rootScope', '$state', '$stateParams', function run($rootScope, $state, $stateParams) {
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;
  $rootScope.currentYear = new Date().getFullYear();
}])
.controller('metsCtrl', function MetsCtrl($scope, $location) {
  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
      console.log('state changes from', fromState);
      console.log('to', toState);
      if (angular.isDefined(toState.data.pageTitle)) {
          $scope.pageTitle = toState.data.pageTitle;
          $scope.simpleTitle = toState.data.simpleTitle;
      }
  });
});

