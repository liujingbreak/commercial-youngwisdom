angular.module('ywLanding')
.directive('ywSignupSteps', ['$timeout', function($timeout){
	return{
		
		compile:function(){
			return function(scope, el, attrs){
				var namecard = el.find('[yw-name-card]');
				
				var targetSel = namecard.eq(0).attr('yw-target');
				$timeout(function(){
						console.log($(targetSel).offset() );
				}, 50, false);
			}
		}
	};
	}])
;
