angular.module( 'reusableBehaviors', [] );


angular
	.module( 'reusableBehaviors' )
	.directive( 'rbToggle', rbToggle );

function rbToggle () {
	return {
		restrict: 'A',
		scope: {
			toggleApi: '=',
			disabled: '=?'
		},
		link: function( scope, elem, attr ){
			scope.toggleApi = {
				active: false,
				toggle: toggle
			};

			function toggle () {
				scope.toggleApi.active = scope.disabled ? scope.toggleApi.active : !scope.toggleApi.active;
			}
		}
	}
}

angular
	.module( 'reusableBehaviors' )
	.factory( 'rbRelayService', rbRelayService );

function rbRelayService () {

	var s = {
		register: register,
		toggle: toggle,
		groups: {}
	};

	return s;

	function register ( index, isFirst, isDefault ) {
		if ( !s.groups[ index ] ) s.groups[ index ] = {
			id: 0,
			default: -1,
			active: -1
		};

		var id = s.groups[ index ].id++;

		if ( isFirst || isDefault ) s.groups[ index ].active = id;
		if ( isDefault ) s.groups[ index ].default = id;

		return id;
	}

	function toggle ( index, id ) {
		var group = s.groups[ index ];

		group.active = group.active === id ? group.default : id;
	}
}

angular
	.module( 'reusableBehaviors' )
	.directive( 'rbRelay', rbRelay );

rbRelay.$inject = [ 'rbRelayService' ];

function rbRelay( rbRelayService ){
	var s = rbRelayService;
	return {
		restrict: 'A',
		scope: {
			relayApi: '=',
			group: '@',
			first: '=?',
			default: '=?',
			disabled: '=?'
		},
		link: function( scope, elem, attr ){
			scope.relayApi = {
				isActive: isActive,
				toggle: toggle
			};

			scope.id = s.register( scope.group, scope.first, scope.default );

			function isActive () {
				return s.groups[ scope.group ].active === scope.id ? true : false;
			}

			function toggle () {
				if ( ! attr.disabled ) s.toggle( scope.group, scope.id );
			}
		}
	}
}

angular
	.module( 'reusableBehaviors' )
	.factory('rbQueueService', rbQueueService);

function rbQueueService () {
	var groups = {};

	var s = {
		register: register,
		setActive: setActive,
		moveFirst: moveFirst,
		movePrev: movePrev,
		moveNext: moveNext,
		moveLast: moveLast,
		active: {}
	};

	return s;

	function register ( index, id ) {
		if( !groups[index] ) groups[index] = 0;

		groups[index] = id > groups[index] ? id : groups[index];

		s.active[index] = 0;
	}

	function setActive ( index, id ) {
		console.log(groups[index]);
		s.active[ index ] = id;
	}

	function moveFirst ( index ) {

	}

	function movePrev ( index ) {

	}

	function moveNext ( index ) {

	}

	function moveLast ( index ) {

	}
}

angular
	.module( 'reusableBehaviors' )
	.directive('rbQueue', rbQueue);

rbQueue.$inject = [ 'rbQueueService' ];

function rbQueue ( rbQueueService ) {
	return {
		restrict: 'A',
		scope: {
			queueApi: '=',
			group: '@',
			position: '='
		},
		link: function ( scope, elem, attr ) {
			var s = rbQueueService;

			scope.queueApi = {
				isActive: isActive,
				setActive: setActive,
				moveFirst: moveFirst,
				movePrev: movePrev,
				moveNext: moveNext,
				moveLast: moveLast
			};

			s.register( attr.group, attr.position );

			function isActive () {
				return s.active[ attr.group ] == attr.position ? true : false;
			}

			function setActive () {
				s.setActive( attr.group, attr.position );
			}

			function moveFirst ( index ) {

			}

			function movePrev ( index ) {

			}

			function moveNext ( index ) {

			}

			function moveLast ( index ) {

			}
		}
	}
}