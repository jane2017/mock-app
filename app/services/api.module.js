(function () {
  "use strict";

  angular.module('mets.services.api', [])
    .factory('apiService', ApiService);

  ApiService.$inject = ['$http', '$q', 'ApiPath'];
  function ApiService($http, $q, ApiPath) {
    var events = [],
      service = {};
    var url = 'http://localhost:3000/api/';
    
    function getRequest(path, indata) {
      var deferred = $q.defer();
      var data = (indata)? indata:'';
      
      var conf = {
        url: url + path,
        method: "GET",
        params: data
      };
      
      console.log('requesting:', conf);

      $http(conf)
        .success(function (data, status, header, config) {
          deferred.resolve(data);
        }).error(function (data, status, header, config) {
          console.log('request failed:' + path);
          console.log(data);
          deferred.reject({
            message: 'FAIL HTTP:' + status
          });
        });
      return deferred.promise;
    }

    service.getEvents = function () {
      return getRequest('events');
    };

    service.getEvent = function (id) {
      var path = 'event/' + id;
      return getRequest(path);
    };
    
    service.searchEvents = function (data) {
      return getRequest('search', data);
    };
    
    service.updateEvent = function (data) {
      return getRequest('update', data);
    };
    return service;
  }
})();

