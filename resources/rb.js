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
	.directive( 'rbQueue', rbQueue );

function rbQueue () {
	return {
		restrict: 'A',
		scope: {
			queueApi: '=',
			count: '=',
			proximity: '=?',
			internalEllipsis: '=?'
		},
		link: function ( scope, elem, attr ) {
			var active = 1;
			scope.queueApi = {
				isActive: isActive,
				setActive: setActive,
				isFirst: isFirst,
				isLast: isLast,
				isProximal: isProximal,
				leftEllipsis: leftEllipsis,
				rightEllipsis: rightEllipsis,
				moveFirst: moveFirst,
				movePrev: movePrev,
				moveNext: moveNext,
				moveLast: moveLast
			};

			function isActive ( index ) {
				return active === index;
			}

			function setActive ( index ) {
				active = index;
			}

			function isFirst () {
				return active === 1;
			}

			function isLast () {
				return active === scope.count;
			}

			function isProximal ( index ) {
				if ( active <= scope.proximity ) {
					return index <= 1 + 2 * scope.proximity;
				} else if ( active > scope.count - scope.proximity ) {
					return index >= scope.count - 2 * scope.proximity;
				} else {
					return Math.abs( active - index ) <= scope.proximity;
				}
			}

			function leftEllipsis () {
				var leftThreshold = scope.internalEllipsis ? scope.proximity + 2 : scope.proximity + 1;
				return active > leftThreshold;
			}

			function rightEllipsis () {
				var rightThreshold = scope.internalEllipsis ? scope.count - scope.proximity - 1 : scope.count - scope.proximity;
				return active < rightThreshold;
			}

			function moveFirst () {
				active = 1;
			}

			function movePrev () {
				active = active === 1 ? 1 : active - 1;
			}

			function moveNext () {
				active = active === scope.count ? scope.count : active + 1 ;
			}

			function moveLast () {
				active = scope.count;
			}
		}
	}
}