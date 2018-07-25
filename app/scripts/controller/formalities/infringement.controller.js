(function () {
    'use strict';

    var module = angular.module('fleetmanager');

    module.controller('InfringementCtrl', [
        '$rootScope', '$scope', '$state', '$sessionStorage', '$timeout', 'InfringementService', 'Response', '$uibModal', 'confirmm', 'notiffy',
        function ($rootScope, $scope, $state, $sessionStorage, $timeout, InfringementService, Response, $uibModal, confirmm, notiffy) {

            var vm = this;

            vm.user = $sessionStorage.userToken;

            if(!vm.user.infringement){
                $state.go("index.car");
                notiffy.error('Acceso denegado.');
            }

            vm.stateDataOrigin = $sessionStorage.stateData;
            vm.stateData = $state.current.data;

            vm.inactiveInfringements = false;
            vm.updateEnabled = false;
            vm.deactivateEnabled = false;
            vm.activateEnabled = false;
            vm.allselected = false;

            vm.car = $sessionStorage.carFormalities;

            vm.refresh = function () {
                $scope.main.loading = true;
                if(vm.inactiveInfringements){
                    InfringementService.getInfringementsInactives(vm.car.id).then(function () {
                        vm.infringementList = Response.infringementList;
                        vm.allselected = false;
                        $scope.main.loading = false;
                    }, function () {
                        notiffy.error('Error al obtener la lista de infracciones.');
                        $scope.main.loading = false;
                    });
                }else{
                    InfringementService.getInfringements(vm.car.id).then(function () {
                        vm.infringementList = Response.infringementList;
                        vm.allselected = false;
                        $scope.main.loading = false;
                    }, function () {
                        notiffy.error('Error al obtener la lista de infracciones.');
                        $scope.main.loading = false;
                    });
                }

            };

            vm.refresh();

            vm.openInfringementModal = function (update) {
                var modalInstance = $uibModal.open({
                    templateUrl: 'views/formalities/infringement.modal.html',
                    controller: 'InfringementModalCtrl',
                    controllerAs: 'vm',
                    resolve: {
                        infringement: function () {
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
                angular.forEach(vm.infringementList, function (infringement, index) {
                    if (infringement.selected) {
                        vm.selectedList.push(infringement);
                    } else {
                        vm.allselected = false;
                    }
                });
                if (vm.selectedList.length > 0) {
                    vm.activateEnabled = true;
                    vm.deactivateEnabled = true;
                }
                angular.forEach(vm.selectedList, function (infringement, index) {
                    if (infringement.active) {
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
                angular.forEach(vm.infringementList, function (infringement, index) {
                    infringement.selected = select;
                });
                vm.enableBts();
            };

            vm.activateInfringements = function () {
                var message = '';

                if (vm.selectedList.length > 1) {
                    message = '¿Desea activar las infracciones ?';
                } else {
                    message = '¿Desea activar la infracción ?';
                }
                confirmm.confirm(message, function () {
                    vm.loading = true;
                    InfringementService.activate(vm.selectedList).then(function () {
                        vm.loading = false;
                        if (Response.activated) {
                            notiffy.success('Infracciones activadas.');
                        } else {
                            notiffy.error('Error al activar las infracciones.');
                        }
                        vm.refresh();
                    }, function () {
                        notiffy.error('Error al activar las infracciones.');
                    });
                });
            };


            vm.deactivateInfringements = function () {
                var message = '';
                if (vm.selectedList.length > 1) {
                    message = '¿Desea desactivar las infracciones ?';
                } else {
                    message = '¿Desea desactivar la infracción ?';
                }
                confirmm.confirm(message, function () {
                    vm.loading = true;
                    InfringementService.deactivate(vm.selectedList).then(function () {
                        vm.loading = false;
                        if (Response.deactivated) {
                            notiffy.success('Infracciones inactivadas.');
                        } else {
                            notiffy.error('Error al desactivar las infracciones.');
                        }
                        vm.refresh();
                    }, function () {
                        notiffy.error('Error al desactivar las infracciones.');
                    });
                });
            };

            vm.goCloud = function (infringement) {
                $sessionStorage.stateData = vm.stateData;
                $sessionStorage.selectedCloud = infringement;
                $state.go("index.cloud");
            };

        }]);

})();
