angular.module('todo', ['ionic', 'directives', 'todo-controller', 'ngAnimate', 'item-view-controller', 'about-controller', 'settings-controller', 'add-collection-controller','edit-collection-controller'])
/**
 * The Projects factory handles saving and loading projects
 * from local storage, and also lets us save and load the
 * last active project index.
 */
    .factory('Collections', function () {
        return {
            all: function () {
                var collectionString = window.localStorage['collections'];
                //alert('chamando ALL : ' + collectionString);
                if (collectionString) {
                    return angular.fromJson(collectionString);
                }
                return [];
            },
            save: function (collections) {
                window.localStorage['collections'] = angular.toJson(collections);
            },
            newCollection: function (collectionTitle, collectionObject, collectionDescription) {
                // Add a new project
                return {
                    title: collectionTitle,
                    objectType: collectionObject,
                    description: collectionDescription,
                    items: []
                };
            },
            getLastActiveIndex: function () {
                return parseInt(window.localStorage['lastActiveCollection']) || 0;
            },
            setLastActiveIndex: function (index) {
                window.localStorage['lastActiveCollection'] = index;
            }
        }
    }).controller('MyPhotosCtrl', function ($scope, $ioniSlideBoxDelegate) {
        $scope.images = ["http://lorempixel.com/200/400/"]
        $ionicSlideBoxDelegate.update();
    }).config(['$compileProvider', function ($compileProvider) {
        $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|file|blob|content):|data:image\//);
    }]).directive('leftMenu', function () {
        return {
            restrict: 'E',
            templateUrl: 'templates/left-menu.html'
        };
    }).directive('onLongPress', function($timeout) {
        return {
            restrict: 'A',
            link: function($scope, $elm, $attrs) {
                $elm.bind('touchstart', function(evt) {
                    // Locally scoped variable that will keep track of the long press
                    $scope.longPress = true;

                    // We'll set a timeout for 600 ms for a long press
                    $timeout(function() {
                        if ($scope.longPress) {
                            // If the touchend event hasn't fired,
                            // apply the function given in on the element's on-long-press attribute
                            $scope.$apply(function() {
                                $scope.$eval($attrs.onLongPress)
                            });
                        }
                    }, 600);
                });

                $elm.bind('touchend', function(evt) {
                    // Prevent the onLongPress event from firing
                    $scope.longPress = false;
                    // If there is an on-touch-end function attached to this element, apply it
                    if ($attrs.onTouchEnd) {
                        $scope.$apply(function() {
                            $scope.$eval($attrs.onTouchEnd)
                        });
                    }
                });
            }
        };
    })





