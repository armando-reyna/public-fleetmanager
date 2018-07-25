(function () {
    'use strict';

    var module = angular.module('fleetmanager');

    module.controller('InsuranceModalCtrl', [
        'CONSTANTS', '$rootScope', '$state', '$scope', '$sessionStorage', 'CarService', 'InsuranceService', 'Response', '$uibModalInstance', 'notiffy', 'insurance',
        function (CONSTANTS, $rootScope, $state, $scope, $sessionStorage, CarService,InsuranceService, Response, $uibModalInstance, notiffy, insurance) {

            var vm = this;

            if (insurance) {
                vm.action = 'Modificar';
                vm.insurance = insurance;
                vm.insurance.update = true;
            } else {
                vm.action = 'Agregar';
                vm.insurance = {
                    active: true,
                    update: false
                };
            }

            vm.insurance.vehicle = $sessionStorage.carFormalities;

            vm.save = function () {
                vm.insuranceForm.$setDirty(true);
                if (vm.insuranceForm.$valid) {
                    vm.loading = true;
                    InsuranceService.save(vm.insurance).then(function () {
                        vm.loading = false;
                        if (Response.saved.id != null) {
                            $uibModalInstance.close();
                            notiffy.success('Aseguradora guardado exitosamente.');
                        } else if (Response.saved.id == null) {
                            vm.insuranceForm.insurance.$setValidity("duplicated", false);
                        } else {
                            notiffy.error('Error al guardar la aseguradora.');
                        }
                    });
                }
            };


            vm.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };

        }]);

})();

