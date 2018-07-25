(function () {
  'use strict';

  var module = angular.module('fleetmanager');

  module.controller('GasCardModalCtrl', [
    'CONSTANTS', '$rootScope', '$state', '$scope', '$sessionStorage', 'CarService', 'GasCardService', 'Response', '$uibModalInstance', 'notiffy', 'gasCard',
    function (CONSTANTS, $rootScope, $state, $scope, $sessionStorage, CarService, GasCardService, Response, $uibModalInstance, notiffy, gasCard) {

      var vm = this;

      if (gasCard) {
        vm.action = 'Modificar';
        vm.gasCard = gasCard;
        vm.gasCard.update = true;
      } else {
        vm.action = 'Agregar';
        vm.gasCard = {
          amount: 0,
          assigned: false,
          active: true,
          update: false
        };
      }

      vm.save = function () {
        vm.gasCardForm.$setDirty(true);
        if (vm.gasCardForm.$valid) {
          vm.loading = true;
          GasCardService.save(vm.gasCard).then(function () {
            vm.loading = false;
            if (Response.saved.id != null) {
              $uibModalInstance.close();
              notiffy.success('Tarjeta guardado exitosamente.');
            } else if (Response.saved.id == null) {
              notiffy.error('Error, verifique no exista una tarjeta activa para el mismo vehículo.');
            } else {
              notiffy.error('Error al guardar la tarjeta.');
            }
          });
        }
      };


      vm.cancel = function () {
        $uibModalInstance.dismiss('cancel');
      };

    }]);

})();

