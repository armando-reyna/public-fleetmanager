angular.module('fleetmanager')
    .constant('CONSTANTS', {
      SUCCESS: 'success',
      FAILURE: 'failure',
      API_URIS: [
        {
          key: 'localhost',
          env: 'dev',
          ui: 'http://localhost:9000/#/',
          back: 'http://localhost:8081/api/v1/'
        },
        {
          key: 'airsoftware-qc.com',
          env: 'qc',
          ui: 'http://airsoftware-qc.com/fleetmanager/#/',
          back: 'http://airsoftware-qc.com/fleetmanager/api/v1/'
        },
        {
          key: 'flotasirel.com.mx',
          env: 'prod',
          ui: 'http://flotasirel.com.mx/#/',
          back: 'http://api.flotasirel.com.mx/api/v1/'
        },
        {
          key: 'vehiculoseffekt.com.mx',
          env: 'prod',
          ui: 'http://vehiculoseffekt.com.mx/#/',
          back: 'http://api.vehiculoseffekt.com.mx/api/v1/'
        },
        {
          key: 'autosclimatic.com.mx',
          env: 'prod',
          ui: 'http://autosclimatic.com.mx/#/',
          back: 'http://api.autosclimatic.com.mx/api/v1/'
        }
      ],
      ENVS: {
        DEV: 'dev',
        QC: 'qc',
        PROD: 'prod'
      },
      ROLES: {
        SUPER: 1,
        ADMIN: 2,
        ASIS: 3,
        SERVI: 4,
        ASISGAS: 5,
        OTHER: 6
      },
      FORMALITIES: {
        TORAGE: 1,
        INSURANCE: 2,
        MAINTENANCE: 3,
        CLEANING: 4,
        INFRINGEMENT: 5,
        CIRCULATIONCARD: 6,
        GASCARD: 7,
        PIKECARD: 8,
        TENURE: 9,
        VERIFICATION: 10,
        OTHER: 11
      },
      WAYPAY: {
        EFECTIVO: 1,
        IAVE: 2,
        TELEVIA: 3,
        TELEPASS: 4,
        OTHER: 5
      },
      WAYPAYGAS: {
        EFECTIVALE: 2
      },
      FILE: {
        VEHICLE: 'vehicle',
        TORAGE: 'torage',
        INSURANCE: 'insurance',
        MAINTENANCE: 'maintenance',
        CLEANING: 'cleaning',
        INFRINGEMENT: 'infringement',
        CIRCULATIONCARD: 'circulationCard',
        GASCARD: 'gasCard',
        CHARGEGASCARD: 'chargeGasCard',
        PIKECARD: 'pikeCard',
        CHARGEPIKECARD: 'chargePikeCard',
        TENURE: 'tenure',
        VERIFICATION: 'verification',
        OTHER: 'other',
        MONITORING: 'monitoring'
      },
      REPORTS: {
        TORAGE: {
          id: 1,
          url: 'report/torage',
          title: 'Almacenaje'
        },
        INSURANCE: {
          id: 2,
          url: 'report/insurance',
          title: 'Aseguradora'
        },
        MAINTENANCE: {
          id: 3,
          url: 'report/maintenance',
          title: 'Mantenimiento'
        },
        CLEANING: {
          id: 4,
          url: 'report/cleaning',
          title: 'Limpieza'
        },
        INFRINGEMENT: {
          id: 5,
          url: 'report/infringement',
          title: 'Infracción'
        },
        CIRCULATIONCARD: {
          id: 6,
          url: 'report/circulationCard',
          title: 'Tarjeta de Circulación'
        },
        GASCARD: {
          id: 7,
          url: 'report/gasCard',
          title: 'Tarjeta de Gas'
        },
        CHARGEGASCARD: {
          id: 8,
          url: 'report/chargeGasCard',
          title: 'Control de Combustible'
        },
        PIKECARD: {
          id: 9,
          url: 'report/pikeCard',
          title: 'Tarjeta de Peaje'
        },
        CHARGEPIKECARD: {
          id: 10,
          url: 'report/chargePikeCard',
          title: 'Control de Peaje'
        },
        TENURE: {
          id: 11,
          url: 'report/tenure',
          title: 'Tenencia'
        },
        VERIFICATION: {
          id: 12,
          url: 'report/verification',
          title: 'Verificación'
        }
      }
    });