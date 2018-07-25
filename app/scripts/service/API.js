(function () {
  'use strict';

  var module = angular.module('fleetmanager');

  module.factory('APIService', ['CONSTANTS', '$log', '$http', 'Upload',
    function (CONSTANTS, $log, $http, Upload) {

      var APIService = {};

      var upload = function (uri, obj, fields) {
        return Upload.upload({
          url: CONSTANTS.API_URI + uri,
          fields: fields ? fields : {},
          file: obj ? obj.file : {}
        })
      };

      var multiUpload = function (uri, obj, fields) {
        return Upload.upload({
          url: CONSTANTS.API_URI + uri,
          fields: fields ? fields : {},
          file: obj ? obj.file : {},
          arrayKey: ''
        })
      };

      var post = function (uri, obj, headers) {
        return $http({
          url: CONSTANTS.API_URI + uri,
          method: 'POST',
          data: obj ? obj : {},
          headers: headers ? headers : {}
        });
      };

      var put = function (uri, obj, headers) {
        return $http({
          url: CONSTANTS.API_URI + uri,
          method: 'PUT',
          data: obj ? obj : {},
          headers: headers ? headers : {}
        });
      };

      var get = function (uri, obj, headers) {
        return $http({
          url: CONSTANTS.API_URI + uri + (obj ? '/' + obj : ''),
          method: 'GET',
          headers: headers ? headers : {}
        });
      };

      APIService.config = {
        getMenu: function (menu) {
          return $http({
            url: 'resources/' + menu + '.json',
            method: 'GET'
          });
        }
      };

      APIService.user = {
        login: function (user) {
          return post('login/', user);
        },
        save: function (user) {
          return post('user/', user);
        },
        getAllUserRoles: function () {
          return get('roles/');
        },
        getUsers: function (inactive) {
          var path;
          if (inactive) {
            path = 'user'
          } else {
            path = 'user/active'
          }
          return get(path);
        },
        activate: function (users) {
          return post('user/activate', users);
        },
        deactivate: function (users) {
          return post('user/deactivate', users);
        },
        changePassword: function (user) {
          return post('user/changepassword', user);
        },
        requestResetPassword: function (user) {
          return post('user/requestresetpassword', user);
        },
        resetPassword: function (user) {
          return post('user/resetpassword', user);
        }
      };

      APIService.technician = {
        save: function (technician) {
            return post('technician/', technician);
        },
        getTechnicians: function(inactive){
          var path;
          if (inactive) {
              path = 'technician'
          } else {
              path = 'technician/active'
          }
          return get(path);
        },
        activate: function (technicians) {
            return post('technician/activate', technicians);
        },
        deactivate: function (technicians) {
            return post('technician/deactivate', technicians);
        }
      };

      APIService.car = {
        save: function (car) {
          return post('vehicle/', car);
        },
        getCars: function (inactive) {
          var path;
          if (inactive) {
            path = 'vehicle'
          } else {
            path = 'vehicle/active'
          }
          return get(path);
        },
        getOne: function (id) {
          return get('vehicle/one', id);
        },
        activate: function (cars) {
          return post('vehicle/activate', cars);
        },
        deactivate: function (cars) {
          return post('vehicle/deactivate', cars);
        },
        getVehicleCount: function () {
          return get('vehicle/count');
        },
        getAllVehicleTypes: function(){
          return get('vehicle/vehicleType');
        },
        getAllVehicleCylinders: function(){
            return get('/vehicle/vehicleCylinders');
        },
        getAllVehicleClasses: function(){
            return get('/vehicle/vehicleClass');
        },
        getAllVehicleEnergyTypes: function(){
            return get('/vehicle/vehicleEnergyType');
        },
        getAllVehicleUses: function(){
            return get('/vehicle/vehicleUse');
        },
        getAllVehicleOrigins: function(){
            return get('/vehicle/vehicleOrigin');
        },
        getAllVehicleZones: function(){
            return get('/vehicle/vehicleZone');
        },
        getAllVehicleStickys: function(){
            return get('/vehicle/vehicleSticky');
        },
        getAllMakes: function(){
          return get('vehicle/make');
        },
        getAllModelsByMake: function(makeId){
          return get('vehicle/model', makeId);
        },
        getAllTimeNotification: function(){
          return get('notification/timeNotification');
        },
        saveNotification: function (notification) {
          return post('notification/', notification);
        },
        getNotification: function (notification) {
          return get('notification/', notification);
        }
      };

      APIService.circulationCard = {
        save: function (circulationCard) {
            return post('vehicle/circulationCard/', circulationCard);
        },
        getCirculationCards: function(vehicleId){
            return get('vehicle/circulationCard/active', vehicleId);
        },
        getCirculationCardsInactives: function(vehicleId){
            return get('vehicle/circulationCard',vehicleId);
        },
        getOne: function (id) {
          return get('vehicle/circulationCard/one', id);
        },
        activate: function (circulationCards) {
            return post('vehicle/circulationCard/activate', circulationCards);
        },
        deactivate: function (circulationCards) {
            return post('vehicle/circulationCard/deactivate', circulationCards);
        }
      };

      APIService.insurance = {
        save: function (insurance) {
            return post('vehicle/insurance/', insurance);
        },
        getInsurances: function(vehicleId){
            return get('vehicle/insurance/active', vehicleId);
        },
        getInsurancesInactives: function(vehicleId){
            return get('vehicle/insurance',vehicleId);
        },
        getOne: function (id) {
          return get('vehicle/insurance/one', id);
        },
        activate: function (insurances) {
            return post('vehicle/insurance/activate', insurances);
        },
        deactivate: function (insurances) {
            return post('vehicle/insurance/deactivate', insurances);
        }
      };

      APIService.gasCard = {
        save: function (gasCard) {
          return post('gasCard/', gasCard);
        },
        getGasCards: function (inactive) {
          var path;
          if (inactive) {
            path = 'gasCard'
          } else {
            path = 'gasCard/active'
          }
          return get(path);
        },
        getGasCardsNoAssigned: function(){
          return get('gasCard/gasCardNoAssigned');
        },
        getOne: function (id) {
          return get('gasCard/one', id);
        },
        activate: function (gasCard) {
          return post('gasCard/activate', gasCard);
        },
        deactivate: function (gasCards) {
          return post('gasCard/deactivate', gasCards);
        }
      };

      APIService.chargeGasCard = {
        save: function (chargeGasCard) {
          return post('vehicle/chargeGasCard/', chargeGasCard);
        },
        getChargeGasCardByVehicleAndGasCard: function(vehicleId){
          return get('vehicle/chargeGasCard/active', vehicleId);
        },
        getAllChargeGasCardByVehicle: function(vehicleId){
          return get('vehicle/chargeGasCard',vehicleId);
        },
        getOne: function (id) {
          return get('vehicle/chargeGasCard/one', id);
        },
        activate: function (chargeGasCards) {
          return post('vehicle/chargeGasCard/activate', chargeGasCards);
        },
        deactivate: function (chargeGasCards) {
          return post('vehicle/chargeGasCard/deactivate', chargeGasCards);
        },
        getWayPay: function () {
          return get('/vehicle/chargeGasCard/wayPay');
        }
      };

      APIService.pikeCard = {
        save: function (pikeCard) {
          return post('vehicle/pikeCard/', pikeCard);
        },
        getPikeCards: function (inactive) {
          var path;
          if (inactive) {
            path = 'vehicle/pikeCard'
          } else {
            path = 'vehicle/pikeCard/active'
          }
          return get(path);
        },
        getPikeCardByVehicle: function (vehicleId) {
          return get('vehicle/pikeCard/vehicleId', vehicleId);
        },
        getOne: function (id) {
          return get('vehicle/pikeCard/one', id);
        },
        activate: function (pikeCard) {
          return post('vehicle/pikeCard/activate', pikeCard);
        },
        deactivate: function (pikeCards) {
          return post('vehicle/pikeCard/deactivate', pikeCards);
        },
        getAllPikeCardTypes: function(){
          return get('vehicle/pikeCardType');
        },
        getIaveCards: function(){
          return get('vehicle/pikeCardIave');
        },
        getTeleviaCards: function(){
          return get('vehicle/pikeCardTelevia');
        },
        getTelepassCards: function(){
          return get('vehicle/pikeCardTelepass');
        },
        getOtherCards: function(){
          return get('vehicle/pikeCardOther');
        }
      };

      APIService.chargePikeCard = {
        save: function (chargePikeCard) {
          return post('vehicle/chargePikeCard/', chargePikeCard);
        },
        getAllChargePikeCardByVehicleAndActive: function(vehicleId){
          return get('vehicle/chargePikeCard/active', vehicleId);
        },
        getAllChargePikeCardByVehicleAndInactive: function(vehicleId){
          return get('vehicle/chargePikeCard/inactive',vehicleId);
        },
        getOne: function (id) {
          return get('vehicle/chargePikeCard/one', id);
        },
        activate: function (chargePikeCards) {
          return post('vehicle/chargePikeCard/activate', chargePikeCards);
        },
        deactivate: function (chargePikeCards) {
          return post('vehicle/chargePikeCard/deactivate', chargePikeCards);
        },
        getWayPay: function () {
          return get('/vehicle/chargePikeCard/wayPay');
        }
      };

      APIService.maintenance = {
        save: function (maintenance) {
            return post('vehicle/maintenance/', maintenance);
        },
        getMaintenances: function(vehicleId){
            return get('vehicle/maintenance/active', vehicleId);
        },
        getMaintenancesInactives: function(vehicleId){
            return get('vehicle/maintenance',vehicleId);
        },
        getAllMaintenanceTypes: function(){
          return get('vehicle/maintenanceType');
        },
        getOne: function (id) {
          return get('vehicle/maintenance/one', id);
        },
        activate: function (maintenances) {
            return post('vehicle/maintenance/activate', maintenances);
        },
        deactivate: function (maintenances) {
            return post('vehicle/maintenance/deactivate', maintenances);
        },
        getAllRepairs: function(){
          return get('maintenance/repairListRepair');
        },
        getAllRepairsCatByRepair: function(repairId){
          return get('maintenance/repairListRepair/cat', repairId);
        },
        saveMaintenancePreventive: function (maintenance) {
          return post('vehicle/maintenancePreventive/', maintenance);
        },
        getMaintenancePreventiveByVehicle: function(vehicleId){
          return get('vehicle/maintenancePreventive', vehicleId);
        },
        deleteMaintenancePreventive: function (maintenance) {
          return post('vehicle/delete/maintenancePreventive/', maintenance);
        }
      };

      APIService.infringement = {
        save: function (infringement) {
            return post('vehicle/infringement/', infringement);
        },
        getInfringements: function(vehicleId){
            return get('vehicle/infringement/active', vehicleId);
        },
        getInfringementsInactives: function(vehicleId){
            return get('vehicle/infringement',vehicleId);
        },
        getOne: function (id) {
          return get('vehicle/infringement/one', id);
        },
        activate: function (infringements) {
            return post('vehicle/infringement/activate', infringements);
        },
        deactivate: function (infringements) {
            return post('vehicle/infringement/deactivate', infringements);
        }
      };

      APIService.tenure = {
        save: function (tenure) {
            return post('vehicle/tenure/', tenure);
        },
        getTenures: function(vehicleId){
            return get('vehicle/tenure/active', vehicleId);
        },
        getTenuresInactives: function(vehicleId){
            return get('vehicle/tenure',vehicleId);
        },
        getOne: function (id) {
          return get('vehicle/tenure/one', id);
        },
        activate: function (tenures) {
            return post('vehicle/tenure/activate', tenures);
        },
        deactivate: function (tenures) {
            return post('vehicle/tenure/deactivate', tenures);
        }
      };

      APIService.verification = {
        save: function (verification) {
            return post('vehicle/verification/', verification);
        },
        getVerifications: function(vehicleId){
            return get('vehicle/verification/active', vehicleId);
        },
        getVerificationsInactives: function(vehicleId){
          return get('vehicle/verification',vehicleId);
        },
        getVerificationHologram: function(){
            return get('vehicle/verificationHologram');
        },
        getVerificationPeriod: function(){
          return get('vehicle/verificationPeriod');
        },
        getOne: function (id) {
          return get('vehicle/verification/one', id);
        },
        activate: function (verifications) {
            return post('vehicle/verification/activate', verifications);
        },
        deactivate: function (verifications) {
            return post('vehicle/verification/deactivate', verifications);
        }
      };

      APIService.cleaning = {
        save: function (cleaning) {
            return post('vehicle/cleaning/', cleaning);
        },
        getCleanings: function(vehicleId){
            return get('vehicle/cleaning/active', vehicleId);
        },
        getCleaningsInactives: function(vehicleId){
            return get('vehicle/cleaning', vehicleId);
        },
        getOne: function (id) {
          return get('vehicle/cleaning/one', id);
        },
        activate: function (cleanings) {
            return post('vehicle/cleaning/activate', cleanings);
        },
        deactivate: function (cleanings) {
            return post('vehicle/cleaning/deactivate', cleanings);
        }
      };

      APIService.other = {
        save: function (other) {
            return post('vehicle/other/', other);
        },
        getOthers: function(vehicleId){
            return get('vehicle/other/active', vehicleId);
        },
        getOthersInactives: function(vehicleId){
            return get('vehicle/other',vehicleId);
        },
        getOne: function (id) {
          return get('vehicle/other/one', id);
        },
        activate: function (others) {
            return post('vehicle/other/activate', others);
        },
        deactivate: function (others) {
            return post('vehicle/other/deactivate', others);
        }
      };

      APIService.torage = {
        save: function (torage) {
            return post('vehicle/storage/', torage);
        },
        getTorages: function(vehicleId){
            return get('vehicle/storage/active', vehicleId);
        },
        getToragesInactives: function(vehicleId){
            return get('vehicle/storage',vehicleId);
        },
        getOne: function (id) {
          return get('vehicle/storage/one', id);
        },
        activate: function (torages) {
            return post('vehicle/storage/activate', torages);
        },
        deactivate: function (torages) {
            return post('vehicle/storage/deactivate', torages);
        }
      };

      APIService.monitoring = {
        save: function (monitoring) {
          return post('vehicle/monitoring/', monitoring);
        },
        getMonitorings: function(inactive){
          var path;
          if (inactive) {
            path = 'vehicle/monitoring'
          } else {
            path = 'vehicle/monitoring/active'
          }
          return get(path);
        },
        getOne: function (id) {
          return get('vehicle/monitoring/one', id);
        },
        activate: function (monitorings) {
          return post('vehicle/monitoring/activate', monitorings);
        },
        deactivate: function (monitorings) {
          return post('vehicle/monitoring/deactivate', monitorings);
        }
      };

      APIService.storage = {
        upload: function (uploadDTO, id) {
            return multiUpload('storage/upload', uploadDTO, id);
        },
        remove: function (fileDto) {
            return post('storage/remove', fileDto);
        }
      };


      return APIService;

    }]);

})();
