(function () {
    'use strict';

    var module = angular.module('fleetmanager');

    module.controller('InsuranceCtrl', [
        '$rootScope', '$scope', '$state', '$sessionStorage', '$timeout', 'InsuranceService', 'Response', '$uibModal', 'confirmm', 'notiffy',
        function ($rootScope, $scope, $state, $sessionStorage, $timeout, InsuranceService, Response, $uibModal, confirmm, notiffy) {

            var vm = this;

            vm.user = $sessionStorage.userToken;

            if(!vm.user.insurance){
                $state.go("index.car");
                notiffy.error('Acceso denegado.');
            }

            vm.stateDataOrigin = $sessionStorage.stateData;
            vm.stateData = $state.current.data;

            vm.inactiveInsurances = false;
            vm.updateEnabled = false;
            vm.deactivateEnabled = false;
            vm.activateEnabled = false;
            vm.allselected = false;

            vm.car = $sessionStorage.carFormalities;

            vm.refresh = function () {
                $scope.main.loading = true;
                if(vm.inactiveInsurances){
                    InsuranceService.getInsurancesInactives(vm.car.id).then(function () {
                        vm.insuranceList = Response.insuranceList;
                        vm.allselected = false;
                        $scope.main.loading = false;
                    }, function () {
                        notiffy.error('Error al obtener la lista de aseguradoras.');
                        $scope.main.loading = false;
                    });
                }else{
                    InsuranceService.getInsurances(vm.car.id).then(function () {
                        vm.insuranceList = Response.insuranceList;
                        vm.allselected = false;
                        $scope.main.loading = false;
                    }, function () {
                        notiffy.error('Error al obtener la lista de aseguradoras.');
                        $scope.main.loading = false;
                    });
                }

            };

            vm.refresh();

            vm.openInsuranceModal = function (update) {
                var modalInstance = $uibModal.open({
                    templateUrl: 'views/formalities/insurance.modal.html',
                    controller: 'InsuranceModalCtrl',
                    controllerAs: 'vm',
                    resolve: {
                        insurance: function () {
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
                angular.forEach(vm.insuranceList, function (insurance, index) {
                    if (insurance.selected) {
                        vm.selectedList.push(insurance);
                    } else {
                        vm.allselected = false;
                    }
                });
                if (vm.selectedList.length > 0) {
                    vm.activateEnabled = true;
                    vm.deactivateEnabled = true;
                }
                angular.forEach(vm.selectedList, function (insurance, index) {
                    if (insurance.active) {
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
                angular.forEach(vm.insuranceList, function (insurance, index) {
                    insurance.selected = select;
                });
                vm.enableBts();
            };

            vm.activateInsurances = function () {
                var message = '';

                if (vm.selectedList.length > 1) {
                    message = '¿Desea activar las aseguradoras ?';
                } else {
                    message = '¿Desea activar la aseguradora ?';
                }
                confirmm.confirm(message, function () {
                    vm.loading = true;
                    InsuranceService.activate(vm.selectedList).then(function () {
                        vm.loading = false;
                        if (Response.activated) {
                            notiffy.success('Aseguradoras activadas.');
                        } else {
                            notiffy.error('Error al activar las aseguradoras.');
                        }
                        vm.refresh();
                    }, function () {
                        notiffy.error('Error al activar las aseguradoras.');
                    });
                });
            };


            vm.deactivateInsurances = function () {
                var message = '';
                if (vm.selectedList.length > 1) {
                    message = '¿Desea desactivar las aseguradoras ?';
                } else {
                    message = '¿Desea desactivar la aseguradora ?';
                }
                confirmm.confirm(message, function () {
                    vm.loading = true;
                    InsuranceService.deactivate(vm.selectedList).then(function () {
                        vm.loading = false;
                        if (Response.deactivated) {
                            notiffy.success('Aseguradoras inactivadas.');
                        } else {
                            notiffy.error('Error al desactivar las aseguradoras.');
                        }
                        vm.refresh();
                    }, function () {
                        notiffy.error('Error al desactivar las aseguradoras.');
                    });
                });
            };

            vm.goCloud = function (insurance) {
                $sessionStorage.stateData = vm.stateData;
                $sessionStorage.selectedCloud = insurance;
                $state.go("index.cloud");
            };

        }]);

})();
