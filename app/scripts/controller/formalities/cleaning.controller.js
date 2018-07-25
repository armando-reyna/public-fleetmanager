(function () {
    'use strict';

    var module = angular.module('fleetmanager');

    module.controller('CleaningCtrl', [
        '$rootScope', '$scope', '$state', '$sessionStorage', '$timeout', 'CleaningService', 'Response', '$uibModal', 'confirmm', 'notiffy',
        function ($rootScope, $scope, $state, $sessionStorage, $timeout, CleaningService, Response, $uibModal, confirmm, notiffy) {

            var vm = this;


            vm.user = $sessionStorage.userToken;

            if(!vm.user.cleaning){
                $state.go("index.car");
                notiffy.error('Acceso denegado.');
            }

            vm.stateDataOrigin = $sessionStorage.stateData;
            vm.stateData = $state.current.data;

            vm.inactiveCleanings = false;
            vm.updateEnabled = false;
            vm.deactivateEnabled = false;
            vm.activateEnabled = false;
            vm.allselected = false;

            vm.car = $sessionStorage.carFormalities;

            vm.refresh = function () {
                $scope.main.loading = true;

                if(vm.inactiveCleanings){
                    CleaningService.getCleaningsInactives(vm.car.id).then(function () {
                        vm.cleaningList = Response.cleaningList;
                        vm.allselected = false;
                        $scope.main.loading = false;
                    }, function () {
                        notiffy.error('Error al obtener las limpiezas de los vehículos.');
                        $scope.main.loading = false;
                    });
                }else{
                    CleaningService.getCleanings(vm.car.id).then(function () {
                        vm.cleaningList = Response.cleaningList;
                        vm.allselected = false;
                        $scope.main.loading = false;
                    }, function () {
                        notiffy.error('Error al obtener las limpiezas de los vehículos.');
                        $scope.main.loading = false;
                    });
                }

            };

            vm.refresh();

            vm.openCleaningModal = function (update) {
                var modalInstance = $uibModal.open({
                    templateUrl: 'views/formalities/cleaning.modal.html',
                    controller: 'CleaningModalCtrl',
                    controllerAs: 'vm',
                    resolve: {
                        cleaning: function () {
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
                angular.forEach(vm.cleaningList, function (cleaning, index) {
                    if (cleaning.selected) {
                        vm.selectedList.push(cleaning);
                    } else {
                        vm.allselected = false;
                    }
                });
                if (vm.selectedList.length > 0) {
                    vm.activateEnabled = true;
                    vm.deactivateEnabled = true;
                }
                angular.forEach(vm.selectedList, function (cleaning, index) {
                    if (cleaning.active) {
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
                angular.forEach(vm.cleaningList, function (cleaning, index) {
                    cleaning.selected = select;
                });
                vm.enableBts();
            };

            vm.activateCleanings = function () {
                var message = '';
                if (vm.selectedList.length > 1) {
                    message = '¿Desea activar las limpiezas ?';
                } else {
                    message = '¿Desea activar la limpieza ?';
                }
                confirmm.confirm(message, function () {
                    vm.loading = true;
                    CleaningService.activate(vm.selectedList).then(function () {
                        vm.loading = false;
                        if (Response.activated) {
                            notiffy.success('Limpiezas activadas.');
                        } else {
                            notiffy.error('Error al activar las limpiezas.');
                        }
                        vm.refresh();
                    }, function () {
                        notiffy.error('Error al activar las limpiezas.');
                    });
                });
            };


            vm.deactivateCleanings = function () {
                var message = '';
                if (vm.selectedList.length > 1) {
                    message = '¿Desea desactivar las limpiezas ?';
                } else {
                    message = '¿Desea desactivar la limpieza ?';
                }
                confirmm.confirm(message, function () {
                    vm.loading = true;
                    CleaningService.deactivate(vm.selectedList).then(function () {
                        vm.loading = false;
                        if (Response.deactivated) {
                            notiffy.success('Limpiezas inactivadas.');
                        } else {
                            notiffy.error('Error al desactivar las limpiezas.');
                        }
                        vm.refresh();
                    }, function () {
                        notiffy.error('Error al desactivar las limpiezas.');
                    });
                });
            };


            vm.goCloud = function (cleaning) {
                $sessionStorage.stateData = vm.stateData;
                $sessionStorage.selectedCloud = cleaning;
                $state.go("index.cloud");
            };

        }]);

})();
