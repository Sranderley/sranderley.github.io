angular
	.module('demos')
	.directive('rbToggle', rbToggle);

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

angular
	.module('demos')
	.directive('rcToggle', rcToggle);

function rcToggle() {
	return {
		restrict: 'E',
		replate: true,
		scope: {
			prefix: '=?',
			activeColor: '=?',
			inactiveColoer: '=?',
			borderRadius: '=?',
			speed: '=?',
			width: '=?',
			activeText: '=?',
			inactiveText: '=?'
		},
		template: `<style>
{{ '.' + prefix + 'switch-container' }} {
	transition: background-color 0.1s;
	border: 1px solid #999999;
	border-radius: 5px;
	width: 50px;
	height: 25px;
	cursor: pointer;
	overflow: hidden;
}

{{ '.' + prefix + 'switch-container.off' }} {
	background-color: #bbbbbb;
}

{{ '.' + prefix + 'switch-container.on' }} {
	background-color: {{ activeColor }};
}

.switch-text {
	background-color: inherit;
	color: white;
	text-align: center;
	transition: width 0.1s;
	font-weight: bold;
	line-height: 25px;
	overflow: hidden;
	float: left;
	-webkit-touch-callout: none; /* iOS Safari */
	-webkit-user-select: none;   /* Chrome/Safari/Opera */
	-khtml-user-select: none;    /* Konqueror */
	-moz-user-select: none;      /* Firefox */
	-ms-user-select: none;       /* Internet Explorer/Edge */
	user-select: none;
}

.switch-text.hidden {
	width: 0;
}

.switch-text.shown {
	width: 80%;
}

.slider {
	background-color: white;
	border: 1px solid #999999;
	border-radius: 2px;
	height: 23px;
	width: 20%;
	float: left;
}
	</style>

	Switch
	<div class=" {{ prefix + 'switch-container' }} "
		rb-toggle
		toggle-api="switch"
		ng-class="{
			off: !switch.active,
			on: switch.active
		}"
		ng-click="switch.toggle()"
	>
		<div class="switch-text"
			ng-class="{
				hidden: !switch.active,
				shown: switch.active
			}"
		>
			ON
		</div>
		<div class="slider"></div>
		<div class="switch-text"
			ng-class="{
				hidden: switch.active,
				shown: !switch.active
			}"
		>
			OFF
		</div>
	</div>`,
		link: function(scope, elem, attr) {
			console.log(attr.activeColor);
			scope.activeColor = attr.activeColor || 'green';
			scope.inactiveColor = attr.inactiveColor || '#222222';
			scope.prefix = attr.prefix || 'balls';
		}
	}
}