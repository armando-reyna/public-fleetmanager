/*global angular:true, browser:true */

/**
 * @license HTTP Auth Interceptor Module for AngularJS
 * (c) 2012 Witold Szczerba
 * License: MIT
 */
(function () {
  'use strict';

  angular.module('http-auth-interceptor', ['http-auth-interceptor-buffer'])

  .factory('authInterceptor', ['$rootScope','httpBuffer',
    function($rootScope, httpBuffer) {
    return {
      /**
       * Call this function to indicate that authentication was successful and trigger a
       * retry of all deferred requests.
       * @param data an optional argument to pass on to $broadcast which may be useful for
       * example if you need to pass through details of the user that was logged in
       * @param configUpdater an optional transformation function that can modify the                                                                                                                                                   
       * requests that are retried after having logged in.  This can be used for example
       * to add an authentication token.  It must return the request.
       */
      loginConfirmed: function(data, configUpdater) {
        var updater = configUpdater || function(config) { return config; };
        $rootScope.$broadcast('event:auth-login-confirmed', data);
        httpBuffer.retryAll(updater);
      },

      /**
       * Call this function to indicate that authentication should not proceed.
       * All deferred requests will be abandoned or rejected (if reason is provided).
       * @param data an optional argument to pass on to $broadcast.
       * @param reason if provided, the requests are rejected; abandoned otherwise.
       */
      loginCancelled: function(data, reason) {
        httpBuffer.rejectAll(reason);
        $rootScope.$broadcast('event:auth-login-cancelled', data);
      }
    };
  }])

  /**
   * $http interceptor.
   * On 401 response (without 'ignoreAuthModule' option) stores the request
   * and broadcasts 'event:auth-login-required'.
   * On 403 response (without 'ignoreAuthModule' option) discards the request
   * and broadcasts 'event:auth-forbidden'.
   */
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push(['CONSTANTS', '$rootScope', '$q', 'httpBuffer', '$sessionStorage', 'Response', '$window',
      function(CONSTANTS, $rootScope, $q, httpBuffer, $sessionStorage, Response, $window) {
      return {
        request: function(request) {
          var URLsplitted = request.url.split('/');
          Response.currentURL = request.url;
          var ownAPI = URLsplitted[CONSTANTS.REST_IN_INDEX] && URLsplitted[CONSTANTS.REST_IN_INDEX] == 'rest';
          if(ownAPI){
            if(request.method == 'GET' || request.method == 'POST' || request.method == 'PUT'){
              request.timeout = 1000 * 60 * 3;
              if(!request.headers) {
                request.headers = [];
              }
              if(!request.headers['Authorization'] || request.headers['Authorization'].indexOf("Bearer") == 0){
                request.headers['Authorization'] = "Bearer " + $sessionStorage.token;
              }
            }
          } else {
            // console.log(request.headers);
          }
          return request;
        },
        responseError: function(rejection) {
          if (rejection.status == 400) {
            delete $sessionStorage.token;
            delete $sessionStorage.userToken;
            $window.location.reload();
          }
          if (!rejection.config.ignoreAuthModule) {
            switch (rejection.status) {
              case 401:
                if(Response.lastErrorURL && Response.lastErrorURL == rejection.config.url){
                  Response.requestTries++;
                }else {
                  Response.requestTries=0;
                }
                Response.lastErrorURL = rejection.config.url;

                var URLsplitted = rejection.config.url.split('/');
                Response.ownAPI = URLsplitted[CONSTANTS.REST_IN_INDEX] && URLsplitted[CONSTANTS.REST_IN_INDEX] == 'rest';

                var deferred = $q.defer();
                httpBuffer.append(rejection.config, deferred);
                $rootScope.$broadcast('event:auth-login-required', rejection);
                return deferred.promise;
              case 403:
                $rootScope.$broadcast('event:auth-forbidden', rejection);
                break;
            }
          }
          // otherwise, default behaviour
          return $q.reject(rejection);
        }
      };
    }]);
  }]);

  /**
   * Private module, a utility, required internally by 'http-auth-interceptor'.
   */
  angular.module('http-auth-interceptor-buffer', [])

  .factory('httpBuffer', ['$injector', '$sessionStorage', 'Response',
    function($injector, $sessionStorage, Response) {

    var retry = 0;

    /** Holds all the requests, so they can be re-requested in future. */
    var buffer = [];

    /** Service initialized later because of circular dependency problem. */
    var $http;

    function retryRequest(config, deferred) {
      $http = $http || $injector.get('$http');
      $http(config).then(deferred.resolve, deferred.reject);
    }

    return {
      /**
       * Appends HTTP request configuration object with deferred response attached to buffer.
       */
      append: function(config, deferred) {
        buffer.push({
          config: config,
          deferred: deferred
        });
      },

      /**
       * Abandon or reject (if reason provided) all the buffered requests.
       */
      rejectAll: function(reason) {
        if (reason) {
          for (var i = 0; i < buffer.length; ++i) {
            buffer[i].deferred.reject(reason);
          }
        }
        buffer = [];
      },

      /**
       * Retries all the buffered requests clears the buffer.
       */
      retryAll: function(updater) {
        for (var i = 0; i < buffer.length; ++i) {
          if(Response.ownAPI){
            if(Response.requestTries < 10){
              retryRequest(updater(buffer[i].config), buffer[i].deferred);
            } else {
              buffer[i].deferred.reject('Too many request tries');
            }
          }else {
            buffer[i].deferred.reject('External Error');
          }
        }
        buffer = [];
      }
    };
  }]);
})();