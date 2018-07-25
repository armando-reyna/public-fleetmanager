(function () {
  'use strict';

  var module = angular.module('fleetmanager');

  module.controller('RepairModalCtrl', [
    'CONSTANTS', '$rootScope', '$scope', '$state', 'MaintenanceService', 'Response', '$uibModalInstance', 'notiffy', 'maintenance',
    function (CONSTANTS, $rootScope, $scope, $state, MaintenanceService, Response, $uibModalInstance, notiffy, maintenance) {

      var vm = this;

      vm.maintenance = maintenance;

      vm.mostrarSelectClase = true;
      vm.mostrarInputClase = false;
      vm.mostrarSelectTipo = true;
      vm.mostrarInputTipo = false;

      vm.mostrarCancelarTipo = false;


      vm.agregarClase = function () {
        vm.mostrarSelectClase = false;
        vm.mostrarInputClase = true;
        vm.mostrarSelectTipo = false;
        vm.mostrarInputTipo = true;
        vm.mostrarCancelarTipo = false;
      };

      vm.cancelarClase = function(){
        vm.mostrarSelectClase = true;
        vm.mostrarInputClase = false;
        vm.mostrarSelectTipo = true;
        vm.mostrarInputTipo = false;
        vm.mostrarCancelarTipo = true;
      };

      vm.agregarTipo = function () {
        vm.mostrarSelectTipo = false;
        vm.mostrarInputTipo = true;
        vm.mostrarCancelarTipo = true;
      };

      vm.cancelarTipo = function(){
        vm.mostrarSelectTipo = true;
        vm.mostrarInputTipo = false;
        vm.mostrarCancelarTipo = true;
      };

      vm.new = function(){
        vm.subtitle = 'Nueva';
        vm.showForm = true;
        vm.repair = {};
      };

      vm.loadRepairs = function () {
        vm.loading = true;
        MaintenanceService.getAllRepairs().then(function () {
          vm.loading = false;
          vm.maintenanceRepairsList= Response.maintenanceRepairsList;
        }, function () {
          vm.loading = false;
          notiffy.error('Error al obtener la lista de tipos de reparación.');
        });
      };

      vm.loadRepairs();

      vm.loadRepairsCat = function () {
        vm.maintenanceRepairsCatList = [];
        if (vm.repair.repair && vm.repair.repair.id) {
          vm.loading = true;
          MaintenanceService.getAllRepairsCatByRepair(vm.repair.repair.id).then(function () {
            vm.loading = false;
            vm.maintenanceRepairsCatList= Response.maintenanceRepairsCatList;
          }, function () {
            vm.loading = false;
            notiffy.error('Error al obtener la lista de sub reparación.');
          });
        }
      };

      $scope.$watch('vm.repair.repair', function (newVal, oldVal) {
        if (newVal) {
          vm.loadRepairsCat();
        }
      });

      var save = function(){
        vm.loading = true;

        MaintenanceService.save(vm.maintenance).then(function () {
          vm.loading = false;
          vm.maintenance = Response.saved;
          notiffy.success('Mantenimiento guardado exitosamente.');
          vm.cancel();
        });
        vm.loadRepairs();
      };

      var add = function () {
        vm.maintenance.repair.push(angular.copy(vm.repair));
        save();
      };

      vm.save = function () {
        vm.repairForm.$setDirty(true);
        if (vm.repairForm.$valid) {
          if(vm.repair.id){
            save();
          } else {
            if(vm.mostrarInputClase){

              vm.repair.repair = {
                name: vm.repair.class
              };

              vm.repair.repairCat = {
                repair:{
                  name: vm.repair.class
                }
              };

              vm.repair.repairCat = {
                name: vm.repair.type
              };
            }
            if(vm.mostrarInputTipo){
              vm.repair.repairCat = {
                name: vm.repair.type
              };
            }
            add();
          }
        }
      };

      vm.edit = function (repair) {
        vm.subtitle = 'Editar';
        vm.showForm = true;
        vm.repair = repair;
        vm.repair.repair = vm.repair.repairCat.repair;
      };

      vm.cancel = function () {
        vm.repairForm.$setPristine();
        vm.repair = {};
        vm.showForm = false;
      };

      vm.close = function () {
        $uibModalInstance.close();
      };

      vm.remove = function (index) {
        vm.maintenance.repair.splice(index, 1);
        save();
      };

    }]);

})();