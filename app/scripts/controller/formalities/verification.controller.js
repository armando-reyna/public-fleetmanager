(function () {
    'use strict';

    var module = angular.module('fleetmanager');

    module.controller('VerificationCtrl', [
        '$rootScope', '$scope', '$state', '$sessionStorage', '$timeout', 'VerificationService', 'Response', '$uibModal', 'confirmm', 'notiffy',
        function ($rootScope, $scope, $state, $sessionStorage, $timeout, VerificationService, Response, $uibModal, confirmm, notiffy) {

            var vm = this;

            vm.user = $sessionStorage.userToken;

            if(!vm.user.verification){
                $state.go("index.car");
                notiffy.error('Acceso denegado.');
            }

            vm.stateDataOrigin = $sessionStorage.stateData;
            vm.stateData = $state.current.data;

            vm.inactiveVerifications = false;
            vm.updateEnabled = false;
            vm.deactivateEnabled = false;
            vm.activateEnabled = false;
            vm.allselected = false;

            vm.car = $sessionStorage.carFormalities;

            vm.refresh = function () {
              $scope.main.loading = true;
              if(vm.inactiveVerifications){
                VerificationService.getVerificationsInactives(vm.car.id).then(function () {
                  vm.verificationList = Response.verificationList;
                  vm.allselected = false;
                  $scope.main.loading = false;
                }, function () {
                  notiffy.error('Error al obtener la lista de tenencias.');
                  $scope.main.loading = false;
                });
              }else{
                VerificationService.getVerifications(vm.car.id).then(function () {
                  vm.verificationList = Response.verificationList;
                  vm.allselected = false;
                  $scope.main.loading = false;
                }, function () {
                  notiffy.error('Error al obtener la lista de tenencias.');
                  $scope.main.loading = false;
                });
              }
            };

            vm.refresh();

            vm.openVerificationModal = function (update) {
                var modalInstance = $uibModal.open({
                    templateUrl: 'views/formalities/verification.modal.html',
                    controller: 'VerificationModalCtrl',
                    controllerAs: 'vm',
                    resolve: {
                        verification: function () {
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
                angular.forEach(vm.verificationList, function (verification, index) {
                    if (verification.selected) {
                        vm.selectedList.push(verification);
                    } else {
                        vm.allselected = false;
                    }
                });
                if (vm.selectedList.length > 0) {
                    vm.activateEnabled = true;
                    vm.deactivateEnabled = true;
                }
                angular.forEach(vm.selectedList, function (verification, index) {
                    if (verification.active) {
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
                angular.forEach(vm.verificationList, function (verification, index) {
                    verification.selected = select;
                });
                vm.enableBts();
            };

            vm.activateVerifications = function () {
                var message = '';
                if (vm.selectedList.length > 1) {
                    message = '¿Desea activar las verificaciones ?';
                } else {
                    message = '¿Desea activar la verificación ?';
                }
                confirmm.confirm(message, function () {
                    vm.loading = true;
                    VerificationService.activate(vm.selectedList).then(function () {
                        vm.loading = false;
                        if (Response.activated) {
                            notiffy.success('Verificaciones activadas.');
                        } else {
                            notiffy.error('Error al activar las verificaciones.');
                        }
                        vm.refresh();
                    }, function () {
                        notiffy.error('Error al activar las verificaciones.');
                    });
                });
            };


            vm.deactivateVerifications = function () {
                var message = '';
                if (vm.selectedList.length > 1) {
                    message = '¿Desea desactivar las verificaciones ?';
                } else {
                    message = '¿Desea desactivar la verificación ?';
                }
                confirmm.confirm(message, function () {
                    vm.loading = true;
                    VerificationService.deactivate(vm.selectedList).then(function () {
                        vm.loading = false;
                        if (Response.deactivated) {
                            notiffy.success('Verificaciones inactivadas.');
                        } else {
                            notiffy.error('Error al desactivar las verificaciones.');
                        }
                        vm.refresh();
                    }, function () {
                        notiffy.error('Error al desactivar las verificaciones.');
                    });
                });
            };


            vm.goCloud = function (verification) {
                $sessionStorage.stateData = vm.stateData;
                $sessionStorage.selectedCloud = verification;
                $state.go("index.cloud");
            };

        }]);

})();
