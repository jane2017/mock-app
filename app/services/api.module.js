(function () {
  "use strict";

  angular.module('mets.services.api', [])
    .factory('apiService', ApiService);

  ApiService.$inject = ['$http', '$q', 'ApiPath'];
  function ApiService($http, $q, ApiPath) {
    var events = [],
      service = {};
    var url = 'http://localhost:3000/api/';
    
    function getRequest(path, data) {
      var deferred = $q.defer();
      var req = {
        url: url + path,
        method: "GET",
        data: data
      };
      
      $http(req)
        .success(function (data, status, header, config) {
          console.log('service got data:', data);
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
      console.log('called getEvent, path:', path);
      return getRequest(path);
    };
    
    return service;
  }
})();

