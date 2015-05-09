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
			'<div class="yw-bubble-box">'+
				'<div class="arrow"></div>'+
				'<div ng-transclude class="bubble-content"></div>'+
			'</div>'+
		'</div>',
		transclude: true,
		
		compile: function compile(el, attrs, transclude){
			el.addClass('yw-bubble');
			return function(scope, el, attrs){
			}
		}
	};
}])
.directive('ywButton', [function(){
	return {
		restrict:'AEC',
		link: function(scope, el, attrs){
			el.addClass('yw-button');
			el.on('mousedown', function(){
				el.addClass('down');
			});
			$('body').on('mouseup', function(){
				el.removeClass('down');
			});
		}
	};
}])
.animation('.yw-animation', function(){
	return{
		addClass: function(element, className, done) { 
			if(className === 'ng-hide'){
				TweenMax.fromTo(element, 0.25, {opacity: 1, yPercent: 0}, {opacity: 0, yPercent: -100, onComplete: done, ease: Power2.easeOut});
			}else{
				done();
			}
		},
		removeClass: function(element, className, done) {
			if(className === 'ng-hide'){
				TweenMax.fromTo(element, 0.25, {opacity: 0, yPercent: -100}, {opacity:1, yPercent: 0, onComplete: done, ease: Power2.easeOut});
				//TweenMax.from(element, 0.3, {height: 0, onComplete: done});
			}else
				done();
		}
	};
});

