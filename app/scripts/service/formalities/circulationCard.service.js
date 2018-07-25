(function () {
    'use strict';

    var module = angular.module('fleetmanager');

    module.factory('CirculationCardService', ['$log', '$http', '$q', 'APIService', 'Response',
        function ($log, $http, $q, APIService, Response) {

            var CirculationCardService = {};

            CirculationCardService.save = function (circulationCard) {
                var deffered = $q.defer();
                APIService.circulationCard.save(circulationCard)
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


            CirculationCardService.getCirculationCards = function (car) {
                var deffered = $q.defer();
                APIService.circulationCard.getCirculationCards(car)
                    .success(function (response) {
                        Response.circulationCardList = response;
                        deffered.resolve();
                    })
                    .error(function (err) {
                        deffered.reject();
                        $log.error(err);
                    });
                return deffered.promise;
            };


            CirculationCardService.getCirculationCardsInactives = function (car) {
                var deffered = $q.defer();
                APIService.circulationCard.getCirculationCardsInactives(car)
                    .success(function (response) {
                        Response.circulationCardList = response;
                        deffered.resolve();
                    })
                    .error(function (err) {
                        deffered.reject();
                        $log.error(err);
                    });
                return deffered.promise;
            };

            CirculationCardService.getOne = function (id) {
                var deffered = $q.defer();
                APIService.circulationCard.getOne(id)
                  .success(function (response) {
                    Response.circulationCard = response;
                    deffered.resolve();
                  })
                  .error(function (err) {
                    deffered.reject();
                    $log.error(err);
                  });
                return deffered.promise;
            };

            CirculationCardService.activate = function (circulationCards) {
                var deffered = $q.defer();
                APIService.circulationCard.activate(circulationCards)
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

            CirculationCardService.deactivate = function (circulationCards) {
                var deffered = $q.defer();
                APIService.circulationCard.deactivate(circulationCards)
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

            return CirculationCardService;

        }]);
})();

