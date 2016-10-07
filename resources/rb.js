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
				scope.toggleApi.active = attr.disabled === 'true' ? scope.toggleApi.active : !scope.toggleApi.active;
			}
		}
	}
}

rb.factory('rbRelayService', rbRelayService);

function rbRelayService(){
	var groups = {};
	var defaults = {};

	var s = {
		register: register,
		toggle: toggle,
		reset: reset,
		active: {}
	};

	return s;

	function register(index, isFirst, isDefault){
		if( !groups[index] ) groups[index] = 0;
		if( !defaults[index] ) defaults[index] = -1;
		if( !( s.active[index] >= 0 ) ) s.active[index] = -1;

		var id = groups[index]++;

		if(isFirst || isDefault) s.active[index] = id;
		if(isDefault) defaults[index] = id;

		return id;
	}

	function toggle(index, id){
		s.active[index] = s.active[index] === id ? defaults[index] : id;
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
			first: '=?',
			default: '=?'
		},
		link: function(scope, elem, attr){
			scope.relayApi = {
				isActive: isActive,
				toggle: toggle,
				reset: reset
			};

			scope.group = attr.group;

			if ( !scope.first ) scope.first = false;
			if ( !scope.default ) scope.default = false;

			scope.id = s.register( attr.group, scope.first, scope.default );

			function isActive(){
				return s.active[scope.group] === scope.id ? true : false;
			}

			function toggle(){
				if ( ! attr.disabled ) {
					s.toggle(scope.group, scope.id);
				}
			}

			function reset(){
				s.reset(scope.group);
			}
		}
	}
}