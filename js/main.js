$(document).ready(function(){

// city autocomplete
	var myArr = [];
	$.ajax({
		type: "GET",
		url: "ua-cities.xml", // change to full path of file on server
		dataType: "xml",
		success: parseXml,
		complete: setupAC,
		error: function() {
			// if XML File could not be found
		}
	});
	function parseXml(xml) {
		//find every query value
		$(xml).find("city").each(function() {
			myArr.push($(this).attr("name"));
		});
	}
	function setupAC() {
	    $("#cityBox").autocomplete({
	        source: function( request, response ) {
	            var matcher = new RegExp( "^" + $.ui.autocomplete.escapeRegex( request.term ), "i" );
	            response( $.grep( myArr, function( item ){
	                return matcher.test( item );
	            }) );
	        },
	        minLength: 1
	        // select: function(event, ui) {
	        //     $("#cityBox").val(ui.item.value);
	        //     $("#searchForm").submit();
	        // }
	    });
	}


// Main Slider
	$('.slider-main').slick({
		autoplay: true,
		autoplaySpeed: 10000,
		dots: true
	});

// Main Nav
	$('.nav-main > li > span').on('click', function(){
		if ($(this).parent().hasClass('is-active')) {
			$(this).parent().removeClass('is-active');
			$(this).parent().find('.nav-main-sub').hide();			
		} else{
			$('.nav-main > li').removeClass('is-active');
			$('.nav-main-sub').hide();
			$(this).parent().addClass('is-active');
			$(this).parent().find('.nav-main-sub').toggle();
		};
	});
	// nav close button
	$('.nav-close-btn').on('click', function(){
		$(this).parent().parent().hide().parent().removeClass('is-active');
	});

// banner
	function bannerHide() {
		if ($(window).width() < 1342) {
			$('.banner-1, .service-1, .service-2').hide();
		} else {
			$('.banner-1, .service-1, .service-2').show();
		}
	};
	bannerHide();
	$(window).resize(function(){
		bannerHide();
	});
	$('.close-banner').on('click', function(){
		$(this).parent().hide();
	});
	$('.close-banner-fix').on('click', function(){
		$(this).parent().hide();
		$('.header').css('top', '0');
	});

// // Clear placeholder
// 	(function() {
// 		$('input,textarea').focus(function(){
// 				$(this).data('placeholder',$(this).attr('placeholder'))
// 				$(this).attr('placeholder','');
// 		});
// 		$('input,textarea').blur(function(){
// 			$(this).attr('placeholder',$(this).data('placeholder'));
// 		});
// 	}());

// // ScrollTo
// 	$(function(){
// 	    $('.main-nav').onePageNav({
// 			filter: ':not(.external)',
// 			scrollThreshold: 0.25,
// 			scrollSpeed: 1200,
// 			easing: 'swing',
// 			scrollOffset: 38
// 		});
// 	});

// // js-inview
// 	$('.js-inview').bind('inview', function(event, isInView, visiblePartX, visiblePartY) {
// 		if (isInView) {
// 				if (visiblePartY == 'top') {
// 				// top part of element is visible
// 			} else if (visiblePartY == 'bottom') {
// 				// bottom part of element is visible
// 			} else {
// 				// whole part of element is visible
// 			}
// 		} else {
// 			// element has gone out of viewport
// 		}
// 	});

// // WOW animation
// 	new WOW().init();



// // 60fps scrolling
// 	var body = document.body,
// 	timer;
// 	window.addEventListener('scroll', function() {
// 		clearTimeout(timer);
// 		if(!body.classList.contains('disable-hover')) {
// 			body.classList.add('disable-hover')
// 		}
// 		timer = setTimeout(function(){
// 			body.classList.remove('disable-hover')
// 		}, 250);
// 	}, false);
	
	
});

// Window Scroll
$(window).scroll(function () {

    'use strict';

    if (jQuery(document).scrollTop() >= 220) {
        $('.header').addClass('is-fixed');
    } else {
        $('.header').removeClass('is-fixed');
    }

});