angular
	.module('demos')
	.directive('rbExpand', rbExpand);

function rbExpand(){
	return {
		restrict: 'A',
		scope: {
			expandApi: '='
		},
		link: function(scope, elem, attr){
			scope.expandApi = {
				state: 'collapsed',
				toggle: toggle
			};

			function toggle(){
				scope.expandApi.state = scope.expandApi.state === "collapsed" ? "expanded" : "collapsed";
			}
		}
	}
}