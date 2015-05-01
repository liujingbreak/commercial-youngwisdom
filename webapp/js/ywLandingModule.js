

angular.module('ywText', []).value('msg', {
	logoText: '帮帮忙',
	feature: '特点',
	signup: '注册',
	community: '社区',
	team: '团队'
});

angular.module('ywLanding',['ngRoute', 'ywText']);

angular.module('ywLanding')
.controller('main', ['$scope', 'msg', function($scope, msg){
	$scope.t = msg;
	$scope.test = 'hey';
}]);
