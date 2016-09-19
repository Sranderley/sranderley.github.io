angular
    .module('demos')
    .directive('prism', prism);

function prism(){
    return {
        restrict: 'E',
        transclude: true,
        template: '<div ng-transclude></div>',
        link: function(scope, elem, attr) {
            var element = elem.find('code')[0];
            Prism.highlightElement(element);
        }
    }
}