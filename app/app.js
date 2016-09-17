angular.module('demos', []);

angular.module('demos')
	.controller('test', test);

function test(){
	console.log('controller working');
}