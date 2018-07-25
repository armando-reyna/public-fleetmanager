angular
  .module('fleetmanager')
  .config(['$stateProvider', '$urlRouterProvider', 'CONSTANTS', function ($stateProvider, $urlRouterProvider, CONSTANTS) {

    $urlRouterProvider.otherwise("/index/main");

    $stateProvider
      .state('login', {
        url: "/login",
        templateUrl: "views/login.html",
        controller: "LoginCtrl",
        controllerAs: "vm",
        data: {pageTitle: 'Login', specialClass: 'gray-bg'}
      })
      .state('reset', {
        url: "/reset/:id/:key",
        templateUrl: "views/login.html",
        controller: "LoginCtrl",
        controllerAs: "vm",
        data: {pageTitle: 'Login', specialClass: 'gray-bg'}
      })
      .state('500', {
        url: "/500",
        templateUrl: "views/common/500.html",
        data: {pageTitle: 'Server Error', specialClass: 'gray-bg'}
      })
      .state('index', {
        abstract: true,
        url: "/index",
        templateUrl: "views/common/content.html",
        controller: "IndexCtrl",
        controllerAs: "vm"
      })
      .state('index.profile', {
        url: "/profile",
        templateUrl: "views/common/profile.html",
        controller: "ProfileCtrl",
        controllerAs: "vm",
        data: {pageTitle: 'Mi Perfil'}
      })
      .state('index.main', {
        url: "/main",
        templateUrl: "views/main/home.html",
        controller: "HomeCtrl",
        controllerAs: "vm",
        data: {pageTitle: 'Inicio'}
      })
      .state('index.user', {
        url: "/user",
        templateUrl: "views/user/user.html",
        controller: "UserCtrl",
        controllerAs: "vm",
        data: {pageTitle: 'Usuarios'}
      })
      .state('index.car', {
        url: "/car",
        templateUrl: "views/car/car.html",
        controller: "CarCtrl",
        controllerAs: "vm",
        data: {
          path: 'vehicle',
          pageTitle: 'Vehículos',
          state: 'index.car',
          label: 'Vehículo',
          iClass: 'fa fa-car'
        }
      })
      .state('index.mainFormalities', {
        url: "/mainFormalities",
        templateUrl: "views/formalities/mainFormalities.html",
        controller: "MainFormalitiesCtrl",
        controllerAs: "vm",
        data: {
          path: 'formalities',
          pageTitle: 'Trámites',
          state: 'index.mainFormalities',
          label: 'Trámites',
          iClass: 'fa fa-car'
        }
      })
      .state('index.technician', {
          url: "/technician",
          templateUrl: "views/technician/technician.html",
          controller: "TechnicianCtrl",
          controllerAs: "vm",
          data: {
            path: 'technician',
            pageTitle: 'Técnicos',
            state: 'index.technician',
            label: 'Técnico',
            iClass: 'fa fa-wrench'
          }
      })
      .state('index.circulationCard', {
          url: "/circulationCard",
          templateUrl: "views/formalities/circulationCard.html",
          controller: "CirculationCardCtrl",
          controllerAs: "vm",
          data: {
            path: 'circulationCard',
            pageTitle: 'Tarjetas de Circulación',
            state: 'index.circulationCard',
            label: 'Tarjeta de Circulación',
            iClass: 'fa fa-book'
          }
      })
      .state('index.insurance', {
          url: "/insurance",
          templateUrl: "views/formalities/insurance.html",
          controller: "InsuranceCtrl",
          controllerAs: "vm",
          data: {
            path: 'insurance',
            pageTitle: 'Seguros',
            state: 'index.insurance',
            label: 'Seguro',
            iClass: 'fa fa-book'
          }
      })
      .state('index.gasCard', {
          url: "/gasCard",
          templateUrl: "views/gasCard/gasCard.html",
          controller: "GasCardCtrl",
          controllerAs: "vm",
          data: {
            path: 'gasCard',
            pageTitle: 'Tarjetas de Gas',
            state: 'index.gasCard',
            label: 'Tarjeta de Gas',
            iClass: 'fa fa-book'
          }
      })
      .state('index.chargeGasCard', {
          url: "/chargeGasCard",
          templateUrl: "views/formalities/chargeGasCard.html",
          controller: "ChargeGasCardCtrl",
          controllerAs: "vm",
          data: {
            path: 'chargeGasCard',
            pageTitle: 'Carga de combustible',
            state: 'index.chargeGasCard',
            label: 'Carga de combustible',
            iClass: 'fa fa-book'
          }
      })
      .state('index.maintenance', {
          url: "/maintenance",
          templateUrl: "views/formalities/maintenance.html",
          controller: "MaintenanceCtrl",
          controllerAs: "vm",
          data: {
            path: 'maintenance',
            pageTitle: 'Mantenimientos',
            state: 'index.maintenance',
            label: 'Mantenimiento',
            iClass: 'fa fa-book'
          }
      })
      .state('index.infringement', {
          url: "/infringement",
          templateUrl: "views/formalities/infringement.html",
          controller: "InfringementCtrl",
          controllerAs: "vm",
          data: {
            path: 'infringement',
            pageTitle: 'Infracciones',
            state: 'index.infringement',
            label: 'Infracción',
            iClass: 'fa fa-book'
          }
      })
      .state('index.tenure', {
          url: "/tenure",
          templateUrl: "views/formalities/tenure.html",
          controller: "TenureCtrl",
          controllerAs: "vm",
          data: {
            path: 'tenure',
            pageTitle: 'Tenencias',
            state: 'index.tenure',
            label: 'Tenencia',
            iClass: 'fa fa-book'
          }
      })
      .state('index.verification', {
          url: "/verification",
          templateUrl: "views/formalities/verification.html",
          controller: "VerificationCtrl",
          controllerAs: "vm",
          data: {
            path: 'verification',
            pageTitle: 'Verificaciones',
            state: 'index.verification',
            label: 'Verificación',
            iClass: 'fa fa-book'
          }
      })
      .state('index.pikeCard', {
          url: "/pikeCard",
          templateUrl: "views/pikeCard/pikeCard.html",
          controller: "PikeCardCtrl",
          controllerAs: "vm",
          data: {
            path: 'pikeCard',
            pageTitle: 'Tarjetas de Peajes',
            state: 'index.pikeCard',
            label: 'Tarjeta Peaje',
            iClass: 'fa fa-book'
          }
      })
      .state('index.chargePikeCard', {
        url: "/chargePikeCard",
        templateUrl: "views/formalities/chargePikeCard.html",
        controller: "ChargePikeCardCtrl",
        controllerAs: "vm",
        data: {
          path: 'chargePikeCard',
          pageTitle: 'Control de peajes',
          state: 'index.chargePikeCard',
          label: 'Control de peajes',
          iClass: 'fa fa-book'
        }
      })
      .state('index.cleaning', {
          url: "/cleaning",
          templateUrl: "views/formalities/cleaning.html",
          controller: "CleaningCtrl",
          controllerAs: "vm",
          data: {
            path: 'cleaning',
            pageTitle: 'Limpiezas',
            state: 'index.cleaning',
            label: 'Limpieza',
            iClass: 'fa fa-book'
          }
      })
      .state('index.other', {
          url: "/other",
          templateUrl: "views/formalities/other.html",
          controller: "OtherCtrl",
          controllerAs: "vm",
          data: {
            path: 'other',
            pageTitle: 'Otros Tramites',
            state: 'index.other',
            label: 'Otro Tramite',
            iClass: 'fa fa-book'
          }
      })
      .state('index.monitoring', {
          url: "/monitoring",
          templateUrl: "views/monitoring/monitoring.html",
          controller: "MonitoringCtrl",
          controllerAs: "vm",
          data: {
            path: 'monitoring',
            pageTitle: 'Monitoreos',
            state: 'index.monitoring',
            label: 'Monitoreos',
            iClass: 'fa fa-book'
          }
      })
      .state('index.torage', {
          url: "/torage",
          templateUrl: "views/formalities/storage.html",
          controller: "TorageCtrl",
          controllerAs: "vm",
          data: {
            path: 'torage',
            pageTitle: 'Almacenajes',
            state: 'index.torage',
            label: 'Almacenaje',
            iClass: 'fa fa-book'
          }
      })
      .state('index.cloud', {
          url: "/cloud",
          templateUrl: "views/common/cloud.html",
          controller: "CloudCtrl",
          controllerAs: "vm",
          data: {
              pageTitle: 'Nube'
          }
      })
      .state('index.report', {
          url: "/report",
          templateUrl: "views/report/report.html",
          controller: "ReportCtrl",
          controllerAs: "vm",
          data: {pageTitle: 'Reportes'}
      });

  }]);