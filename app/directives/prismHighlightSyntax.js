angular
    .module('demos')
    .directive('prism', prism);

function prism(){
    return {
        restrict: 'E',
        transclude: true,
        template: '<div ng-transclude></div>',
        link: function(scope, elem, attr) {
            // some code to figure out the language being highlighted

            Prism.highlightElement(elem.find('code')[0], Prism.languages.javascript);
        }
    }
}