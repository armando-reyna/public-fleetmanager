(function () {
  'use strict';

  var module = angular.module('fleetmanager');

  module.controller('ProfileCtrl', [
    '$rootScope', '$scope', '$state', '$sessionStorage', '$timeout', 'UserService', 'Response', '$uibModal', 'confirmm', 'notiffy',
    function ($rootScope, $scope, $state, $sessionStorage, $timeout, UserService, Response, $uibModal, confirmm, notiffy) {

      var vm = this;
      vm.user = $sessionStorage.userToken;

    }]);

})();