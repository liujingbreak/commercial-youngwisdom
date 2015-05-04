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
}]);

