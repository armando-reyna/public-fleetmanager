(function () {
    'use strict';

    var module = angular.module('fleetmanager');

    module.factory('OtherService', ['$log', '$http', '$q', 'APIService', 'Response',
        function ($log, $http, $q, APIService, Response) {

            var OtherService = {};

            OtherService.save = function (other) {
                var deffered = $q.defer();
                APIService.other.save(other)
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


            OtherService.getOthers = function (car) {
                var deffered = $q.defer();
                APIService.other.getOthers(car)
                    .success(function (response) {
                        Response.otherList = response;
                        deffered.resolve();
                    })
                    .error(function (err) {
                        deffered.reject();
                        $log.error(err);
                    });
                return deffered.promise;
            };


            OtherService.getOthersInactives = function (car) {
                var deffered = $q.defer();
                APIService.other.getOthersInactives(car)
                    .success(function (response) {
                        Response.otherList = response;
                        deffered.resolve();
                    })
                    .error(function (err) {
                        deffered.reject();
                        $log.error(err);
                    });
                return deffered.promise;
            };

            OtherService.getOne = function (id) {
                var deffered = $q.defer();
                APIService.other.getOne(id)
                  .success(function (response) {
                    Response.other = response;
                    deffered.resolve();
                  })
                  .error(function (err) {
                    deffered.reject();
                    $log.error(err);
                  });
                return deffered.promise;
            };

            OtherService.activate = function (others) {
                var deffered = $q.defer();
                APIService.other.activate(others)
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

            OtherService.deactivate = function (others) {
                var deffered = $q.defer();
                APIService.other.deactivate(others)
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

            return OtherService;

        }]);
})();

