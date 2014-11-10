var myAppModule = angular.module('directives', []);

myAppModule.directive('collectionCard', function(){
    return{
        restrict:'E',
        templateUrl:'templates/collection-card.html'

    };

})
