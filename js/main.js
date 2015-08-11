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
				$('#cityBox').val($(this).text());
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