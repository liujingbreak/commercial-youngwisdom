
angular.module('ywLanding')
.controller('main', ['$scope', 't', function($scope, msg){
	$scope.t = msg;
	$scope.test = 'hey';
}])
.controller('ywComments', ['$scope',  function($scope, msg){
	$scope.comments = [
		{text: '没有青智唯嘉的帮助，不像在运营我自己的公司。'},
		{text: '我从来没有遇到一个团队对记账服务如此热情，青智唯嘉轻松为我们解决了大问题。'}
	];
}]);
