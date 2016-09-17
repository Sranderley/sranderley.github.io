console.log('test');
console.log(angular);
angular.module('demos', []);
console.log('test agina');

angular.module('demos')
	.conrollert('test', test);

function test(){
	console.log('controller working');
}