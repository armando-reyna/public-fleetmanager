(function () {
  'use strict';

  var module = angular.module('fleetmanager');

  module.factory('UserService', ['$log', '$http', '$q', 'APIService', 'Response',
    function ($log, $http, $q, APIService, Response) {

      var UserService = {};

      UserService.login = function (user) {
        var deffered = $q.defer();
        APIService.user.login(user)
          .success(function (response) {
            Response.user = response;
            deffered.resolve();
          })
          .error(function (err) {
            deffered.reject();
            $log.error(err);
          });
        return deffered.promise;
      };

      UserService.save = function (user) {
        var deffered = $q.defer();
        APIService.user.save(user)
          .success(function (response) {
            Response.saved = response;
            deffered.resolve();
          })
          .error(function (err) {
            alert(err.toSource());
            deffered.reject();
            $log.error(err);
          });
        return deffered.promise;
      };

      UserService.getAllUserRoles = function () {
        var deffered = $q.defer();
        APIService.user.getAllUserRoles()
          .success(function (response) {
            Response.roles = response;
            deffered.resolve();
          })
          .error(function (err) {
            deffered.reject();
            $log.error(err);
          });
        return deffered.promise;
      };

      UserService.getUsers = function (inactive) {
        var deffered = $q.defer();
        APIService.user.getUsers(inactive)
          .success(function (response) {
            Response.userList = response;
            deffered.resolve();
          })
          .error(function (err) {
            deffered.reject();
            $log.error(err);
          });
        return deffered.promise;
      };

      UserService.activate = function (users) {
        var deffered = $q.defer();
        APIService.user.activate(users)
          .success(function (response) {
            Response.activated = response;
            deffered.resolve();
          })
          .error(function (err) {
            deffered.reject();
            $log.error(err);
          });
        return deffered.promise;
      };

      UserService.deactivate = function (users) {
        var deffered = $q.defer();
        APIService.user.deactivate(users)
          .success(function (response) {
            Response.deactivated = response;
            deffered.resolve();
          })
          .error(function (err) {
            deffered.reject();
            $log.error(err);
          });
        return deffered.promise;
      };

      UserService.changePassword = function (user) {
        var deffered = $q.defer();
        APIService.user.changePassword(user)
          .success(function (response) {
            Response.saved = response;
            deffered.resolve();
          })
          .error(function (err) {
            deffered.reject();
            $log.error(err);
          });
        return deffered.promise;
      };

      UserService.requestResetPassword = function (user) {
        var deffered = $q.defer();
        APIService.user.requestResetPassword(user)
          .success(function (response) {
            Response.saved = response;
            deffered.resolve();
          })
          .error(function (err) {
            deffered.reject();
            $log.error(err);
          });
        return deffered.promise;
      };

      UserService.resetPassword = function (user) {
        var deffered = $q.defer();
        APIService.user.resetPassword(user)
          .success(function (response) {
            Response.reset = response;
            deffered.resolve();
          })
          .error(function (err) {
            deffered.reject();
            $log.error(err);
          });
        return deffered.promise;
      };

      return UserService;

    }]);
})();
