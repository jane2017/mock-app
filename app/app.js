(function () {
  'use strict';

  // Define the `mets` module
  angular.module('mets', [
    'ngAnimate',
    'ui.router',
    'ui.bootstrap',
    'xeditable',
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
    .run(['$rootScope', '$state', '$stateParams', 'editableOptions', function run($rootScope, $state, $stateParams, editableOptions) {
      $rootScope.$state = $state;
      $rootScope.$stateParams = $stateParams;
      $rootScope.currentYear = new Date().getFullYear();
      editableOptions.theme = 'bs3';
    }])
    .controller('metsCtrl', function MetsCtrl($scope, $location) {
      $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
        console.log('state changes from', fromState);
        console.log('to', toState);
        if (angular.isDefined(toState.data.pageTitle)) {
          $scope.pageTitle = toState.data.pageTitle;
          $scope.simpleTitle = toState.data.simpleTitle;
        }
      });
    });
})();

