(function () {
    'use strict';

    var module = angular.module('fleetmanager');

    module.controller('InfringementModalCtrl', [
        'CONSTANTS', '$rootScope', '$state', '$scope', '$sessionStorage', 'TechnicianService', 'CarService', 'InfringementService', 'Response', '$uibModalInstance', 'notiffy', 'infringement',
        function (CONSTANTS, $rootScope, $state, $scope, $sessionStorage, TechnicianService, CarService,InfringementService, Response, $uibModalInstance, notiffy, infringement) {

            var vm = this;

            vm.hstep = 1;
            vm.mstep = 1;

            if (infringement) {
                vm.action = 'Modificar';
                vm.infringement = infringement;
                vm.infringement.update = true;
            } else {
                vm.action = 'Agregar';
                vm.infringement = {
                    active: true,
                    update: false
                };
            }

            vm.infringement.vehicle = $sessionStorage.carFormalities;

            vm.loadTechnician = function () {
              vm.loading = true;
              TechnicianService.getTechnicians(false).then(function () {
                vm.loading = false;
                vm.technicianList = Response.technicianList;
              }, function () {
                vm.loading = false;
                notiffy.error('Error al obtener la lista de técnicos.');
              });
            };

            vm.loadTechnician();

            vm.save = function () {

                if(!vm.infringement.infringementDate) {
                  vm.errorHora = true;
                }else {
                  vm.infringementForm.$setDirty(true);
                  if (vm.infringementForm.$valid) {
                    vm.loading = true;
                    InfringementService.save(vm.infringement).then(function () {
                      vm.loading = false;
                      if (Response.saved.id != null) {
                        $uibModalInstance.close();
                        notiffy.success('Infracción guardado exitosamente.');
                      } else if (Response.saved.id == null) {
                        vm.infringementForm.infringement.$setValidity("duplicated", false);
                      } else {
                        notiffy.error('Error al guardar la infracción.');
                      }
                    });
                  }
                }
            };


            vm.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };

        }]);

})();

