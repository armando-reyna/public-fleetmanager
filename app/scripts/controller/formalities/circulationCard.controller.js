(function () {
    'use strict';

    var module = angular.module('fleetmanager');

    module.controller('CirculationCardCtrl', [
        '$rootScope', '$scope', '$state', '$sessionStorage', '$timeout', 'CirculationCardService', 'Response', '$uibModal', 'confirmm', 'notiffy',
        function ($rootScope, $scope, $state, $sessionStorage, $timeout, CirculationCardService, Response, $uibModal, confirmm, notiffy) {

            var vm = this;

            vm.user = $sessionStorage.userToken;

            if(!vm.user.circulationCard){
                $state.go("index.car");
                notiffy.error('Acceso denegado.');
            }

            vm.stateDataOrigin = $sessionStorage.stateData;
            vm.stateData = $state.current.data;

            vm.inactiveCirculationCards = false;
            vm.updateEnabled = false;
            vm.deactivateEnabled = false;
            vm.activateEnabled = false;
            vm.allselected = false;

            vm.car = $sessionStorage.carFormalities;

            vm.refresh = function () {
                $scope.main.loading = true;
                if(vm.inactiveCirculationCards){
                    CirculationCardService.getCirculationCardsInactives(vm.car.id).then(function () {
                        vm.circulationCardList = Response.circulationCardList;
                        vm.allselected = false;
                        $scope.main.loading = false;
                    }, function () {
                        notiffy.error('Error al obtener la lista de tarjetas.');
                        $scope.main.loading = false;
                    });
                }else{
                    CirculationCardService.getCirculationCards(vm.car.id).then(function () {
                        vm.circulationCardList = Response.circulationCardList;
                        vm.allselected = false;
                        $scope.main.loading = false;
                    }, function () {
                        notiffy.error('Error al obtener la lista de tarjetas.');
                        $scope.main.loading = false;
                    });
                }

            };

            vm.refresh();

            vm.openCirculationCardModal = function (update) {
                var modalInstance = $uibModal.open({
                    templateUrl: 'views/formalities/circulationCard.modal.html',
                    controller: 'CirculationCardModalCtrl',
                    controllerAs: 'vm',
                    resolve: {
                        circulationCard: function () {
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
                angular.forEach(vm.circulationCardList, function (circulationCard, index) {
                    if (circulationCard.selected) {
                        vm.selectedList.push(circulationCard);
                    } else {
                        vm.allselected = false;
                    }
                });
                if (vm.selectedList.length > 0) {
                    vm.activateEnabled = true;
                    vm.deactivateEnabled = true;
                }
                angular.forEach(vm.selectedList, function (circulationCard, index) {
                    if (circulationCard.active) {
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
                angular.forEach(vm.circulationCardList, function (circulationCard, index) {
                    circulationCard.selected = select;
                });
                vm.enableBts();
            };

            vm.activateCirculationCards = function () {
                var message = '';

                if (vm.selectedList.length > 1) {
                    message = '¿Desea activar las tarjetas ?';
                } else {
                    message = '¿Desea activar la tarjeta ?';
                }
                confirmm.confirm(message, function () {
                    vm.loading = true;
                    CirculationCardService.activate(vm.selectedList).then(function () {
                        vm.loading = false;
                        if (Response.activated) {
                            notiffy.success('Tarjetas activadas.');
                        } else {
                            notiffy.error('Error al activar las tarjetas.');
                        }
                        vm.refresh();
                    }, function () {
                        notiffy.error('Error al activar las tarjetas.');
                    });
                });
            };


            vm.deactivateCirculationCards = function () {
                var message = '';
                if (vm.selectedList.length > 1) {
                    message = '¿Desea desactivar las tarjetas ?';
                } else {
                    message = '¿Desea desactivar la tarjeta ?';
                }
                confirmm.confirm(message, function () {
                    vm.loading = true;
                    CirculationCardService.deactivate(vm.selectedList).then(function () {
                        vm.loading = false;
                        if (Response.deactivated) {
                            notiffy.success('Tarjetas inactivadas.');
                        } else {
                            notiffy.error('Error al desactivar las tarjetas.');
                        }
                        vm.refresh();
                    }, function () {
                        notiffy.error('Error al desactivar las tarjetas.');
                    });
                });
            };

            vm.goCloud = function (circulationCard) {
                $sessionStorage.stateData = vm.stateData;
                $sessionStorage.selectedCloud = circulationCard;
                $state.go("index.cloud");
            };

        }]);

})();
