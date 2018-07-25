(function () {
  'use strict';

  var loginModule = angular.module('fleetmanager');

  loginModule.controller('LoginCtrl', [
    '$rootScope', '$scope', '$state', '$sessionStorage', '$timeout', 'UserService', 'Response', '$uibModal',
    '$stateParams', 'confirmm',
    function ($rootScope, $scope, $state, $sessionStorage, $timeout, UserService, Response, $uibModal, $stateParams,
              confirmm) {

      var vm = this;

      var checkResetPassword = function(){
        if($stateParams && $stateParams.id && $stateParams.key){
          var passwordDto = {
            id: $stateParams.id,
            password: $stateParams.key
          };
          $scope.$parent.main.loading = true;
          UserService.resetPassword(passwordDto).then(function() {
            $scope.$parent.main.loading = false;
            vm.reset = Response.reset;
            if(vm.reset){
              confirmm.success('Hemos enviado un correo con los pasos para restablecer su contraseña.');
            }
          }, function () {
            $scope.$parent.main.loading = false;
          });
        }
      };

      checkResetPassword();

      var invalid = function(){
        vm.loginForm.user.$dirty = true;
        vm.loginForm.password.$dirty = true;
        return vm.loginForm.user.$invalid
          || vm.loginForm.password.$invalid;
      };

      var showChangePassword = function(){
        var modalInstance = $uibModal.open({
          templateUrl: 'views/user/password.modal.html',
          controller: 'PasswordModalCtrl',
          controllerAs: 'vm',
          resolve: {
            askOldPassword: function () {
              return false;
            },
            user: function () {
              return vm.token;
            }
          }
        });
        modalInstance.result.then(function () {
          $sessionStorage.userToken = vm.token;
          $state.go("index.main");
        }, function () {

        });
      };

      vm.loginAction = function(){
        if(!invalid()){
          $scope.$parent.main.loading = true;
          UserService.login(vm.user).then(function() {
            vm.token = Response.user;
            if(vm.token){
              if(vm.token.active){
                  if(vm.token.passwordChanged){
                      $sessionStorage.reload = true;
                      $sessionStorage.userToken = vm.token;
                      $state.go("index.main");
                  }else {
                      showChangePassword();
                  }
              }else{
                  confirmm.error('Usuario desactivado, consulte a un administrador del sistema.');
              }
            }else{
              vm.loginError = true;
            }
            $scope.$parent.main.loading = false;
          });
        }
      };

      vm.openResetPasswordModal = function () {
        var modalInstance = $uibModal.open({
          templateUrl: 'views/user/forgot.password.modal.html',
          controller: 'ForgotPasswordModalCtrl',
          controllerAs: 'vm',
          resolve: {}
        });
        modalInstance.result.then(function (user) {

        }, function () {
          //$log.info('Modal dismissed at: ' + new Date());
        });
      };

    }]);

})();