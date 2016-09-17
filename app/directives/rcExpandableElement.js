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
			scope.api = {
				state: 'collapsed',
				toggle: toggle
			};

			function toggle(){
				scope.api.state = scope.api.state === "collapsed" ? "expanded" : "collapsed";
			}
		}
	}
}