(function () {
    'use strict';

    var module = angular.module('fleetmanager');

    module.controller('OtherModalCtrl', [
        'CONSTANTS', '$rootScope', '$state', '$scope', '$sessionStorage', 'CarService', 'OtherService', 'Response', '$uibModalInstance', 'notiffy', 'other',
        function (CONSTANTS, $rootScope, $state, $scope, $sessionStorage, CarService, OtherService, Response, $uibModalInstance, notiffy, other) {

            var vm = this;

            if (other) {
                vm.action = 'Modificar';
                vm.other = other;
                vm.other.update = true;
            } else {
                vm.action = 'Agregar';
                vm.other = {
                    active: true,
                    update: false
                };
            }

            vm.other.vehicle = $sessionStorage.carFormalities;

            vm.save = function () {
                vm.otherForm.$setDirty(true);
                if (vm.otherForm.$valid) {
                    vm.loading = true;
                    OtherService.save(vm.other).then(function () {
                        vm.loading = false;
                        if (Response.saved.id != null) {
                            $uibModalInstance.close();
                            notiffy.success('Tramite guardado exitosamente.');
                        } else if (Response.saved.id == null) {
                            vm.otherForm.other.$setValidity("duplicated", false);
                        } else {
                            notiffy.error('Error al guardar el tramite.');
                        }
                    });
                }
            };


            vm.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };

        }]);

})();

