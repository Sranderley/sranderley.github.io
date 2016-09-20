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

	.state('demos.rbExpand', {
		url: '/rbExpand',
		templateUrl: 'html/rbExpand.html'
	});

}