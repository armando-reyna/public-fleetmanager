(function () {
  'use strict';

  var module = angular.module('fleetmanager');

  module.controller('CarModalCtrl', [
    'CONSTANTS', '$rootScope', '$state', '$scope', 'CarService', 'TechnicianService', 'GasCardService', 'PikeCardService', 'Response', '$uibModalInstance', 'notiffy', 'car',
    function (CONSTANTS, $rootScope, $state, $scope, CarService, TechnicianService, GasCardService, PikeCardService, Response, $uibModalInstance, notiffy, car) {

      var vm = this;

      vm.tabs = [
        {enable: true},
        {enable: false},
        {enable: false},
        {enable: false}
      ];

      vm.econo = 0;

      if (car) {
        vm.action = 'Modificar';
        vm.car = car;
        vm.econo = vm.car.id;
        vm.car.update = true;
      } else {
        vm.action = 'Agregar';
        vm.car = {
          active: true,
          update: false
        };
      }

      vm.loadEconomic = function () {
        vm.loading = true;
        CarService.getVehicleCount().then(function () {
            vm.loading = false;
            vm.vehicleCount = Response.vehicleCount;
            if(!car){
              vm.econo = vm.vehicleCount + 1;
            }
        }, function () {
            vm.loading = false;
            notiffy.error('Error al obtener el No. Economico del vehículos.');
        });
      };

      vm.loadEconomic();

      vm.loadMakes = function () {
        vm.loading = true;
        if (car) {
          vm.car.make = vm.car.model.make;
        }
        CarService.getAllMakes().then(function () {
          vm.loading = false;
          vm.makeList = Response.makeList;
        }, function () {
          vm.loading = false;
          notiffy.error('Error al obtener la lista de marcas.');
        });
      };

      vm.loadMakes();

      vm.loadModels = function () {
        vm.modelList = [];
        if (vm.car.make && vm.car.make.id) {
          vm.loading = true;
          CarService.getAllModelsByMake(vm.car.make.id).then(function () {
            vm.loading = false;
            vm.modelList = Response.modelList;
          }, function () {
            vm.loading = false;
            notiffy.error('Error al obtener la lista de marcas.');
          });
        }
      };

      $scope.$watch('vm.car.make', function (newVal, oldVal) {
        if (newVal) {
          vm.loadModels();
        }
      });


      $scope.$watch('vm.chargeGasCard.kmCurrent', function (newVal, oldVal) {
        if (newVal) {
          vm.chargeGasCard.kmTours = vm.chargeGasCard.kmCurrent - vm.chargeGasCard.kmPrevious;
        }
      });

      vm.loadTypes = function () {
        vm.loading = true;
        CarService.getAllVehicleTypes().then(function () {
          vm.loading = false;
          vm.vehicleTypes = Response.vehicleTypes;
        }, function () {
          vm.loading = false;
          notiffy.error('Error al obtener la lista de tipos de vehículos.');
        });
      };

      vm.loadTypes();

      vm.loadCylinders = function () {
        vm.loading = true;
        CarService.getAllVehicleCylinders().then(function () {
          vm.loading = false;
          vm.vehicleCylinders = Response.vehicleCylinders;
        }, function () {
          vm.loading = false;
          notiffy.error('Error al obtener la lista de cilindros para vehículos.');
        });
      };

      vm.loadCylinders();

      vm.loadClass = function () {
        vm.loading = true;
        CarService.getAllVehicleClasses().then(function () {
          vm.loading = false;
          vm.vehicleClass = Response.vehicleClass;
        }, function () {
          vm.loading = false;
          notiffy.error('Error al obtener la lista de cilindros para vehículos.');
        });
      };

      vm.loadClass();

      vm.loadEnergyType = function () {
        vm.loading = true;
        CarService.getAllVehicleEnergyTypes().then(function () {
          vm.loading = false;
          vm.vehicleEnergyType = Response.vehicleEnergyType;
        }, function () {
          vm.loading = false;
          notiffy.error('Error al obtener la lista de cilindros para vehículos.');
        });
      };

      vm.loadEnergyType();

      vm.loadUses = function () {
        vm.loading = true;
        CarService.getAllVehicleUses().then(function () {
          vm.loading = false;
          vm.vehicleUse = Response.vehicleUse;
        }, function () {
          vm.loading = false;
          notiffy.error('Error al obtener la lista de cilindros para vehículos.');
        });
      };

      vm.loadUses();

      vm.loadOrigins = function () {
        vm.loading = true;
        CarService.getAllVehicleOrigins().then(function () {
          vm.loading = false;
          vm.vehicleOrigin = Response.vehicleOrigin;
        }, function () {
          vm.loading = false;
          notiffy.error('Error al obtener la lista de cilindros para vehículos.');
        });
      };

      vm.loadOrigins();

      vm.loadZones = function () {
        vm.loading = true;
        CarService.getAllVehicleZones().then(function () {
          vm.loading = false;
          vm.vehicleZone = Response.vehicleZone;
        }, function () {
          vm.loading = false;
          notiffy.error('Error al obtener la lista de cilindros para vehículos.');
        });
      };

      vm.loadZones();

      vm.loadStickys = function () {
          vm.loading = true;
          CarService.getAllVehicleStickys().then(function () {
              vm.loading = false;
              vm.vehicleSticky = Response.vehicleSticky;
          }, function () {
              vm.loading = false;
              notiffy.error('Error al obtener la lista de engomados para vehículos.');
          });
      };

      vm.loadStickys();

      vm.loadTechnician = function () {
        vm.loading = true;
        TechnicianService.getTechnicians(false).then(function () {
          vm.loading = false;
          vm.technicianList = Response.technicianList;
        }, function () {
          vm.loading = false;
          notiffy.error('Error al obtener la lista de técnicos.');
        });
      };

      vm.loadTechnician();

      vm.loadGasCard = function () {
        vm.loading = true;
        GasCardService.getGasCardsNoAssigned().then(function () {
          vm.loading = false;
          vm.gasCardList = Response.gasCardList;
        }, function () {
          vm.loading = false;
          notiffy.error('Error al obtener la lista de tarjetas de gas.');
        });
      };

      vm.loadGasCard();

      vm.loadIaveCard = function () {
        vm.loading = true;
        PikeCardService.getIaveCards(false).then(function () {
          vm.loading = false;
          vm.iaveCardList = Response.iaveCardList;
        }, function () {
          vm.loading = false;
          notiffy.error('Error al obtener la lista de tarjetas iave.');
        });
      };

      vm.loadIaveCard();

      vm.loadTeleviaCard = function () {
        vm.loading = true;
        PikeCardService.getTeleviaCards(false).then(function () {
          vm.loading = false;
          vm.televiaCardList = Response.televiaCardList;
        }, function () {
          vm.loading = false;
          notiffy.error('Error al obtener la lista de tarjetas televia.');
        });
      };

      vm.loadTeleviaCard();

      vm.loadTelepassCard = function () {
        vm.loading = true;
        PikeCardService.getTelepassCards(false).then(function () {
          vm.loading = false;
          vm.telepassCardList = Response.telepassCardList;
        }, function () {
          vm.loading = false;
          notiffy.error('Error al obtener la lista de tarjetas telepass.');
        });
      };

      vm.loadTelepassCard();

      vm.loadOtherCard = function () {
        vm.loading = true;
        PikeCardService.getOtherCards(false).then(function () {
          vm.loading = false;
          vm.otherCardList = Response.otherCardList;
        }, function () {
          vm.loading = false;
          notiffy.error('Error al obtener la lista de otras tarjetas.');
        });
      };

      vm.loadOtherCard();

      vm.save = function () {
        vm.carForm.$setDirty(true);
        if (vm.carForm.$valid) {
          vm.loading = true;
          CarService.save(vm.car).then(function () {
            vm.loading = false;
            if (Response.saved.id != null) {
              $uibModalInstance.close();
              notiffy.success('Vehículo guardado exitosamente.');
            } else if (Response.saved.id == null) {
              notiffy.error('La tarjeta de gas ya esta asignada a otro vehículo');
            } else {
              notiffy.error('Error al guardar vehículo.');
            }
          });
        }
      };

      vm.cancel = function () {
        $uibModalInstance.dismiss('cancel');
      };

      vm.activeTab = 0;
      vm.isFinalStep = false;

      vm.nextStep = function () {

        if (!vm.car.make && vm.car.originalMake) {
          vm.car.make = {
            name: vm.car.originalMake
          };
        }

        if (!vm.car.model && vm.car.originalModel) {
          vm.car.model = {
            name: vm.car.originalModel
          };
        }

        validateStep(vm.activeTab, vm.activeTab + 1, function () {
          if (vm.enableNext) {
            vm.tabs[vm.activeTab + 1].enable = true;
            vm.activeTab++;
          }
          checkFinalStep();
        });
      };

      vm.prevStep = function () {
        vm.activeTab--;
        checkFinalStep();
      };

      var validateStep = function (currentIndex, newIndex, callback) {
        vm.enableNext = true;
        //Force all form validation
        if (newIndex > currentIndex) {
          angular.forEach(vm.carForm, function (val, key) {
            if (typeof val === 'object' && val.hasOwnProperty('$modelValue')) {
              val.$setDirty(true);
              vm.enableNext = vm.enableNext && val.$valid;
            }
          });
        }
        if (vm.enableNext) {
          callback();
        }
      };

      var checkFinalStep = function () {
        if (vm.activeTab == 3) {
          vm.isFinalStep = true;
        } else {
          vm.isFinalStep = false;
        }
      };

    }]);

})();