angular.module('nariz-iot.controllers', [])
    .controller('DeviceController', function ($scope, $rootScope, $mdDialog, narizService, $mdToast) {
        $scope.devices = [];

        $scope.actualizaDeviceList = function (toast) {
            narizService.deviceList($rootScope.defaultHome).then(function (response) {
                $scope.devices = response.data.data;
                if (toast) $scope.toast('Actualizado');
            });
        };

        $scope.openDlgAddDevice = function (ev) {
            $mdDialog.show({
                controller: ControllerAddDevice,
                templateUrl: 'templates/dlgDevice.tmpl.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: true
            }).then(function (answer) {
                answer.accion = 'CREATE';
                narizService.device(answer).then(function (response) {
                    $scope.toast(response.data.p_mensaje);
                }).then(function (res) {
                    $scope.actualizaDeviceList(false);
                });
            });
        };

        $scope.toast = function (msg) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent(msg)
                    .position('bottom left')
                    .hideDelay(3000)
            );
        };

        function ControllerAddDevice($scope, $mdDialog) {
            $scope.hide = function () {
                $mdDialog.hide();
            };
            $scope.cancel = function () {
                $mdDialog.cancel();
            };
            $scope.answer = function (answer) {
                $mdDialog.hide(answer);
            };
        }

        $scope.actualizaDeviceList(false);

    })
;