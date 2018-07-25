(function () {
  'use strict';

  var module = angular.module('fleetmanager');

  module.controller('ForgotPasswordModalCtrl', [
    'CONSTANTS', '$rootScope', '$scope', '$state', 'UserService', 'Response', '$uibModalInstance', 'notiffy', 'confirmm',
    function (CONSTANTS, $rootScope, $scope, $state, UserService, Response, $uibModalInstance, notiffy, confirmm) {

      var vm = this;

      vm.save = function () {
        vm.userForm.$setDirty(true);
        if (vm.userForm.$valid) {

          vm.loading = true;
          UserService.requestResetPassword(vm.user).then(function () {
            vm.loading = false;
            if(Response.saved){
                $uibModalInstance.close();
                confirmm.success('El correo electrónico coincide con una cuenta existente, enviaremos los pasos para restablecer su contraseña.');
            }else{
                $uibModalInstance.close();
                confirmm.error('No se encontrarón usuarios activos o existentes que coincidan con el correo electronico proporcionado.');
            }
          }, function () {
            vm.loading = false;
            notiffy.error('Error al consultar la cuenta.');
          });

        }
      };

      vm.cancel = function () {
        $uibModalInstance.dismiss('cancel');
      };

    }]);

})();