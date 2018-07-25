
(function () {
  'use strict';

  var module = angular.module('fleetmanager');

  module.controller('HomeCtrl', [
    '$rootScope', '$scope', '$state', '$window', '$sessionStorage', '$timeout', 'Response', '$uibModal', 'confirmm', 'notiffy',
    function ($rootScope, $scope, $state, $window, $sessionStorage, $timeout, Response, $uibModal, confirmm, notiffy) {

      var vm = this;

      if(!$scope.main.token || $scope.main.token != $sessionStorage.userToken){
        $scope.main.token = $sessionStorage.userToken;
      }

    }]);

})();