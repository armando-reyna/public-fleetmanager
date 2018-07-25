(function () {
    'use strict';

    var module = angular.module('fleetmanager');

    module.factory('TenureService', ['$log', '$http', '$q', 'APIService', 'Response',
        function ($log, $http, $q, APIService, Response) {

            var TenureService = {};

            TenureService.save = function (tenure) {
                var deffered = $q.defer();
                APIService.tenure.save(tenure)
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


            TenureService.getTenures = function (car) {
                var deffered = $q.defer();
                APIService.tenure.getTenures(car)
                    .success(function (response) {
                        Response.tenureList = response;
                        deffered.resolve();
                    })
                    .error(function (err) {
                        deffered.reject();
                        $log.error(err);
                    });
                return deffered.promise;
            };


            TenureService.getTenuresInactives = function (car) {
                var deffered = $q.defer();
                APIService.tenure.getTenuresInactives(car)
                    .success(function (response) {
                        Response.tenureList = response;
                        deffered.resolve();
                    })
                    .error(function (err) {
                        deffered.reject();
                        $log.error(err);
                    });
                return deffered.promise;
            };

            TenureService.getOne = function (id) {
                var deffered = $q.defer();
                APIService.tenure.getOne(id)
                  .success(function (response) {
                    Response.tenure = response;
                    deffered.resolve();
                  })
                  .error(function (err) {
                    deffered.reject();
                    $log.error(err);
                  });
                return deffered.promise;
            };

            TenureService.activate = function (tenures) {
                var deffered = $q.defer();
                APIService.tenure.activate(tenures)
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

            TenureService.deactivate = function (tenures) {
                var deffered = $q.defer();
                APIService.tenure.deactivate(tenures)
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

            return TenureService;

        }]);
})();

