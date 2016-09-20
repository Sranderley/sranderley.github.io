angular.module('demos', ['ui.router']);

angular.module('demos')
	.config(config);

function config($stateProvider, $urlRouterProvider){

	$urlRouterProvider.otherwise('/demos/');

	$stateProvider

	.state('demos', {
		url: '/demos',
		templateUrl: 'html/demos.html'
	})

	.state('demos.placeholder', {
		url: '/',
		templateUrl: 'html/placeholder.html'
	})

	.state('demos.rbToggle', {
		url: '/rbToggle',
		templateUrl: 'html/rbToggle.html'
	})

	.state('demos.rbRelay', {
		url: '/rbRelay',
		templateUrl: 'html/rbRelay.html'
	})

	.state('demos.d3Swap', {
		url: '/d3Swap',
		templateUrl: 'html/d3SwappingNodes.html'
	});

}