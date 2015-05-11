angular.module('ywLanding')
.directive('ywSignupSteps', ['$timeout', '$q', function($timeout, $q){
	return{
		scope: false,
		
		controller: ['$scope', function($scope){
			this.setAnimNameCard = function(element){
				$scope.animNameCard = element;
			};
		}],
		compile:function(){
			return function(scope, el, attrs){
				
				var namecards = el.find('[yw-name-card]');
				namecards.each(function(){
					var namecard = $(this);
					namecard.addClass('yw-name-card');
					$timeout(function(){
						var targetSel = namecard.eq(0).attr('yw-target');
						var t = $(targetSel);
						var offset = t.offset();
						var top = offset.top + t.height();
						
						var offsetParent = namecard.offsetParent();
						namecard.css({ top: top +'px', left: offset.left - offsetParent.offset().left});
						
						
					}, 50, false);
				});
				
				
				scope.$watch('currStep', function(step){
					if(step === 2){
						
						$timeout(function(){
							var nameCardTo;
							var container = el.find('.signup-meet');
							container.height(container.height());
							var nameCard = scope.animNameCard;
							nameCardTo = { x: container.offset().left,
								y: container.offset().top
							};
							
							var fadeoutDef = $q.defer();
							
							var tl = new TimelineLite({delay: 0.3, onComplete: function(){
								scope.model1.desc = scope.model1.name + '    ' + scope.model1.title;
								scope.stepsUI.showBasicForm = true;
								scope.$apply();
								fadeoutDef.resolve();
							}});
							
							
							tl.to(nameCard, 0.7, 
								{	top: container.outerHeight() - nameCard.height() + 66,
									left: '-140px', // signup-steps.less: margin-left: @portrait-width/2;
									width: container.width()/3,
									'border-radius': 0,
								}
							);
							tl.to(el.find('.signup-p-intro')[0], 0.7, {
								display: 'none'
									
							}, 0);
							
							var evan = el.find('.col-evan');
							TweenLite.set(evan,{  transformOrigin: 'center 30%'});
							tl.to(evan, 0.7, {
								height: 0
							}, 0)
							
							tl.to(el.find('.col-desc'), 0.7, { height: 0, padding: 0}, 0);
							
							var namecardEvan = el.find('[yw-name-card]').eq(1);
							tl.to(namecardEvan, 0.7, { opacity: 0, onComplete: function(){ namecardEvan.remove() } }, 0);
							
							var portrait = el.find('.portrait').eq(0);
							portrait.css({position: 'absolute'});
							tl.to(portrait, 0.7, {
								height: container.height()
							}, 0);
							
							fadeoutDef.promise.then(function(){
									console.log(el.find('.underscore'));
								TweenMax.staggerTo(el.find('.underscore'), 0.4, {width: '90%'}, 0.15);
							});
						}, 50, false);
						
					}
				});
			}
		}
	};
	}])
.directive('ywNameCard', ['$timeout', function($timeout){
	var tipboxOutPromis;	
	
return {
	require: '^ywSignupSteps',
	link: function(scope, el, attrs, ywSignupSteps){
		var tipbox;
		var icon = el.find('img');
		
		if(attrs.animInStep2 === 'LJ is awesome'){
			ywSignupSteps.setAnimNameCard(el);
		}
		
		if(scope.currStep !== 1){
			return;
		}
		el.on('mouseenter.ywNameCard', function(e){
			if(tipboxOutPromis){
				$timeout.cancel(tipboxOutPromis);
				tipboxOutPromis = null;
			}
			var off = el.offset();
			if(!tipbox)
				tipbox = $('.yw-namecard-tip');
			
			
			scope.tipModel(scope[attrs.ywNameCard]);
			scope.$apply();
			$timeout(function(){
					var op =tipbox.offsetParent().offset();
					tipbox.css({top: icon.offset().top -op.top, left: icon.offset().left - op.left, visibility: 'visible'});
				}, 0, false);
		});
		el.on('mouseleave.ywNameCard', function(e){
			tipboxOutPromis = $timeout(function(){
					tipbox.css({visibility: 'hidden'});
					tipboxOutPromis = null;
			}, 400, false);
		});
		
		$timeout(function(){
			if(!tipbox)
				tipbox = $('.yw-namecard-tip');
			tipbox.on('mouseenter', function(){
				if(tipboxOutPromis != null){
					if($timeout.cancel(tipboxOutPromis)){
						tipbox.on('mouseleave', function(){
							tipbox.css({visibility: 'hidden'});
							tipbox.off('mouseleave');
						});
						tipboxOutPromis = null;
					}
				}
			});
		}, 50, false);
		
		
	}
};
}])
;
