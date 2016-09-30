angular
	.module('demos')
	.directive('rbToggle', rbToggle);

function rbToggle(){
	return {
		restrict: 'A',
		scope: {
			toggleApi: '='
		},
		link: function(scope, elem, attr){
			scope.toggleApi = {
				active: false,
				toggle: toggle
			};

			function toggle(){
				console.log('working');
				scope.toggleApi.active = !scope.toggleApi.active;
			}
		}
	}
}