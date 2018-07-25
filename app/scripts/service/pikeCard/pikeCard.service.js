(function () {
  'use strict';

  var module = angular.module('fleetmanager');

  module.factory('PikeCardService', ['$log', '$http', '$q', 'APIService', 'Response',
    function ($log, $http, $q, APIService, Response) {

      var PikeCardService = {};

      PikeCardService.save = function (pikeCard) {
        var deffered = $q.defer();
        APIService.pikeCard.save(pikeCard)
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


      PikeCardService.getPikeCards = function (inactive) {
        var deffered = $q.defer();
        APIService.pikeCard.getPikeCards(inactive)
          .success(function (response) {
            Response.pikeCardList = response;
            deffered.resolve();
          })
          .error(function (err) {
            deffered.reject();
            $log.error(err);
          });
        return deffered.promise;
      };


      PikeCardService.getPikeCardByVehicle = function (vehicleId) {
        var deffered = $q.defer();
        APIService.pikeCard.getPikeCardByVehicle(vehicleId)
          .success(function (response) {
            Response.pikeCard = response;
            deffered.resolve();
          })
          .error(function (err) {
            deffered.reject();
            $log.error(err);
          });
        return deffered.promise;
      };



      PikeCardService.getOne = function (id) {
        var deffered = $q.defer();
        APIService.pikeCard.getOne(id)
          .success(function (response) {
            Response.pikeCard = response;
            deffered.resolve();
          })
          .error(function (err) {
            deffered.reject();
            $log.error(err);
          });
        return deffered.promise;
      };

      PikeCardService.activate = function (pikeCards) {
        var deffered = $q.defer();
        APIService.pikeCard.activate(pikeCards)
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

      PikeCardService.deactivate = function (pikeCards) {
        var deffered = $q.defer();
        APIService.pikeCard.deactivate(pikeCards)
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

      PikeCardService.getAllPikeCardTypes = function () {
        var deffered = $q.defer();
        APIService.pikeCard.getAllPikeCardTypes()
          .success(function (response) {
            Response.pikeCardTypes = response;
            deffered.resolve();
          })
          .error(function (err) {
            deffered.reject();
            $log.error(err);
          });
        return deffered.promise;
      };

      PikeCardService.getIaveCards = function () {
        var deffered = $q.defer();
        APIService.pikeCard.getIaveCards()
          .success(function (response) {
            Response.iaveCardList = response;
            deffered.resolve();
          })
          .error(function (err) {
            deffered.reject();
            $log.error(err);
          });
        return deffered.promise;
      };

      PikeCardService.getTeleviaCards = function () {
        var deffered = $q.defer();
        APIService.pikeCard.getTeleviaCards()
          .success(function (response) {
            Response.televiaCardList = response;
            deffered.resolve();
          })
          .error(function (err) {
            deffered.reject();
            $log.error(err);
          });
        return deffered.promise;
      };

      PikeCardService.getTelepassCards = function () {
        var deffered = $q.defer();
        APIService.pikeCard.getTelepassCards()
          .success(function (response) {
            Response.telepassCardList = response;
            deffered.resolve();
          })
          .error(function (err) {
            deffered.reject();
            $log.error(err);
          });
        return deffered.promise;
      };

      PikeCardService.getOtherCards = function () {
        var deffered = $q.defer();
        APIService.pikeCard.getOtherCards()
          .success(function (response) {
            Response.otherCardList = response;
            deffered.resolve();
          })
          .error(function (err) {
            deffered.reject();
            $log.error(err);
          });
        return deffered.promise;
      };


      return PikeCardService;

    }]);
})();

