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
			scope.state = 'collapsed';
			scope.api = {
				toggle: toggle
			};

			function toggle(){
				scope.state = scope.state === "collapsed" ? "expanded" : "collapsed";
			}
		}
	}
}