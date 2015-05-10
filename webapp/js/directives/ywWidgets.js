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
.directive('ywPassword', ['$compile', function($compile){
	return {
		link:function(scope, el, attrs){
			var needText = attrs.ywPassword === 'text';
			
			var toggle = $('<i class="glyphicon glyphicon-eye-open"></i>');
			el.after(toggle);
			if(needText){
				var hints = $('<span class="pwd-vis-hints">显示</span>');
				toggle.after(hints);
			}
			
			toggle.on('click', function(){
				if(el.attr('type') === 'password'){
					el.attr('type', 'text');
					toggle.removeClass('glyphicon-eye-open');
					toggle.addClass('glyphicon-eye-close');
					hints.html('隐藏');
				}
				else{
					el.attr('type', 'password');
					toggle.removeClass('glyphicon-eye-close');
					toggle.addClass('glyphicon-eye-open');
					hints.html('显示');
				}
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
		},
		leave: function(element, done) {
			done();
			TweenMax.to(element, 0.3, {opacity: 0, onComplete: function(){
				
			}});
		},
		enter: function(element, done) {
			TweenMax.fromTo(element, 0.7, {opacity: 0}, {opacity: 1, onComplete: function(){
				done();
			}});
		}
	};
});

