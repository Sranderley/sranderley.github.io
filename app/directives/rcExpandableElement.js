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
			var state = 'collapsed';
			scope.api = {
				state: state,
				toggle: toggle
			};

			function toggle(){
				state = state === "collapsed" ? "expanded" : "collapsed";
			}
		}
	}
}