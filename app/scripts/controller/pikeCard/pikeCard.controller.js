(function () {
  'use strict';

  var module = angular.module('fleetmanager');

  module.controller('PikeCardCtrl', [
    '$rootScope', '$scope', '$state', '$sessionStorage', '$timeout', 'PikeCardService', 'Response', '$uibModal', 'confirmm', 'notiffy',
    function ($rootScope, $scope, $state, $sessionStorage, $timeout, PikeCardService, Response, $uibModal, confirmm, notiffy) {

      var vm = this;

      vm.stateData = $state.current.data;

      vm.inactivePikeCards = false;
      vm.updateEnabled = false;
      vm.deactivateEnabled = false;
      vm.activateEnabled = false;
      vm.allselected = false;

      vm.refresh = function () {
        $scope.main.loading = true;
        PikeCardService.getPikeCards(vm.inactivePikeCards).then(function () {
          vm.pikeCardList = Response.pikeCardList;
          vm.allselected = false;
          $scope.main.loading = false;
        }, function () {
          notiffy.error('Error al obtener la lista de tarjetas.');
          $scope.main.loading = false;
        });
      };

      vm.refresh();

      vm.openPikeCardModal = function (update) {
        var modalInstance = $uibModal.open({
          templateUrl: 'views/pikeCard/pikeCard.modal.html',
          controller: 'PikeCardModalCtrl',
          controllerAs: 'vm',
          resolve: {
            pikeCard: function () {
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
        angular.forEach(vm.pikeCardList, function (pikeCard, index) {
          if (pikeCard.selected) {
            vm.selectedList.push(pikeCard);
          } else {
            vm.allselected = false;
          }
        });
        if (vm.selectedList.length > 0) {
          vm.activateEnabled = true;
          vm.deactivateEnabled = true;
        }
        angular.forEach(vm.selectedList, function (pikeCard, index) {
          if (pikeCard.active) {
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
        angular.forEach(vm.pikeCardList, function (pikeCard, index) {
          pikeCard.selected = select;
        });
        vm.enableBts();
      };

      vm.activatePikeCards = function () {
        var message = '';
        if (vm.selectedList.length > 1) {
          message = '¿Desea activar las limpiezas ?';
        } else {
          message = '¿Desea activar la limpieza ?';
        }
        confirmm.confirm(message, function () {
          vm.loading = true;
          PikeCardService.activate(vm.selectedList).then(function () {
            vm.loading = false;
            if (Response.activated) {
              notiffy.success('Limpiezas activadas.');
            } else {
              notiffy.error('Error al activar las limpiezas.');
            }
            vm.refresh();
          }, function () {
            notiffy.error('Error al activar las limpiezas.');
          });
        });
      };


      vm.deactivatePikeCards = function () {
        var message = '';
        if (vm.selectedList.length > 1) {
          message = '¿Desea desactivar las tarjetas ?';
        } else {
          message = '¿Desea desactivar la tarjeta ?';
        }
        confirmm.confirm(message, function () {
          vm.loading = true;
          PikeCardService.deactivate(vm.selectedList).then(function () {
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


      vm.goCloud = function (pikeCard) {
        $sessionStorage.stateData = vm.stateData;
        $sessionStorage.selectedCloud = pikeCard;
        $state.go("index.cloud");
      };

    }]);

})();
