(function () {
    'use strict';

    var module = angular.module('fleetmanager');

    module.factory('TorageService', ['$log', '$http', '$q', 'APIService', 'Response',
        function ($log, $http, $q, APIService, Response) {

            var TorageService = {};

            TorageService.save = function (torage) {
                var deffered = $q.defer();
                APIService.torage.save(torage)
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


            TorageService.getTorages = function (car) {
                var deffered = $q.defer();
                APIService.torage.getTorages(car)
                    .success(function (response) {
                        Response.torageList = response;
                        deffered.resolve();
                    })
                    .error(function (err) {
                        deffered.reject();
                        $log.error(err);
                    });
                return deffered.promise;
            };


            TorageService.getToragesInactives = function (car) {
                var deffered = $q.defer();
                APIService.torage.getToragesInactives(car)
                    .success(function (response) {
                        Response.torageList = response;
                        deffered.resolve();
                    })
                    .error(function (err) {
                        deffered.reject();
                        $log.error(err);
                    });
                return deffered.promise;
            };

            TorageService.getOne = function (id) {
                var deffered = $q.defer();
                APIService.torage.getOne(id)
                    .success(function (response) {
                        Response.torage = response;
                        deffered.resolve();
                    })
                    .error(function (err) {
                        deffered.reject();
                        $log.error(err);
                    });
                return deffered.promise;
            };

            TorageService.activate = function (torages) {
                var deffered = $q.defer();
                APIService.torage.activate(torages)
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

            TorageService.deactivate = function (torages) {
                var deffered = $q.defer();
                APIService.torage.deactivate(torages)
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

            return TorageService;

        }]);
})();

