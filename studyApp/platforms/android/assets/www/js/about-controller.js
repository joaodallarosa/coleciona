angular.module('about-controller', [])


    .controller('AboutCtrl', function ($scope, $timeout, $ionicModal, Collections, $ionicSideMenuDelegate, $ionicSlideBoxDelegate) {


        $ionicModal.fromTemplateUrl('templates/about.html', function (modal) {
            $scope.aboutViewModal = modal;
            $scope.aboutViewModal.animation = 'slide-in-right';
        }, {
            scope: $scope
        });


        $scope.viewAbout = function () {

            //alert('Teste');
            $scope.aboutViewModal.show();
            $scope.$apply();
            $ionicSlideBoxDelegate.update();

        }

        $scope.closeAbout = function () {
            $scope.aboutViewModal.hide();
        }


    });