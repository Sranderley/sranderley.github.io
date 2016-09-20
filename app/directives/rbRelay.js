angular
	.module('demos')
	.directive('rbRelay', rbRelay);

rbRelay.$inject = ['rbRelayService'];

function rbRelay(rbRelayService){
	var s = rbRelayService;
	return {
		restrict: 'A',
		scope: {
			relayApi: '=',
			group: '=',
			first: '=?'
		},
		link: function(scope, elem, attr){
			scope.relayApi = {
				isActive: isActive,
				toggle: toggle,
				reset: reset
			};

			if (!scope.first) scope.first = false;

			scope.id = s.register(scope.group, scope.first);

			function isActive(){
				return s.active[scope.group] === scope.id ? true : false;
			}

			function toggle(){
				s.toggle(scope.group, scope.id);
			}

			function reset(){
				s.reset(scope.group);
			}
		}
	}
}