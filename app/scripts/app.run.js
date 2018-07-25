angular
  .module('fleetmanager')
  .run(['CONSTANTS', '$rootScope', '$state', '$window', '$location', '$sessionStorage', 'Environment', 'DTDefaultOptions',
    function (CONSTANTS, $rootScope, $state, $window, $location, $sessionStorage, Environment, DTDefaultOptions) {

      $rootScope.$state = $state;

        var monthsShortDot = 'ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.'.split('_'),
            monthsShort = 'ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic'.split('_');

        moment.locale('es', {
            months : 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
            monthsShort : function (m, format) {
                if (/-MMM-/.test(format)) {
                    return monthsShort[m.month()];
                } else {
                    return monthsShortDot[m.month()];
                }
            },
            weekdays : 'Domingo_Lunes_Martes_Mi\u00E9rcoles_Jueves_Viernes_S\u00E1bado'.split('_'),
            weekdaysShort : 'Dom._Lun._Mar._Mi\u00E9._Jue._Vie._S\u00E1b.'.split('_'),
            weekdaysMin : 'Do_Lu_Ma_Mi_Ju_Vi_S\u00E1'.split('_'),
            longDateFormat : {
                LT : 'H:mm',
                LTS : 'H:mm:ss',
                L : 'DD/MM/YYYY',
                LL : 'D [de] MMMM [de] YYYY',
                LLL : 'D [de] MMMM [de] YYYY H:mm',
                LLLL : 'dddd, D [de] MMMM [de] YYYY H:mm'
            },
            calendar : {
                sameDay : function () {
                    return '[hoy a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
                },
                nextDay : function () {
                    return '[ma\u00F1ana a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
                },
                nextWeek : function () {
                    return 'dddd [a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
                },
                lastDay : function () {
                    return '[ayer a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
                },
                lastWeek : function () {
                    return '[el] dddd [pasado a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
                },
                sameElse : 'L'
            },
            relativeTime : {
                future : 'en %s',
                past : 'hace %s',
                s : 'unos segundos',
                m : 'un minuto',
                mm : '%d minutos',
                h : 'una hora',
                hh : '%d horas',
                d : 'un d\u00EDa',
                dd : '%d d\u00EDas',
                M : 'un mes',
                MM : '%d meses',
                y : 'un a\u00F1o',
                yy : '%d a\u00F1os'
            },
            ordinalParse : /\d{1,2}º/,
            ordinal : '%dº',
            week : {
                dow : 1, // Monday is the first day of the week.
                doy : 4  // The week that contains Jan 4th is the first week of the year.
            }
        });


      Environment.check($location.host());

      angular.forEach(CONSTANTS.REPORTS, function(uri, key) {
        CONSTANTS.REPORTS[key].url = CONSTANTS.API_URI + uri.url;
      });

      $rootScope.CONSTANTS = CONSTANTS;

      $rootScope.$on('$stateChangeStart',
        function (event, toState) {
          if(!$sessionStorage.userToken) {
            if (toState.url != '/login' && toState.url != '/reset/:id/:key') {
              event.preventDefault();
              $state.go('login');
            }
          }
        });

      DTDefaultOptions.setLanguageSource('resources/Spanish.json');

  }]);