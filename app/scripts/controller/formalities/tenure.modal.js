(function () {
    'use strict';

    var module = angular.module('fleetmanager');

    module.controller('TenureModalCtrl', [
        'CONSTANTS', '$rootScope', '$state', '$scope', '$sessionStorage', 'CarService', 'TenureService', 'Response', '$uibModalInstance', 'notiffy', 'tenure',
        function (CONSTANTS, $rootScope, $state, $scope, $sessionStorage, CarService, TenureService, Response, $uibModalInstance, notiffy, tenure) {

            var vm = this;

            var year;

            if (tenure) {
                vm.action = 'Modificar';
                vm.tenure = tenure;
                vm.tenure.update = true;
            } else {
                vm.action = 'Agregar';
                vm.tenure = {
                    active: true,
                    update: false,
                };
            }

            vm.tenure.year = moment();
            vm.tenure.vehicle = $sessionStorage.carFormalities;

            vm.save = function () {
                vm.tenureForm.$setDirty(true);
                if (vm.tenureForm.$valid) {
                    vm.loading = true;
                    year = vm.tenure.year.toDate();
                    year.setHours(0);
                    year.setMinutes(0);
                    year.setSeconds(0);
                    year.setMilliseconds(0);
                    vm.tenure.year = year;
                    TenureService.save(vm.tenure).then(function () {
                        vm.loading = false;
                        if (Response.saved.id != null) {
                            $uibModalInstance.close();
                            notiffy.success('Tenencia guardada exitosamente.');
                        } else if (Response.saved.id == null) {
                            vm.tenureForm.tenure.$setValidity("duplicated", false);
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

