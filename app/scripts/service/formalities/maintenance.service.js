(function () {
    'use strict';

    var module = angular.module('fleetmanager');

    module.factory('MaintenanceService', ['$log', '$http', '$q', 'APIService', 'Response',
        function ($log, $http, $q, APIService, Response) {

            var MaintenanceService = {};

            MaintenanceService.save = function (maintenance) {
                var deffered = $q.defer();
                APIService.maintenance.save(maintenance)
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


            MaintenanceService.getMaintenances = function (car) {
                var deffered = $q.defer();
                APIService.maintenance.getMaintenances(car)
                    .success(function (response) {
                        Response.maintenanceList = response;
                        deffered.resolve();
                    })
                    .error(function (err) {
                        deffered.reject();
                        $log.error(err);
                    });
                return deffered.promise;
            };

            MaintenanceService.getMaintenancesInactives = function (car) {
                var deffered = $q.defer();
                APIService.maintenance.getMaintenancesInactives(car)
                    .success(function (response) {
                        Response.maintenanceList = response;
                        deffered.resolve();
                    })
                    .error(function (err) {
                        deffered.reject();
                        $log.error(err);
                    });
                return deffered.promise;
            };

            MaintenanceService.getAllMaintenanceTypes = function () {
                var deffered = $q.defer();
                APIService.maintenance.getAllMaintenanceTypes()
                    .success(function (response) {
                        Response.maintenanceType = response;
                        deffered.resolve();
                    })
                    .error(function (err) {
                        deffered.reject();
                        $log.error(err);
                    });
                return deffered.promise;
            };

            MaintenanceService.getOne = function (id) {
                var deffered = $q.defer();
                APIService.maintenance.getOne(id)
                  .success(function (response) {
                    Response.maintenance = response;
                    deffered.resolve();
                  })
                  .error(function (err) {
                    deffered.reject();
                    $log.error(err);
                  });
                return deffered.promise;
            };

            MaintenanceService.activate = function (maintenances) {
                var deffered = $q.defer();
                APIService.maintenance.activate(maintenances)
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

            MaintenanceService.deactivate = function (maintenances) {
                var deffered = $q.defer();
                APIService.maintenance.deactivate(maintenances)
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

            MaintenanceService.getAllRepairs = function () {
                var deffered = $q.defer();
                APIService.maintenance.getAllRepairs()
                  .success(function (response) {
                    Response.maintenanceRepairsList = response;
                    deffered.resolve();
                  })
                  .error(function (err) {
                    deffered.reject();
                    $log.error(err);
                  });
                return deffered.promise;
            };

            MaintenanceService.getAllRepairsCatByRepair = function (repairId) {
                var deffered = $q.defer();
                APIService.maintenance.getAllRepairsCatByRepair(repairId)
                  .success(function (response) {
                    Response.maintenanceRepairsCatList = response;
                    deffered.resolve();
                  })
                  .error(function (err) {
                    deffered.reject();
                    $log.error(err);
                  });
                return deffered.promise;
            };

            MaintenanceService.saveMaintenancePreventive = function (maintenancePreventive) {
              var deffered = $q.defer();
              APIService.maintenance.saveMaintenancePreventive(maintenancePreventive)
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

            MaintenanceService.getMaintenancePreventiveByVehicle = function (vehicleId) {
              var deffered = $q.defer();
              APIService.maintenance.getMaintenancePreventiveByVehicle(vehicleId)
                .success(function (response) {
                  Response.maintenancePreventiveList = response;
                  deffered.resolve();
                })
                .error(function (err) {
                  deffered.reject();
                  $log.error(err);
                });
              return deffered.promise;
            };

            MaintenanceService.deleteMaintenancePreventive = function (maintenance) {
              var deffered = $q.defer();
              APIService.maintenance.deleteMaintenancePreventive(maintenance)
                .success(function (response) {
                  Response.maintenancePreventiveList = response;
                  deffered.resolve();
                })
                .error(function (err) {
                  deffered.reject();
                  $log.error(err);
                });
              return deffered.promise;
            };

            return MaintenanceService;

        }]);
})();

