angular.module('demos', ['ui.router']);

angular.module('demos')
	.config(config);

function config($stateProvider, $urlRouterProvider){

	$urlRouterProvider.otherwise('/demos');

	$stateProvider

	.state('home', {
		url: '/demos',
		templateUrl: 'html/demos.html'
	});

}