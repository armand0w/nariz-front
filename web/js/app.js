'use strict';
angular.module('nariz-iot', [
    'nariz-iot.controllers',
    'nariz-iot.services',
    //'nariz-iot.directives',
    'ngMaterial',
    'ngMessages'
]).config(function($mdThemingProvider) {
    $mdThemingProvider.definePalette('amazingPaletteName', {
        '50': 'ffebee',
        '100': 'ffcdd2',
        '200': 'ef9a9a',
        '300': 'e57373',
        '400': 'ef5350',
        '500': 'f44336',
        '600': 'e53935',
        '700': 'd32f2f',
        '800': 'c62828',
        '900': 'b71c1c',
        'A100': 'ff8a80',
        'A200': 'ff5252',
        'A400': 'ff1744',
        'A700': 'd50000',
        'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
                                            // on this palette should be dark or light
        'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
            '200', '300', '400', 'A100'],
        'contrastLightColors': undefined    // could also specify this if default was 'dark'
    });

    $mdThemingProvider.theme('default').primaryPalette('amazingPaletteName')

}).run( function($rootScope, $location, $filter) {
    $rootScope.urlApp       = $location.absUrl().split('/')[0] + '//' + $location.absUrl().split('/')[2] + '/';
    $rootScope.nameWar      = $location.absUrl().split('/')[3];

    $rootScope.urlDeviceAction = $rootScope.urlApp + '/nariz-iot/device/action';
    $rootScope.urlDeviceList = $rootScope.urlApp + '/nariz-iot/device/list/';
    $rootScope.dtformat     = 'dd/MM/yy';
    $rootScope.defaultHome = 'HOSHI';

    $rootScope.pasrseDate = function(fecha, formato){
        if( fecha!=null && fecha.length>0 ) {
            var a = fecha.split(" ");
            var d = a[0].split("-");
            var t = a[1].split(":");
            return $filter('date')(new Date(d[0],(d[1]-1),d[2],t[0],t[1],t[2]), formato);
        } else return '';
    };

    $rootScope.b64DecodeUnicode = function(str) {
        return decodeURIComponent(Array.prototype.map.call(atob(str), function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    };

    $rootScope.b64EncodeUnicode = function(str) {
        return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
            return String.fromCharCode('0x' + p1);
        }));
    }
})
;

