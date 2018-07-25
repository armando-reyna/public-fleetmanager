(function () {
  'use strict';

  angular
    .module('fleetmanager')
    .factory('ConfigService', ['$log', '$http', '$q', 'APIService', 'Response',
      function ($log, $http, $q, APIService, Response) {

        var ConfigService = {};

        ConfigService.getMenu = function (menu) {
          var deffered = $q.defer();
          APIService.config.getMenu(menu)
            .success(function (response) {
              Response.menu = response;
              deffered.resolve();
            })
            .error(function (err) {
              deffered.reject();
              $log.error(err);
            });
          return deffered.promise;
        };

        return ConfigService;

      }]);
})();
