angular.module('ywLanding')
.directive('ywMain',['$timeout', '$interval', '$window', function($timeout,$interval){
	return {
		link:function(scope, el, attrs){
			scope.$on('$viewContentLoaded', function(){
				$timeout(function(){
					$(window).scrollTop(0);
				}, 50, false);
			});
			
			var header = el.find('.header');
			$timeout(function(){
				var scrollable = new ScrollableAnim($(window));
				scrollable.scene({
						offset: 15,
						duration: 400,
						startup: function(rev){
							if(!rev){
								header.addClass('header-fixed');
							}else{
								header.removeClass('header-fixed');
							}
						}
				});
			}, 500, false);
		}
	};
	
	}])
.directive('ywHome', ['$compile', '$timeout', '$interval', '$window',
function($compile, $timeout,$interval, $window){
return {
	restrict: 'EAC',
	
	compile:function(el, attrs){
		return function(scope, el, attrs){
			
			$timeout(function(){
				var scrollable = new ScrollableAnim($($window));
				
				// --- chart animation ---
				var chartPolygon = el.find('#chart-polygon');
				var line = el.find('#SvgjsPolyline1010');
				var ellipse = el.find('ellipse');
				
				
				var chartTimeline = new TimelineLite({paused: true});
				chartTimeline.to(chartPolygon, 0.8, {callback: function(ratio){
						var v = 129 - 60 * ratio;
						var v2 = 130 + 30 * ratio;
						var v4 = 65 + 70 * ratio;
						var points = '-150,213 150,209 450,'+v2+' 750,'+ v +' 1050,'+v4+' 1350,43 1650,15';
						line.attr('points', points);
						chartPolygon.attr('points', points+ ' 1950,250 -150,250');
						ellipse[3].setAttribute('cy', v);
						ellipse[2].setAttribute('cy', v2);
						ellipse[4].setAttribute('cy', v4);
					}, ease: Power2.EaseInOut
				});
				chartTimeline.to(chartPolygon, 0.8, {callback: function(ratio){
					var v4 = 135 - 30 * ratio;
					var v5 = 43 + 50 * ratio;
					var points = '-150,213 150,209 450,'+ '160' +' 750,'+ '69' +' 1050,'+v4+' 1350,'+v5+' 1650,15';
					line.attr('points', points);
					chartPolygon.attr('points', points+ ' 1950,250 -150,250');
					ellipse[4].setAttribute('cy', v4);
					ellipse[5].setAttribute('cy', v5);
					}, ease: Power2.EaseInOut
				}, '+=3');
				
				chartTimeline.play();
				$interval(function(){
					if(chartTimeline.reversed())
						chartTimeline.restart();
					else
						chartTimeline.reverse();
				}, 6500, 0, false);
				
				// --- step animation ---
				var stepTimeline = new TimelineLite({paused: true});
				var animLine = el.find('#screen-intro .anim-timeline');
				var dots = el.find('#screen-intro .line-dot');
				var steps = el.find('#screen-intro .step');
				var icons = el.find('#screen-intro .glyphicon');
				
				//stepTimeline.to(dots[0], .2, {className: '+=lightened'});
				//stepTimeline.to(steps[0], .2, {color: '#323232'}, 0);
				stepTimeline.to(animLine, 2.1, {width: '100%', ease: Linear.easeNone});
				stepTimeline.staggerTo(dots, .2, {className: '+=lightened'}, 0.7, 0);
				stepTimeline.staggerTo(steps, .2, {color: '#323232'}, 0.7, 0);
				stepTimeline.staggerFromTo(icons, .7, {scaleX:0, scaleY: 0},
					{scaleX: 1, scaleY: 1, ease: Elastic.easeOut}, 0.7,0);
				
				scrollable.scene({
						triggerElement: '#screen-intro .steps',
						delayPercent: 0,
						startup: function(rev){
							if(!rev){
								stepTimeline.restart();
							}
						}
				});
				
				var signupIconsTl = new TimelineLite({paused: true});
				signupIconsTl.staggerFromTo($('#screen-signup2 .yw-icon'), 1, {scaleX:0, scaleY:0}, {scaleX: 1, scaleY: 1, ease: Elastic.easeOut, repeat:-1, delay: 0.5, repeatDelay: 5}, 0.3);
				scrollable.scene({
						triggerElement: '#screen-signup2',
						startup: function(rev){
							if(!rev)
								signupIconsTl.restart();
						}
				});
				
				scrollable.scene({
						triggerElement: '#screen-comments',
						startup: function(rev){
							if(!rev){
								scope.commentAnimStart = 'true';
								scope.$apply();
							}
						}
				});
			}, 500, false);
		}
	}
};
}])
.directive('ywChartAnim', ['$timeout', function($timeout){
	return {
		restrict: 'EAC',
		link: function(scope, el, attrs){
			
			$timeout(function(){
				var win = $(window);
				var svg = el.find('svg');
				win.resize(function(){
					svg.attr('width', win.width());
				});
				svg.attr('width', win.width());
			}, 500, false);
		}
	};
}])
.directive('ywCommentAnim', ['$timeout', function($timeout){
	return {
		restrict: 'EAC',
		link: function(scope, el, attrs){
			el.addClass('yw-comment-anim');
			var bubbles, showingIdx = 0;
			
			$timeout(function(){
					bubbles = el.find('.yw-bubble');
					bubbles.addClass('yw-anim-hide');
			}, 500);
			
			attrs.$observe('ywCommentAnim', function(value){
				if(value === 'yes' || value === 'true'){
					animGroup();
				}
			});
			
			function anim(){
				if(showingIdx != null){
					var hideIdx = showingIdx - 2;
					hideIdx = hideIdx < 0 ? bubbles.length + hideIdx : hideIdx;
					TweenMax.to(bubbles[hideIdx], 0.5, {opacity: 0, yPercent: 100,
						onComplete:function(){
							var target = bubbles.eq(showingIdx);
							target.removeClass('yw-anim-hide');
							TweenMax.fromTo(target, 0.3, {opacity:0, yPercent: -100}, {opacity: 1, yPercent: 0});
							showingIdx++;
							showingIdx = showingIdx === bubbles.length ? 0 : showingIdx;
					}});
				}
				
			}
			
			function animGroup(){
				anim();
				$timeout(anim, 1000, false);
				$timeout(animGroup, 5000, false);
			}
		}
	};
}])
.directive('ywFeature', ['$compile', '$timeout', '$interval', '$window',
function($compile, $timeout,$interval, $window){
return {
	restrict: 'EAC',
	link: function(scope, el, attrs){
		scope.$watch('anchorIdx', function(val, old){
				if(val != null){
					var offset = el.find('.section-wrap').eq(parseInt(val, 10)).offset().top;
					console.log($('.header').outerHeight());
					TweenMax.to(document.body, 0.5, {scrollTop: offset - $('.header').outerHeight() - 35});
				}
			});
		
		
		$timeout(function(){
			var scrollable = new ScrollableAnim($(window));
			var signupIconsTl = new TimelineLite({paused: true});
			signupIconsTl.staggerFromTo($('#screen-signup2 .yw-icon'), 1, {scaleX:0, scaleY:0}, {scaleX: 1, scaleY: 1, ease: Elastic.easeOut, repeat:-1, delay: 0.5, repeatDelay: 5}, 0.3);
			scrollable.scene({
					triggerElement: '#screen-signup2',
					startup: function(rev){
						if(!rev)
							signupIconsTl.restart();
					}
			});
		}, 500, false);
	}
};
}]);
