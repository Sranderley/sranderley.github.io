angular
	.module('demos')
	.directive('rcExpandableList', rcExpandableList);

rcExpandableList.$inject = ['rcExpandableListService'];

function rcExpandableList(rcExpandableListService){
	var s = rcExpandableListService;
	return {
		restrict: 'E',
		replace: true,
		transclude: true,
		template: '<div ng-transclude></div>',
		scope: {
			api: '=',
			list: '=',
			startOpen: '=?'
		},
		link: function(scope, elem, attr){
			scope.api = {
				getState: getState,
				toggle: toggle
			};

			if (!scope.startOpen) scope.startOpen = false;

			scope.id = s.register(scope.list, scope.startOpen);

			function getState(){
				return s.active[scope.list] === scope.id ? "expanded" : "collapsed";
			}

			function toggle(){
				s.toggle(scope.list, scope.id);
			}
		}
	}
}