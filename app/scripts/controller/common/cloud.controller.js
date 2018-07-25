(function () {
    'use strict';

    var module = angular.module('fleetmanager');

    module.controller('CloudCtrl', [
        'CONSTANTS', '$rootScope', '$scope', '$state', '$sessionStorage', '$timeout', 'StorageService', 'Response',
        '$uibModal', 'confirmm', 'notiffy', '$window', 'CarService', 'TorageService', 'CleaningService', 'CirculationCardService',
        'GasCardService', 'ChargeGasCardService', 'PikeCardService', 'ChargePikeCardService', 'InfringementService', 'InsuranceService', 'MaintenanceService',
        'TenureService', 'VerificationService', 'OtherService', 'MonitoringService',
        function (CONSTANTS, $rootScope, $scope, $state, $sessionStorage, $timeout, StorageService, Response,
                  $uibModal, confirmm, notiffy, $window, CarService, TorageService, CleaningService, CirculationCardService,
                  GasCardService, ChargeGasCardService, PikeCardService, ChargePikeCardService, InfringementService, InsuranceService, MaintenanceService,
                  TenureService, VerificationService, OtherService, MonitoringService) {

            var vm = this;

            vm.checkOriginCar = false;
            vm.checkOriginFormalities = false;
            vm.checkOriginCardsMonitoring = false;

            vm.stateData = $sessionStorage.stateData;
            vm.selectedCloud = $sessionStorage.selectedCloud;

            vm.user = $sessionStorage.userToken;
            vm.car = $sessionStorage.carFormalities;

            vm.filesPath = CONSTANTS.API_URI + 'files/' + vm.stateData.path + '/';

            if(vm.stateData.state == "index.car"){
                vm.checkOriginCar = true;
            }else if(vm.stateData.state == "index.gasCard" || vm.stateData.state == "index.pikeCard" || vm.stateData.state == "index.monitoring"){
                vm.checkOriginCardsMonitoring = true;
            }else{
                vm.checkOriginFormalities = true;
            }

            vm.refreshCloud = function () {
              switch(vm.stateData.path){
                case CONSTANTS.FILE.VEHICLE : {
                  $scope.main.loading = true;
                  CarService.getOne(vm.selectedCloud.id).then(function () {
                    $scope.main.loading = false;
                    vm.selectedCloud = Response.car;
                    vm.files = vm.selectedCloud.vehicleFiles;
                    vm.name = "No. Económico : " + vm.selectedCloud.id;
                  }, function () {
                    $scope.main.loading = false;
                    notiffy.error('Error al obtener lista de archivos.');
                  });
                  break;
                }
                case CONSTANTS.FILE.TORAGE : {
                  $scope.main.loading = true;
                  TorageService.getOne(vm.selectedCloud.id).then(function () {
                    $scope.main.loading = false;
                    vm.selectedCloud = Response.torage;
                    vm.files = vm.selectedCloud.torageFiles;
                    vm.name = "Almacenaje : " + vm.selectedCloud.name;
                  }, function () {
                    $scope.main.loading = false;
                    notiffy.error('Error al obtener lista de archivos.');
                  });
                  break;
                }
                case CONSTANTS.FILE.INSURANCE : {
                  $scope.main.loading = true;
                  InsuranceService.getOne(vm.selectedCloud.id).then(function () {
                    $scope.main.loading = false;
                    vm.selectedCloud = Response.insurance;
                    vm.files = vm.selectedCloud.insuranceFiles;
                    vm.name = "No. Póliza : " + vm.selectedCloud.policyNumber;
                  }, function () {
                    $scope.main.loading = false;
                    notiffy.error('Error al obtener lista de archivos.');
                  });
                  break;
                }
                case CONSTANTS.FILE.MAINTENANCE : {
                  $scope.main.loading = true;
                  MaintenanceService.getOne(vm.selectedCloud.id).then(function () {
                    $scope.main.loading = false;
                    vm.selectedCloud = Response.maintenance;
                    vm.files = vm.selectedCloud.maintenanceFiles;
                    vm.name = "Folio : " + vm.selectedCloud.folio;
                  }, function () {
                    $scope.main.loading = false;
                    notiffy.error('Error al obtener lista de archivos.');
                  });
                  break;
                }
                case CONSTANTS.FILE.CLEANING : {
                  $scope.main.loading = true;
                  CleaningService.getOne(vm.selectedCloud.id).then(function () {
                    $scope.main.loading = false;
                    vm.selectedCloud = Response.cleaning;
                    vm.files = vm.selectedCloud.cleaningFiles;
                    var date = new Date(vm.selectedCloud.date);
                    vm.name = "Dia de limpieza : " + date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear() ;

                  }, function () {
                    $scope.main.loading = false;
                    notiffy.error('Error al obtener lista de archivos.');
                  });
                  break;
                }
                case CONSTANTS.FILE.INFRINGEMENT : {
                  $scope.main.loading = true;
                  InfringementService.getOne(vm.selectedCloud.id).then(function () {
                    $scope.main.loading = false;
                    vm.selectedCloud = Response.infringement;
                    vm.files = vm.selectedCloud.infringementFiles;
                    vm.name = "Folio : " + vm.selectedCloud.folio;
                  }, function () {
                    $scope.main.loading = false;
                    notiffy.error('Error al obtener lista de archivos.');
                  });
                  break;
                }
                case CONSTANTS.FILE.CIRCULATIONCARD : {
                  $scope.main.loading = true;
                  CirculationCardService.getOne(vm.selectedCloud.id).then(function () {
                    $scope.main.loading = false;
                    vm.selectedCloud = Response.circulationCard;
                    vm.files = vm.selectedCloud.circulationCardFiles;
                    vm.name = "Folio : " + vm.selectedCloud.folio;
                  }, function () {
                    $scope.main.loading = false;
                    notiffy.error('Error al obtener lista de archivos.');
                  });
                  break;
                }
                case CONSTANTS.FILE.GASCARD : {
                  $scope.main.loading = true;
                  GasCardService.getOne(vm.selectedCloud.id).then(function () {
                    $scope.main.loading = false;
                    vm.selectedCloud = Response.gasCard;
                    vm.files = vm.selectedCloud.gasCardFiles;
                    vm.name = "Folio : " + vm.selectedCloud.folio;
                  }, function () {
                    $scope.main.loading = false;
                    notiffy.error('Error al obtener lista de archivos.');
                  });
                  break;
                }
                case CONSTANTS.FILE.CHARGEGASCARD : {
                  $scope.main.loading = true;
                  ChargeGasCardService.getOne(vm.selectedCloud.id).then(function () {
                    $scope.main.loading = false;
                    vm.selectedCloud = Response.chargeGasCard;
                    vm.files = vm.selectedCloud.chargeGasCardFiles;
                    if(vm.selectedCloud.numInvoice != null && vm.selectedCloud.numInvoice != ""){
                        vm.name = "No. Factura : " + vm.selectedCloud.numInvoice;
                    }
                    vm.name = "";
                  }, function () {
                    $scope.main.loading = false;
                    notiffy.error('Error al obtener lista de archivos.');
                  });
                  break;
                }
                case CONSTANTS.FILE.PIKECARD : {
                  $scope.main.loading = true;
                  PikeCardService.getOne(vm.selectedCloud.id).then(function () {
                    $scope.main.loading = false;
                    vm.selectedCloud = Response.pikeCard;
                    vm.files = vm.selectedCloud.pikeCardFiles;
                    vm.name = "Folio : " + vm.selectedCloud.folio;
                  }, function () {
                    $scope.main.loading = false;
                    notiffy.error('Error al obtener lista de archivos.');
                  });
                  break;
                }
                case CONSTANTS.FILE.CHARGEPIKECARD : {
                  $scope.main.loading = true;
                  ChargePikeCardService.getOne(vm.selectedCloud.id).then(function () {
                    $scope.main.loading = false;
                    vm.selectedCloud = Response.chargePikeCard;
                    vm.files = vm.selectedCloud.chargePikeCardFiles;
                    vm.name = "";
                  }, function () {
                    $scope.main.loading = false;
                    notiffy.error('Error al obtener lista de archivos.');
                  });
                  break;
                }
                case CONSTANTS.FILE.TENURE : {
                  $scope.main.loading = true;
                  TenureService.getOne(vm.selectedCloud.id).then(function () {
                    $scope.main.loading = false;
                    vm.selectedCloud = Response.tenure;
                    vm.files = vm.selectedCloud.tenureFiles;
                    vm.name = "Folio : " + vm.selectedCloud.folio;
                  }, function () {
                    $scope.main.loading = false;
                    notiffy.error('Error al obtener lista de archivos.');
                  });
                  break;
                }
                case CONSTANTS.FILE.VERIFICATION : {
                  $scope.main.loading = true;
                  VerificationService.getOne(vm.selectedCloud.id).then(function () {
                    $scope.main.loading = false;
                    vm.selectedCloud = Response.verification;
                    vm.files = vm.selectedCloud.verificationFiles;
                    vm.name = "Folio : " + vm.selectedCloud.folio;
                  }, function () {
                    $scope.main.loading = false;
                    notiffy.error('Error al obtener lista de archivos.');
                  });
                  break;
                }
                case CONSTANTS.FILE.OTHER : {
                  $scope.main.loading = true;
                  OtherService.getOne(vm.selectedCloud.id).then(function () {
                    $scope.main.loading = false;
                    vm.selectedCloud = Response.other;
                    vm.files = vm.selectedCloud.otherFiles;
                    vm.name = "Nombre : " + vm.selectedCloud.name;
                  }, function () {
                    $scope.main.loading = false;
                    notiffy.error('Error al obtener lista de archivos.');
                  });
                  break;
                }
                case CONSTANTS.FILE.MONITORING : {
                  $scope.main.loading = true;
                  MonitoringService.getOne(vm.selectedCloud.id).then(function () {
                    $scope.main.loading = false;
                    vm.selectedCloud = Response.monitoring;
                    vm.files = vm.selectedCloud.monitoringFiles;
                    vm.name = "";
                  }, function () {
                    $scope.main.loading = false;
                    notiffy.error('Error al obtener lista de archivos.');
                  });
                  break;
                }

              }
            };

            vm.refreshCloud();

            vm.uploadFile = function (file) {
                vm.file = file;
                if (vm.file) {
                    $scope.main.loading = true;
                    StorageService.upload({
                        file: vm.file
                    }, {
                        id: vm.selectedCloud.id,
                        path: vm.stateData.path
                    }).then(function () {
                        $scope.main.loading = false;
                        notiffy.success('Archivo subido.');
                        vm.refreshCloud();
                    }, function () {
                        $scope.main.loading = false;
                        notiffy.error('Error al subir el archivo.');
                    });
                } else {
                    vm.isOverMaxSize = true;
                }
            };

            vm.openIDModal = function (fileDto) {
                var modalInstance = $uibModal.open({
                    templateUrl: 'views/user/userID.modal.html',
                    controller: 'UserIDModalCtrl',
                    controllerAs: 'vm'
                });
                modalInstance.result.then(function (selectedItem) {
                    if(selectedItem){
                      vm.deleteFileTrue(fileDto);
                    }
                }, function () {
                    vm.refreshCloud();
                });
            };

            vm.deleteFile = function (file) {
              var fileDto = {
                id: file.id,
                path: vm.stateData.path
              };
              if(vm.user.role.id == CONSTANTS.ROLES.ADMIN){
                vm.deleteFileTrue(fileDto);
              }else{
                vm.openIDModal(fileDto);
              }
            };

            vm.deleteFileTrue = function (fileDto) {
              confirmm.confirm("¿Desea eliminar el archivo?", function () {
                $scope.main.loading = true;
                StorageService.remove(fileDto).then(function () {
                  $scope.main.loading = false;
                  notiffy.success('Archivo eliminado.');
                  vm.refreshCloud();
                }, function () {
                  $scope.main.loading = false;
                  notiffy.error('Error al eliminar el archivo.');
                });
              });
            };

            vm.openFile = function (files, index) {
                $window.open(vm.filesPath + files[index].id, '_blank');
            };

            vm.isImage = function (name) {
                var nameAux = name.toUpperCase();
                var image = false;
                if (nameAux.endsWith('JPG') || nameAux.endsWith('PNG')) {
                    image = true;
                }
                return image;
            };

        }]);

})();