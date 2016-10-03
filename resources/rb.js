var rb = angular.module('reusableBehaviors', []);

rb.directive('rbToggle', rbToggle);

function rbToggle() {
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
				scope.toggleApi.active = !scope.toggleApi.active;
			}
		}
	}
}

rb.factory('rbRelayService', rbRelayService);

function rbRelayService(){
	var groups = {};

	var s = {
		register: register,
		toggle: toggle,
		reset: reset,
		active: {}
	};

	return s;

	function register(index, isFirst){
		console.log(index);
		if(!groups[index]) groups[index] = 0;
		if(! (s.active[index] >= 0) ) s.active[index] = -1;

		var id = groups[index]++;

		if(isFirst){
			s.active[index] = id;
		}

		return id;
	}

	function toggle(index, id){
		console.log(index);
		s.active[index] = id;
	}

	function reset(index){
		s.active[index] = -1;
	}

}

rb.directive('rbRelay', rbRelay);

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

			scope.group = attr.group;

			if (!scope.first) scope.first = false;

			scope.id = s.register(attr.group, attr.first);

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