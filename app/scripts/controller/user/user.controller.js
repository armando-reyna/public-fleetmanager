(function () {
  'use strict';

  var module = angular.module('fleetmanager');

  module.controller('UserCtrl', [
    '$rootScope', '$scope', '$state', '$sessionStorage', '$timeout', 'UserService', 'Response', '$uibModal', 'confirmm', 'notiffy',
    function ($rootScope, $scope, $state, $sessionStorage, $timeout, UserService, Response, $uibModal, confirmm, notiffy) {

      var vm = this;

      vm.inactiveUsers = false;
      vm.updateEnabled = false;
      vm.deactivateEnabled = false;
      vm.activateEnabled = false;
      vm.allselected = false;

      vm.refresh = function () {
        $scope.main.loading = true;
        UserService.getUsers(vm.inactiveUsers).then(function () {
          vm.userList = Response.userList;
          vm.allselected = false;
          $scope.main.loading = false;
        }, function () {
          notiffy.error('Error al obtener la lista de usuarios.');
          $scope.main.loading = false;
        });
      };

      vm.refresh();

      vm.openUserModal = function (update) {
        var modalInstance = $uibModal.open({
          templateUrl: 'views/user/user.modal.html',
          controller: 'UserModalCtrl',
          controllerAs: 'vm',
          size: 'lg',
          resolve: {
            user: function () {
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
        angular.forEach(vm.userList, function (user, index) {
          if (user.selected) {
            vm.selectedList.push(user);
          } else {
            vm.allselected = false;
          }
        });
        if (vm.selectedList.length > 0) {
          vm.activateEnabled = true;
          vm.deactivateEnabled = true;
        }
        angular.forEach(vm.selectedList, function (user, index) {
          if (user.active) {
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
        angular.forEach(vm.userList, function (user, index) {
          user.selected = select;
        });
        vm.enableBts();
      };

      vm.activateUsers = function () {
        var message = '';
        angular.forEach(vm.selectedList, function (user, index) {
          message += user.name;
          if (index < vm.selectedList.length - 2) {
            message += ', ';
          } else if (index < vm.selectedList.length - 1) {
            message += ' y ';
          }
        });
        if (vm.selectedList.length > 1) {
          message = '¿Desea activar a los usuarios ' + message + '?';
        } else {
          message = '¿Desea activar a ' + message + '?';
        }
        confirmm.confirm(message, function () {
          vm.loading = true;
          UserService.activate(vm.selectedList).then(function () {
            vm.loading = false;
            if (Response.activated) {
              notiffy.success('Usuarios activados.');
            } else {
              notiffy.error('Error al activar los usuarios.');
            }
            vm.refresh();
          }, function () {
            notiffy.error('Error al activar los usuarios.');
          });
        });
      };


      vm.deactivateUsers = function () {
        var message = '';
        angular.forEach(vm.selectedList, function (user, index) {
          message += user.name;
          if (index < vm.selectedList.length - 2) {
            message += ', ';
          } else if (index < vm.selectedList.length - 1) {
            message += ' y ';
          }
        });
        if (vm.selectedList.length > 1) {
          message = '¿Desea desactivar a los usuarios ' + message + '?';
        } else {
          message = '¿Desea desactivar a ' + message + '?';
        }
        confirmm.confirm(message, function () {
          vm.loading = true;
          UserService.deactivate(vm.selectedList).then(function () {
            vm.loading = false;
            if (Response.deactivated) {
              notiffy.success('Usuarios inactivados.');
            } else {
              notiffy.error('Error al desactivar los usuarios.');
            }
            vm.refresh();
          }, function () {
            notiffy.error('Error al desactivar los usuarios.');
          });
        });
      };


    }]);

})();