'use strict';
angular.module('nariz-iot.services', [])
    .factory('narizService', ['$http', '$q', '$filter', '$rootScope', '$log',
        function ($http, $q, $filter, $rootScope, $log) {

            function deviceAction(paylosd){
                var deferred = $q.defer();
                var request = {
                    method: 'POST',
                    url: $rootScope.urlDeviceAction,
                    dataType: 'json',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    data: paylosd
                };

                $http( request )
                    .success(function (data, status, headers, config) {
                        deferred.resolve( data );
                    })
                    .error(function (data, status, headers, config, statusText) {
                        $log.error( data );
                        deferred.resolve( data );
                    });

                return deferred.promise;
            }

            function deviceList( home ){
                var deferred = $q.defer();
                var request = {
                    method: 'GET',
                    url: $rootScope.urlDeviceList + home,
                    dataType: 'json',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    data: ''
                };

                $http( request )
                    .success(function (data, status, headers, config) {
                        deferred.resolve( data );
                    })
                    .error(function (data, status, headers, config, statusText) {
                        $log.error( data );
                        deferred.resolve( data );
                    });

                return deferred.promise;
            }

            function getDeviceByMac( mac ){
                var deferred = $q.defer();
                var request = {
                    method: 'GET',
                    url: $rootScope.urlgetDevice + mac,
                    dataType: 'json',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    data: ''
                };

                $http( request )
                    .success(function (data, status, headers, config) {
                        deferred.resolve( data );
                    })
                    .error(function (data, status, headers, config, statusText) {
                        $log.error( data );
                        deferred.resolve( data );
                    });

                return deferred.promise;
            }

            return {
                device: deviceAction,
                deviceList: deviceList,
                deviceByMac: getDeviceByMac
            };

        }
    ]);
