$(document).ready(function(){

// fix adblock
	$(window).load(function(){
		$('.banner-top').each(function(){
			if ($(this).css('display') == 'none') {
				$('.header').css('top', '0');
			};
			// var checkBlock = $(this).find('img');
			// if (checkBlock.css('display') == 'none') {
			// 	console.log('block');
			// 	$('.header').css('top', '0');
			// };
		});
	});

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
	$(window).load(function(){
		var mainInnerHeight = $('.section-main__in').height();
		$('.nav-main-sub').css('min-height', mainInnerHeight);
	});
	var sectionMainHeight = $('.section-main').height(); // section-main height
	var subNavHeight;
	$('.nav-main > li > span').on('click', function(){
		if ($(this).parent().hasClass('is-active')) {
			$(this).parent().removeClass('is-active');
			$(this).parent().find('.nav-main-sub').hide();	
			$('.section-top').css('margin-top', '30px');		
		} else{
			$('.nav-main > li').removeClass('is-active');
			$('.nav-main-sub').hide();
			$(this).parent().addClass('is-active');
			$(this).parent().find('.nav-main-sub').toggle();
			subNavHeight = $(this).parent().find('.nav-main-sub').outerHeight();
			if (subNavHeight > sectionMainHeight) {
				$('.section-top').css('margin-top', subNavHeight - sectionMainHeight + 30);
			} else {
				$('.section-top').css('margin-top', '30px');
			};
		};
	});
	// nav close button
	$('.nav-close-btn').on('click', function(){
		$(this).parent().parent().hide().parent().removeClass('is-active');
		$('.section-top').css('margin-top', '30px');
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