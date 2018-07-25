(function () {
    'use strict';

    var module = angular.module('fleetmanager');

    module.controller('ChargeGasCardCtrl', [
        '$rootScope', '$scope', '$state', '$sessionStorage', '$timeout', 'CarService', 'ChargeGasCardService', 'Response', '$uibModal', 'confirmm', 'notiffy',
        function ($rootScope, $scope, $state, $sessionStorage, $timeout, CarService, ChargeGasCardService, Response, $uibModal, confirmm, notiffy) {


            var vm = this;

            vm.user = $sessionStorage.userToken;

            if(!vm.user.chargeGas){
                $state.go("index.car");
                notiffy.error('Acceso denegado.');

            }

            vm.stateDataOrigin = $sessionStorage.stateData;

            vm.stateData = $state.current.data;

            vm.otherChargeGasCards = false;
            vm.mostrarSinTarjetaAsignada = true;

            vm.deactivateEnabled = false;



            vm.refreshChargeGasCard = function () {
                vm.loading = true;
                if(vm.otherChargeGasCards){
                    ChargeGasCardService.getAllChargeGasCardByVehicle($sessionStorage.carFormalities.id).then(function () {
                        vm.chargeGasCardList = Response.chargeGasCardList;
                        $scope.main.loading = false;
                    }, function () {
                        notiffy.error('Error al obtener la lista de cargas.');
                        $scope.main.loading = false;
                    });
                }else{
                    CarService.getOne($sessionStorage.carFormalities.id).then(function () {
                        vm.loading = false;
                        if(Response.car.id == null){
                            notiffy.error('Error al obtener datos del vehículo');
                        }else {
                            vm.car = Response.car;
                            if(vm.car.gasCard == null){
                                notiffy.error('Vehículo sin tarjeta de gas asignada');
                                vm.mostrarSinTarjetaAsignada = false;
                            }
                            vm.loadGasCardActive();
                        }

                    }, function () {
                        vm.loading = false;
                        notiffy.error('Error al obtener los datos del vehículo');
                    });
                }
            };

            vm.refreshChargeGasCard();


            vm.loadGasCardActive = function () {
                $scope.main.loading = true;
                ChargeGasCardService.getChargeGasCardByVehicleAndGasCard(vm.car.id).then(function () {
                    vm.chargeGasCardList = Response.chargeGasCardList;
                    $scope.main.loading = false;
                }, function () {
                    notiffy.error('Error al obtener la lista de cargas.');
                    $scope.main.loading = false;
                });
            };


            vm.openChargeGasCardModal = function (update) {
                var modalInstance = $uibModal.open({
                    templateUrl: 'views/formalities/chargeGasCard.modal.html',
                    controller: 'ChargeGasCardModalCtrl',
                    controllerAs: 'vm',
                    size: 'lg',
                    resolve: {
                        chargeGasCard: function () {
                            if (update) {
                                return vm.selectedList[0];
                            } else {
                                return undefined;
                            }
                        }
                    }
                });
                modalInstance.result.then(function (selectedItem) {
                    vm.refreshChargeGasCard();
                }, function () {
                    //$log.info('Modal dismissed at: ' + new Date());
                });
            };





            ///////////////SELECCIONAR
            vm.enableBts = function () {
                vm.selectedList = [];
                vm.deactivateEnabled = false;
                vm.allselected = true;
                angular.forEach(vm.chargeGasCardList, function (chargeGasCard, index) {
                    if (chargeGasCard.selected) {
                        vm.selectedList.push(chargeGasCard);
                    } else {
                        vm.allselected = false;
                    }
                });
                if (vm.selectedList.length > 0) {
                    vm.deactivateEnabled = true;
                }
                angular.forEach(vm.selectedList, function (chargeGasCard, index) {
                    if (chargeGasCard.active) {
                        vm.activateEnabled = false;
                    } else {
                        vm.deactivateEnabled = false;
                    }
                });

            };

            vm.selectAll = function () {
                var select = !vm.allselected;
                angular.forEach(vm.chargeGasCardList, function (chargeGasCard, index) {
                    chargeGasCard.selected = select;
                });
                vm.enableBts();
            };


            vm.deactivateUsers = function () {
                var message = '';
                if (vm.selectedList.length > 1) {
                    message = '¿Desea desactivar las cargas de gas ?';
                } else {
                    message = '¿Desea desactivar la carga de gas ?';
                }
                confirmm.confirm(message, function () {
                    vm.loading = true;
                    ChargeGasCardService.deactivate(vm.selectedList).then(function () {
                        vm.loading = false;
                        if (Response.deactivated) {
                            notiffy.success('Cargas de gas desactivadas.');
                        } else {
                            notiffy.error('Error al desactivar las cargas de gas.');
                        }
                        vm.refreshChargeGasCard();
                    }, function () {
                        notiffy.error('Error al desactivar las cargas de gas.');
                    });
                });
            };


            ///////////////////////////






            vm.goCloud = function (chargeGasCard) {
                $sessionStorage.stateData = vm.stateData;
                $sessionStorage.selectedCloud = chargeGasCard;
                $state.go("index.cloud");
            };

        }]);

})();
