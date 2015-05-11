angular.module('ywLanding')
.directive('ywTeamPage', ['$timeout', '$q', function($timeout, $q){
	return{
		link:function(scope, el, attrs){
			$timeout(function(){
				var images = el.find('.member>img');
				TweenMax.set(images, {scaleX:0, scaleY:0});
				TweenMax.staggerFromTo(images, 1,
					{scaleX:0, scaleY:0}, {scaleX: 1, scaleY: 1, ease: Elastic.easeOut, delay: .45}, 0.2);
			}, 100, false);
		}
	};
}]);
