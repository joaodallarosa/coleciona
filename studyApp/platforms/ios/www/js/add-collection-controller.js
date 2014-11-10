angular.module('add-collection-controller', ['todo-controller'])


    .controller('AddCollectionCtrl', function ($scope, $timeout, $ionicModal, Collections, $ionicSideMenuDelegate, $ionicSlideBoxDelegate) {


        // Load or initialize projects
        $scope.collections = Collections.all();

        // Grab the last active, or the first project
        $scope.activeCollection = $scope.collections[Collections.getLastActiveIndex()];


        $ionicModal.fromTemplateUrl('templates/add-collection.html', function (modal) {
            $scope.collectionAddModal = modal;
        }, {
            scope: $scope
        });


        $scope.viewAddCollection = function () {

            //alert('Teste');
            $scope.collectionAddModal.show();
            $scope.$apply();
            $ionicSlideBoxDelegate.update();

        }

        $scope.closeAddCollection = function () {
            $scope.collectionAddModal.hide();
            $scope.$apply();

        }


        $scope.createCollection = function () {

            var collectionTitleInput = document.getElementById('add-collection-title');
            var collectionObjectTypeInput = document.getElementById('add-collection-object-type');
            var collectionDescriptionInput = document.getElementById('add-collection-description');


            //if (collectionTitleInput && collectionObjectTypeInput && collectionDescriptionInput) {

            var newCollection = Collections.newCollection(collectionTitleInput.value, collectionObjectTypeInput.value, collectionDescriptionInput.value);
            $scope.collections.push(newCollection);
            Collections.save($scope.collections);
            $scope.selectCollection(newCollection, $scope.collections.length - 1);

            //$scope.selectCollection(newCollection, $scope.collections.length - 1);
            $scope.closeAddCollection();
            $scope.$apply();

            alert(Collections.all().length);
            //}
        }

        // Load or initialize projects
        $scope.collections = Collections.all();

        // Grab the last active, or the first project
        $scope.activeCollection = $scope.collections[Collections.getLastActiveIndex()];

        // Called to create a new project
        $scope.newCollection = function () {
            //var collectionTitle = prompt('Collection name');
            //if (collectionTitle) {
            //    createCollection(collectionTitle);
            //}
        };

        // Called to select the given project
        $scope.selectCollection = function (collection, index) {
            $scope.activeCollection = collection;
            Collections.setLastActiveIndex(index);
            $ionicSideMenuDelegate.toggleLeft(false);
        };


    });