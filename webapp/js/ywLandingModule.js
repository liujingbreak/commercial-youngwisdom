
angular.module('ywLanding',['ngRoute', 'ywText']);

angular.module('ywLanding')
.controller('main', ['$scope', 'msg', function($scope, msg){
	$scope.t = msg;
	$scope.test = 'hey';
}]);
