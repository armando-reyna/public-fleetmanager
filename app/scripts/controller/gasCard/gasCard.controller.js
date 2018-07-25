(function () {
  'use strict';

  var module = angular.module('fleetmanager');

  module.controller('GasCardCtrl', [
    '$rootScope', '$scope', '$state', '$sessionStorage', '$timeout', 'GasCardService', 'Response', '$uibModal', 'confirmm', 'notiffy',
    function ($rootScope, $scope, $state, $sessionStorage, $timeout, GasCardService, Response, $uibModal, confirmm, notiffy) {

      var vm = this;

      vm.stateData = $state.current.data;

      vm.inactiveGasCards = false;
      vm.updateEnabled = false;
      vm.deactivateEnabled = false;
      vm.activateEnabled = false;
      vm.allselected = false;

      vm.refresh = function () {
        $scope.main.loading = true;
        GasCardService.getGasCards(vm.inactiveGasCards).then(function () {
          vm.gasCardList = Response.gasCardList;
          vm.allselected = false;
          $scope.main.loading = false;
        }, function () {
          notiffy.error('Error al obtener la lista de tarjetas.');
          $scope.main.loading = false;
        });
      };

      vm.refresh();

      vm.openGasCardModal = function (update) {
        var modalInstance = $uibModal.open({
          templateUrl: 'views/gasCard/gasCard.modal.html',
          controller: 'GasCardModalCtrl',
          controllerAs: 'vm',
          resolve: {
            gasCard: function () {
              if (update) {
                return vm.selectedList[0];
              } else {
                return undefined;
              }
            }
          }
        });
        modalInstance.result.then(function (selectedItem) {
          vm.refresh();
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
        angular.forEach(vm.gasCardList, function (gasCard, index) {
          if (gasCard.selected) {
            vm.selectedList.push(gasCard);
          } else {
            vm.allselected = false;
          }
        });
        if (vm.selectedList.length > 0) {
          vm.activateEnabled = true;
          vm.deactivateEnabled = true;
        }
        angular.forEach(vm.selectedList, function (gasCard, index) {
          if (gasCard.active) {
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
        angular.forEach(vm.gasCardList, function (gasCard, index) {
          gasCard.selected = select;
        });
        vm.enableBts();
      };

      vm.activateGasCards = function () {
        var message = '';

        if (vm.selectedList.length > 1) {
          vm.errorActivateGasCards = true;
        } else {
          message = '¿Desea activar la tarjeta ?';
        }
        if(vm.errorActivateGasCards){
          notiffy.error('No puedes activar más de una tarjeta.');
        }else{
          confirmm.confirm(message, function () {
            vm.loading = true;
            GasCardService.activate(vm.selectedList[0]).then(function () {
              vm.loading = false;
              if (Response.saved.id != null) {
                notiffy.success('Tarjeta activada exitosamente.');
              } else if (Response.saved.id == null) {
                notiffy.error('Error, verifique no exista una tarjeta activa para el mismo vehículo.');
              } else {
                notiffy.error('Error al activar la tarjeta.');
              }
              vm.refresh();
              vm.errorActivateGasCards = false;
            });
          });
        }
      };


      vm.deactivateGasCards = function () {
        var message = '';
        if (vm.selectedList.length > 1) {
          message = '¿Desea desactivar las tarjetas ?';
        } else {
          message = '¿Desea desactivar la tarjeta ?';
        }
        confirmm.confirm(message, function () {
          vm.loading = true;
          GasCardService.deactivate(vm.selectedList).then(function () {
            vm.loading = false;
            if (Response.deactivated) {
              notiffy.success('Tarjetas inactivadas.');
            } else {
              notiffy.error('Error al desactivar las tarjetas.');
            }
            vm.refresh();
          }, function () {
            notiffy.error('Error al desactivar las tarjetas.');
          });
        });
      };


      vm.goCloud = function (gasCard) {
        $sessionStorage.stateData = vm.stateData;
        $sessionStorage.selectedCloud = gasCard;
        $state.go("index.cloud");
      };

    }]);

})();
