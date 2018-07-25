(function () {
    'use strict';

    var module = angular.module('fleetmanager');

    module.controller('MaintenanceCtrl', [
        '$rootScope', '$scope', '$state', '$sessionStorage', '$timeout', 'MaintenanceService', 'Response', '$uibModal', 'confirmm', 'notiffy',
        function ($rootScope, $scope, $state, $sessionStorage, $timeout, MaintenanceService, Response, $uibModal, confirmm, notiffy) {

            var vm = this;

            vm.user = $sessionStorage.userToken;

            if(!vm.user.maintenance){
                $state.go("index.car");
                notiffy.error('Acceso denegado.');
            }

            vm.stateDataOrigin = $sessionStorage.stateData;
            vm.stateData = $state.current.data;

            vm.inactiveMaintenances = false;
            vm.updateEnabled = false;
            vm.deactivateEnabled = false;
            vm.activateEnabled = false;
            vm.allselected = false;

            vm.car = $sessionStorage.carFormalities;

            vm.refresh = function () {
                $scope.main.loading = true;
                if(vm.inactiveMaintenances){
                    MaintenanceService.getMaintenancesInactives(vm.car.id).then(function () {
                        vm.maintenanceList = Response.maintenanceList;
                        vm.allselected = false;
                        $scope.main.loading = false;
                    }, function () {
                        notiffy.error('Error al obtener la lista de aseguradoras.');
                        $scope.main.loading = false;
                    });
                }else{
                    MaintenanceService.getMaintenances(vm.car.id).then(function () {
                        vm.maintenanceList = Response.maintenanceList;
                        vm.allselected = false;
                        $scope.main.loading = false;
                    }, function () {
                        notiffy.error('Error al obtener la lista de aseguradoras.');
                        $scope.main.loading = false;
                    });
                }
            };

            vm.refresh();

            vm.openMaintenanceModal = function (update) {
                var modalInstance = $uibModal.open({
                    templateUrl: 'views/formalities/maintenance.modal.html',
                    controller: 'MaintenanceModalCtrl',
                    controllerAs: 'vm',
                    resolve: {
                        maintenance: function () {
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
                    if (update) {
                        vm.openRepairModal(vm.selectedList[0]);
                    } else {
                      MaintenanceService.getOne($sessionStorage.maintenanceSession).then(function () {
                        vm.openRepairModal(Response.maintenance);
                      }, function () {
                        $scope.main.loading = false;
                        notiffy.error('Error al cargar reparaciones del mantenimiento.');
                      });
                    }

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
                angular.forEach(vm.maintenanceList, function (maintenance, index) {
                    if (maintenance.selected) {
                        vm.selectedList.push(maintenance);
                    } else {
                        vm.allselected = false;
                    }
                });
                if (vm.selectedList.length > 0) {
                    vm.activateEnabled = true;
                    vm.deactivateEnabled = true;
                }
                angular.forEach(vm.selectedList, function (maintenance, index) {
                    if (maintenance.active) {
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
                angular.forEach(vm.maintenanceList, function (maintenance, index) {
                    maintenance.selected = select;
                });
                vm.enableBts();
            };

            vm.activateMaintenances = function () {
                var message = '';
                if (vm.selectedList.length > 1) {
                    message = '¿Desea activar los mantenimientos ?';
                } else {
                    message = '¿Desea activar el mantenimiento ?';
                }
                confirmm.confirm(message, function () {
                    vm.loading = true;
                    MaintenanceService.activate(vm.selectedList).then(function () {
                        vm.loading = false;
                        if (Response.activated) {
                            notiffy.success('Mantenimientos activados.');
                        } else {
                            notiffy.error('Error al activar los mantenimiento.');
                        }
                        vm.refresh();
                    }, function () {
                        notiffy.error('Error al activar los mantenimiento.');
                    });
                });
            };


            vm.deactivateMaintenances = function () {
                var message = '';
                if (vm.selectedList.length > 1) {
                    message = '¿Desea desactivar los mantenimiento ?';
                } else {
                    message = '¿Desea desactivar el mantenimiento ?';
                }
                confirmm.confirm(message, function () {
                    vm.loading = true;
                    MaintenanceService.deactivate(vm.selectedList).then(function () {
                        vm.loading = false;
                        if (Response.deactivated) {
                            notiffy.success('Mantenimientos inactivados.');
                        } else {
                            notiffy.error('Error al desactivar los mantenimiento.');
                        }
                        vm.refresh();
                    }, function () {
                        notiffy.error('Error al desactivar los mantenimiento.');
                    });
                });
            };

            vm.goCloud = function (maintenance) {
                $sessionStorage.stateData = vm.stateData;
                $sessionStorage.selectedCloud = maintenance;
                $state.go("index.cloud");
            };

            vm.openRepairModal = function (maintenance) {
              var modalInstance = $uibModal.open({
                templateUrl: 'views/formalities/maintenanceRepair.modal.html',
                controller: 'RepairModalCtrl',
                controllerAs: 'vm',
                resolve: {
                  maintenance: function () {
                    return maintenance;
                  }
                }
              });
              modalInstance.result.then(function (selectedItem) {
                vm.refresh();
              }, function () {
                //$log.info('Modal dismissed at: ' + new Date());
              });
            };

            vm.openPreventiveModal = function () {
              var modalInstance = $uibModal.open({
                templateUrl: 'views/formalities/maintenancePreventive.modal.html',
                controller: 'PreventiveModalCtrl',
                controllerAs: 'vm'
              });
              modalInstance.result.then(function (selectedItem) {
                vm.refresh();
              }, function () {
                //$log.info('Modal dismissed at: ' + new Date());
              });
            };


        }]);

})();
