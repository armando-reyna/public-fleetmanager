(function () {
    'use strict';

    var module = angular.module('fleetmanager');

    module.controller('TorageModalCtrl', [
        'CONSTANTS', '$rootScope', '$state', '$scope', '$sessionStorage', 'CarService', 'TorageService', 'Response', '$uibModalInstance', 'notiffy', 'torage',
        function (CONSTANTS, $rootScope, $state, $scope, $sessionStorage, CarService, TorageService, Response, $uibModalInstance, notiffy, torage) {

            var vm = this;

            if (torage) {
                vm.action = 'Modificar';
                vm.torage = torage;
                vm.torage.update = true;
            } else {
                vm.action = 'Agregar';
                vm.torage = {
                    active: true,
                    update: false
                };
            }

            vm.torage.vehicle = $sessionStorage.carFormalities;

            vm.save = function () {
                vm.torageForm.$setDirty(true);
                if (vm.torageForm.$valid) {
                    vm.loading = true;
                    TorageService.save(vm.torage).then(function () {
                        vm.loading = false;
                        if (Response.saved.id != null) {
                            $uibModalInstance.close();
                            notiffy.success('Almacenaje guardado exitosamente.');
                        } else if (Response.saved.id == null) {
                            vm.torageForm.torage.$setValidity("duplicated", false);
                        } else {
                            notiffy.error('Error al guardar el almacenaje.');
                        }
                    });
                }
            };


            vm.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };

        }]);

})();

