(function () {
  'use strict';

  var module = angular.module('fleetmanager');

  module.factory('ChargePikeCardService', ['$log', '$http', '$q', 'APIService', 'Response',
    function ($log, $http, $q, APIService, Response) {

      var ChargePikeCardService = {};

      ChargePikeCardService.save = function (chargePikeCard) {
        var deffered = $q.defer();
        APIService.chargePikeCard.save(chargePikeCard)
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


      ChargePikeCardService.getAllChargePikeCardByVehicleAndActive = function (vehicleId) {
        var deffered = $q.defer();
        APIService.chargePikeCard.getAllChargePikeCardByVehicleAndActive(vehicleId)
          .success(function (response) {
            Response.chargePikeCardList = response;
            deffered.resolve();
          })
          .error(function (err) {
            deffered.reject();
            $log.error(err);
          });
        return deffered.promise;
      };


      ChargePikeCardService.getAllChargePikeCardByVehicleAndInactive = function (vehicleId) {
        var deffered = $q.defer();
        APIService.chargePikeCard.getAllChargePikeCardByVehicleAndInactive(vehicleId)
          .success(function (response) {
            Response.chargePikeCardList = response;
            deffered.resolve();
          })
          .error(function (err) {
            deffered.reject();
            $log.error(err);
          });
        return deffered.promise;
      };


      ChargePikeCardService.getOne = function (id) {
        var deffered = $q.defer();
        APIService.chargePikeCard.getOne(id)
          .success(function (response) {
            Response.chargePikeCard = response;
            deffered.resolve();
          })
          .error(function (err) {
            deffered.reject();
            $log.error(err);
          });
        return deffered.promise;
      };

      ChargePikeCardService.activate = function (chargePikeCards) {
        var deffered = $q.defer();
        APIService.chargePikeCard.activate(chargePikeCards)
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

      ChargePikeCardService.deactivate = function (chargePikeCards) {
        var deffered = $q.defer();
        APIService.chargePikeCard.deactivate(chargePikeCards)
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

      ChargePikeCardService.getWayPay = function () {
        var deffered = $q.defer();
        APIService.chargePikeCard.getWayPay()
          .success(function (response) {
            Response.wayPayList = response;
            deffered.resolve();
          })
          .error(function (err) {
            deffered.reject();
            $log.error(err);
          });
        return deffered.promise;
      };

      return ChargePikeCardService;

    }]);
})();

