(function () {
    'use strict';

    var module = angular.module('fleetmanager');

    module.factory('CleaningService', ['$log', '$http', '$q', 'APIService', 'Response',
        function ($log, $http, $q, APIService, Response) {

            var CleaningService = {};

            CleaningService.save = function (cleaning) {
                var deffered = $q.defer();
                APIService.cleaning.save(cleaning)
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


            CleaningService.getCleanings = function (car) {
                var deffered = $q.defer();
                APIService.cleaning.getCleanings(car)
                    .success(function (response) {
                        Response.cleaningList = response;
                        deffered.resolve();
                    })
                    .error(function (err) {
                        deffered.reject();
                        $log.error(err);
                    });
                return deffered.promise;
            };

            CleaningService.getCleaningsInactives = function (car) {
                var deffered = $q.defer();
                APIService.cleaning.getCleaningsInactives(car)
                    .success(function (response) {
                        Response.cleaningList = response;
                        deffered.resolve();
                    })
                    .error(function (err) {
                        deffered.reject();
                        $log.error(err);
                    });
                return deffered.promise;
            };

            CleaningService.getOne = function (id) {
                var deffered = $q.defer();
                APIService.cleaning.getOne(id)
                  .success(function (response) {
                    Response.cleaning = response;
                    deffered.resolve();
                  })
                  .error(function (err) {
                    deffered.reject();
                    $log.error(err);
                  });
                return deffered.promise;
            };

            CleaningService.activate = function (cleanings) {
                var deffered = $q.defer();
                APIService.cleaning.activate(cleanings)
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

            CleaningService.deactivate = function (cleanings) {
                var deffered = $q.defer();
                APIService.cleaning.deactivate(cleanings)
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

            return CleaningService;

        }]);
})();

