angular.module('ywLanding')
.directive('ywFeatureSection', ['$timeout', function($timeout){
	return{
		template: '<div class="section"><div class="section-icon glyphicon"></div>'+
				'<div class="section-background"></div>'+
				'<h2>{{title}}</h2>'+
				'<div ng-transclude></div></div>',
		transclude: true,
		scope:{
			title: '@'
		},
		link:function(scope, el, attrs){
			el.addClass('section-wrap');
			el.find('.glyphicon').first().addClass(attrs.iconClass);
		}
	};
	}]);
