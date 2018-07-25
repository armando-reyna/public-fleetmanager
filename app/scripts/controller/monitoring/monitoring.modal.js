(function () {
  'use strict';

  var module = angular.module('fleetmanager');

  module.controller('MonitoringModalCtrl', [
    'CONSTANTS', '$rootScope', '$state', '$scope','CarService', 'TechnicianService','MonitoringService', 'Response', '$uibModalInstance', 'notiffy', 'monitoring',
    function (CONSTANTS, $rootScope, $state, $scope, CarService, TechnicianService, MonitoringService, Response, $uibModalInstance, notiffy, monitoring) {

      var vm = this;

      vm.hstep = 1;
      vm.mstep = 1;


      if (monitoring) {
        vm.action = 'Modificar';
        vm.monitoring = monitoring;
        vm.monitoring.update = true;
      } else {
        vm.action = 'Agregar';
        vm.monitoring = {
          active: true,
          update: false
        };
      }

      vm.loadVehicles = function () {
        vm.loading = true;
        CarService.getCars(false).then(function () {
          vm.loading = false;
          vm.vehicleList = Response.carList;
        }, function () {
          vm.loading = false;
          notiffy.error('Error al obtener la lista de vehículos');
        });
      };

      vm.loadVehicles();


      vm.loadTechnician = function () {
        vm.loading = true;
        TechnicianService.getTechnicians(false).then(function () {
          vm.loading = false;
          vm.technicianList = Response.technicianList;
        }, function () {
          vm.loading = false;
          notiffy.error('Error al obtener la lista de técnicos.');
        });
      };

      vm.loadTechnician();

      vm.save = function () {
        if(!vm.monitoring.entryTime) {
          vm.errorEntryTime = true;
        }else if(!vm.monitoring.departureTime){
          vm.errorDepartureTime = true;
        }else{
          vm.monitoringForm.$setDirty(true);
          if (vm.monitoringForm.$valid) {
            vm.loading = true;
            MonitoringService.save(vm.monitoring).then(function () {
              vm.loading = false;
              if (Response.saved.id != null) {
                $uibModalInstance.close();
                notiffy.success('Técnico guardado exitosamente.');
              } else if (Response.saved.id == null) {
                vm.monitoringForm.monitoring.$setValidity("duplicated", false);
              } else {
                notiffy.error('Error al guardar el técnico.');
              }
            });
          }
        }
      };

      vm.cancel = function () {
        $uibModalInstance.dismiss('cancel');
      };

    }]);

})();
