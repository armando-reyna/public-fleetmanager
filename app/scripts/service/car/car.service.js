(function () {
  'use strict';

  var module = angular.module('fleetmanager');

  module.factory('CarService', ['$log', '$http', '$q', 'APIService', 'Response',
    function ($log, $http, $q, APIService, Response) {

      var CarService = {};

      CarService.save = function (car) {
        var deffered = $q.defer();
        APIService.car.save(car)
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

      CarService.getCars = function (inactive) {
        var deffered = $q.defer();
        APIService.car.getCars(inactive)
          .success(function (response) {
            Response.carList = response;
            deffered.resolve();
          })
          .error(function (err) {
            deffered.reject();
            $log.error(err);
          });
        return deffered.promise;
      };

      CarService.getOne = function (id) {
        var deffered = $q.defer();
        APIService.car.getOne(id)
          .success(function (response) {
            Response.car = response;
            deffered.resolve();
          })
          .error(function (err) {
            deffered.reject();
            $log.error(err);
          });
        return deffered.promise;
      };

      CarService.activate = function (cars) {
        var deffered = $q.defer();
        APIService.car.activate(cars)
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

      CarService.deactivate = function (cars) {
        var deffered = $q.defer();
        APIService.car.deactivate(cars)
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

      CarService.getVehicleCount = function () {
        var deffered = $q.defer();
        APIService.car.getVehicleCount()
            .success(function (response) {
                Response.vehicleCount = response;
                deffered.resolve();
            })
            .error(function (err) {
                deffered.reject();
                $log.error(err);
            });
        return deffered.promise;
      };

      CarService.getAllMakes = function () {
        var deffered = $q.defer();
        APIService.car.getAllMakes()
          .success(function (response) {
            Response.makeList = response;
            deffered.resolve();
          })
          .error(function (err) {
            deffered.reject();
            $log.error(err);
          });
        return deffered.promise;
      };

      CarService.getAllModelsByMake = function (makeId) {
        var deffered = $q.defer();
        APIService.car.getAllModelsByMake(makeId)
          .success(function (response) {
            Response.modelList = response;
            deffered.resolve();
          })
          .error(function (err) {
            deffered.reject();
            $log.error(err);
          });
        return deffered.promise;
      };

      CarService.getAllVehicleTypes = function () {
        var deffered = $q.defer();
        APIService.car.getAllVehicleTypes()
          .success(function (response) {
            Response.vehicleTypes = response;
            deffered.resolve();
          })
          .error(function (err) {
            deffered.reject();
            $log.error(err);
          });
        return deffered.promise;
      };

      CarService.getAllVehicleCylinders = function () {
          var deffered = $q.defer();
          APIService.car.getAllVehicleCylinders()
              .success(function (response) {
                  Response.vehicleCylinders = response;
                  deffered.resolve();
              })
              .error(function (err) {
                  deffered.reject();
                  $log.error(err);
              });
          return deffered.promise;
      };

      CarService.getAllVehicleClasses = function () {
          var deffered = $q.defer();
          APIService.car.getAllVehicleClasses()
              .success(function (response) {
                  Response.vehicleClass = response;
                  deffered.resolve();
              })
              .error(function (err) {
                  deffered.reject();
                  $log.error(err);
              });
          return deffered.promise;
      };

      CarService.getAllVehicleEnergyTypes = function () {
          var deffered = $q.defer();
          APIService.car.getAllVehicleEnergyTypes()
              .success(function (response) {
                  Response.vehicleEnergyType = response;
                  deffered.resolve();
              })
              .error(function (err) {
                  deffered.reject();
                  $log.error(err);
              });
          return deffered.promise;
      };

      CarService.getAllVehicleUses = function () {
          var deffered = $q.defer();
          APIService.car.getAllVehicleUses()
              .success(function (response) {
                  Response.vehicleUse = response;
                  deffered.resolve();
              })
              .error(function (err) {
                  deffered.reject();
                  $log.error(err);
              });
          return deffered.promise;
      };

      CarService.getAllVehicleOrigins = function () {
          var deffered = $q.defer();
          APIService.car.getAllVehicleOrigins()
              .success(function (response) {
                  Response.vehicleOrigin = response;
                  deffered.resolve();
              })
              .error(function (err) {
                  deffered.reject();
                  $log.error(err);
              });
          return deffered.promise;
      };

      CarService.getAllVehicleZones = function () {
          var deffered = $q.defer();
          APIService.car.getAllVehicleZones()
              .success(function (response) {
                  Response.vehicleZone = response;
                  deffered.resolve();
              })
              .error(function (err) {
                  deffered.reject();
                  $log.error(err);
              });
          return deffered.promise;
      };

      CarService.getAllVehicleStickys = function () {
          var deffered = $q.defer();
          APIService.car.getAllVehicleStickys()
              .success(function (response) {
                  Response.vehicleSticky = response;
                  deffered.resolve();
              })
              .error(function (err) {
                  deffered.reject();
                  $log.error(err);
              });
          return deffered.promise;
      };

      CarService.getAllTimeNotification = function () {
          var deffered = $q.defer();
          APIService.car.getAllTimeNotification()
            .success(function (response) {
              Response.timeNotificationList = response;
              deffered.resolve();
            })
            .error(function (err) {
              deffered.reject();
              $log.error(err);
            });
          return deffered.promise;
      };

      CarService.saveNotification = function (notification) {
        var deffered = $q.defer();
        APIService.car.saveNotification(notification)
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

      CarService.getNotification = function (notification) {
        var deffered = $q.defer();
        APIService.car.getNotification(notification)
          .success(function (response) {
            Response.notification = response;
            deffered.resolve();
          })
          .error(function (err) {
            alert(err.toSource());
            deffered.reject();
            $log.error(err);
          });
        return deffered.promise;
      };

      return CarService;

    }]);
})();
