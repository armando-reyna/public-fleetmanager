(function () {
    'use strict';

    var module = angular.module('fleetmanager');

    module.controller('TechnicianCtrl', [
        '$rootScope', '$scope', '$state', '$sessionStorage', '$timeout', 'TechnicianService', 'Response', '$uibModal', 'confirmm', 'notiffy',
        function ($rootScope, $scope, $state, $sessionStorage, $timeout, TechnicianService, Response, $uibModal, confirmm, notiffy) {

            var vm = this;

            vm.inactiveTechnicians = false;
            vm.updateEnabled = false;
            vm.deactivateEnabled = false;
            vm.activateEnabled = false;
            vm.allselected = false;

            vm.refresh = function () {
                $scope.main.loading = true;
                TechnicianService.getTechnicians(vm.inactiveTechnicians).then(function () {
                    vm.technicianList = Response.technicianList;
                    vm.allselected = false;
                    $scope.main.loading = false;
                }, function () {
                    notiffy.error('Error al obtener la lista de técnicos.');
                    $scope.main.loading = false;
                });
            };

            vm.refresh();

            vm.openTechnicianModal = function (update) {
                var modalInstance = $uibModal.open({
                    templateUrl: 'views/technician/technician.modal.html',
                    controller: 'TechnicianModalCtrl',
                    controllerAs: 'vm',
                    resolve: {
                        technician: function () {
                            if (update) {
                                return vm.selectedList[0];
                            } else {
                                return undefined;
                            }
                        }
                    }
                });
                modalInstance.result.then(function (selectedItem) {
                    vm.refresh();
                }, function () {
                    //$log.info('Modal dismissed at: ' + new Date());
                });
            };

            vm.enableBts = function () {
                vm.selectedList = [];
                vm.activateEnabled = false;
                vm.deactivateEnabled = false;
                vm.updateEnabled = false;
                vm.allselected = true;
                angular.forEach(vm.technicianList, function (technician, index) {
                    if (technician.selected) {
                        vm.selectedList.push(technician);
                    } else {
                        vm.allselected = false;
                    }
                });
                if (vm.selectedList.length > 0) {
                    vm.activateEnabled = true;
                    vm.deactivateEnabled = true;
                }
                angular.forEach(vm.selectedList, function (technician, index) {
                    if (technician.active) {
                        vm.activateEnabled = false;
                    } else {
                        vm.deactivateEnabled = false;
                    }
                });
                if (vm.selectedList.length == 1) {
                    vm.updateEnabled = true;
                }
            };

            vm.selectAll = function () {
                var select = !vm.allselected;
                angular.forEach(vm.technicianList, function (technician, index) {
                    technician.selected = select;
                });
                vm.enableBts();
            };

            vm.activateTechnicians = function () {
                var message = '';
                angular.forEach(vm.selectedList, function (technician, index) {
                    message += technician.name;
                    if (index < vm.selectedList.length - 2) {
                        message += ', ';
                    } else if (index < vm.selectedList.length - 1) {
                        message += ' y ';
                    }
                });
                if (vm.selectedList.length > 1) {
                    message = '¿Desea activar a los técnicos ' + message + '?';
                } else {
                    message = '¿Desea activar a ' + message + '?';
                }
                confirmm.confirm(message, function () {
                    vm.loading = true;
                    TechnicianService.activate(vm.selectedList).then(function () {
                        vm.loading = false;
                        if (Response.activated) {
                            notiffy.success('Técnicos activados.');
                        } else {
                            notiffy.error('Error al activar los técnicos.');
                        }
                        vm.refresh();
                    }, function () {
                        notiffy.error('Error al activar los técnicos.');
                    });
                });
            };


            vm.deactivateTechnicians = function () {
                var message = '';
                angular.forEach(vm.selectedList, function (technician, index) {
                    message += technician.name;
                    if (index < vm.selectedList.length - 2) {
                        message += ', ';
                    } else if (index < vm.selectedList.length - 1) {
                        message += ' y ';
                    }
                });
                if (vm.selectedList.length > 1) {
                    message = '¿Desea desactivar a los técnicos ' + message + '?';
                } else {
                    message = '¿Desea desactivar a ' + message + '?';
                }
                confirmm.confirm(message, function () {
                    vm.loading = true;
                    TechnicianService.deactivate(vm.selectedList).then(function () {
                        vm.loading = false;
                        if (Response.deactivated) {
                            notiffy.success('Técnicos inactivados.');
                        } else {
                            notiffy.error('Error al desactivar los técnicos.');
                        }
                        vm.refresh();
                    }, function () {
                        notiffy.error('Error al desactivar los técnicos.');
                    });
                });
            };


        }]);

})();
