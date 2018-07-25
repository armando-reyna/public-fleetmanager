(function () {
    'use strict';

    var module = angular.module('fleetmanager');

    module.controller('TechnicianModalCtrl', [
        'CONSTANTS', '$rootScope', '$state', '$scope','TechnicianService', 'Response', '$uibModalInstance', 'notiffy', 'technician',
        function (CONSTANTS, $rootScope, $state, $scope, TechnicianService, Response, $uibModalInstance, notiffy, technician) {

            var vm = this;

            if (technician) {
                vm.action = 'Modificar';
                vm.technician = technician;
                vm.technician.update = true;
            } else {
                vm.action = 'Agregar';
                vm.technician = {
                    active: true,
                    update: false
                };
            }

            vm.save = function () {
                vm.technicianForm.$setDirty(true);
                if (vm.technicianForm.$valid) {
                    vm.loading = true;
                    TechnicianService.save(vm.technician).then(function () {
                        vm.loading = false;
                        if (Response.saved.id != null) {
                            $uibModalInstance.close();
                            notiffy.success('Técnico guardado exitosamente.');
                        } else if (Response.saved.id == null) {
                            vm.technicianForm.technician.$setValidity("duplicated", false);
                        } else {
                            notiffy.error('Error al guardar el técnico.');
                        }
                    });
                }
            };

            $scope.$watch('vm.technician.user', function (newVal, oldVal) {
                if (newVal) {
                    vm.userForm.user.$setValidity("duplicated", true);
                }
            });

            vm.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };

        }]);

})();
