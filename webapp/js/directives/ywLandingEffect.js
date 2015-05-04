angular.module('ywLanding').directive('ywScrollable', ['$compile', '$timeout', '$window',
function($compile, $timeout, $window){
return {
	restrict: 'EAC',
	
	compile:function(el, attrs){
		return function(scope, el, attrs){
			var header = el.find('.header');
			
			$timeout(function(){
				var scrollable = new ScrollableAnim($($window));
				scrollable.scene({
						triggerElement: '#screen-signup',
						delayPercent: 15,
						startup: function(rev){
							if(!rev){
								header.addClass('header-fixed');
							}else{
								console.log('here');
								header.removeClass('header-fixed');
							}
						}
				});
			}, 50, false);
		}
	}
	
};
}]);
