(function () {
    'use strict';

    var module = angular.module('fleetmanager');

    module.controller('CirculationCardModalCtrl', [
        'CONSTANTS', '$rootScope', '$state', '$scope', '$sessionStorage', 'CarService', 'CirculationCardService', 'Response', '$uibModalInstance', 'notiffy', 'circulationCard',
        function (CONSTANTS, $rootScope, $state, $scope, $sessionStorage, CarService, CirculationCardService, Response, $uibModalInstance, notiffy, circulationCard) {

            var vm = this;

            if (circulationCard) {
                vm.action = 'Modificar';
                vm.circulationCard = circulationCard;
                vm.circulationCard.update = true;
            } else {
                vm.action = 'Agregar';
                vm.circulationCard = {
                    active: true,
                    update: false
                };
            }

            vm.circulationCard.vehicle = $sessionStorage.carFormalities;

            vm.save = function () {
                vm.circulationCardForm.$setDirty(true);
                if (vm.circulationCardForm.$valid) {
                    vm.loading = true;
                    CirculationCardService.save(vm.circulationCard).then(function () {
                        vm.loading = false;
                        if (Response.saved.id != null) {
                            $uibModalInstance.close();
                            notiffy.success('Tarjeta guardado exitosamente.');
                        } else if (Response.saved.id == null) {
                            vm.circulationCardForm.circulationCard.$setValidity("duplicated", false);
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

