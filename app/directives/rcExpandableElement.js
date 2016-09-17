angular
	.module('demos')
	.directive('rcExpandableElement', rcExpandableElement);

function rcExpandableElement(){
	return {
		restrict: 'E',
		replace: true,
		transclude: true,
		template: '<div ng-transclude></div>',
		scope: {
			api: '='
		},
		link: function(scope, elem, attr){
			console.log("testing");
		}
	}
}