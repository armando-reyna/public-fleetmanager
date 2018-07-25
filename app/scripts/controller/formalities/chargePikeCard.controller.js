(function () {
  'use strict';

  var module = angular.module('fleetmanager');

  module.controller('ChargePikeCardCtrl', [
    '$rootScope', '$scope', '$state', '$sessionStorage', '$timeout', 'PikeCardService', 'CarService', 'ChargePikeCardService', 'Response', '$uibModal', 'confirmm', 'notiffy',
    function ($rootScope, $scope, $state, $sessionStorage, $timeout, PikeCardService, CarService, ChargePikeCardService, Response, $uibModal, confirmm, notiffy) {

      var vm = this;

      vm.user = $sessionStorage.userToken;
      vm.car = $sessionStorage.carFormalities;
      if(vm.car.iaveCard){
        if(vm.car.iaveCard.id != null){
          vm.mostrarIave = true;
        }
      }

      if(vm.car.televiaCard){
        if(vm.car.televiaCard.id != null){
          vm.mostrarTelevia = true;
        }
      }

      if(vm.car.telepassCard){
        if(vm.car.telepassCard.id != null){
          vm.mostrarTelepass = true;
        }
      }

      if(vm.car.otherCard){
        if(vm.car.otherCard.id != null){
          vm.mostrarOther = true;
        }
      }

      if(!vm.user.chargePike){
        $state.go("index.car");
        notiffy.error('Acceso denegado.');

      }

      vm.stateDataOrigin = $sessionStorage.stateData;

      vm.stateData = $state.current.data;

      vm.inactiveChargePikeCards = false;
      vm.updateEnabled = false;
      vm.deactivateEnabled = false;
      vm.activateEnabled = false;
      vm.allselected = false;
      vm.mostrarDatosVehiculo = true;

      vm.otherChargePikeCards = false;

      vm.refreshChargePikeCard = function () {
        vm.loading = true;
        if(vm.inactiveChargePikeCards){
          ChargePikeCardService.getAllChargePikeCardByVehicleAndInactive($sessionStorage.carFormalities.id).then(function () {
            vm.chargePikeCardList = Response.chargePikeCardList;
            $scope.main.loading = false;
          }, function () {
            notiffy.error('Error al obtener la lista de peajes.');
            $scope.main.loading = false;
          });
        }else{
          ChargePikeCardService.getAllChargePikeCardByVehicleAndActive($sessionStorage.carFormalities.id).then(function () {
            vm.chargePikeCardList = Response.chargePikeCardList;
            $scope.main.loading = false;
          }, function () {
            notiffy.error('Error al obtener la lista de peajes.');
            $scope.main.loading = false;
          });
        }

      };

      vm.refreshChargePikeCard();

      vm.openChargePikeCardModal = function (update) {
        var modalInstance = $uibModal.open({
          templateUrl: 'views/formalities/chargePikeCard.modal.html',
          controller: 'ChargePikeCardModalCtrl',
          controllerAs: 'vm',
          resolve: {
            chargePikeCard: function () {
              if (update) {
                return vm.selectedList[0];
              } else {
                return undefined;
              }
            }
          }
        });
        modalInstance.result.then(function (selectedItem) {
          vm.refreshChargePikeCard();
        }, function () {
          //$log.info('Modal dismissed at: ' + new Date());
        });
      };

      vm.enableBts = function () {
        vm.selectedList = [];
        vm.activateEnabled = false;
        vm.deactivateEnabled = false;
        vm.updateEnabled = false;
        vm.allselected = true;
        angular.forEach(vm.chargePikeCardList, function (chargePikeCard, index) {
          if (chargePikeCard.selected) {
            vm.selectedList.push(chargePikeCard);
          } else {
            vm.allselected = false;
          }
        });
        if (vm.selectedList.length > 0) {
          vm.activateEnabled = true;
          vm.deactivateEnabled = true;
        }
        angular.forEach(vm.selectedList, function (chargePikeCard, index) {
          if (chargePikeCard.active) {
            vm.activateEnabled = false;
          } else {
            vm.deactivateEnabled = false;
          }
        });
        if (vm.selectedList.length == 1) {
          vm.updateEnabled = true;
        }
      };

      vm.selectAll = function () {
        var select = !vm.allselected;
        angular.forEach(vm.chargePikeCardList, function (chargePikeCard, index) {
          chargePikeCard.selected = select;
        });
        vm.enableBts();
      };

      vm.activateChargePikeCards = function () {
        var message = '';

        if (vm.selectedList.length > 1) {
          message = '¿Desea activar las tarjetas ?';
        } else {
          message = '¿Desea activar la tarjeta ?';
        }
        confirmm.confirm(message, function () {
          vm.loading = true;
          ChargePikeCardService.activate(vm.selectedList).then(function () {
            vm.loading = false;
            if (Response.activated) {
              notiffy.success('Tarjetas activadas.');
            } else {
              notiffy.error('Error al activar las tarjetas.');
            }
            vm.refreshChargePikeCard();
          }, function () {
            notiffy.error('Error al activar las tarjetas.');
          });
        });
      };


      vm.deactivateChargePikeCards = function () {
        var message = '';
        if (vm.selectedList.length > 1) {
          message = '¿Desea desactivar las tarjetas ?';
        } else {
          message = '¿Desea desactivar la tarjeta ?';
        }
        confirmm.confirm(message, function () {
          vm.loading = true;
          ChargePikeCardService.deactivate(vm.selectedList).then(function () {
            vm.loading = false;
            if (Response.deactivated) {
              notiffy.success('Tarjetas inactivadas.');
            } else {
              notiffy.error('Error al desactivar las tarjetas.');
            }
            vm.refreshChargePikeCard();
          }, function () {
            notiffy.error('Error al desactivar las tarjetas.');
          });
        });
      };

      vm.goCloud = function (chargePikeCard) {
        $sessionStorage.stateData = vm.stateData;
        $sessionStorage.selectedCloud = chargePikeCard;
        $state.go("index.cloud");
      };

    }]);

})();
