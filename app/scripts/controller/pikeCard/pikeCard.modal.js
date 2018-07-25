(function () {
    'use strict';

    var module = angular.module('fleetmanager');

    module.controller('PikeCardModalCtrl', [
        'CONSTANTS', '$rootScope', '$state', '$scope', '$sessionStorage', 'CarService', 'PikeCardService', 'Response', '$uibModalInstance', 'notiffy', 'pikeCard',
        function (CONSTANTS, $rootScope, $state, $scope, $sessionStorage, CarService, PikeCardService, Response, $uibModalInstance, notiffy, pikeCard) {

            var vm = this;

            if (pikeCard) {
                vm.action = 'Modificar';
                vm.pikeCard = pikeCard;
                vm.pikeCard.update = true;
            } else {
                vm.action = 'Agregar';
                vm.pikeCard = {
                    amount: 0,
                    assigned: false,
                    active: true,
                    update: false
                };
            }



            vm.loadTypes = function () {
                vm.loading = true;
                PikeCardService.getAllPikeCardTypes().then(function () {
                    vm.loading = false;
                    vm.pikeCardTypeList = Response.pikeCardTypes;
                }, function () {
                    vm.loading = false;
                    notiffy.error('Error al obtener la lista de tipos de tarjetas peaje.');
                });
            };

            vm.loadTypes();


            vm.save = function () {
                vm.pikeCardForm.$setDirty(true);
                if (vm.pikeCardForm.$valid) {
                    vm.loading = true;
                    PikeCardService.save(vm.pikeCard).then(function () {
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

