angular.module('ywWidgets')
.directive('ywLink', ['$compile', function($compile){
 return {
 	 restrict: 'C',
 	compile: function compile(el, attrs, transclude){
 		return function(scope, el, attrs){
 			//el.addClass('yw-link');
 			var underscore = angular.element('<div class="underscore"></div>');
 			el.append(underscore);
 		}
 	}
 };
}])
.directive('ywBubble', ['$compile', function($compile){
	return{
		restrict:'AE',
		template: '<div>'+
			'<div class="yw-bubble">'+
				'<div class="arrow"></div>'+
				'<div ng-transclude class="bubble-content"></div>'+
			'</div>'+
		'</div>',
		transclude: true,
		
		compile: function compile(el, attrs, transclude){
			el.addClass('yw-bubble-box');
			return function(scope, el, attrs){
			}
		}
	};
}]);

