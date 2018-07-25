(function () {
  'use strict';

  var module = angular.module('fleetmanager');

  module.factory('ChargeGasCardService', ['$log', '$http', '$q', 'APIService', 'Response',
    function ($log, $http, $q, APIService, Response) {

      var ChargeGasCardService = {};

      ChargeGasCardService.save = function (chargeGasCard) {
        var deffered = $q.defer();
        APIService.chargeGasCard.save(chargeGasCard)
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


      ChargeGasCardService.getChargeGasCardByVehicleAndGasCard = function (vehicleId) {
        var deffered = $q.defer();
        APIService.chargeGasCard.getChargeGasCardByVehicleAndGasCard(vehicleId)
          .success(function (response) {
            Response.chargeGasCardList = response;
            deffered.resolve();
          })
          .error(function (err) {
            deffered.reject();
            $log.error(err);
          });
        return deffered.promise;
      };

      ChargeGasCardService.getAllChargeGasCardByVehicle = function (vehicleId) {
        var deffered = $q.defer();
        APIService.chargeGasCard.getAllChargeGasCardByVehicle(vehicleId)
          .success(function (response) {
            Response.chargeGasCardList = response;
            deffered.resolve();
          })
          .error(function (err) {
            deffered.reject();
            $log.error(err);
          });
        return deffered.promise;
      };


      ChargeGasCardService.getOne = function (id) {
        var deffered = $q.defer();
        APIService.chargeGasCard.getOne(id)
          .success(function (response) {
            Response.chargeGasCard = response;
            deffered.resolve();
          })
          .error(function (err) {
            deffered.reject();
            $log.error(err);
          });
        return deffered.promise;
      };

      ChargeGasCardService.activate = function (chargeGasCards) {
        var deffered = $q.defer();
        APIService.chargeGasCard.activate(chargeGasCards)
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

      ChargeGasCardService.deactivate = function (chargeGasCards) {
        var deffered = $q.defer();
        APIService.chargeGasCard.deactivate(chargeGasCards)
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

      ChargeGasCardService.getWayPay = function () {
        var deffered = $q.defer();
        APIService.chargeGasCard.getWayPay()
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

      return ChargeGasCardService;

    }]);
})();

