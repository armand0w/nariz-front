angular.module('nariz-iot.controllers', [])
    .controller('DeviceController', function ($scope, $rootScope, $mdDialog, narizService, $mdToast) {
        $scope.devices = [];

        $scope.actualizaDeviceList = function (toast) {
            narizService.deviceList($rootScope.defaultHome).then(function (response) {
                $scope.devices = response.data.data;
                if (toast) $scope.toast('Actualizado');
            });
        };

        $scope.delDevice = function (ev, item) {
            var confirm = $mdDialog.confirm()
                .title('Desea eliminar: ' + item.p_name)
                .ariaLabel('Delete')
                .targetEvent(ev)
                .ok('Borrar')
                .cancel('Cancelar');

            $mdDialog.show(confirm).then(function () {
                item.accion = 'DELETE';
                narizService.device(item).then(function (response) {
                    $scope.toast(response.data.p_mensaje);
                }).then(function () {
                    $scope.actualizaDeviceList(false);
                })
            }, function () {
                //Cancelado
            });
        };

        $scope.openDlgAddDevice = function (ev) {
            $mdDialog.show({
                controller: ControllerAddDevice,
                templateUrl: 'templates/dlgDevice.tmpl.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: true,
                locals: {object: {title: 'Nuevo Dispositivo:'}}
            }).then(function (answer) {
                answer.accion = 'CREATE';
                narizService.device(answer).then(function (response) {
                    $scope.toast(response.data.p_mensaje);
                }).then(function () {
                    $scope.actualizaDeviceList(false);
                });
            });
        };

        $scope.openDlgEditDevice = function (ev, mac) {
            $mdDialog.show({
                controller: ControllerAddDevice,
                templateUrl: 'templates/dlgDevice.tmpl.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: true,
                locals: {object: {title: 'Editar Dispositivo:', mac: mac}}
            }).then(function (answer) {
                answer.accion = 'EDIT';
                narizService.device(answer).then(function (response) {
                    $scope.toast(response.data.p_mensaje);
                }).then(function () {
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

        function ControllerAddDevice($scope, $mdDialog, object) {
            $scope.title = object.title;
            if (angular.isDefined(object.mac)) {
                narizService.deviceByMac(object.mac).then(function (response) {
                    $scope.dlgObject = response.data.data[0];
                })
            }
            else {
                $scope.dlgObject = {p_id_home: $rootScope.defaultHome};
            }

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