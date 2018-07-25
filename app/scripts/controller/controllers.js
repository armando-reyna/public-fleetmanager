(function() {
  'use strict';

  var module = angular.module('fleetmanager');

  module.controller('MainCtrl', ['CONSTANTS', '$scope', '$state', '$sessionStorage', '$rootScope', '$window',
    '$uibModal', 'Response', 'StorageService',
    function (CONSTANTS, $scope, $state, $sessionStorage, $rootScope, $window, $uibModal, Response,
              StorageService){

      this.token = $sessionStorage.userToken;

      var vm = this;

      vm.logout = function(){
        delete $sessionStorage.userToken;
        delete $sessionStorage.notifications;
        $window.location.href = 'index.html';
      };

      vm.toggled = function(open) {
        if(!open){
          angular.forEach($rootScope.notifications, function(notification) {
            notification.unread = false;
          });
        }
      };

      vm.showChangePassword = function(){
        var modalInstance = $uibModal.open({
          templateUrl: 'views/user/password.modal.html',
          controller: 'PasswordModalCtrl',
          controllerAs: 'vm',
          resolve: {
            askOldPassword: function () {
              return true;
            },
            user: function () {
              return vm.token;
            }
          }
        });
        modalInstance.result.then(function () {

        }, function () {

        });
      };

    }
  ]);

})();