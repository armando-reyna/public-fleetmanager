(function () {
    'use strict';

    var module = angular.module('fleetmanager');

    module.controller('TorageCtrl', [
        '$rootScope', '$scope', '$state', '$sessionStorage', '$timeout', 'TorageService', 'Response', '$uibModal', 'confirmm', 'notiffy',
        function ($rootScope, $scope, $state, $sessionStorage, $timeout, TorageService, Response, $uibModal, confirmm, notiffy) {

            var vm = this;

            vm.user = $sessionStorage.userToken;

            if(!vm.user.torage){
                $state.go("index.car");
                notiffy.error('Acceso denegado.');
            }

            vm.stateDataOrigin = $sessionStorage.stateData;

            vm.stateData = $state.current.data;

            vm.inactiveTorages = false;
            vm.updateEnabled = false;
            vm.deactivateEnabled = false;
            vm.activateEnabled = false;
            vm.allselected = false;

            vm.car = $sessionStorage.carFormalities;

            vm.refresh = function () {
                $scope.main.loading = true;
                if(vm.inactiveTorages){
                    TorageService.getToragesInactives(vm.car.id).then(function () {
                        vm.torageList = Response.torageList;
                        vm.allselected = false;
                        $scope.main.loading = false;
                    }, function () {
                        notiffy.error('Error al obtener la lista de almacenajes.');
                        $scope.main.loading = false;
                    });
                }else{
                    TorageService.getTorages(vm.car.id).then(function () {
                        vm.torageList = Response.torageList;
                        vm.allselected = false;
                        $scope.main.loading = false;
                    }, function () {
                        notiffy.error('Error al obtener la lista de almacenajes.');
                        $scope.main.loading = false;
                    });
                }
            };

            vm.refresh();

            vm.openTorageModal = function (update) {
                var modalInstance = $uibModal.open({
                    templateUrl: 'views/formalities/storage.modal.html',
                    controller: 'TorageModalCtrl',
                    controllerAs: 'vm',
                    resolve: {
                        torage: function () {
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
                angular.forEach(vm.torageList, function (torage, index) {
                    if (torage.selected) {
                        vm.selectedList.push(torage);
                    } else {
                        vm.allselected = false;
                    }
                });
                if (vm.selectedList.length > 0) {
                    vm.activateEnabled = true;
                    vm.deactivateEnabled = true;
                }
                angular.forEach(vm.selectedList, function (torage, index) {
                    if (torage.active) {
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
                angular.forEach(vm.torageList, function (torage, index) {
                    torage.selected = select;
                });
                vm.enableBts();
            };

            vm.activateTorages = function () {
                var message = '';
                if (vm.selectedList.length > 1) {
                    message = '¿Desea activar los almacenajes ?';
                } else {
                    message = '¿Desea activar el almacenaje ?';
                }
                confirmm.confirm(message, function () {
                    vm.loading = true;
                    TorageService.activate(vm.selectedList).then(function () {
                        vm.loading = false;
                        if (Response.activated) {
                            notiffy.success('Almacenajes activados.');
                        } else {
                            notiffy.error('Error al activar los almacenajes.');
                        }
                        vm.refresh();
                    }, function () {
                        notiffy.error('Error al activar los almacenajes.');
                    });
                });
            };


            vm.deactivateTorages = function () {
                var message = '';
                if (vm.selectedList.length > 1) {
                    message = '¿Desea desactivar los almacenajes ?';
                } else {
                    message = '¿Desea desactivar el almacenaje ?';
                }
                confirmm.confirm(message, function () {
                    vm.loading = true;
                    TorageService.deactivate(vm.selectedList).then(function () {
                        vm.loading = false;
                        if (Response.deactivated) {
                            notiffy.success('Almacenajes inactivados.');
                        } else {
                            notiffy.error('Error al desactivar los almacenajes.');
                        }
                        vm.refresh();
                    }, function () {
                        notiffy.error('Error al desactivar los almacenajes.');
                    });
                });
            };


            vm.goCloud = function (torage) {
                $sessionStorage.stateData = vm.stateData;
                $sessionStorage.selectedCloud = torage;
                $state.go("index.cloud");
            };

        }]);

})();
