(function () {
    'use strict';

    var module = angular.module('fleetmanager');

    module.controller('ReportCtrl', [
        'CONSTANTS', '$rootScope', '$scope', '$state', '$sessionStorage', '$timeout', 'ChargePikeCardService', 'ChargeGasCardService', 'PikeCardService', 'GasCardService', 'CarService', 'VerificationService',  'Response',
        '$uibModal', 'confirmm', 'notiffy', '$window',
        function (CONSTANTS, $rootScope, $scope, $state, $sessionStorage, $timeout, ChargePikeCardService, ChargeGasCardService, PikeCardService, GasCardService, CarService, VerificationService, Response, $uibModal,
                  confirmm, notiffy, $window) {

            var vm = this;

            vm.user = $sessionStorage.userToken;
            vm.search = false;
            vm.searchTwo = false;
            vm.searchFor = false;
            vm.searchForCard = false;
            vm.showFilter = false;
            vm.verificationPeriod;

            vm.optionOne = function () {
                vm.search = false;
            };

            vm.optionTwo = function () {
                vm.search = true;
            };

            $scope.$watch('vm.search', function (newVal, oldVal) {
                if(!vm.search){
                    vm.styleOne = "btn-primary";
                    vm.styleTwo = "btn-secondary";
                }else{
                    vm.styleOne = "btn-secondary";
                    vm.styleTwo = "btn-primary";
                }
            });

            vm.optionSecondOne = function () {
                vm.searchTwo = false;
            };

            vm.optionSecondTwo = function () {
                vm.searchTwo = true;
            };

            $scope.$watch('vm.searchTwo', function (newVal, oldVal) {
                if(!vm.searchTwo){
                    vm.styleSecondOne = "btn-primary";
                    vm.styleSecondTwo = "btn-secondary";
                }else{
                    vm.styleSecondOne = "btn-secondary";
                    vm.styleSecondTwo = "btn-primary";
                }
            });

            vm.optionThirdOne = function () {
                vm.searchFor = false;
            };

            vm.optionThirdTwo = function () {
                vm.searchFor = true;
            };

            $scope.$watch('vm.searchFor', function (newVal, oldVal) {
                if(!vm.searchFor){
                    vm.styleThirdOne = "btn-primary";
                    vm.styleThirdTwo = "btn-secondary";
                }else{
                    vm.styleThirdOne = "btn-secondary";
                    vm.styleThirdTwo = "btn-primary";
                }
                vm.from = moment();
                vm.to = moment();
                vm.year = moment();
                vm.period = null;

            });



            vm.optionFourthOne = function () {
                vm.searchForCard = false;
            };

            vm.optionFourthTwo = function () {
                vm.searchForCard = true;
            };

            $scope.$watch('vm.searchForCard', function (newVal, oldVal) {
                vm.wayPayGas = null;
                vm.gasCard = null;
                vm.wayPayPike = null;
                vm.pikeCard = null;
                vm.pikeCardType = null;

                if(!vm.searchForCard){
                    vm.styleFourthOne = "btn-primary";
                    vm.styleFourthTwo = "btn-secondary";
                }else{
                    vm.styleFourthOne = "btn-secondary";
                    vm.styleFourthTwo = "btn-primary";
                }
            });



            vm.setReport = function (report) {
                delete vm.from;
                delete vm.to;

                vm.search = false;
                vm.searchTwo = false;
                vm.searchFor = false;
                vm.searchForCard = false;

                vm.vehicle = null;
                vm.gasCard = null;
                vm.wayPayGas = null;
                vm.pikeCard = null;
                vm.wayPayPike = null;
                vm.selectedReport = report;

                if(vm.selectedReport.id == CONSTANTS.REPORTS.CLEANING.id || vm.selectedReport.id == CONSTANTS.REPORTS.GASCARD.id){
                    vm.showFilter = false;
                }else{
                    vm.showFilter = true;
                }

                vm.from = moment();
                vm.to = moment();
                vm.year = moment();

            };


            vm.loadVehicles = function () {
                $scope.main.loading = true;
                CarService.getCars(false).then(function () {
                    $scope.main.loading = false;
                    vm.vehicleList = Response.carList;
                }, function () {
                    $scope.main.loading = false;
                    notiffy.error('Error al obtener la lista de vehículos.');
                });
            };

            vm.loadVehicles();

            vm.loadAllGasCard = function () {
                vm.loading = true;
                GasCardService.getGasCards(false).then(function () {
                    vm.loading = false;
                    vm.gasCardList = Response.gasCardList;
                }, function () {
                    vm.loading = false;
                    notiffy.error('Error al obtener la lista de tarjetas de gas.');
                });
            };

            vm.loadAllGasCard();

            vm.loadWayPayGas = function () {
                vm.loading = true;
                ChargeGasCardService.getWayPay().then(function () {
                    vm.loading = false;
                    vm.wayPayGasList = Response.wayPayList;
                }, function () {
                    vm.loading = false;
                    notiffy.error('Error al obtener la lista de formas de pago.');
                });
            };

            vm.loadWayPayGas();

            vm.loadAllPikeCard = function () {
                vm.loading = true;
                PikeCardService.getPikeCards(false).then(function () {
                    vm.loading = false;
                    vm.pikeCardList = Response.pikeCardList;
                }, function () {
                    vm.loading = false;
                    notiffy.error('Error al obtener la lista de tarjetas peaje.');
                });
            };

            vm.loadAllPikeCard();

            vm.loadTypes = function () {
                vm.loading = true;
                PikeCardService.getAllPikeCardTypes().then(function () {
                    vm.loading = false;
                    vm.pikeCardTypeList = Response.pikeCardTypes;
                }, function () {
                    vm.loading = false;
                    notiffy.error('Error al obtener la lista de tipos de tarjetas peaje.');
                });
            };

            vm.loadTypes();

            vm.loadWayPayPike = function () {
                vm.loading = true;
                ChargePikeCardService.getWayPay().then(function () {
                    vm.loading = false;
                    vm.wayPayPikeList = Response.wayPayList;
                }, function () {
                    vm.loading = false;
                    notiffy.error('Error al obtener la lista de formas de pago.');
                });
            };

            vm.loadWayPayPike();

            vm.loadVerificationPeriod = function () {
                vm.loading = true;
                VerificationService.getVerificationPeriod().then(function () {
                    vm.loading = false;
                    vm.verificationPeriod= Response.verificationPeriod;
                }, function () {
                    vm.loading = false;
                    notiffy.error('Error al obtener la lista de periodos para verificación.');
                });
            };

            vm.loadVerificationPeriod();



            vm.generateReportExcel = function () {

                var finalUrl;
                var finalFrom;
                var finalTo;
                var finalYear;

                if((vm.selectedReport.id == CONSTANTS.REPORTS.TENURE.id && vm.searchFor == '1') || vm.selectedReport.id == CONSTANTS.REPORTS.VERIFICATION.id && vm.searchFor == '1'){
                    finalUrl = vm.selectedReport.url;
                    finalYear = vm.year.toDate();
                    finalYear.setHours(0);
                    finalYear.setMinutes(0);
                    finalYear.setSeconds(0);
                    finalYear.setMilliseconds(0);
                    finalUrl += '?year=' + finalYear.getTime();
                }else{
                    finalUrl = vm.selectedReport.url;

                    finalFrom = vm.from.toDate();
                    finalFrom.setHours(0);
                    finalFrom.setMinutes(0);
                    finalFrom.setSeconds(0);
                    finalFrom.setMilliseconds(0);
                    finalTo = vm.to.toDate();
                    finalTo.setHours(23);
                    finalTo.setMinutes(59);
                    finalTo.setSeconds(59);
                    finalTo.setMilliseconds(59);
                    finalUrl += '?from=' + finalFrom.getTime() + '&to=' + finalTo.getTime();
                    if(finalFrom >= finalTo){
                        notiffy.error('La fecha de inicio debe ser menor a la fecha de fin.');
                        return;
                    }

                }


                if(vm.selectedReport.id != CONSTANTS.REPORTS.CLEANING.id && vm.selectedReport.id != CONSTANTS.REPORTS.CHARGEPIKECARD.id
                    && vm.selectedReport.id != CONSTANTS.REPORTS.TENURE.id && vm.selectedReport.id != CONSTANTS.REPORTS.VERIFICATION.id
                    && vm.selectedReport.id != CONSTANTS.REPORTS.GASCARD.id && vm.selectedReport.id != CONSTANTS.REPORTS.PIKECARD.id){
                    finalUrl += '&search=' + vm.search;
                }
                if(vm.selectedReport.id == CONSTANTS.REPORTS.INFRINGEMENT.id){
                    finalUrl += '&searchTwo=' + vm.searchTwo;
                }
                if(vm.vehicle){
                    finalUrl += '&vehicleId=' + vm.vehicle.id;
                }
                if(vm.wayPayGas){
                    finalUrl += '&wayPayGasId=' + vm.wayPayGas.id;
                }
                if(vm.gasCard){
                    finalUrl += '&gasCardId=' + vm.gasCard.id;
                }
                if(vm.wayPayPike){
                    finalUrl += '&wayPayPikeId=' + vm.wayPayPike.id;
                }
                if(vm.pikeCard){
                    finalUrl += '&pikeCardId=' + vm.pikeCard.id;
                }
                if(vm.period){
                    finalUrl += '&periodId=' + vm.period.id;
                }
                if(vm.pikeCardType){
                    finalUrl += '&pikeCardTypeId=' + vm.pikeCardType.id;
                }

                $window.open(finalUrl, '_blank');

            };

        }]);

})();