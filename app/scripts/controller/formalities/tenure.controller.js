(function () {
    'use strict';

    var module = angular.module('fleetmanager');

    module.controller('TenureCtrl', [
        '$rootScope', '$scope', '$state', '$sessionStorage', '$timeout', 'TenureService', 'Response', '$uibModal', 'confirmm', 'notiffy',
        function ($rootScope, $scope, $state, $sessionStorage, $timeout, TenureService, Response, $uibModal, confirmm, notiffy) {

            var vm = this;

            vm.user = $sessionStorage.userToken;

            if(!vm.user.tenure){
                $state.go("index.car");
                notiffy.error('Acceso denegado.');
            }

            vm.stateDataOrigin = $sessionStorage.stateData;
            vm.stateData = $state.current.data;

            vm.inactiveTenures = false;
            vm.updateEnabled = false;
            vm.deactivateEnabled = false;
            vm.activateEnabled = false;
            vm.allselected = false;


            vm.car = $sessionStorage.carFormalities;

            vm.refresh = function () {
                $scope.main.loading = true;
                if(vm.inactiveTenures){
                    TenureService.getTenuresInactives(vm.car.id).then(function () {
                        vm.tenureList = Response.tenureList;
                        vm.allselected = false;
                        $scope.main.loading = false;
                    }, function () {
                        notiffy.error('Error al obtener la lista de tenencias.');
                        $scope.main.loading = false;
                    });
                }else{
                    TenureService.getTenures(vm.car.id).then(function () {
                        vm.tenureList = Response.tenureList;
                        vm.allselected = false;
                        $scope.main.loading = false;
                    }, function () {
                        notiffy.error('Error al obtener la lista de tenencias.');
                        $scope.main.loading = false;
                    });
                }
            };

            vm.refresh();

            vm.openTenureModal = function (update) {
                var modalInstance = $uibModal.open({
                    templateUrl: 'views/formalities/tenure.modal.html',
                    controller: 'TenureModalCtrl',
                    controllerAs: 'vm',
                    resolve: {
                        tenure: function () {
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
                angular.forEach(vm.tenureList, function (tenure, index) {
                    if (tenure.selected) {
                        vm.selectedList.push(tenure);
                    } else {
                        vm.allselected = false;
                    }
                });
                if (vm.selectedList.length > 0) {
                    vm.activateEnabled = true;
                    vm.deactivateEnabled = true;
                }
                angular.forEach(vm.selectedList, function (tenure, index) {
                    if (tenure.active) {
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
                angular.forEach(vm.tenureList, function (tenure, index) {
                    tenure.selected = select;
                });
                vm.enableBts();
            };

            vm.activateTenures = function () {
                var message = '';
                if (vm.selectedList.length > 1) {
                    message = '¿Desea activar las tenencias ?';
                } else {
                    message = '¿Desea activar la tenencia ?';
                }
                confirmm.confirm(message, function () {
                    vm.loading = true;
                    TenureService.activate(vm.selectedList).then(function () {
                        vm.loading = false;
                        if (Response.activated) {
                            notiffy.success('Tenencias activadas.');
                        } else {
                            notiffy.error('Error al activar las tenencias.');
                        }
                        vm.refresh();
                    }, function () {
                        notiffy.error('Error al activar las tenencias.');
                    });
                });
            };


            vm.deactivateTenures = function () {
                var message = '';
                if (vm.selectedList.length > 1) {
                    message = '¿Desea desactivar las tenencias ?';
                } else {
                    message = '¿Desea desactivar la tenencia ?';
                }
                confirmm.confirm(message, function () {
                    vm.loading = true;
                    TenureService.deactivate(vm.selectedList).then(function () {
                        vm.loading = false;
                        if (Response.deactivated) {
                            notiffy.success('Tenencias inactivadas.');
                        } else {
                            notiffy.error('Error al desactivar las tenencias.');
                        }
                        vm.refresh();
                    }, function () {
                        notiffy.error('Error al desactivar las tenencias.');
                    });
                });
            };


            vm.goCloud = function (tenure) {
                $sessionStorage.stateData = vm.stateData;
                $sessionStorage.selectedCloud = tenure;
                $state.go("index.cloud");
            };

        }]);

})();
