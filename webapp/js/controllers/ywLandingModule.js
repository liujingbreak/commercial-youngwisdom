
angular.module('ywLanding')
.controller('main', ['$scope', 't', function($scope, msg){
	$scope.t = msg;
	$scope.test = 'hey';
	$scope.emailFormat = /[a-zA-Z0-9_.]+@[a-zA-Z0-9_.]+/;
}])
.controller('ywComments', ['$scope','t', function($scope, msg){
	$scope.comments = [
		{text: '没有青智唯嘉的帮助，不像在运营我自己的公司。'},
		{text: '我从来没有遇到一个团队对记账服务如此热情，青智唯嘉轻松为我们解决了大问题。'}
	];
}])
.controller('PageController', ['$scope','t', function($scope, msg){
			
}])
.controller('featureController', ['$scope','t','$route', '$routeParams', '$location', function($scope, msg,
		$route, $routeParams, $location){
	$scope.jump = function(anchor){
		$scope.anchorIdx = anchor;
		//$location.path('/feature/'+ anchor);
	};
}])
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$routeProvider.when('/', {
		templateUrl: '/views/home.html',
		controller: 'PageController'
	}).when('/feature', {
		templateUrl: '/views/feature.html',
		controller: 'featureController'
	}).when('/feature/:anchor', {
		templateUrl: '/views/feature.html',
		controller: 'featureController'
	}).when('/signup', {
		templateUrl: '/views/signup-page.html',
		controller: 'PageController'
	});
}]);
