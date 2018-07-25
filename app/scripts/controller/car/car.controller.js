(function () {
  'use strict';

  var module = angular.module('fleetmanager');

  module.controller('CarCtrl', [
    'CONSTANTS', '$rootScope', '$scope', '$state', '$sessionStorage', '$timeout', 'CarService', 'Response', '$uibModal', 'confirmm', 'notiffy',
    function (CONSTANTS, $rootScope, $scope, $state, $sessionStorage, $timeout, CarService, Response, $uibModal, confirmm, notiffy) {

      var vm = this;

      vm.user = $sessionStorage.userToken;

      vm.userAdmin = false;

      if(vm.user.role.id == CONSTANTS.ROLES.ADMIN){
        vm.userAdmin = true;
      }

      vm.stateData = $state.current.data;

      vm.inactiveCars = false;
      vm.updateEnabled = false;
      vm.deactivateEnabled = false;
      vm.activateEnabled = false;
      vm.allselected = false;

      vm.refresh = function () {
        $scope.main.loading = true;
        CarService.getCars(vm.inactiveCars).then(function () {
          vm.carList = Response.carList;
          vm.allselected = false;
          $scope.main.loading = false;
        }, function () {
          notiffy.error('Error al obtener la lista de vehículos.');
          $scope.main.loading = false;
        });
      };

      vm.refresh();

      vm.openCarModal = function (update) {
        var modalInstance = $uibModal.open({
          templateUrl: 'views/car/car.modal.html',
          controller: 'CarModalCtrl',
          controllerAs: 'vm',
          size: 'lg',
          resolve: {
            car: function () {
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
          vm.refresh();
        });
      };


      vm.openDocModal = function (car) {
        $sessionStorage.carFormalities = car;
        $sessionStorage.stateData = vm.stateData;
        $sessionStorage.selectedCloud = car;
        $state.go("index.mainFormalities");
      };

      vm.openNotificationModal = function () {
        $uibModal.open({
          templateUrl: 'views/car/car.notification.modal.html',
          controller: 'CarNotificationCtrl',
          controllerAs: 'vm'
        });
      };


      vm.enableBts = function () {
        vm.selectedList = [];
        vm.activateEnabled = false;
        vm.deactivateEnabled = false;
        vm.updateEnabled = false;
        vm.allselected = true;
        angular.forEach(vm.carList, function (car, index) {
          if (car.selected) {
            vm.selectedList.push(car);
          } else {
            vm.allselected = false;
          }
        });
        if (vm.selectedList.length > 0) {
          vm.activateEnabled = true;
          vm.deactivateEnabled = true;
        }
        angular.forEach(vm.selectedList, function (car, index) {
          if (car.active) {
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
        angular.forEach(vm.carList, function (car, index) {
          car.selected = select;
        });
        vm.enableBts();
      };

      vm.activateCars = function () {
        var message = '';
        angular.forEach(vm.selectedList, function (car, index) {
          message += car.plates;
          if (index < vm.selectedList.length - 2) {
            message += ', ';
          } else if (index < vm.selectedList.length - 1) {
            message += ' y ';
          }
        });
        if (vm.selectedList.length > 1) {
          message = '¿Desea activar a los vehículos ' + message + '?';
        } else {
          message = '¿Desea activar a ' + message + '?';
        }
        confirmm.confirm(message, function () {
          vm.loading = true;
          CarService.activate(vm.selectedList).then(function () {
            vm.loading = false;
            if (Response.activated) {
              notiffy.success('Vehículos activados.');
            } else {
              notiffy.error('Error al activar los vehículos.');
            }
            vm.refresh();
          }, function () {
            notiffy.error('Error al activar los vehículos.');
          });
        });
      };


      vm.deactivateCars = function () {
        var message = '';
        angular.forEach(vm.selectedList, function (car, index) {
          message += car.id;
          if (index < vm.selectedList.length - 2) {
            message += ', ';
          } else if (index < vm.selectedList.length - 1) {
            message += ' y ';
          }
        });
        if (vm.selectedList.length > 1) {
          message = '¿Desea desactivar a los vehiculos con No. Economico' + message + '?';
        } else {
          message = '¿Desea desactivar al vehículo con No. Economico ' + message + '?';
        }
        confirmm.confirm(message, function () {
          vm.loading = true;
          CarService.deactivate(vm.selectedList).then(function () {
            vm.loading = false;
            if (Response.deactivated) {
              notiffy.success('Vehículos inactivados.');
            } else {
              notiffy.error('Error al desactivar los vehiculos.');
            }
            vm.refresh();
          }, function () {
            notiffy.error('Error al desactivar los vehículos.');
          });
        });
      };

      vm.goCloud = function (car) {
          $sessionStorage.carFormalities = car;
          $sessionStorage.stateData = vm.stateData;
          $sessionStorage.selectedCloud = car;
          $state.go("index.cloud");
      };

    }]);

})();
