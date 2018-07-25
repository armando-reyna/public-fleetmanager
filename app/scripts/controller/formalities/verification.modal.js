(function () {
    'use strict';

    var module = angular.module('fleetmanager');

    module.controller('VerificationModalCtrl', [
        'CONSTANTS', '$rootScope', '$state', '$scope', '$sessionStorage', 'CarService', 'VerificationService', 'Response', '$uibModalInstance', 'notiffy', 'verification',
        function (CONSTANTS, $rootScope, $state, $scope, $sessionStorage, CarService, VerificationService, Response, $uibModalInstance, notiffy, verification) {

            var vm = this;

            if (verification) {
                vm.action = 'Modificar';
                vm.verification = verification;
                vm.verification.update = true;
            } else {
                vm.action = 'Agregar';
                vm.verification = {
                    active: true,
                    update: false
                };
            }

            vm.verification.vehicle = $sessionStorage.carFormalities;


            vm.loadVerificationHologram = function () {
                vm.loading = true;
                VerificationService.getVerificationHologram().then(function () {
                    vm.loading = false;
                    vm.verificationHologram= Response.verificationHologram;
                }, function () {
                    vm.loading = false;
                    notiffy.error('Error al obtener la lista de hologramas para verificación.');
                });
            };

            vm.loadVerificationHologram();


            vm.loadVerificationPeriod = function () {
                vm.loading = true;
                VerificationService.getVerificationPeriod().then(function () {
                    vm.loading = false;
                    vm.verificationPeriod= Response.verificationPeriod;
                }, function () {
                    vm.loading = false;
                    notiffy.error('Error al obtener la lista de periodos para verificación.');
                });
            };

            vm.loadVerificationPeriod();

            vm.save = function () {
                vm.verificationForm.$setDirty(true);
                if (vm.verificationForm.$valid) {
                    vm.loading = true;
                    VerificationService.save(vm.verification).then(function () {
                        vm.loading = false;
                        if (Response.saved.id != null) {
                            $uibModalInstance.close();
                            notiffy.success('Verificación guardada exitosamente.');
                        } else if (Response.saved.id == null) {
                            vm.verificationForm.verification.$setValidity("duplicated", false);
                        } else {
                            notiffy.error('Error al guardar la verificación.');
                        }
                    });
                }
            };


            vm.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };

        }]);

})();

