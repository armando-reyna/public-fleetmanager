(function () {
    'use strict';

    var module = angular.module('fleetmanager');

    module.factory('StorageService', ['$log', '$http', '$q', 'APIService', 'Response',
        function ($log, $http, $q, APIService, Response) {

            var StorageService = {};

            StorageService.upload = function (uploadDTO, personId) {
                var deffered = $q.defer();
                APIService.storage.upload(uploadDTO, personId)
                    .success(function (response) {
                        Response.response = response;
                        deffered.resolve();
                    })
                    .error(function (err) {
                        deffered.reject();
                        $log.error(err);
                    });
                return deffered.promise;
            };

            StorageService.get = function (personId) {
                var deffered = $q.defer();
                APIService.storage.get(personId)
                    .success(function (response) {
                        Response.response = response;
                        deffered.resolve();
                    })
                    .error(function (err) {
                        deffered.reject();
                        $log.error(err);
                    });
                return deffered.promise;
            };

            StorageService.remove = function (fileDto) {
                var deffered = $q.defer();
                APIService.storage.remove(fileDto)
                    .success(function (response) {
                        Response.response = response;
                        deffered.resolve();
                    })
                    .error(function (err) {
                        deffered.reject();
                        $log.error(err);
                    });
                return deffered.promise;
            };

            StorageService.getBanners = function () {
                var deffered = $q.defer();
                APIService.storage.getBanners()
                    .success(function (response) {
                        Response.banners = response.data;
                        deffered.resolve();
                    })
                    .error(function (err) {
                        deffered.reject();
                        $log.error(err);
                    });
                return deffered.promise;
            };

            return StorageService;

        }]);
})();
