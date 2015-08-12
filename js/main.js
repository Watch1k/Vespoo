$(document).ready(function(){

// Validation
	$.validate({
		validateOnBlur : true,
		scrollToTopOnError : false,
		modules: 'security'
	});

// custom checkbox
	$('input').iCheck({
		checkboxClass: 'icheckbox_square-orange',
		radioClass: 'iradio_square-orange',
		increaseArea: '20%' // optional
	});

// Clear placeholder
	(function() {
		$('input,textarea').focus(function(){
			$(this).data('placeholder',$(this).attr('placeholder'))
			$(this).attr('placeholder','');
		});
		$('input,textarea').blur(function(){
			$(this).attr('placeholder',$(this).data('placeholder'));
		});
	}());

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

// form search
	// hide location-wrap on outer click
	if ($('.location-wrap').length) {
		$(document).click(function(e) {
			if ( ($(e.target).closest('.location-wrap').length === 0) && ($(e.target).closest('#cityCurrent').length === 0) ) {
				$('.location-wrap').hide();
			}
		});
	};
	// show/hide location-wrap
	$('#cityCurrent').on('focus', function(){
		$('.location-wrap').toggle();
	});
	$('.header input').blur(function(){
		if ($(this).val()) {
			$(this).siblings('.clear-input').css('display', 'block');
		};
	});

	// clear-input button
	$('.clear-input').on('click', function(){
		$(this).siblings('input').val('');
		$(this).hide();
	});

	// location-all button
	$('.location-title__all').on('click', function(){
		$('#cityCurrent').val($(this).text()).siblings('.clear-input').css('display', 'block');
		$('.location-wrap').hide();
		$('.location-wrap input').val('');
		$('.location-wrap .clear-input').hide();
		$('.city-wrap').hide();
		$('.city-list').remove();
		$('.region-wrap').show();
		$('.location-title__region').hide();
		$('.location-title__back').hide();
	});

	// location-title__back button
	$('.location-title__back').on('click', function(){
		$('.city-list').remove();
		$('.city-wrap').hide();
		$('.region-wrap').show();
		$('.location-title__region').hide();
		$(this).hide();
	});

	// location-title__region
	$('.location-title__region').on('click', function(){
		$("#cityCurrent").val($(this).text()).siblings('.clear-input').css('display', 'block');
		$('.location-wrap').hide();
		$('.location-wrap input').val('');
		$('.location-wrap .clear-input').hide();
		$('.city-wrap').hide();
		$('.city-list').remove();
		$('.region-wrap').show();
		$('.location-title__region').hide();
		$('.location-title__back').hide();
	});

// region list
	var regionArr = [];
	var regionMark;
	$.ajax({
		type: "GET",
		url: "ua-cities.xml", // change to full path of file on server
		dataType: "xml",
		success: parseRegion,
		complete: setupRegion,
		error: function() {
			// if XML File could not be found
		}
	});
	function parseRegion(xml) {
		//find every query value
		$(xml).find("region").each(function() {
			regionArr.push($(this).attr("name"));
		});
	}
	function setupRegion() {
	    $('.region-wrap').append('<ul class="region-list"></ul>');
	    for (var i = 0; i < regionArr.length; i++) {
	    	$('.region-list').append('<li></li>');
	    	// regionArr[i]
	    	$('.region-list li:last-child').text(regionArr[i]);
	    };
		$('.region-list li').on('click', function(){
			regionMark = $(this).text();
			cityList();
			$('.region-wrap').hide();
			$('.city-wrap').show();
			$('.location-title__region').show().text(regionMark);
			$('.location-title__back').show();
		});
	}

// city list
	function cityList() {
		var cityArr = [];
		$.ajax({
			type: "GET",
			url: "ua-cities.xml", // change to full path of file on server
			dataType: "xml",
			success: parseCity,
			complete: setupCity,
			error: function() {
				// if XML File could not be found
			}
		});
		function parseCity(xml) {
			//find every query value
			var regionCurrent;
			$(xml).find("region").each(function(){
				if ($(this).attr("name") == regionMark) {
					regionCurrent = $(this);
				};
			});
			$(xml).find(regionCurrent).find("city").each(function() {
				cityArr.push($(this).attr("name"));
			});
		}
		function setupCity() {
		    $('.city-wrap').append('<ul class="city-list"></ul>');
		    for (var i = 0; i < cityArr.length; i++) {
		    	$('.city-list').append('<li></li>');
		    	// cityArr[i]
		    	$('.city-list li:last-child').text(cityArr[i]);
		    };
		    $('.city-list li').on('click', function(){
				$('#cityBox').val($(this).text()).siblings('.clear-input').css('display', 'block');
				$('#cityCurrent').val($('#cityBox').val()).siblings('.clear-input').css('display', 'block');
				$('.location-wrap').hide();
				$('.location-wrap input').val('');
				$('.location-wrap .clear-input').hide();
				$('.city-wrap').hide();
				$('.city-list').remove();
				$('.region-wrap').show();
				$('.location-title__region').hide();
				$('.location-title__back').hide();
			});
		}
	};

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
	        minLength: 2,
	        select: function(event, ui) {
	        	$("#cityBox").val(ui.item.value);
	        	var cityCurrent = $("#cityBox").val();
	            $('#cityCurrent').val(cityCurrent).siblings('.clear-input').css('display', 'block');
	            $('.location-wrap').hide();
	            $('.location-wrap input').val('');
	            $('.location-wrap .clear-input').hide();
	            $('.city-wrap').hide();
	            $('.city-list').remove();
	            $('.region-wrap').show();
	            $('.location-title__region').hide();
	            $('.location-title__back').hide();
	            ui.item.value = '';
	            $('#cityBox').val(ui.item.value);
	        }
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