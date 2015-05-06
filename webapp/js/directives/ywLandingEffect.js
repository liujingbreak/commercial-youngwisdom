angular.module('ywLanding').directive('ywScrollable', ['$compile', '$timeout', '$interval', '$window',
function($compile, $timeout,$interval, $window){
return {
	restrict: 'EAC',
	
	compile:function(el, attrs){
		return function(scope, el, attrs){
			var header = el.find('.header');
			
			
			$timeout(function(){
				//var timeline = new TimelineLite({paused: true});
				//timeline.to('#screen-signup .background', 1, {y: -100, opacitiy: 0, ease: Linear.easeNone});
				
				var scrollable = new ScrollableAnim($($window));
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
				
				/* stepTimeline.to(animLine[0], 0.5, {width: '33%'});
				stepTimeline.addLabel('t1');
				//stepTimeline.to(dots[1], .2, {className: '+=lightened'});
				//stepTimeline.to(steps[1], .2, {color: '#323232'}, 't1');
				
				
				stepTimeline.to(animLine[0], 0.5, {width: '67%'});
				stepTimeline.addLabel('t2');
				//stepTimeline.to(dots[2], .2, {className: '+=lightened'});
				//stepTimeline.to(steps[2], .2, {color: '#323232'}, 't2');
				
				stepTimeline.to(animLine[0], 0.5, {width: '100%'});
				stepTimeline.addLabel('t3');
				//stepTimeline.to(dots[3], .2, {className: '+=lightened'});
				//stepTimeline.to(steps[3], .2, {color: '#323232'}, 't3'); */
				
				scrollable.scene({
						triggerElement: '#screen-intro .steps',
						delayPercent: 0,
						startup: function(rev){
							if(!rev){
								stepTimeline.restart();
							}
						}
				});
			}, 200, false);
		}
	}
	
};
}])
.directive('ywChartAnim', ['$timeout', function($timeout){
	return {
		restrict: 'EAC',
		link: function(scope, el, attrs){
			//var paper = Raphael(el[0], 0, 0, 1340, 250);
			//paper.path('M-150,213 L 150,209 L 450,130 L 750,129 L1050,65 L1350,43 L1650,15 L1950,250 L-150,250 Z')
			//	.attr({fill: '#f3be3f'});
			$timeout(function(){
				var win = $(window);
				var svg = el.find('svg');
				win.resize(function(){
					svg.attr('width', win.width());
				});
				svg.attr('width', win.width());
			}, 50, false);
		}
	};
}]);
