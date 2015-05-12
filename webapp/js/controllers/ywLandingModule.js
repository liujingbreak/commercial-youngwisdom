
angular.module('ywLanding')
.controller('main', ['$scope', 't', function($scope, msg){
	$scope.t = msg;
	$scope.hideHeader = false;
	$scope.hideContactScreen = false;
	
	$scope.setHideHeader = function(b){
		$scope.hideHeader = b;
	};
	$scope.setHideContactScreen = function(b){
		$scope.hideContactScreen = b;
	};
	
	$scope.emailFormat = /[a-zA-Z0-9_.]+@[a-zA-Z0-9_.]+/;
}])
.controller('ywComments', ['$scope','t', function($scope, msg){
	$scope.comments = [
		{text: '没有青智唯嘉的帮助，不像在运营我自己的公司。'},
		{text: '我从来没有遇到一个团队对记账服务如此热情，青智唯嘉轻松为我们解决了大问题。'}
	];
}])
.controller('homeController', ['$scope','t', '$location', '$q', function($scope, msg, $location, $q){
	$scope.signupScreenReady = $q.defer();
	$scope.introScreenReady = $q.defer();
	$scope.whatScreenReady = $q.defer();
	$scope.commentsScreenReady = $q.defer();
	$scope.signup2ScreenReady = $q.defer();
	
	
	
	$scope.setHideHeader(false);
	$scope.setHideContactScreen(false);
	$scope.scroll2Top();
	$scope.signup = function(){
			$location.path('/signup-steps');
	//	}
	};
	
}])
.controller('featureController', ['$scope','t','$route', '$routeParams', '$q','$location',
		function($scope, msg,
		$route, $routeParams, $q, $location){
	$scope.signup2ScreenReady = $q.defer();
	$scope.setHideHeader(false);
	$scope.setHideContactScreen(false);
	$scope.scroll2Top();
	$scope.jump = function(anchor){
		$scope.anchorIdx = anchor;
		//$location.path('/feature/'+ anchor);
	};
}])
.controller('signupController', ['$scope', '$location', function($scope, $location){
	$scope.setHideHeader(true);
	$scope.setHideContactScreen(true);
	$scope.scroll2Top();
	$scope.signup = function(){
		if($scope.signupPageForm.$valid){
			$location.path('/signup-steps');
		}
	};	
}]).controller('signinController', ['$scope', '$location', function($scope, $location){
	$scope.setHideHeader(true);
	$scope.setHideContactScreen(true);
	$scope.scroll2Top();
	$scope.signup = function(){
		if($scope.signupPageForm.$valid){
			$location.path('/signup-steps');
		}
	};	
}]).controller('signupStepController', ['$scope', '$location','$route','$routeParams',
	function($scope, $location, $route, $routeParams){
	$scope.setHideHeader(true);
	$scope.setHideContactScreen(true);
	$scope.model1 = { name: 'Ivy', title: '会计事务资深顾问'};
	$scope.model2 = { name: 'Evan', title: '会计师'};
	$scope.model1.desc = $scope.model1.name;
	$scope.stepsUI = {
		showBasicForm: false
	};
	
	if(!$routeParams.signupStep || $routeParams.signupStep === 1)
		$scope.currStep = 1;
	else{
		var step = $scope.currStep = parseInt($routeParams.signupStep, 10);
		if(step === 2){
			
		}
	}
	
	$scope.theModel = $scope.model1;
	$scope.tipModel = function(model){
		$scope.theModel = model;
	};
	
	$scope.validate = function(){
		return $scope.signupStep3Form.$valid;
	};
}]).controller('teamController', ['$scope', function($scope){
	$scope.setHideHeader(false);
	$scope.setHideContactScreen(false);
	
	$scope.teams = [
		{
			title: '我们的财税团队',
			members:[
				{
					image:'team_jzz.jpg',
					intro:'蒋中植'
				},
				{	image: 'team_csy.jpg',
					intro:'陈抒元'
				}
				,{	image: 'team_yjl.jpg',
					intro:'姚嘉伦'
				}
			]
		},
		{
			title: '我们的IT团队',
			members:[
				{
					image:'team_ckz.jpg',
					intro: '柴快长'
				},
				{
					image:'team_dxj.jpg',
					intro: '段行健'
				}
			]
		}
	];
}])
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$routeProvider.when('/', {
		templateUrl: '/views/home.html',
		controller: 'homeController'
	}).when('/feature', {
		templateUrl: '/views/feature.html',
		controller: 'featureController'
	}).when('/feature/:anchor', {
		templateUrl: '/views/feature.html',
		controller: 'featureController'
	}).when('/signup', {
		templateUrl: '/views/signup-page.html',
		controller: 'signupController'
	}).when('/signup-steps', {
		templateUrl: '/views/signup-steps.html',
		controller: 'signupStepController'
	}).when('/signup-steps/:signupStep', {
		templateUrl: '/views/signup-steps.html',
		controller: 'signupStepController'
	}).when('/signin', {
		templateUrl: '/views/signin-page.html',
		controller: 'signupController'
	}).when('/team', {
		templateUrl: '/views/team-page.html',
		controller: 'teamController'
	});
}]);
