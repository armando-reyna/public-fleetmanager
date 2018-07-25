(function () {
    'use strict';

    var module = angular.module('fleetmanager');

    module.factory('Environment', ['CONSTANTS',
        function (CONSTANTS) {

            var Environment = {};

            Environment.check = function(host) {
                angular.forEach(CONSTANTS.API_URIS, function(uri){
                    if(host.indexOf(uri.key) !== -1){
                        CONSTANTS.ENV = uri.env;
                        CONSTANTS.API_URI = uri.back;
                        CONSTANTS.API_URI_UI = uri.ui;
                        CONSTANTS.DEV = CONSTANTS.ENV === CONSTANTS.ENVS.DEV;
                    }
                });
                if(!CONSTANTS.API_URI){
                    CONSTANTS.ENV = CONSTANTS.API_URIS[0].env;
                    CONSTANTS.API_URI = CONSTANTS.API_URIS[0].back;
                    CONSTANTS.API_URI_UI = CONSTANTS.API_URIS[0].ui;
                    CONSTANTS.DEV = true;
                }
            };

            return Environment;

        }]);

})();
