(function () {
    'use strict';

    var module = angular.module('fleetmanager');

    module.controller('MaintenanceModalCtrl', [
        'CONSTANTS', '$rootScope', '$state', '$scope', '$sessionStorage', 'CarService', 'MaintenanceService', 'Response', '$uibModalInstance', 'notiffy', 'maintenance',
        function (CONSTANTS, $rootScope, $state, $scope, $sessionStorage, CarService, MaintenanceService, Response, $uibModalInstance, notiffy, maintenance) {

            var vm = this;

            if (maintenance) {
                vm.action = 'Modificar';
                vm.maintenance = maintenance;
                vm.maintenance.update = true;
            } else {
                vm.action = 'Agregar';
                vm.maintenance = {
                    active: true,
                    update: false
                };
            }

            vm.maintenance.vehicle = $sessionStorage.carFormalities;

            vm.loadMaintenanceType = function () {
                vm.loading = true;
                MaintenanceService.getAllMaintenanceTypes().then(function () {
                    vm.loading = false;
                    vm.maintenanceType= Response.maintenanceType;
                }, function () {
                    vm.loading = false;
                    notiffy.error('Error al obtener la lista de mantenimientos para vehículos.');
                });
            };

            vm.loadMaintenanceType();

            vm.save = function () {
                vm.maintenanceForm.$setDirty(true);
                if (vm.maintenanceForm.$valid) {
                    vm.loading = true;
                    MaintenanceService.save(vm.maintenance).then(function () {
                        vm.loading = false;
                        if (Response.saved.id != null) {
                            $uibModalInstance.close();
                            notiffy.success('Mantenimiento generado exitosamente.');
                            $sessionStorage.maintenanceSession = Response.saved.id;
                        } else if (Response.saved.id == null) {
                            vm.maintenanceForm.maintenance.$setValidity("duplicated", false);
                        } else {
                            notiffy.error('Error al generar el mantenimiento.');
                        }
                    });
                }
            };


            vm.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };

        }]);

})();

