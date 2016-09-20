angular
	.module('demos')
	.factory('rcExpandableListService', rcExpandableListService);

function rcExpandableListService(){
	var lists = {};

	var s = {
		register: register,
		toggle: toggle,
		toggleAll: toggleAll,
		active: {}
	};

	return s;

	function register(index, isOpen){
		if(!lists[index]) lists[index] = [];
		if(! (s.active[index] >= 0) ) s.active[index] = -1;

		var list = lists[index];
		var id = list.length;

		list[id] = true;

		if(isOpen){
			s.active[index] = id;
		}

		return id;
	}

	function toggle(index, id){
		s.active[index] = id;
	}

	function toggleAll(index){
		var list = lists[index]

		for(var i = 0; i < list.length; i += 1){
			list[i]();
		}
	}
}