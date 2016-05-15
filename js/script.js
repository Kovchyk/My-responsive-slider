$(document).ready(function() {

	    var next = $(".next");
	    var prev = $(".prev");
	    var last = $(".last");
	    var list = $(".list");
	  var amount = $(".list li img").length;
	   var width = $(".list-holder").width();
	var switcher = $(".switcher");
	 var current = $("li.active");
	 var counter = 0;
	   var slide = $(".list-holder li");
	var mSeconds = 400;

	if ( counter  === 0 ) {
		prevDisable();
	}

	setSlideWidth();

	$(window).resize(function() {
		width = $(".list-holder").width();
		setSlideWidth();
		list.css("marginLeft", -width * counter);

		return width;
	});

	next.on("click", function() {
		slideRight();
	});

	prev.on("click", function() {
		slideLeft();
	});

	switcher.on("click", "li", function() {
		switchSlide.call( $(this) );
	});

	function setSlideWidth() {
		slide.width(width);
	}

	function slideRight() {

		if ( counter  === amount - 1) {
			
			current.removeClass("active");
			current = $(".switcher li").eq(0).addClass("active");
			counter = 0;

			prevDisable();

			list.animate({
				marginLeft: "0"
			}, mSeconds);

			return false;
		}

		prevEnable();

		counter += 1;
		current.removeClass("active");
		current = current.next().addClass("active");
		list.animate({
			marginLeft: "-=" + width + "px"
		}, mSeconds);

		return false;
	}

	function slideLeft() {

		if ( counter  === 0 ) {
			return false;
		}

		if ( counter  === 1 ) {
			prevDisable();
		}

		counter -= 1;
		current.removeClass("active");
		current = current.prev().addClass("active");
		list.animate({
			marginLeft: "+=" + width + "px"
		}, mSeconds);

		return false;
	}

	function switchSlide() {

		if ( $(this).index() === amount ) {
			current.removeClass("active");
			current = $(this).prev().addClass("active");
			counter = amount - 1;
			list.animate({
				marginLeft: -width * (amount -1) + "px"
			}, mSeconds);
			
			prevEnable();

			return false;
		}

		prevEnable();
		counter = $(this).index();
		current.removeClass("active");
		current = $(this).addClass("active");

		if ( counter  === 0 ) {
			prevDisable();
		}

		list.animate({
			marginLeft: -width * $(this).index() + "px"
		}, mSeconds);

		return false;
	}

	function prevDisable() {
		prev.css({
			color: "grey",
			cursor: "default"
		});
	}

	function prevEnable() {
		prev.css({
			color: "#fff",
			cursor: "pointer"
		});
	}
});