(function () {
  'use strict';

  var module = angular.module('fleetmanager');

  module.controller('ChargePikeCardModalCtrl', [
    'CONSTANTS', '$rootScope', '$state', '$scope', '$sessionStorage', 'UserService', 'PikeCardService', 'CarService', 'ChargePikeCardService', 'Response', '$uibModalInstance', 'notiffy', 'chargePikeCard',
    function (CONSTANTS, $rootScope, $state, $scope, $sessionStorage, UserService, PikeCardService, CarService, ChargePikeCardService, Response, $uibModalInstance, notiffy, chargePikeCard) {

      var vm = this;

      if (chargePikeCard) {
        vm.action = 'Modificar';
        vm.chargePikeCard = chargePikeCard;
        vm.chargePikeCard.update = true;
      } else {
        vm.action = 'Agregar';
        vm.chargePikeCard = {
          active: true,
          update: false
        };
      }

      vm.chargePikeCard.user = $sessionStorage.userToken;
      vm.chargePikeCard.vehicle = $sessionStorage.carFormalities;


      vm.loadWayPay = function () {
        vm.loading = true;
        ChargePikeCardService.getWayPay().then(function () {
          vm.loading = false;
          vm.wayPayList = Response.wayPayList;
        }, function () {
          vm.loading = false;
          notiffy.error('Error al obtener la lista de formas de pago.');
        });
      };

      vm.loadWayPay();
      
      
      vm.car = $sessionStorage.carFormalities;

      vm.loadAllPikeCard = function () {
        vm.loading = true;
        PikeCardService.getPikeCards(false).then(function () {
          vm.loading = false;
          vm.pikeCardList = Response.pikeCardList;
        }, function () {
          vm.loading = false;
          notiffy.error('Error al obtener la lista de tarjetas peaje.');
        });
      };

      vm.loadAllPikeCard();

      $scope.$watch('vm.chargePikeCard.wayPay', function (newVal, oldVal) {
        if (newVal) {
          switch(vm.chargePikeCard.wayPay.id){
            case CONSTANTS.WAYPAY.EFECTIVO: {
              vm.mostrarTarjetas=false;
              vm.chargePikeCard.pikeCard = null;
              break;
            }
            case CONSTANTS.WAYPAY.IAVE: {
              vm.chargePikeCard.pikeCard = vm.car.iaveCard;
              vm.mostrarTarjetas=true;
              break;
            }
            case CONSTANTS.WAYPAY.TELEVIA: {
              vm.mostrarTarjetas=true;
              vm.chargePikeCard.pikeCard = vm.car.televiaCard;
              break;
            }
            case CONSTANTS.WAYPAY.TELEPASS: {
              vm.mostrarTarjetas=true;
              vm.chargePikeCard.pikeCard = vm.car.telepassCard;
              break;
            }
            case CONSTANTS.WAYPAY.OTHER: {
              vm.mostrarTarjetas=true;
              vm.chargePikeCard.pikeCard = vm.car.otherCard;
              break;
            }
          }
        }
      });

      vm.save = function () {
        vm.chargePikeCardForm.$setDirty(true);
        if (vm.chargePikeCardForm.$valid) {
          vm.loading = true;
          ChargePikeCardService.save(vm.chargePikeCard).then(function () {
            vm.loading = false;
            if (Response.saved.id != null) {
              $uibModalInstance.close();
              notiffy.success('Carga guardada exitosamente.');
            } else if (Response.saved.id == null) {
              vm.insuranceForm.insurance.$setValidity("duplicated", false);
            } else {
              notiffy.error('Error al guardar la carga.');
            }
          });
        }
      };


      vm.cancel = function () {
        $uibModalInstance.dismiss('cancel');
      };

    }]);

})();

