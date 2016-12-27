
angular.module('nariz-iot.controllers', [])
    .controller('DeviceController', function($scope, $rootScope, $mdDialog, narizService, $log) {
        $scope.devices = [];

        $scope.actualizaDeviceList = function() {
            narizService.deviceList( $rootScope.defaultHome ).then(function(response){
                $scope.devices = response.data.data;
            });
        };

        $scope.openDlgAddDevice = function(ev) {
            $mdDialog.show({
                controller: ControllerAddDevice,
                templateUrl: 'templates/dlgDevice.tmpl.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: true
            }).then(function(answer) {
                answer.accion = 'CREATE';
                narizService.device(answer).then(function(response){
                    console.log( response );
                }).then( function(){
                    $scope.actualizaDeviceList();
                });
            });
        };

        function ControllerAddDevice($scope, $mdDialog) {
            $scope.hide = function() {
                $mdDialog.hide();
            };
            $scope.cancel = function() {
                $mdDialog.cancel();
            };
            $scope.answer = function(answer) {
                $mdDialog.hide(answer);
            };
        }

        $scope.actualizaDeviceList();

    })
;