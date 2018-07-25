(function () {
  'use strict';

  angular
    .module('fleetmanager')
    .factory('confirmm', ['SweetAlert',
      function (SweetAlert) {

        var confirmm = this;

        confirmm.confirm = function(message, callback){
          SweetAlert.swal({
              title: "Confirmar",
              text: message,
              type: "warning",
              showCancelButton: true,
              //confirmButtonColor: "#DD6B55",
              cancelButtonText: "Cancelar",
              confirmButtonText: "Confirmar",
              closeOnConfirm: true,
              closeOnCancel: true
            },
            function (confirmed) {
              if(confirmed){
                callback();
              }
            });
        };

        confirmm.success = function(message){
          SweetAlert.swal({
            title: "Éxito",
            text: message,
            type: "success",
            showCancelButton: false,
            confirmButtonText: "Ok",
            closeOnConfirm: true
          });
        };

        confirmm.error = function(message){
          SweetAlert.swal({
            title: "Error",
            text: message,
            type: "error",
            showCancelButton: false,
            confirmButtonText: "Ok",
            closeOnConfirm: true
          });
        };

        return confirmm;

      }]);

})();
