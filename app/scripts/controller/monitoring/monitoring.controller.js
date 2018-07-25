(function () {
  'use strict';

  var module = angular.module('fleetmanager');

  module.controller('MonitoringCtrl', [
    '$rootScope', '$scope', '$state', '$sessionStorage', '$timeout', 'MonitoringService', 'Response', '$uibModal', 'confirmm', 'notiffy',
    function ($rootScope, $scope, $state, $sessionStorage, $timeout, MonitoringService, Response, $uibModal, confirmm, notiffy) {

      var vm = this;

      vm.inactiveMonitorings = false;
      vm.updateEnabled = false;
      vm.deactivateEnabled = false;
      vm.activateEnabled = false;
      vm.allselected = false;

      vm.stateData = $state.current.data;


      vm.refresh = function () {
        $scope.main.loading = true;
        MonitoringService.getMonitorings(vm.inactiveMonitorings).then(function () {
          vm.monitoringList = Response.monitoringList;
          vm.allselected = false;
          $scope.main.loading = false;
        }, function () {
          notiffy.error('Error al obtener la lista de técnicos.');
          $scope.main.loading = false;
        });
      };

      vm.refresh();

      vm.openMonitoringModal = function (update) {
        var modalInstance = $uibModal.open({
          templateUrl: 'views/monitoring/monitoring.modal.html',
          controller: 'MonitoringModalCtrl',
          controllerAs: 'vm',
          resolve: {
            monitoring: function () {
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
        angular.forEach(vm.monitoringList, function (monitoring, index) {
          if (monitoring.selected) {
            vm.selectedList.push(monitoring);
          } else {
            vm.allselected = false;
          }
        });
        if (vm.selectedList.length > 0) {
          vm.activateEnabled = true;
          vm.deactivateEnabled = true;
        }
        angular.forEach(vm.selectedList, function (monitoring, index) {
          if (monitoring.active) {
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
        angular.forEach(vm.monitoringList, function (monitoring, index) {
          monitoring.selected = select;
        });
        vm.enableBts();
      };

      vm.activateMonitorings = function () {
        var message = '';
        angular.forEach(vm.selectedList, function (monitoring, index) {
          message += monitoring.name;
          if (index < vm.selectedList.length - 2) {
            message += ', ';
          } else if (index < vm.selectedList.length - 1) {
            message += ' y ';
          }
        });
        if (vm.selectedList.length > 1) {
          message = '¿Desea activar a los técnicos ' + message + '?';
        } else {
          message = '¿Desea activar a ' + message + '?';
        }
        confirmm.confirm(message, function () {
          vm.loading = true;
          MonitoringService.activate(vm.selectedList).then(function () {
            vm.loading = false;
            if (Response.activated) {
              notiffy.success('Técnicos activados.');
            } else {
              notiffy.error('Error al activar los técnicos.');
            }
            vm.refresh();
          }, function () {
            notiffy.error('Error al activar los técnicos.');
          });
        });
      };


      vm.deactivateMonitorings = function () {
        var message = '';
        angular.forEach(vm.selectedList, function (monitoring, index) {
          message += monitoring.name;
          if (index < vm.selectedList.length - 2) {
            message += ', ';
          } else if (index < vm.selectedList.length - 1) {
            message += ' y ';
          }
        });
        if (vm.selectedList.length > 1) {
          message = '¿Desea desactivar a los técnicos ' + message + '?';
        } else {
          message = '¿Desea desactivar a ' + message + '?';
        }
        confirmm.confirm(message, function () {
          vm.loading = true;
          MonitoringService.deactivate(vm.selectedList).then(function () {
            vm.loading = false;
            if (Response.deactivated) {
              notiffy.success('Técnicos inactivados.');
            } else {
              notiffy.error('Error al desactivar los técnicos.');
            }
            vm.refresh();
          }, function () {
            notiffy.error('Error al desactivar los técnicos.');
          });
        });
      };

      vm.goCloud = function (monitoring) {
        $sessionStorage.stateData = vm.stateData;
        $sessionStorage.selectedCloud = monitoring;
        $state.go("index.cloud");
      };

    }]);

})();
