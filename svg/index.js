$(document).ready(function() {

	function rand(min, max) {
		var the_random = Math.random() * (max - min + 1) + min;
		return the_random;
	}

	function rand_floor(min, max) {
		var the_random = Math.floor(Math.random() * (max - min + 1) + min);
		return the_random;
	}

	/*
	*	SI ON EST SUR ORDINATEUR (pour le hover) ON PERMET L'ANIMATION SUR LE LOGO
	*/

	var canMove = true;
	var floor_rotate = 20;
	var floor_translate = 3;

	var batch_move = 100;
	var division_move = 40;

	var tab_compatibility = [];
	tab_compatibility[0] = "-webkit-transform";
	tab_compatibility[1] = "-o-transform";
	tab_compatibility[2] = "-moz-transform";
	tab_compatibility[3] = "-ms-transform";
	tab_compatibility[4] = "transform";

	var tab_val1 = [];
	var tab_val2 = [];

	if(($(window).width() > 800)) {

		$('svg').hover(

			function() {
				svgBomb();

				$('svg').mousemove(function(e) {

					if(canMove) {
						canMove = false;
						svgDirection(setDirection(e));

				        setTimeout(function() {
				        	canMove = true;
				        }, batch_move);
					}
				});

			}, function() {
				svgRemake();
			}
		);
	}

	function svgBomb() {

		var i = 0;

		$('.animation polygon, .animation path, .animation polyline').each(function() {

			tab_val1[i] = rand_floor(-floor_rotate, floor_rotate);
			tab_val2[i] = rand(-floor_translate, floor_translate);

			for (var j = 0; j < tab_compatibility.length; j++) {

				$(this).css(tab_compatibility[j], 'rotate('+tab_val1[i]+'deg) translate3d('+tab_val2[i]+'em, 0em, 0)');
			}

			i++;
		});

		console.log('tab_val1', tab_val1);
	}

	function svgDirection(direction) {

		var i = 0;

		$('.animation polygon, .animation path, .animation polyline').each(function() {

			if(direction == 'right') {

				for (var j = 0; j < tab_compatibility.length; j++) {
					tab_val2[i] = tab_val2[i] + (floor_translate/division_move);
					$(this).css(tab_compatibility[j], 'rotate('+tab_val1[i]+'deg) translate3d('+tab_val2[i]+'em, 0em, 0)');
				}

			} else if(direction === 'left') {

				for (var j = 0; j < tab_compatibility.length; j++) {
					tab_val2[i] = tab_val2[i] - (floor_translate/division_move);
					$(this).css(tab_compatibility[j], 'rotate('+tab_val1[i]+'deg) translate3d('+tab_val2[i]+'em, 0em, 0)');
				}	
			} else if(direction === 'up') {

				for (var j = 0; j < tab_compatibility.length; j++) {
					tab_val2[i] = tab_val2[i] - (floor_translate/division_move);
					$(this).css(tab_compatibility[j], 'rotate('+tab_val1[i]+'deg) translate3d('+tab_val2[i]+'em, 0em, 0)');
				}	
			} else if(direction === 'down') {

				for (var j = 0; j < tab_compatibility.length; j++) {
					tab_val2[i] = tab_val2[i] + (floor_translate/division_move);
					$(this).css(tab_compatibility[j], 'rotate('+tab_val1[i]+'deg) translate3d('+tab_val2[i]+'em, 0em, 0)');
				}	
			}

			i++;
			
		});
	}

	function svgRemake() {
		for (var i = 0; i < tab_compatibility.length; i++) {
			$('.animation polygon, .animation path, .animation polyline').css(tab_compatibility[i], 'rotate(0deg) translate3d(0em, 0em, 0)');
		}
	}

	var last_position = '';

	function setDirection(e) {

		var the_direction;

		if (last_position != '') {			

	        //get the change from last position to this position
	        var deltaX = last_position.x - e.clientX,
	            deltaY = last_position.y - e.clientY;

	        //check which direction had the highest amplitude and then figure out direction by checking if the value is greater or less than zero
	        if (Math.abs(deltaX) > Math.abs(deltaY) && deltaX > 0) {
	            the_direction = 'left';
	        } else if (Math.abs(deltaX) > Math.abs(deltaY) && deltaX < 0) {
	            the_direction = 'right';
	        } else if (Math.abs(deltaY) > Math.abs(deltaX) && deltaY > 0) {
	            the_direction = 'up';
	        } else if (Math.abs(deltaY) > Math.abs(deltaX) && deltaY < 0) {
	            the_direction = 'down';
	        }
	    }

	    //set the new last position to the current for next time
	    last_position = {
	        x : e.clientX,
	        y : e.clientY
	    };

	    return the_direction;
	}

});
