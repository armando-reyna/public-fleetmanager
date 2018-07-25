(function () {
    'use strict';

    var module = angular.module('fleetmanager');

    module.factory('VerificationService', ['$log', '$http', '$q', 'APIService', 'Response',
        function ($log, $http, $q, APIService, Response) {

            var VerificationService = {};

            VerificationService.save = function (verification) {
                var deffered = $q.defer();
                APIService.verification.save(verification)
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


            VerificationService.getVerifications = function (car) {
                var deffered = $q.defer();
                APIService.verification.getVerifications(car)
                    .success(function (response) {
                        Response.verificationList = response;
                        deffered.resolve();
                    })
                    .error(function (err) {
                        deffered.reject();
                        $log.error(err);
                    });
                return deffered.promise;
            };

          VerificationService.getVerificationsInactives = function (car) {
                var deffered = $q.defer();
                APIService.verification.getVerificationsInactives(car)
                    .success(function (response) {
                        Response.verificationList = response;
                        deffered.resolve();
                    })
                    .error(function (err) {
                        deffered.reject();
                        $log.error(err);
                    });
                return deffered.promise;
            };

            VerificationService.getVerificationHologram = function () {
                var deffered = $q.defer();
                APIService.verification.getVerificationHologram()
                    .success(function (response) {
                        Response.verificationHologram = response;
                        deffered.resolve();
                    })
                    .error(function (err) {
                        deffered.reject();
                        $log.error(err);
                    });
                return deffered.promise;
            };

            VerificationService.getVerificationPeriod = function () {
                var deffered = $q.defer();
                APIService.verification.getVerificationPeriod()
                  .success(function (response) {
                    Response.verificationPeriod = response;
                    deffered.resolve();
                  })
                  .error(function (err) {
                    deffered.reject();
                    $log.error(err);
                  });
                return deffered.promise;
            };

            VerificationService.getOne = function (id) {
                var deffered = $q.defer();
                APIService.verification.getOne(id)
                  .success(function (response) {
                    Response.verification = response;
                    deffered.resolve();
                  })
                  .error(function (err) {
                    deffered.reject();
                    $log.error(err);
                  });
                return deffered.promise;
            };

            VerificationService.activate = function (verifications) {
                var deffered = $q.defer();
                APIService.verification.activate(verifications)
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

            VerificationService.deactivate = function (verifications) {
                var deffered = $q.defer();
                APIService.verification.deactivate(verifications)
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

            return VerificationService;

        }]);
})();

