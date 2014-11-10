angular.module('item-view-controller', [])


    .controller('ItemViewCtrl', function ($scope, $timeout, $ionicModal, Collections, $ionicSideMenuDelegate, $ionicPopup, $ionicSlideBoxDelegate, $ionicPopover) {

        $scope.itemImages = [];


        // VIEW ITEMS - - - - - - - - - - - - - - - - - - - - - -


        $ionicModal.fromTemplateUrl('templates/collection-item-view.html', function (modal) {
            $scope.itemViewModal = modal;
            $scope.itemViewModal.animation = 'slide-in-right';
        }, {
            scope: $scope
        });


        $scope.viewItem = function (collectionItem) {

            $scope.activeCollectionItem = collectionItem;
            $scope.itemViewModal.show();

            document.getElementById('item-title').value = $scope.activeCollectionItem.itemTitle;
            document.getElementById('item-description').value = $scope.activeCollectionItem.itemDescription;
            document.getElementById('item-value').value = $scope.activeCollectionItem.itemValue;


            $scope.itemImages = [];

            //$scope.itemImages = $scope.activeCollectionItem.itemImages;
            //alert("Array de imagens possui : " + $scope.activeCollection.itemImages.length + " imagens");


            for (j = 0; j < $scope.activeCollectionItem.itemImages.length; j++) {
                //console.log('Imagem ' + j + ' :' + $scope.itemImages[j].imageUrl);
                $scope.itemImages.push({imageUrl: $scope.activeCollectionItem.itemImages[j].imageUrl});
            }


            // Ele esta pegando imagens com caminhos diferentes mas apenas usa uma

            //window.open($scope.itemImages[1].imageUrl, '_system', ' ');
            //alert($scope.itemImages[0].imageUrl);
            //alert($scope.itemImages[1].imageUrl);
            $ionicSlideBoxDelegate.update();
            $scope.$apply();


            $ionicSlideBoxDelegate.update();
        };

        $scope.closeItem = function () {
            $scope.itemViewModal.hide();
        }


        $scope.saveItem = function () {


            $scope.activeCollectionItem.itemTitle = document.getElementById('item-title').value;
            $scope.activeCollectionItem.itemDescription = document.getElementById('item-description').value;
            $scope.activeCollectionItem.itemValue = document.getElementById('item-value').value;


            $scope.activeCollectionItem.itemImages = $scope.itemImages;

            //$scope.currenttask.description = $scope.temp;
            Collections.save($scope.collections);
            $scope.itemViewModal.hide();
            $scope.$apply();
        }

        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


        // CAMERA CONTROL
        $scope.launchPhotoLibrary = function () {
            $scope.closeMyPopup();
            $scope.image = document.getElementById('myImage');
            if (navigator.camera) {
                navigator.camera.getPicture(cameraSuccess, cameraError,
                    { sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY, quality: 50,
                        targetWidth: 800,
                        targetHeight: 800,
                        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                        allowEdit: true,
                        encodingType: Camera.EncodingType.JPEG,
                        saveToPhotoAlbum: false });
            } else {
                $scope.image.src = "http://lorempixel.com/200/400/";
                console.log('default image was set');
            }


            $state.go('tab.select-image.crop-image');
        };

        $scope.launchCamera = function () {
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
            //$scope.itemImages.push({imageUrl: imageURI});


            movePic2(imageURI);
            $ionicSlideBoxDelegate.update();

            $scope.$apply();

            //if (lastPos >= 1){
            //    alert("First : " + $scope.images[0].imageUrl);
            //    alert("Second : " + $scope.images[1].imageUrl);
            //}


            //$scope.image.src = imageURI;
        }

        function cameraError(message) {
            // alert('Failed because: ' + message);
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
                console.log('Thank you for not eating my delicious ice cream cone');

            });
        }


        var savedPopup;
        $scope.showImageOptions = function () {
            //$ionicSlideBoxDelegate.update();
            var popup = $ionicPopup.show({
                template: '',
                title: 'Remover Imagem',
                subTitle: 'Você deseja remover esta imagem?',
                scope: $scope,
                buttons: [
                    {
                        text: '<b>Cancelar</b>',
                        type: 'button',
                        onTap: function (e) {
                            //$ionicPopup.close();

                            $scope.closeMyPopup();
                            //return true;
                        }
                    },
                    {
                        text: '<b>Remover Imagem</b>',
                        type: 'button-energized',
                        onTap: function (e) {
                            //$ionicPopup.close();


                            $scope.closeMyPopup();
                            $scope.removeCurrentImage();
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


        $scope.closeMyPopup = function () {
            console.log('Closing in controller!');
            savedPopup.close();

        }


        $ionicPopover.fromTemplateUrl('templates/item-view-popup.html', {
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


        // FILE HANDLING - - - - - - - - -

        function movePic2(file) {
            //alert("Moving pic from : " + file);
            window.resolveLocalFileSystemURL(file, resolveOnSuccess2, resOnError2);
        }

//Callback function when the file system uri has been resolved
        function resolveOnSuccess2(entry) {
            //alert('resolve on success!!');
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
                            entry.moveTo(directory, newFileName, successMove2, resOnError2);
                        },
                        resOnError2);
                },
                resOnError2);
        }

//Callback function when the file has been moved successfully - inserting the complete path
        function successMove2(entry) {

            //alert('Novo local da imagem  :' + entry.fullPath);
            var pathToGo = "file:///storage/emulated/0" + entry.fullPath;
            $scope.itemImages.push({imageUrl: pathToGo});
            //$scope.itemImages.push({imageUrl: imageURI});

            $ionicSlideBoxDelegate.update();

            $scope.$apply();

            $ionicSlideBoxDelegate.update();

            //alert('FUNCIONOU! : ' + "file:///storage/emulated/0" + entry.fullPath);
            //I do my insert with "entry.fullPath" as for the path
        }

        function resOnError2(error) {
            alert("Error :" + error.code);
        }


        $scope.removeItem = function () {
            for (i = 0; i < $scope.activeCollection.items.length; i++) {
                if ($scope.activeCollection.items[i].itemTitle == $scope.activeCollectionItem.itemTitle && $scope.activeCollection.items[i].itemDescription == $scope.activeCollectionItem.itemDescription) {
                    $scope.activeCollection.items.splice(i, 1);
                    Collections.save($scope.collections);
                    break;
                }
            }

            $scope.closeItem();
            $scope.$apply();
        }

        $scope.openRemoveDialog = function () {
            var popup = $ionicPopup.show({
                template: '',
                title: 'Remover item',
                subTitle: 'Você deseja realmente remover este item?',
                scope: $scope,
                buttons: [
                    {
                        text: '<b>Não</b>',
                        type: 'button',
                        onTap: function (e) {
                            //$ionicPopup.close();


                            $scope.closeMyPopup();
                            //return true;
                        }
                    },
                    {
                        text: '<b>Sim</b>',
                        type: 'button-energized',
                        onTap: function (e) {
                            //$ionicPopup.close();


                            $scope.closeMyPopup();
                            $scope.removeItem();


                            //return true;
                        }
                    }

                ]
            });
            savedPopup = popup;

            //Collections.all[Collections.getLastActiveIndex].items[$scope.activeCollectionItem.get]

        }


        $scope.moveCollectionItem = function (item, fromIndex, toIndex) {
            //alert('Moving collection item!');
            $scope.activeCollection.items.splice(fromIndex, 1);
            $scope.activeCollection.items.splice(toIndex, 0, item);
            Collections.save($scope.collections);

        };

        // REMOVE IMAGENS - - - -- - - - - -


        var currentImageSliderIndex = 0;
        $scope.slideHasChanged = function (index) {
            //alert("Changed to : " + index);
            currentImageSliderIndex = index;
        }


        $scope.removeCurrentImage = function () {
            $scope.itemImages.splice(currentImageSliderIndex, 1);
            //$scope.activeCollectionItem.itemImages.splice(currentImageSliderIndex,1);
            //console.log($scope.activeCollectionItem.itemImages[currentImageSliderIndex].imageUrl);
            //$ionicSlideBoxDelegate.slide(1);
            $ionicSlideBoxDelegate.update();


            $scope.$apply();
            //document.getElementById("slide-box").update();
            //document.getElementById("slide-box").refresh();
            $ionicSlideBoxDelegate.slide(0);
            $ionicSlideBoxDelegate.update();


            //alert("Size : " + $scope.itemImages.length);

            if ($scope.images.length == 0) {
                document.getElementById('no-image-warning').style.opacity = "0.3";
            }

        }

    }
)
;