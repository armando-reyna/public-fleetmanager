(function () {
  'use strict';

  var loginModule = angular.module('fleetmanager');

  loginModule.controller('IndexCtrl', [
    '$rootScope', '$scope', '$state', '$sessionStorage', '$timeout', 'ConfigService', 'Response',
    function ($rootScope, $scope, $state, $sessionStorage, $timeout, ConfigService, Response) {

      var vm = this;

      var menuResource = 'menu_visitor';
      if($sessionStorage.userToken){
        menuResource = $sessionStorage.userToken.role.menu;
      }

      $scope.$parent.main.loading = true;
      ConfigService.getMenu(menuResource).then(function() {
        $scope.customMenu = Response.menu;
        $scope.$parent.main.loading = false;
      }, function(){
        $scope.$parent.main.loading = false;
      });

    }]);

})();