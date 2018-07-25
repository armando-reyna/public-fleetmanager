(function () {
    'use strict';

    var module = angular.module('fleetmanager');

    module.controller('CleaningModalCtrl', [
        'CONSTANTS', '$rootScope', '$state', '$scope', '$sessionStorage', 'CarService', 'CleaningService', 'Response', '$uibModalInstance', 'notiffy', 'cleaning',
        function (CONSTANTS, $rootScope, $state, $scope, $sessionStorage, CarService, CleaningService, Response, $uibModalInstance, notiffy, cleaning) {

            var vm = this;

            if (cleaning) {
                vm.action = 'Modificar';
                vm.cleaning = cleaning;
                vm.cleaning.update = true;
            } else {
                vm.action = 'Agregar';
                vm.cleaning = {
                    active: true,
                    update: false
                };
            }

            vm.cleaning.vehicle = $sessionStorage.carFormalities;

            vm.save = function () {
                vm.cleaningForm.$setDirty(true);
                if (vm.cleaningForm.$valid) {
                    vm.loading = true;
                    CleaningService.save(vm.cleaning).then(function () {
                        vm.loading = false;
                        if (Response.saved.id != null) {
                            $uibModalInstance.close();
                            notiffy.success('Limpieza guardada exitosamente.');
                        } else if (Response.saved.id == null) {
                            vm.cleaningForm.cleaning.$setValidity("duplicated", false);
                        } else {
                            notiffy.error('Error al guardar la limpieza.');
                        }
                    });
                }
            };


            vm.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };

        }]);

})();

