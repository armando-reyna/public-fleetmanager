(function () {
  'use strict';

  var module = angular.module('fleetmanager');

  module.controller('CarNotificationCtrl', [
    'CONSTANTS', '$rootScope', '$state', '$scope', '$sessionStorage', 'CarService',  'Response', '$uibModalInstance', 'notiffy',
    function (CONSTANTS, $rootScope, $state, $scope, $sessionStorage, CarService, Response, $uibModalInstance, notiffy) {

      var vm = this;


      vm.notification = {
        id : 1
      };

      vm.loadTimeNotification = function () {
        vm.loading = true;
        CarService.getAllTimeNotification().then(function () {
          vm.loading = false;
          vm.timeNotificationList = Response.timeNotificationList;
        }, function () {
          vm.loading = false;
          notiffy.error('Error al obtener la lista de tiempos de notificación.');
        });
      };

      vm.loadTimeNotification();


      vm.getNotification = function () {
        CarService.getNotification(vm.notification.id).then(function () {
          vm.loading = false;
          vm.notification = Response.notification;
        }, function () {
          vm.loading = false;
          notiffy.error('Error al obtener las configuraciones.');
        });
      };

      vm.getNotification();

      vm.save = function () {
        vm.notificationForm.$setDirty(true);
        if (vm.notificationForm.$valid) {
          vm.loading = true;
          CarService.saveNotification(vm.notification).then(function () {
            vm.loading = false;
            if (Response.saved.id != null) {
              $uibModalInstance.close();
              notiffy.success('Notificaciones configurado exitosamente.');
            } else if (Response.saved.id == null) {
              vm.notificationForm.notification.$setValidity("duplicated", false);
            } else {
              notiffy.error('Error al configurara notificaciones.');
            }
          });
        }
      };
      
      
      vm.cancel = function () {
        $uibModalInstance.dismiss('cancel');
      };

    }]);

})();