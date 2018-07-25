(function () {
  'use strict';

  var module = angular.module('fleetmanager');

  module.factory('MonitoringService', ['$log', '$http', '$q', 'APIService', 'Response',
    function ($log, $http, $q, APIService, Response) {

      var MonitoringService = {};

      MonitoringService.save = function (monitoring) {
        var deffered = $q.defer();
        APIService.monitoring.save(monitoring)
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


      MonitoringService.getMonitorings = function (inactive) {
        var deffered = $q.defer();
        APIService.monitoring.getMonitorings(inactive)
          .success(function (response) {
            Response.monitoringList = response;
            deffered.resolve();
          })
          .error(function (err) {
            deffered.reject();
            $log.error(err);
          });
        return deffered.promise;
      };


      MonitoringService.getMonitoringByVehicle = function (vehicleId) {
        var deffered = $q.defer();
        APIService.monitoring.getMonitoringByVehicle(vehicleId)
          .success(function (response) {
            Response.monitoring = response;
            deffered.resolve();
          })
          .error(function (err) {
            deffered.reject();
            $log.error(err);
          });
        return deffered.promise;
      };



      MonitoringService.getOne = function (id) {
        var deffered = $q.defer();
        APIService.monitoring.getOne(id)
          .success(function (response) {
            Response.monitoring = response;
            deffered.resolve();
          })
          .error(function (err) {
            deffered.reject();
            $log.error(err);
          });
        return deffered.promise;
      };

      MonitoringService.activate = function (monitoring) {
        var deffered = $q.defer();
        APIService.monitoring.activate(monitoring)
          .success(function (response) {
            Response.saved = response;
            deffered.resolve();
          })
          .error(function (err) {
            deffered.reject();
            $log.error(err);
          });
        return deffered.promise;
      };

      MonitoringService.deactivate = function (monitorings) {
        var deffered = $q.defer();
        APIService.monitoring.deactivate(monitorings)
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

      return MonitoringService;

    }]);
})();

