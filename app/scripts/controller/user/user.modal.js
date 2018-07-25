(function () {
  'use strict';

  var module = angular.module('fleetmanager');

  module.controller('UserModalCtrl', [
    'CONSTANTS', '$rootScope', '$state', '$scope','UserService', 'Response', '$uibModalInstance', 'notiffy', 'user',
    function (CONSTANTS, $rootScope, $state, $scope, UserService, Response, $uibModalInstance, notiffy, user) {

      var vm = this;

      if (user) {
        vm.action = 'Modificar';
        vm.user = user;
        vm.user.update = true;
      } else {
        vm.action = 'Agregar';
        vm.user = {
          update: false
        };
      }

      vm.loadRoles = function () {
        vm.loading = true;
        UserService.getAllUserRoles().then(function () {
          vm.loading = false;
          if (!Response.roles) {
            notiffy.error('Error al cargar lista de roles.');
          }
          vm.userRoles = Response.roles;
        });
      };
      
      vm.loadRoles();

      vm.save = function () {
        vm.userForm.$setDirty(true);
        if (vm.userForm.$valid) {
          vm.loading = true;
          UserService.save(vm.user).then(function () {
            vm.loading = false;
            if (Response.saved.id != null) {
              $uibModalInstance.close();
              notiffy.success('Usuario guardado exitosamente.');
              notiffy.success('Se ha enviado un correo a '+vm.user.user+' con la información de acceso.');
            } else if (Response.saved.id == null) {
              vm.userForm.user.$setValidity("duplicated", false);
            } else {
              notiffy.error('Error al guardar el usuario.');
            }
          });
        }
      };

      $scope.$watch('vm.user.user', function (newVal, oldVal) {
        if (newVal) {
          vm.userForm.user.$setValidity("duplicated", true);
        }
      });

      vm.cancel = function () {
        $uibModalInstance.dismiss('cancel');
      };

      vm.checkTorage = function () {
          vm.user.torage = !vm.user.torage;
      };

      $scope.$watch('vm.user.torage', function (newVal, oldVal) {
          if(!vm.user.torage){
              vm.styleTorage = "btn-secondary"
          }else{
              vm.styleTorage = "btn-green"
          }
      });

      vm.checkInsurance = function () {
          vm.user.insurance = !vm.user.insurance;
      };

      $scope.$watch('vm.user.insurance', function (newVal, oldVal) {
          if(!vm.user.insurance){
              vm.styleInsurance = "btn-secondary"
          }else{
              vm.styleInsurance = "btn-green"
          }
      });

      vm.checkInfringement = function () {
          vm.user.infringement = !vm.user.infringement;
      };

      $scope.$watch('vm.user.infringement', function (newVal, oldVal) {
          if(!vm.user.infringement){
              vm.styleInfringement = "btn-secondary"
          }else{
              vm.styleInfringement = "btn-green"
          }
      });

      vm.checkMaintenance = function () {
          vm.user.maintenance = !vm.user.maintenance;
      };

      $scope.$watch('vm.user.maintenance', function (newVal, oldVal) {
          if(!vm.user.maintenance){
              vm.styleMaintenance = "btn-secondary"
          }else{
              vm.styleMaintenance = "btn-green"
          }
      });

      vm.checkTenure = function () {
          vm.user.tenure = !vm.user.tenure;
      };

      $scope.$watch('vm.user.tenure', function (newVal, oldVal) {
          if(!vm.user.tenure){
              vm.styleTenure = "btn-secondary"
          }else{
              vm.styleTenure = "btn-green"
          }
      });

      vm.checkVerification = function () {
          vm.user.verification = !vm.user.verification;
      };

      $scope.$watch('vm.user.verification', function (newVal, oldVal) {
          if(!vm.user.verification){
              vm.styleVerification = "btn-secondary"
          }else{
              vm.styleVerification = "btn-green"
          }
      });

      vm.checkCirculationCard = function () {
          vm.user.circulationCard = !vm.user.circulationCard;
      };

      $scope.$watch('vm.user.circulationCard', function (newVal, oldVal) {
          if(!vm.user.circulationCard){
              vm.styleCirculationCard = "btn-secondary"
          }else{
              vm.styleCirculationCard = "btn-green"
          }
      });

      vm.checkOther = function () {
          vm.user.other = !vm.user.other;
      };

      $scope.$watch('vm.user.other', function (newVal, oldVal) {
          if(!vm.user.other){
              vm.styleOther = "btn-secondary"
          }else{
              vm.styleOther = "btn-green"
          }
      });

      vm.checkChargeGas = function () {
          vm.user.chargeGas = !vm.user.chargeGas;
      };

      $scope.$watch('vm.user.chargeGas', function (newVal, oldVal) {
          if(!vm.user.chargeGas){
              vm.styleChargeGas = "btn-secondary"
          }else{
              vm.styleChargeGas = "btn-green"
          }
      });

      vm.checkChargePike = function () {
          vm.user.chargePike = !vm.user.chargePike;
      };

      $scope.$watch('vm.user.chargePike', function (newVal, oldVal) {
          if(!vm.user.chargePike){
              vm.styleChargePike = "btn-secondary"
          }else{
              vm.styleChargePike = "btn-green"
          }
      });



    }]);

})();