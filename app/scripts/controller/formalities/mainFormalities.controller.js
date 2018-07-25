(function () {
    'use strict';

    var module = angular.module('fleetmanager');

    module.controller('MainFormalitiesCtrl', [
        'CONSTANTS', '$rootScope', '$state', '$scope', '$sessionStorage', 'CarService', 'TechnicianService', 'Response', 'notiffy',
        function (CONSTANTS, $rootScope, $state, $scope, $sessionStorage, CarService, TechnicianService, Response, notiffy) {

            var vm = this;

            vm.stateData = $sessionStorage.stateData;
            vm.selectedCloud = $sessionStorage.selectedCloud;
            vm.user = $sessionStorage.userToken;
            vm.car = $sessionStorage.carFormalities;

            vm.formalities = function (formalities) {
                switch (formalities){
                    case CONSTANTS.FORMALITIES.TORAGE: {
                        $state.go("index.torage");
                        break;
                    }

                    case CONSTANTS.FORMALITIES.INSURANCE: {
                        $state.go("index.insurance");
                        break;
                    }

                    case CONSTANTS.FORMALITIES.MAINTENANCE: {
                        $state.go("index.maintenance");
                        break;
                    }

                    case CONSTANTS.FORMALITIES.CLEANING: {
                        $state.go("index.cleaning");
                        break;
                    }

                    case CONSTANTS.FORMALITIES.INFRINGEMENT: {
                        $state.go("index.infringement");
                        break;
                    }

                    case CONSTANTS.FORMALITIES.CIRCULATIONCARD: {
                        $state.go("index.circulationCard");
                        break;
                    }

                    case CONSTANTS.FORMALITIES.GASCARD: {
                        $state.go("index.chargeGasCard");
                        break;
                    }

                    case CONSTANTS.FORMALITIES.PIKECARD: {
                        $state.go("index.chargePikeCard");
                        break;
                    }

                    case CONSTANTS.FORMALITIES.TENURE: {
                        $state.go("index.tenure");
                        break;
                    }

                    case CONSTANTS.FORMALITIES.VERIFICATION: {
                        $state.go("index.verification");
                        break;
                    }

                    case CONSTANTS.FORMALITIES.OTHER: {
                        $state.go("index.other");
                        break;
                    }
                }
            };

        }]);

})();