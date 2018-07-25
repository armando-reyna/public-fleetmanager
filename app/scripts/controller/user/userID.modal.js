(function () {
  'use strict';

  var module = angular.module('fleetmanager');

  module.controller('UserIDModalCtrl', [
    'CONSTANTS', '$rootScope', '$state', '$scope','UserService', 'Response', '$uibModalInstance', 'notiffy',
    function (CONSTANTS, $rootScope, $state, $scope, UserService, Response, $uibModalInstance, notiffy) {

      var vm = this;

      vm.userError = false;
      vm.passError = false;

      $scope.$watch('vm.user.user', function (newVal, oldVal) {
        if (newVal) {
          vm.userError = false;
          vm.loginError = false;
        }
      });

      $scope.$watch('vm.user.password', function (newVal, oldVal) {
        if (newVal) {
          vm.passError = false;
          vm.loginError = false;
        }
      });

      vm.login = function () {
        if(vm.user && (vm.user.user == "" && vm.user.password == "")){
          vm.userError = true;
          vm.passError = true;
        }else if(vm.user && (vm.user.user == "" && vm.user.password != "")){
          vm.userError = true;
        }else if(vm.user && (vm.user.user != "" && vm.user.password == "")){
          vm.passError = true;
        }else{
          UserService.login(vm.user).then(function() {
            vm.token = Response.user;
            if(vm.token){
              if(vm.token.role.id == CONSTANTS.ROLES.ADMIN){
                $uibModalInstance.close(vm.token);
              }else{
                vm.loginError = true;
              }
            }else{
              vm.loginError = true;
            }
          });
        }
      };

      vm.cancel = function () {
        $uibModalInstance.dismiss('cancel');
      };

    }]);

})();