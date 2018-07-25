(function () {
    'use strict';

    var module = angular.module('fleetmanager');

    module.factory('InsuranceService', ['$log', '$http', '$q', 'APIService', 'Response',
        function ($log, $http, $q, APIService, Response) {

            var InsuranceService = {};

            InsuranceService.save = function (insurance) {
                var deffered = $q.defer();
                APIService.insurance.save(insurance)
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


            InsuranceService.getInsurances = function (car) {
                var deffered = $q.defer();
                APIService.insurance.getInsurances(car)
                    .success(function (response) {
                        Response.insuranceList = response;
                        deffered.resolve();
                    })
                    .error(function (err) {
                        deffered.reject();
                        $log.error(err);
                    });
                return deffered.promise;
            };


            InsuranceService.getInsurancesInactives = function (car) {
                var deffered = $q.defer();
                APIService.insurance.getInsurancesInactives(car)
                    .success(function (response) {
                        Response.insuranceList = response;
                        deffered.resolve();
                    })
                    .error(function (err) {
                        deffered.reject();
                        $log.error(err);
                    });
                return deffered.promise;
            };

            InsuranceService.getOne = function (id) {
                var deffered = $q.defer();
                APIService.insurance.getOne(id)
                  .success(function (response) {
                    Response.insurance = response;
                    deffered.resolve();
                  })
                  .error(function (err) {
                    deffered.reject();
                    $log.error(err);
                  });
                return deffered.promise;
            };
            
            InsuranceService.activate = function (insurances) {
                var deffered = $q.defer();
                APIService.insurance.activate(insurances)
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

            InsuranceService.deactivate = function (insurances) {
                var deffered = $q.defer();
                APIService.insurance.deactivate(insurances)
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

            return InsuranceService;

        }]);
})();

