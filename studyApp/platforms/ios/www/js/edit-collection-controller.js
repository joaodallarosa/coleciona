angular.module('edit-collection-controller', [])


    .controller('EditCollectionCtrl', function ($scope, $timeout, $ionicModal, Collections, $ionicSideMenuDelegate, $ionicSlideBoxDelegate) {

        // Load or initialize projects


        $ionicModal.fromTemplateUrl('templates/edit-collection.html', function (modal) {
            $scope.collectionEditModal = modal;
        }, {
            scope: $scope
        });


        $scope.viewEditCollection = function () {

            //alert('oi');
            //alert('')

            $scope.collections = Collections.all();

            // Grab the last active, or the first project
            $scope.activeCollection = $scope.collections[Collections.getLastActiveIndex()];

            //alert(collection.title);
            //$scope.activeCollection = Collections.all()[Collections.getLastActiveIndex()];
            //$scope.activeCollection = Collections.all[Collections.getLastActiveIndex];
            $scope.collectionEditModal.show();
            var collectionTitleInput = document.getElementById('edit-collection-title');
            var collectionObjectTypeInput = document.getElementById('edit-collection-object-type');
            var collectionDescriptionInput = document.getElementById('edit-collection-description');


            collectionTitleInput.value = $scope.activeCollection.title;
            collectionObjectTypeInput.value = $scope.activeCollection.objectType;
            collectionDescriptionInput.value = $scope.activeCollection.description;


            //alert('Teste');

            $scope.$apply();

        }

        $scope.closeEditCollection = function () {
            $scope.collectionEditModal.hide();
            $scope.$apply();

        }


        $scope.saveCollection = function () {

            var collectionTitleInput = document.getElementById('edit-collection-title');
            var collectionObjectTypeInput = document.getElementById('edit-collection-object-type');
            var collectionDescriptionInput = document.getElementById('edit-collection-description');

            $scope.activeCollection.title = collectionTitleInput.value;
            $scope.activeCollection.objectType = collectionObjectTypeInput.value;
            $scope.activeCollection.description = collectionDescriptionInput.value;

            Collections.save($scope.collections);

            $scope.$apply();


            $scope.closeEditCollection();
        }


    });