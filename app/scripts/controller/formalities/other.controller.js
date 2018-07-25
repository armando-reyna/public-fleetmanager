(function () {
    'use strict';

    var module = angular.module('fleetmanager');

    module.controller('OtherCtrl', [
        '$rootScope', '$scope', '$state', '$sessionStorage', '$timeout', 'OtherService', 'Response', '$uibModal', 'confirmm', 'notiffy',
        function ($rootScope, $scope, $state, $sessionStorage, $timeout, OtherService, Response, $uibModal, confirmm, notiffy) {

            var vm = this;

            vm.user = $sessionStorage.userToken;

            if(!vm.user.other){
                $state.go("index.car");
                notiffy.error('Acceso denegado.');
            }

            vm.stateDataOrigin = $sessionStorage.stateData;
            vm.stateData = $state.current.data;

            vm.inactiveOthers = false;
            vm.updateEnabled = false;
            vm.deactivateEnabled = false;
            vm.activateEnabled = false;
            vm.allselected = false;

            vm.car = $sessionStorage.carFormalities;

            vm.refresh = function () {
                $scope.main.loading = true;
                if(vm.inactiveOthers){
                    OtherService.getOthersInactives(vm.car.id).then(function () {
                        vm.otherList = Response.otherList;
                        vm.allselected = false;
                        $scope.main.loading = false;
                    }, function () {
                        notiffy.error('Error al obtener la lista de almacenajes.');
                        $scope.main.loading = false;
                    });
                }else{
                    OtherService.getOthers(vm.car.id).then(function () {
                        vm.otherList = Response.otherList;
                        vm.allselected = false;
                        $scope.main.loading = false;
                    }, function () {
                        notiffy.error('Error al obtener la lista de almacenajes.');
                        $scope.main.loading = false;
                    });
                }
            };

            vm.refresh();

            vm.openOtherModal = function (update) {
                var modalInstance = $uibModal.open({
                    templateUrl: 'views/formalities/other.modal.html',
                    controller: 'OtherModalCtrl',
                    controllerAs: 'vm',
                    resolve: {
                        other: function () {
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
                angular.forEach(vm.otherList, function (other, index) {
                    if (other.selected) {
                        vm.selectedList.push(other);
                    } else {
                        vm.allselected = false;
                    }
                });
                if (vm.selectedList.length > 0) {
                    vm.activateEnabled = true;
                    vm.deactivateEnabled = true;
                }
                angular.forEach(vm.selectedList, function (other, index) {
                    if (other.active) {
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
                angular.forEach(vm.otherList, function (other, index) {
                    other.selected = select;
                });
                vm.enableBts();
            };

            vm.activateOthers = function () {
                var message = '';
                if (vm.selectedList.length > 1) {
                    message = '¿Desea activar los tramites ?';
                } else {
                    message = '¿Desea activar el tramite ?';
                }
                confirmm.confirm(message, function () {
                    vm.loading = true;
                    OtherService.activate(vm.selectedList).then(function () {
                        vm.loading = false;
                        if (Response.activated) {
                            notiffy.success('Tramites activados.');
                        } else {
                            notiffy.error('Error al activar los tramites.');
                        }
                        vm.refresh();
                    }, function () {
                        notiffy.error('Error al activar los tramites.');
                    });
                });
            };


            vm.deactivateOthers = function () {
                var message = '';
                if (vm.selectedList.length > 1) {
                    message = '¿Desea desactivar las tramites ?';
                } else {
                    message = '¿Desea desactivar el tramite ?';
                }
                confirmm.confirm(message, function () {
                    vm.loading = true;
                    OtherService.deactivate(vm.selectedList).then(function () {
                        vm.loading = false;
                        if (Response.deactivated) {
                            notiffy.success('Tramites inactivados.');
                        } else {
                            notiffy.error('Error al desactivar los tramites.');
                        }
                        vm.refresh();
                    }, function () {
                        notiffy.error('Error al desactivar los tramites.');
                    });
                });
            };

            vm.goCloud = function (other) {
                $sessionStorage.stateData = vm.stateData;
                $sessionStorage.selectedCloud = other;
                $state.go("index.cloud");
            };


        }]);

})();
