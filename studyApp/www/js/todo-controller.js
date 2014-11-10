angular.module('todo-controller', ['add-collection-controller', 'edit-collection-controller'])


    .controller('TodoCtrl', function ($scope, $timeout, $ionicModal, Collections, $ionicSideMenuDelegate, $ionicPopup, $ionicSlideBoxDelegate, $ionicPopover) {


        $scope.images = [];

        // A utility function for creating a new project
        var savedPopup;

        // Load or initialize projects
        $scope.collections = Collections.all();

        // Grab the last active, or the first project
        $scope.activeCollection = $scope.collections[Collections.getLastActiveIndex()];


        // Create our modal
        $ionicModal.fromTemplateUrl('new-task.html', function (modal) {
            $scope.taskModal = modal;
        }, {
            scope: $scope
        });


        $scope.newTask = function () {
            $scope.taskModal.show();
        };

        $scope.closeNewTask = function () {
            $scope.taskModal.hide();
        }


        // Collection Details
        $ionicModal.fromTemplateUrl('task-details.html', function (modal) {
            $scope.collectionDetailsModal = modal;
        }, {
            scope: $scope
        });

        $scope.collectionDetails = function (collection) {
            //alert(collection.title);
            $scope.activeCollection = collection;


            for (i = 0; i < Collections.all().length; i++) {
                if (Collections.all()[i].title == collection.title) {
                    Collections.setLastActiveIndex(i);
                }
            }
            //$scope.temp = task.description;
            //alert($scope.temp);
            $scope.collectionDetailsModal.animation = 'slide-in-right';
            $scope.collectionDetailsModal.show();

        };

        $scope.closeCollectionDetails = function () {
            $scope.collectionDetailsModal.hide();
        }


        $scope.saveTask = function () {
            //$scope.currenttask.description = $scope.temp;
            Collections.save($scope.collections);
            $scope.taskDetailModal.hide();
        }

        $scope.toggleCollections = function () {

            $ionicSideMenuDelegate.toggleLeft();
        };


        // Collection items


        //ADD ITEMS  - - - - - - - - - - -- - - - - - - - - -
        $ionicModal.fromTemplateUrl('add-collection-item.html', function (modal) {
            $scope.collectionAddItemModal = modal;
        }, {
            scope: $scope
        });


        $scope.showAddCollectionItem = function () {
            //alert(collection.title);
            //$scope.activeCollection = collection;
            //$scope.temp = task.description;
            //alert($scope.temp);

            //window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, FileIO.gotFS, FileIO.errorHandler);
            $scope.collectionAddItemModal.show();

            // EMPTY FORM
            document.getElementById('new-item-title').value = "";
            document.getElementById('new-item-description').value = "";
            document.getElementById('new-item-value').value = "";

            $scope.images = []
            $scope.$apply();
        };

        $scope.closeAddCollectionItem = function () {
            $scope.collectionAddItemModal.hide();

        };


        function gotFS(fileSystem) {
            console.log("got filesystem");
            // save the file system for later access
            console.log(fileSystem.root.fullPath);
            window.rootFS = fileSystem.root;
            //alert(rootFS.fullPath);
        }

        document.addEventListener('deviceready', function () {
            window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, function () {
                alert('nao deu!')
            });
        }, false);


        $scope.createItem = function (item) {
            if (!$scope.activeCollection || !item) {
                return;
            }
            $scope.activeCollection.items.push({
                title: item.title
            });
            $scope.taskModal.hide();

            // Inefficient, but save all the projects
            Collections.save($scope.collections);

            item.title = "";
        };


        //var currentImageIndex = 0;
        $scope.saveNewItem = function () {


            var newItem = {
                itemTitle: document.getElementById('new-item-title').value,
                itemDescription: document.getElementById('new-item-description').value,
                itemValue: document.getElementById('new-item-value').value,
                itemImages: $scope.images
            };


            if (typeof $scope.activeCollection.items == 'undefined') {
                $scope.activeCollection.items = [];

            }


            $scope.activeCollection.items.push(newItem);

            //alert($scope.collections[0].items[$scope.collections[0].items.length -1 ].itemImages[0].imageUrl);

            Collections.save($scope.collections);
            //alert('new item saved : ' + newItem.itemTitle);
            $scope.$apply();
        }


        //


        $scope.expandDiv = function (obj, from, to) {
            if (from >= to) {
                //obj.style.visibility = 'hidden';
                return;
            }
            else {
                var box = obj;
                box.style.height = from + "px";
                setTimeout(function () {
                    $scope.expandDiv(obj, from + 5, to);
                }, 0)
            }
        }


        $scope.expandDiv2 = function (obj, from, to) {
            //alert(document.getElementById('expanding-div').clientHeight);
            if (from <= to) {
                //obj.style.visibility = 'hidden';
                return;
            }
            else {
                var box = obj;
                box.style.height = from + "px";
                setTimeout(function () {
                    $scope.expandDiv2(obj, from - 5, to);
                }, 0)
            }
        }

        $scope.animateMe = function () {
            //alert(document.getElementById('expanding-div').clientHeight);
            if (document.getElementById('expanding-div').clientHeight >= 250) {
                $scope.expandDiv2(document.getElementById('expanding-div'), document.getElementById('expanding-div').clientHeight, 200);
            } else {
                $scope.expandDiv(document.getElementById('expanding-div'), document.getElementById('expanding-div').clientHeight, 400);
            }

        }


        // Camera testing...
        $scope.launchPhotoLibrary = function () {
            $scope.closeMyPopup();
            $scope.image = document.getElementById('myImage');
            //if (navigator.camera) {
            navigator.camera.getPicture(cameraSuccess, cameraError,
                {   destinationType: navigator.camera.DestinationType.FILE_URI,
                    sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY,
                    quality: 50,
                    targetWidth: 800,
                    targetHeight: 800,
                    allowEdit: true,
                    encodingType: navigator.camera.EncodingType.JPEG,
                    saveToPhotoAlbum: false });
            //} else {
            //    $scope.image.src = "http://lorempixel.com/200/400/";
            //    console.log('default image was set');
            //}
            //alert('passou!');


            $state.go('tab.select-image.crop-image');
        };

        $scope.launchCamera = function () {
            //alert('oi!');

            $scope.closeMyPopup();
            $scope.image = document.getElementById('myImage');
            if (navigator.camera) {
                navigator.camera.getPicture(cameraSuccess, cameraError,
                    { sourceType: navigator.camera.PictureSourceType.CAMERA, quality: 50,
                        targetWidth: 800,
                        targetHeight: 800,
                        sourceType: 1,
                        allowEdit: true,
                        encodingType: Camera.EncodingType.JPEG,
                        destinationType: Camera.DestinationType.FILE_URI,
                        saveToPhotoAlbum: false});
            } else {
                $scope.image.src = "http://lorempixel.com/200/400/";
                console.log('default image was set');
            }

            //alert($scope.images.length);
            //$state.go('tab.select-image.crop-image');
        };

        function cameraSuccess(imageURI) {
            // hack until cordova 3.5.0 is released
            //alert(imageURI);
            if (imageURI.substring(0, 21) == "content://com.android") {
                var photo_split = imageURI.split("%3A");
                imageURI = "content://media/external/images/media/" + photo_split[1];
            }
            //$scope.images.add(imageURI);
            //alert(imageURI);
            //var lastPos = $scope.images.length;
            //$scope.images[lastPos] = { imageUrl: imageURI};
            $scope.images.push({imageUrl: imageURI});
            $scope.$apply();


            movePic($scope.images[$scope.images.length - 1 ].imageUrl);

            //if (lastPos >= 1){
            //    alert("First : " + $scope.images[0].imageUrl);
            //    alert("Second : " + $scope.images[1].imageUrl);
            //}

            $ionicSlideBoxDelegate.update();

            document.getElementById('no-image-warning').style.opacity = "0";

            //$scope.image.src = imageURI;
        }

        function cameraError(message) {
            alert('Failed because: ' + message);
        }


        $scope.myPopup = function () {
            //$ionicSlideBoxDelegate.update();
            var popup = $ionicPopup.show({
                template: '',
                title: 'Add new photo',
                subTitle: 'How do you want to add a new photo?',
                scope: $scope,
                buttons: [
                    {
                        text: '<b>Camera</b>',
                        type: 'button-energized',
                        onTap: function (e) {
                            //$ionicPopup.close();

                            $scope.launchCamera();

                            //return true;
                        }
                    },
                    {
                        text: '<b>Photo Gallery</b>',
                        type: 'button-positive button-energized',
                        onTap: function (e) {
                            //$ionicPopup.close();
                            //$ionicPopup.hide();
                            $scope.launchPhotoLibrary();
                            //getPhoto();
                        }
                    },
                ]
            });


            savedPopup = popup;
            popup.then(function (res) {
                //console.log('Thank you for not eating my delicious ice cream cone');

            });
        }


        $scope.showImageOptions = function () {
            //$ionicSlideBoxDelegate.update();
            var popup = $ionicPopup.show({
                template: '',
                title: 'Options',
                subTitle: 'What do you want to do?',
                scope: $scope,
                buttons: [
                    {
                        text: '<b>Remove Image</b>',
                        type: 'button-energized',
                        onTap: function (e) {
                            //$ionicPopup.close();

                            $scope.removeCurrentImage();
                            $scope.closeMyPopup();
                            //return true;
                        }
                    }
                    /*,
                     {
                     text: '<b>Photo Gallery</b>',
                     type: 'button-positive button-energized',
                     onTap: function (e) {
                     //$ionicPopup.close();
                     //$ionicPopup.hide();
                     $scope.launchPhotoLibrary();
                     //getPhoto();
                     }
                     },*/
                ]
            });
            savedPopup = popup;


        }

        $scope.showCollectionOptions = function () {
            //$ionicSlideBoxDelegate.update();
            var popup = $ionicPopup.show({
                template: '',
                title: 'Options',
                subTitle: 'What do you want to do?',
                scope: $scope,
                buttons: [
                    {
                        text: '<b>Add new item</b>',
                        type: 'button button-full button-energized',
                        onTap: function (e) {
                            //$ionicPopup.close();


                            $scope.closeMyPopup();
                            $scope.showAddCollectionItem();
                            //return true;
                        }
                    }
                    ,
                    {
                        text: '<b>Edit this collection</b>',
                        type: 'button button-full button-energized',
                        controller: 'EditCollectionCtrl',
                        onTap: function (e) {
                            //$ionicPopup.close();
                            //$ionicPopup.hide();
                            $scope.closeMyPopup();
                            $scope.viewEditCollection();

                            //getPhoto();
                        }
                    },
                    {
                        text: '<b>Delete this collection</b>',
                        type: 'button button-full button-energized',
                        onTap: function (e) {
                            //$ionicPopup.close();
                            //$ionicPopup.hide();
                            $scope.closeMyPopup();
                            $scope.removeCollection();

                            //getPhoto();
                        }
                    },
                ]
            });
            savedPopup = popup;


        }


        $ionicPopover.fromTemplateUrl('templates/popover.html', {
            scope: $scope,
        }).then(function (popover) {
            $scope.popover = popover;
        });
        $scope.openPopover = function ($event) {
            //alert('teste');
            $scope.popover.show($event);
        };
        $scope.closePopover = function () {
            $scope.popover.hide();
        };
        //Cleanup the popover when we're done with it!
        $scope.$on('$destroy', function () {
            $scope.popover.remove();
        });
        // Execute action on hide popover
        $scope.$on('popover.hidden', function () {
            // Execute action
        });
        // Execute action on remove popover
        $scope.$on('popover.removed', function () {
            // Execute action
        });


        $scope.closeMyPopup = function () {
            console.log('Closing in controller!');
            savedPopup.close();

        }


        var currentImageSliderIndex = 0;
        $scope.slideHasChanged = function (index) {
            //alert("Changed to : " + index);
            currentImageSliderIndex = index;
        }


        $scope.removeCurrentImage = function () {
            $scope.images.splice(currentImageSliderIndex, 1);
            $scope.$apply();
            $ionicSlideBoxDelegate.update();


            if ($scope.images.length == 0) {
                document.getElementById('no-image-warning').style.opacity = "0.3";
            }

        }

        // PHOTO FILE HANDLING

        function movePic(file) {
            //alert("Moving pic from : " + file);
            window.resolveLocalFileSystemURL(file, resolveOnSuccess, resOnError);
        }

//Callback function when the file system uri has been resolved
        function resolveOnSuccess(entry) {
            var d = new Date();
            var n = d.getTime();
            //new file name
            var newFileName = n + ".jpg";
            var myFolderApp = "studyApp/images";

            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSys) {
                    //The folder is created if doesn't exist
                    //alert("App folder : " + fileSys.root.fullPath);
                    fileSys.root.getDirectory(myFolderApp,
                        {create: true, exclusive: false},
                        function (directory) {
                            //alert("New File Name : " + newFileName);
                            entry.moveTo(directory, newFileName, successMove, resOnError);
                        },
                        resOnError);
                },
                resOnError);
        }

//Callback function when the file has been moved successfully - inserting the complete path
        function successMove(entry) {

            //console.log('Novo local da imagem ' + currentImageIndex + ' :' + entry.fullPath);
            $scope.images[$scope.images.length - 1].imageUrl = "file:///storage/emulated/0" + entry.fullPath;


            //alert('FUNCIONOU! : ' + "file:///storage/emulated/0" + entry.fullPath);
            //I do my insert with "entry.fullPath" as for the path
        }

        function resOnError(error) {
            alert("Error :" + error.code);
        }


        $scope.removeCollection = function () {

            for (i = 0; i < $scope.collections.length; i++) {
                if ($scope.collections[i].title == $scope.activeCollection.title) {
                    $scope.collections.splice(i, 1);
                    Collections.save($scope.collections);
                    break;
                }
            }

            $scope.closeCollectionDetails();
            $scope.$apply();

            //Collections.all[Collections.getLastActiveIndex].items[$scope.activeCollectionItem.get]

        }


        //////////////////////////////////////////////////////////////
        ////// FUNCOES DO ARQUIVO add-collection-controller.js////////
        /////////////////////////////////////////////////////////////

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

            //alert(Collections.all().length);
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
        /////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////


    });