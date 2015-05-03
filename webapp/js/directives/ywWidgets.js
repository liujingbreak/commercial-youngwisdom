angular.module('ywWidgets')
.directive('ywLink', ['$compile', function($compile){
 return {
 	compile: function compile(el, attrs, transclude){
 		var chr = el.first().detach();
 		
 		var link = $compile();
 		return function(scope, el, attrs){
 			
 		}
 	}
 };
}]);

