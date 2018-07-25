(function () {
  'use strict';

  var module = angular.module('fleetmanager');

  module.controller('PreventiveModalCtrl', [
    'CONSTANTS', '$rootScope', '$scope', '$sessionStorage', '$state', 'MaintenanceService', 'Response', '$uibModalInstance', 'notiffy',
    function (CONSTANTS, $rootScope, $scope, $sessionStorage, $state, MaintenanceService, Response, $uibModalInstance, notiffy) {

      var vm = this;

      vm.preventive = {
        vehicle : $sessionStorage.carFormalities
      };


      vm.new = function(){
        vm.subtitle = 'Nuevo';
        vm.preventive.notification = false;
        vm.showForm = true;
        vm.repair = {};
      };


      vm.loadMaintenanceType = function () {
        vm.loading = true;
        MaintenanceService.getAllMaintenanceTypes().then(function () {
          vm.loading = false;
          vm.maintenanceTypeList= Response.maintenanceType;
        }, function () {
          vm.loading = false;
          notiffy.error('Error al obtener la lista de tipos de reparación..');
        });
      };

      vm.loadMaintenanceType();

      vm.refresh = function () {
        vm.loading = true;
        MaintenanceService.getMaintenancePreventiveByVehicle($sessionStorage.carFormalities.id).then(function () {
          vm.loading = false;
          vm.maintenancePreventiveList= Response.maintenancePreventiveList;
        }, function () {
          vm.loading = false;
          notiffy.error('Error al obtener la lista de mantenimientos programados.');
        });
      };

      vm.refresh ();

      vm.save = function () {
        vm.preventiveForm.$setDirty(true);
        if (vm.preventiveForm.$valid) {
          vm.loading = true;
          vm.preventive.vehicle = $sessionStorage.carFormalities;
          MaintenanceService.saveMaintenancePreventive(vm.preventive).then(function () {
            vm.loading = false;
            vm.preventive = Response.saved;
            notiffy.success('Mantenimiento programado, guardado exitosamente.');
            vm.cancel();
            vm.refresh();
          });

        }
      };

      vm.edit = function (preventive) {
        vm.subtitle = 'Editar';
        vm.showForm = true;
        vm.preventive = preventive;
      };

      vm.cancel = function () {
        vm.preventiveForm.$setPristine();
        vm.preventive = {};
        vm.showForm = false;
      };

      vm.close = function () {
        $uibModalInstance.close();
      };

      vm.remove = function (preventive) {
        MaintenanceService.deleteMaintenancePreventive(preventive).then(function () {
          vm.loading = false;
          vm.maintenancePreventiveList= Response.maintenancePreventiveList;
        }, function () {
          vm.loading = false;
          notiffy.error('Hubo un error al intentar eliminar.');
        });
      };

    }]);

})();