(function () {
    'use strict';

    var module = angular.module('fleetmanager');

    module.factory('InfringementService', ['$log', '$http', '$q', 'APIService', 'Response',
        function ($log, $http, $q, APIService, Response) {

            var InfringementService = {};

            InfringementService.save = function (infringement) {
                var deffered = $q.defer();
                APIService.infringement.save(infringement)
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


            InfringementService.getInfringements = function (car) {
                var deffered = $q.defer();
                APIService.infringement.getInfringements(car)
                    .success(function (response) {
                        Response.infringementList = response;
                        deffered.resolve();
                    })
                    .error(function (err) {
                        deffered.reject();
                        $log.error(err);
                    });
                return deffered.promise;
            };


            InfringementService.getInfringementsInactives = function (car) {
                var deffered = $q.defer();
                APIService.infringement.getInfringementsInactives(car)
                    .success(function (response) {
                        Response.infringementList = response;
                        deffered.resolve();
                    })
                    .error(function (err) {
                        deffered.reject();
                        $log.error(err);
                    });
                return deffered.promise;
            };

            InfringementService.getOne = function (id) {
                var deffered = $q.defer();
                APIService.infringement.getOne(id)
                  .success(function (response) {
                    Response.infringement = response;
                    deffered.resolve();
                  })
                  .error(function (err) {
                    deffered.reject();
                    $log.error(err);
                  });
                return deffered.promise;
            };

            InfringementService.activate = function (infringements) {
                var deffered = $q.defer();
                APIService.infringement.activate(infringements)
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

            InfringementService.deactivate = function (infringements) {
                var deffered = $q.defer();
                APIService.infringement.deactivate(infringements)
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

            return InfringementService;

        }]);
})();

