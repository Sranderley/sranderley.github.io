angular.module('demos', ['ui.router', 'ngAria', 'reusableBehaviors', 'reusableComponents']);

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

	.state('demos.rb-toggle', {
		url: '/rb-toggle',
		templateUrl: 'html/rb-toggle.html'
	})

	.state('demos.rb-relay', {
		url: '/rb-relay',
		templateUrl: 'html/rb-relay.html'
	})

	.state('demos.rb-queue', {
		url: '/rb-queue',
		templateUrl: 'html/rb-queue.html'
	})

	.state('demos.d3Swap', {
		url: '/d3Swap',
		templateUrl: 'html/d3SwappingNodes.html'
	});

}