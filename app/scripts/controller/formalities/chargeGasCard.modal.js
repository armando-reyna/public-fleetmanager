(function () {
  'use strict';

  var module = angular.module('fleetmanager');

  module.controller('ChargeGasCardModalCtrl', [
    'CONSTANTS', '$rootScope', '$state', '$scope', '$sessionStorage', 'UserService', 'CarService', 'GasCardService', 'ChargeGasCardService', 'Response', '$uibModalInstance', 'notiffy', 'chargeGasCard',
    function (CONSTANTS, $rootScope, $state, $scope, $sessionStorage, UserService, CarService, GasCardService, ChargeGasCardService, Response, $uibModalInstance, notiffy, chargeGasCard) {

      var vm = this;

      if (chargeGasCard) {
        vm.action = 'Modificar';
        vm.chargeGasCard = chargeGasCard;
        vm.chargeGasCard.update = true;
      } else {
        vm.action = 'Agregar';
        vm.chargeGasCard = {
          active: true,
          update: false
        };
      }

      vm.chargeGasCard.user = $sessionStorage.userToken;
      vm.chargeGasCard.vehicle = $sessionStorage.carFormalities;

      vm.efficiencyError = false; //Verdadero cuando excede  o disminuye mas del 30% de rendimiento de fabrica
      vm.efficiencyAlert50 = false; // Verdadero cuando excede  o disminuye mas del 50% de rendimiento de fabrica
      vm.userNull = false;
      vm.passwordNull = false;


      vm.loadAllGasCard = function () {
        vm.loading = true;
        GasCardService.getGasCards(false).then(function () {
          vm.loading = false;
          vm.gasCardList = Response.gasCardList;
        }, function () {
          vm.loading = false;
          notiffy.error('Error al obtener la lista de tarjetas de gas.');
        });
      };

      vm.loadAllGasCard();

      vm.loadGasCardByVehicle = function () {
        vm.loading = true;
        CarService.getOne($sessionStorage.carFormalities.id).then(function () {
          vm.loading = false;
          vm.chargeGasCard.gasCard = Response.car.gasCard;
          if(chargeGasCard){ //Modificar
            vm.chargeGasCard.kmPrevious = vm.chargeGasCard.kmCurrent - vm.chargeGasCard.kmTours;
          }else{
            vm.chargeGasCard.kmPrevious = Response.car.kmTours;
          }
          vm.efficiencyFactory = Response.car.efficiency;
          vm.efficiencyFactory30 = vm.efficiencyFactory * 0.3;
          vm.efficiencyFactory50 = vm.efficiencyFactory * 0.5;
        }, function () {
          vm.loading = false;
          notiffy.error('Error al obtener la lista de vehículos');
        });
      };

      vm.loadGasCardByVehicle();


      vm.loadWayPay = function () {
        vm.loading = true;
        ChargeGasCardService.getWayPay().then(function () {
          vm.loading = false;
          vm.wayPayList = Response.wayPayList;
        }, function () {
          vm.loading = false;
          notiffy.error('Error al obtener la lista de formas de pago.');
        });
      };

      vm.loadWayPay();

      $scope.$watch('vm.chargeGasCard.kmCurrent', function (newVal, oldVal) {
        if (newVal) {
          vm.efficiencyError = false;
          vm.chargeGasCard.kmTours = vm.chargeGasCard.kmCurrent - vm.chargeGasCard.kmPrevious;
          if(vm.chargeGasCard.numLitters != null){
            vm.checkEfficiency();
          }
        }
      });

      $scope.$watch('vm.chargeGasCard.numLitters', function (newVal, oldVal) {
        if (newVal) {
          vm.efficiencyError = false;
          if(vm.chargeGasCard.costGas != null){
            vm.chargeGasCard.amount = vm.chargeGasCard.numLitters * vm.chargeGasCard.costGas;
          }
          if(vm.chargeGasCard.kmCurrent  != null){
            vm.checkEfficiency();
          }
        }
      });

      $scope.$watch('vm.chargeGasCard.costGas', function (newVal, oldVal) {
        if (newVal) {
          if(vm.chargeGasCard.numLitters != null){
            vm.chargeGasCard.amount = vm.chargeGasCard.numLitters * vm.chargeGasCard.costGas;
          }
        }
      });

      vm.checkEfficiency = function () {
        vm.chargeGasCard.efficiency = (vm.chargeGasCard.kmTours / vm.chargeGasCard.numLitters).toFixed(2);
        if( (vm.chargeGasCard.efficiency > (vm.efficiencyFactory + vm.efficiencyFactory30)) || (vm.chargeGasCard.efficiency < (vm.efficiencyFactory - vm.efficiencyFactory30))){
          vm.efficiencyError = true;
        }
      };

      var save = function () {
        vm.loading = true;
        ChargeGasCardService.save(vm.chargeGasCard).then(function () {
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
      };


      vm.save = function () {
        vm.chargeGasCardForm.$setDirty(true);
        if (vm.chargeGasCardForm.$valid) {
          vm.loading = true;
          if( (vm.chargeGasCard.efficiency > (vm.efficiencyFactory + vm.efficiencyFactory50)) || (vm.chargeGasCard.efficiency < (vm.efficiencyFactory - vm.efficiencyFactory50))){
            vm.efficiencyAlert50 = true;
            if(vm.user && (vm.user.user != "" && vm.user.password != "")){
              UserService.login(vm.user).then(function() {
                vm.token = Response.user;
                if(vm.token){
                  if(vm.token.role.id == CONSTANTS.ROLES.ADMIN){
                    save();
                  }
                }else{
                  vm.loginError = true;
                }
              });
            }
          }else{
            save();
          }
        }
      };


      vm.cancel = function () {
        $uibModalInstance.dismiss('cancel');
      };

    }]);

})();

