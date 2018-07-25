(function () {
  'use strict';

  var module = angular.module('fleetmanager');

  module.factory('TechnicianService', ['$log', '$http', '$q', 'APIService', 'Response',
    function ($log, $http, $q, APIService, Response) {

      var TechnicianService = {};

      TechnicianService.save = function (technician) {
        var deffered = $q.defer();
        APIService.technician.save(technician)
          .success(function (response) {
            Response.saved = response;
            deffered.resolve();
          })
          .error(function (err) {
            alert(err.toSource());
            deffered.reject();
            $log.error(err);
          });
        return deffered.promise;
      };


      TechnicianService.getTechnicians = function (inactive) {
        var deffered = $q.defer();
        APIService.technician.getTechnicians(inactive)
          .success(function (response) {
            Response.technicianList = response;
            deffered.resolve();
          })
          .error(function (err) {
            deffered.reject();
            $log.error(err);
          });
        return deffered.promise;
      };

      TechnicianService.activate = function (technicians) {
        var deffered = $q.defer();
        APIService.technician.activate(technicians)
          .success(function (response) {
            Response.activated = response;
            deffered.resolve();
          })
          .error(function (err) {
            deffered.reject();
            $log.error(err);
          });
        return deffered.promise;
      };

      TechnicianService.deactivate = function (technicians) {
        var deffered = $q.defer();
        APIService.technician.deactivate(technicians)
          .success(function (response) {
            Response.deactivated = response;
            deffered.resolve();
          })
          .error(function (err) {
            deffered.reject();
            $log.error(err);
          });
        return deffered.promise;
      };

      return TechnicianService;

    }]);
})();
