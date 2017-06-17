/**
 * Kraken v5.6.0
 * A lightweight front-end boilerplate, by Chris Ferdinandi.
 * http://github.com/cferdinandi/kraken
 * 
 * Free to use under the MIT License.
 * http://gomakethings.com/mit/
 */

 $( document ).ready(function() {
////////////////////////////////////////////////
////////////////                 ///////////////
////////////////    FUNCTIONS    ///////////////
////////////////                 ///////////////
////////////////////////////////////////////////

////////////////////////////////////////////////
	//Fix Widows
	function fixType(){

	}
	fixType();

////////////////////////////////////////////////
	//JS SPECIFIC LAYOUT ADJ
	function forwidth(){

	}
	forwidth();


////////////////////////////////////////////////
	//IF MOBILE
	function isMobile() {
	    if(navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/iPhone|iPad|iPod/i) || navigator.userAgent.match(/IEMobile/i)){
	    	return true; } else { return false; }
	}
	function iphone() {
	    if(navigator.userAgent.match(/iPhone|iPad|iPod/i)){
	    	return true; } else { return false; }
	}

////////////////////////////////////////////////
	//GET VENDOR PREFIXES
	var prefix = (function () {
	  	var styles = window.getComputedStyle(document.documentElement, ''),
	    	pre = (Array.prototype.slice
	      		.call(styles)
	      		.join('')
	      		.match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
	    	)[1],
	    	dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1];
	  	return {
	    	dom: dom,
	    	lowercase: pre,
	    	css: '-' + pre + '-',
	    	js: pre[0].toUpperCase() + pre.substr(1)
	  	};
	})();
	$('body').addClass(prefix.lowercase);
	if (navigator.userAgent.indexOf('Safari') != -1){
	    if (navigator.userAgent.indexOf('Chrome') == -1){
	      	$('body').addClass('safari');
	    } else {
	      	$('body').addClass('chrome');
	      	$('.scene').addClass('noshadow');
	    }
	}



////////////////////////////////////////////////
	//Logo based off two.js example

var $window = $(window),
	radius = 1,
	editColor = 'rgb(254, 1, 57)',
	toggleColor = 'rgba(0, 116, 217, .5)',
	pointColor = 'rgba(0, 116, 217, 1)',
	type = /(canvas|webgl)/.test(url.type) ? url.type : 'svg';

var two = new Two({
	type: Two.Types[type],
	fullscreen: true,
	autostart: true
}).appendTo(document.body);

var letter = two.interpret(document.querySelector('.assets svg'));
letter.stroke = 'rgb(254, 1, 57)';
letter.fill = 'rgb(254, 1, 57)';
letter.linewidth = radius;
letter.stroke = editColor;

var resize = function() {
	var cx = two.width / 2;
	var cy = two.height / 2;
	var rect = letter.getBoundingClientRect();
	letter.translation.set(cx - rect.width / 2, cy - rect.height / 2);
};
two.bind('resize', resize);
resize();

_.each(letter.children, function(polygon) {
	_.each(polygon.vertices, function(anchor) {

		var p = two.makeCircle(0, 0, 3);
		var l = two.makeRectangle(0, 0, 6, 6);
		var r = two.makeRectangle(0, 0, 6, 6);

		p.translation.copy(anchor);
		l.translation.copy(anchor.controls.left).addSelf(anchor);
		r.translation.copy(anchor.controls.right).addSelf(anchor);
		p.noStroke().fill = pointColor;
		l.noFill().stroke = r.noFill().stroke = toggleColor;

		var ll = new Two.Polygon([
			new Two.Anchor().copy(p.translation),
			new Two.Anchor().copy(l.translation)
		]);
		var rl = new Two.Polygon([
			new Two.Anchor().copy(p.translation),
			new Two.Anchor().copy(r.translation)
		]);
		rl.noFill().stroke = ll.noFill().stroke = toggleColor;

		letter.add(rl, ll, p, l, r);

		p.translation.bind(Two.Events.change, function() {
			anchor.copy(this);
			l.translation.copy(anchor.controls.left).addSelf(this);
			r.translation.copy(anchor.controls.right).addSelf(this);
			ll.vertices[0].copy(this);
			rl.vertices[0].copy(this);
			ll.vertices[1].copy(l.translation);
			rl.vertices[1].copy(r.translation);
		});
		l.translation.bind(Two.Events.change, function() {
			anchor.controls.left.copy(this).subSelf(anchor);
			ll.vertices[1].copy(this);
		});
		r.translation.bind(Two.Events.change, function() {
			anchor.controls.right.copy(this).subSelf(anchor);
			rl.vertices[1].copy(this);
		});

		// Update the renderer in order to generate the actual elements.
		two.update();

		// Add Interactivity
		addInteractivity(p);
		addInteractivity(l);
		addInteractivity(r);

		if (p.translation._x == l.translation._x && p.translation._y == l.translation._y) {
			l.remove()
		};
		if (p.translation._x == r.translation._x && p.translation._y == r.translation._y) {
			r.remove()
		};
		p.cap = "round";
		r.cap = l.cap = "square";

	});
});

function addInteractivity(shape) {

	var offset = shape.parent.translation;

	var drag = function(e) {
		e.preventDefault();
		var x = e.clientX - offset.x;
		var y = e.clientY - offset.y;
		shape.translation.set(x, y);
	};
	var touchDrag = function(e) {
		e.preventDefault();
		var touch = e.originalEvent.changedTouches[0];
		drag({
			preventDefault: _.identity,
			clientX: touch.pageX,
			clientY: touch.pageY
		});
		return false;
	};
	var dragEnd = function(e) {
		e.preventDefault();
		$window
		.unbind('mousemove', drag)
		.unbind('mouseup', dragEnd);
	};
	var touchEnd = function(e) {
		e.preventDefault();
		$(window)
		.unbind('touchmove', touchDrag)
		.unbind('touchend', touchEnd);
		return false;
	};

	$(shape._renderer.elem)
		.css({
			cursor: 'pointer'
		})
		.bind('mousedown', function(e) {
			e.preventDefault();
			$window
				.bind('mousemove', drag)
				.bind('mouseup', dragEnd);
		})
		.bind('touchstart', function(e) {
			e.preventDefault();
			$(window)
				.bind('touchmove', touchDrag)
				.bind('touchend', touchEnd);
			return false;
		})
	;
}

////////////////////////////////////////////////
	// Bouncing elements
$.fn.bounce = function(options) {

    var settings = $.extend({
        speed: 10
    }, options);

    return $(this).each(function() {

        var $this = $(this),
            $parent = $this.parent(),
            height = $parent.height(),
            width = $parent.width(),
            top = Math.floor(Math.random() * (height / 2)) + height / 4,
            left = Math.floor(Math.random() * (width / 2)) + width / 4,
            vectorX = settings.speed * (Math.random() > 0.5 ? 1 : -1),
            vectorY = settings.speed * (Math.random() > 0.5 ? 1 : -1);

        // place initialy in a random location
        $this.css({
            'top': top,
            'left': left
        }).data('vector', {
            'x': vectorX,
            'y': vectorY
        });

        var move = function($e) {

            var offset = $e.offset(),
                width = $e.width(),
                height = $e.height(),
                vector = $e.data('vector'),
                $parent = $e.parent();

            if (offset.left <= 0 && vector.x < 0) {
                vector.x = -1 * vector.x;
            }
            if ((offset.left + width) >= $parent.width()) {
                vector.x = -1 * vector.x;
            }
            if (offset.top <= 0 && vector.y < 0) {
                vector.y = -1 * vector.y;
            }
            if ((offset.top + height) >= $parent.height()) {
                vector.y = -1 * vector.y;
            }

            $e.css({
                'top': offset.top + vector.y + 'px',
                'left': offset.left + vector.x + 'px'
            }).data('vector', {
                'x': vector.x,
                'y': vector.y
            });

            setTimeout(function() {
            	if($e.is(":hover")){

            	}else{
            		move($e);
            	};

            }, 50);

        };

        move($this);
    });

};

for (i = 0; i < 10; i++) {
	$("#main").append('<div class="bounce3 box"></div>')*10;
	$("#main").append('<div class="bounce3 circle"></div>')*10;
}

$('.bounce1').bounce({
    'speed': 7
});

$('.bounce2').bounce({
    'speed': 6
});

$('.bounce3').bounce({
    'speed': 5
});



////////////////////////////////////////////////
////////////////                 ///////////////
////////////////    LISTENERS    ///////////////
////////////////                 ///////////////
////////////////////////////////////////////////

////////////////////////////////////////////////
// 	//ON RESIZE
// 	var updateLayout = _.debounce(function(e) {

// 	}, 500);
// 	window.addEventListener("resize", updateLayout, false);

// ////////////////////////////////////////////////
// 	//ON scroll
// 	var scroll = _.throttle(function(e) {

// 	}, 500);
// 	window.addEventListener("scroll", scroll, false);

});

// $(window).load(function() {


// }); // `~*# The end.


