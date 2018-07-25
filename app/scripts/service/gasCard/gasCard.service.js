(function () {
  'use strict';

  var module = angular.module('fleetmanager');

  module.factory('GasCardService', ['$log', '$http', '$q', 'APIService', 'Response',
    function ($log, $http, $q, APIService, Response) {

      var GasCardService = {};

      GasCardService.save = function (gasCard) {
        var deffered = $q.defer();
        APIService.gasCard.save(gasCard)
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


      GasCardService.getGasCards = function (inactive) {
        var deffered = $q.defer();
        APIService.gasCard.getGasCards(inactive)
          .success(function (response) {
            Response.gasCardList = response;
            deffered.resolve();
          })
          .error(function (err) {
            deffered.reject();
            $log.error(err);
          });
        return deffered.promise;
      };

      GasCardService.getGasCardsNoAssigned = function () {
        var deffered = $q.defer();
        APIService.gasCard.getGasCardsNoAssigned()
          .success(function (response) {
            Response.gasCardList = response;
            deffered.resolve();
          })
          .error(function (err) {
            deffered.reject();
            $log.error(err);
          });
        return deffered.promise;
      };

      GasCardService.getOne = function (id) {
        var deffered = $q.defer();
        APIService.gasCard.getOne(id)
          .success(function (response) {
            Response.gasCard = response;
            deffered.resolve();
          })
          .error(function (err) {
            deffered.reject();
            $log.error(err);
          });
        return deffered.promise;
      };

      GasCardService.activate = function (gasCard) {
        var deffered = $q.defer();
        APIService.gasCard.activate(gasCard)
          .success(function (response) {
            Response.saved = response;
            deffered.resolve();
          })
          .error(function (err) {
            deffered.reject();
            $log.error(err);
          });
        return deffered.promise;
      };

      GasCardService.deactivate = function (gasCards) {
        var deffered = $q.defer();
        APIService.gasCard.deactivate(gasCards)
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

      return GasCardService;

    }]);
})();

