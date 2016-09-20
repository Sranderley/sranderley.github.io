angular
	.module('demos')
	.factory('rbRelayService', rbRelayService);

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
		if(!groups[index]) groups[index] = 0;
		if(! (s.active[index] >= 0) ) s.active[index] = -1;

		var id = groups[index]++;

		if(isFirst){
			s.active[index] = id;
		}

		return id;
	}

	function toggle(index, id){
		s.active[index] = id;
	}

	function reset(index){
		s.active[index] = -1;
	}

}