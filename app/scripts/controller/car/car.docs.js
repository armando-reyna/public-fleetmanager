(function () {
    'use strict';

    var module = angular.module('fleetmanager');

    module.controller('CarDocsCtrl', [
        'CONSTANTS', '$rootScope', '$state', '$scope', '$sessionStorage', 'CarService', 'TechnicianService', 'Response', '$uibModalInstance', 'notiffy', 'car',
        function (CONSTANTS, $rootScope, $state, $scope, $sessionStorage, CarService, TechnicianService, Response, $uibModalInstance, notiffy, car) {

            var vm = this;

            if (car) {
                vm.car = car;
            }

            vm.user = $sessionStorage.userToken;

            vm.formalities = function (formalities) {
                $sessionStorage.carFormalities = vm.car;
                switch (formalities){
                    case CONSTANTS.FORMALITIES.TORAGE: {
                        $state.go("index.torage");
                        $uibModalInstance.close();
                        break;
                    }

                    case CONSTANTS.FORMALITIES.INSURANCE: {
                        $state.go("index.insurance");
                        $uibModalInstance.close();
                        break;
                    }

                    case CONSTANTS.FORMALITIES.MAINTENANCE: {
                        $state.go("index.maintenance");
                        $uibModalInstance.close();
                        break;
                    }

                    case CONSTANTS.FORMALITIES.CLEANING: {
                        $state.go("index.cleaning");
                        $uibModalInstance.close();
                        break;
                    }

                    case CONSTANTS.FORMALITIES.INFRINGEMENT: {
                        $state.go("index.infringement");
                        $uibModalInstance.close();
                        break;
                    }

                    case CONSTANTS.FORMALITIES.CIRCULATIONCARD: {
                        $state.go("index.circulationCard");
                        $uibModalInstance.close();
                        break;
                    }

                    case CONSTANTS.FORMALITIES.GASCARD: {
                        $state.go("index.chargeGasCard");
                        $uibModalInstance.close();
                        break;
                    }

                    case CONSTANTS.FORMALITIES.PIKECARD: {
                        $state.go("index.chargePikeCard");
                        $uibModalInstance.close();
                        break;
                    }

                    case CONSTANTS.FORMALITIES.TENURE: {
                        $state.go("index.tenure");
                        $uibModalInstance.close();
                        break;
                    }

                    case CONSTANTS.FORMALITIES.VERIFICATION: {
                        $state.go("index.verification");
                        $uibModalInstance.close();
                        break;
                    }

                    case CONSTANTS.FORMALITIES.OTHER: {
                        $state.go("index.other");
                        $uibModalInstance.close();
                        break;
                    }
                }
            };

            vm.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };

        }]);

})();