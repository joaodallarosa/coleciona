angular.module('settings-controller', [])


    .controller('SettingsCtrl', function ($scope, $timeout, $ionicModal, Collections, $ionicSideMenuDelegate, $ionicSlideBoxDelegate) {


        $ionicModal.fromTemplateUrl('templates/settings.html', function (modal) {
            $scope.settingsViewModal = modal;
            $scope.settingsViewModal.animation = 'slide-in-right';
        }, {
            scope: $scope
        });


        $scope.viewSettings = function () {

            //alert('Teste');
            $scope.settingsViewModal.show();
            $scope.$apply();
            $ionicSlideBoxDelegate.update();

        }

        $scope.closeSettings = function () {
            $scope.settingsViewModal.hide();
        }


    });