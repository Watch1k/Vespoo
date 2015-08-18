$(document).ready(function(){

// advert's filters

	var defaultValues = [];
	var defaultValuesIndex = 0;
	// fill array
	$('.nav-btn').each(function(){
		defaultValues[defaultValuesIndex] = $(this).children('span').text();
		defaultValuesIndex++;
	});

	// fill data-mask-text nav-menu
	$('.multifilters-input .nav-menu li').each(function(){
		if ( ($(this).parents('.nav-menu').siblings('.nav-btn').attr('data-mask-text') !== undefined) && ($(this).parents('.nav-menu').siblings('.nav-btn').attr('data-mask-text') !== false) ) {
			if ($(this).index() != 0) {
				$(this).find('span').before($(this).parents('.nav-menu').siblings('.nav-btn').attr('data-mask-text') + ' ');
			}
		}
	});

	// fill select
		$('.multifilters-select .nav-menu li:first-child').addClass('is-active');

	// fill checkbox
		$('.multifilters-checkbox .nav-menu li:first-child').iCheck('check');

	// click button - show nav
	$('.nav-btn').on('click', function(){
		defaultValuesIndex = $(this).parents('.multifilters-in').index();
		if ($(this).hasClass('is-active')) {
			$(this).removeClass('is-active').siblings('.nav-menu').hide();
		} else {
			$(this).addClass('is-active').siblings('.nav-menu').show();
			$(this).parents('.multifilters-in').siblings('li').children('.nav-btn').removeClass('is-active').siblings('.nav-menu').hide();
		};
	});

	// click input - show nav
	$('.multifilters-input .nav-btn').on('click', function(){
		var _this = $(this).siblings('.nav-input');
		_this.show().focus();
		_this.siblings('.nav-btn').hide();
		if (_this.hasClass('mask-input')) {
			if (_this.attr('data-mask-character') == 'number') {
				_this.keydown(function(e) {
					{
						if( !(event.keyCode == 8                                // backspace
						|| (event.keyCode >= 48 && event.keyCode <= 57)     // numbers on keyboard
						|| (event.keyCode >= 96 && event.keyCode <= 105))   // number on keypad
						) {
							event.preventDefault();     // Prevent character input
						}
					};
				});
				_this.keyup(function(e) {
					if (_this.val().length) {
						_this.parents('.multifilters-in').addClass('is-active');
						_this.siblings('.clear-filter-btn').show();
					} else {
						_this.parents('.multifilters-in').removeClass('is-active');
						_this.siblings('.clear-filter-btn').hide();
					};
				});
			};
		};
		defaultValuesIndex = _this.parents('.multifilters-in').index();
		_this.siblings('.nav-menu').show();
		_this.parents('.multifilters-in').siblings('li').children('.nav-btn').removeClass('is-active').siblings('.nav-menu').hide();

		_this.focusout(function(){
			if (_this.val().length) {
				if ( (_this.siblings('.nav-btn').attr('data-mask-text') !== undefined) && (_this.siblings('.nav-btn').attr('data-mask-text') !== false) ) {
					_this.siblings('.nav-btn').children('span').text(_this.siblings('.nav-btn').attr('data-mask-text') + ' ' + _this.val());
					_this.siblings('.clear-filter-btn').show();
				} else {
					_this.siblings('.nav-btn').children('span').text(_this.val());
				}
			} else {
				_this.siblings('.nav-btn').children('span').text(defaultValues[defaultValuesIndex]);
			};
			_this.siblings('.nav-btn').show();
			_this.hide();
		});
	});
	
	// category
	$('.multifilters-category .nav-menu li a').on('click', function(){
		defaultValuesIndex = $(this).parents('.multifilters-in').index();
		var _indexOption = $(this).parents('.nav-menu > li').index();
		var _chosenValue = $(this).find('span').text();
		if (_indexOption != 0) {
			$(this).parents('.nav-menu').hide().siblings('.nav-btn').children('span').text(_chosenValue);
			$(this).parents('.nav-menu').siblings('.nav-input').val(_chosenValue);
			$(this).parents('.multifilters-in').addClass('is-active');
		} else {
			$(this).parents('.nav-menu').hide().siblings('.nav-btn').children('span').text(defaultValues[defaultValuesIndex]);
			$(this).parents('.nav-menu').siblings('.nav-input').val('');
			$(this).parents('.multifilters-in').removeClass('is-active');
		}
		$(this).parents('.multifilters-in').find('li').removeClass('is-active');
		$(this).parentsUntil($('.nav-menu'), 'li').addClass('is-active');
		$('.nav-btn').removeClass('is-active');
	});

	// select
	$('.multifilters-select .nav-menu li a').on('click', function(){
		defaultValuesIndex = $(this).parents('.multifilters-in').index();
		var _indexOption = $(this).parents('.nav-menu > li').index();
		var _chosenValue = $(this).find('span').text();
		if (_indexOption != 0) {
			$(this).parents('.nav-menu').hide().siblings('.nav-btn').children('span').text(_chosenValue);
			$(this).parents('.nav-menu').siblings('.nav-input').val(_chosenValue);
			$(this).parents('.nav-menu').siblings('.clear-filter-btn').show();
			$(this).parents('.multifilters-in').addClass('is-active');
		} else {
			$(this).parents('.nav-menu').hide().siblings('.nav-btn').children('span').text(defaultValues[defaultValuesIndex]);
			$(this).parents('.nav-menu').siblings('.nav-input').val('');
			$(this).parents('.nav-menu').siblings('.clear-filter-btn').hide();
			$(this).parents('.multifilters-in').removeClass('is-active');
		}
		$(this).parents('.multifilters-in').find('li').removeClass('is-active');
		$(this).parentsUntil($('.nav-menu'), 'li').addClass('is-active');
		$('.nav-btn').removeClass('is-active');
	});

	// checkbox
	$('.multifilters-checkbox .nav-menu li label').on('click', function(){
		$(this).find('input').iCheck('uncheck');
		$(this).parent('li').siblings('li').find('input').iCheck('uncheck');
		defaultValuesIndex = $(this).parents('.multifilters-in').index();
		var _indexOption = $(this).parents('.nav-menu > li').index();
		if (_indexOption != 0) {
			$(this).parents('.nav-menu').hide();
			$(this).parents('.nav-menu').siblings('.clear-filter-btn').show();
			$(this).parents('.multifilters-in').addClass('is-active');
		} else {
			$(this).parents('.nav-menu').hide();
			$(this).parents('.nav-menu').siblings('.clear-filter-btn').hide();
			$(this).parents('.multifilters-in').removeClass('is-active');
		}
		$('.nav-btn').removeClass('is-active');
	});

	$('.multifilters-checkbox .nav-menu li input').on('ifChecked', function(){
		var _parent = $(this).parentsUntil($('.nav-menu'), 'li');
		if (_parent.index() == 0) {
			_parent.siblings('li').find('input').iCheck('uncheck');
			$(this).parents('.nav-menu').siblings('.clear-filter-btn').hide();
			$(this).parents('.multifilters-in').removeClass('is-active');
		} else {
			$(this).parents('.nav-menu').find('li').eq(0).iCheck('uncheck');
			$(this).parents('.nav-menu').siblings('.clear-filter-btn').show();
			$(this).parents('.multifilters-in').addClass('is-active');
		};
		console.log(_parent.index());
	});
	
	// input
	$('.multifilters-input .nav-menu li a').on('click', function(){
		defaultValuesIndex = $(this).parents('.multifilters-in').index();
		var _indexOption = $(this).parents('.nav-menu > li').index();
		var _chosenValue = $(this).find('span').text();
		if (_indexOption != 0) {
			if ( ($(this).parents('.nav-menu').siblings('.nav-btn').attr('data-mask-text') !== undefined) && ($(this).parents('.nav-menu').siblings('.nav-btn').attr('data-mask-text') !== false) ) {
				$(this).parents('.nav-menu').hide().siblings('.nav-btn').children('span').text($(this).parents('.nav-menu').hide().siblings('.nav-btn').attr('data-mask-text') + ' ' + _chosenValue);
			} else {
				$(this).parents('.nav-menu').hide().siblings('.nav-btn').children('span').text(_chosenValue);
			}
			$(this).parents('.nav-menu').siblings('.nav-input').val(_chosenValue);
			$(this).parents('.nav-menu').siblings('.clear-filter-btn').show();
			$(this).parents('.multifilters-in').addClass('is-active');;
		} else {
			$(this).parents('.nav-menu').hide().siblings('.nav-btn').children('span').text(defaultValues[defaultValuesIndex]);
			$(this).parents('.nav-menu').siblings('.nav-input').val('');
			$(this).parents('.nav-menu').siblings('.clear-filter-btn').hide();
			$(this).parents('.multifilters-in').removeClass('is-active');
		}
		$(this).parents('.multifilters-in').find('li').removeClass('is-active');
		$(this).parentsUntil($('.nav-menu'), 'li').addClass('is-active');
		$('.nav-btn').removeClass('is-active');
	});

	// hide location-wrap on outer click
	if ($('.nav-menu').length) {
		$(document).click(function(e) {
			if ( $(e.target).closest('.nav-menu, .nav-btn, .nav-input').length === 0) {
				$('.nav-menu').hide().siblings('.nav-btn').removeClass('is-active');
			}
		});
	};

	// clear select
	$('.multifilters-select .clear-filter-btn').on('click', function(){
		$(this).hide();
		defaultValuesIndex = $(this).parents('.multifilters-in').index();
		$(this).siblings('.nav-input').val('');
		$(this).siblings('.nav-btn').children('span').text(defaultValues[defaultValuesIndex]);
		$(this).siblings('.nav-menu').children('li').removeClass('is-active').eq(0).addClass('is-active');
		$(this).parent().removeClass('is-active');
	});

	// clear checkbox
	$('.multifilters-checkbox .clear-filter-btn').on('click', function(){
		$(this).hide();
		$(this).siblings('.nav-menu').find('input').iCheck('uncheck');
		$(this).siblings('.nav-menu').find('li:first-child').find('input').iCheck('check');
	});

	// clear input
	$('.multifilters-input .clear-filter-btn').on('click', function(){
		$(this).hide();
		defaultValuesIndex = $(this).parents('.multifilters-in').index();
		$(this).siblings('.nav-input').val('');
		$(this).siblings('.nav-btn').children('span').text(defaultValues[defaultValuesIndex]);
		$(this).siblings('.nav-menu').children('li').removeClass('is-active').eq(0).addClass('is-active');
		$(this).parent().removeClass('is-active');
	});

// Validation
	$.validate({
		validateOnBlur : true,
		scrollToTopOnError : false,
		validateOnEvent: true,
		modules: 'security'
	});

// settings accordion
	$('.settings__title').on('click', function(){
		if ($(this).parent().hasClass('is-active')) {
			$(this).parent().removeClass('is-active').find('.settings__in').slideUp();
		} else {
			$('.settings__title').parent().removeClass('is-active').find('.settings__in').slideUp();
			$(this).parent().addClass('is-active').find('.settings__in').slideDown();
		};
	});

// jQuery tabs
	$('.profile').tabs();

// Selectric
	$('select').selectric();

// custom checkbox
	$('input').iCheck({
		checkboxClass: 'icheckbox_square-orange',
		radioClass: 'iradio_square-orange',
		increaseArea: '20%' // optional
	});

// Clear placeholder
	(function() {
		$('input,textarea').focus(function(){
			if (!$(this).hasClass('nav-input')) {;
				$(this).data('placeholder',$(this).attr('placeholder'))
				$(this).attr('placeholder','');
			}
		});
		$('input,textarea').blur(function(){
			if (!$(this).hasClass('nav-input')) {;
				$(this).attr('placeholder',$(this).data('placeholder'));
			}
		});
	}());

// fix adblock
	$(window).load(function(){
		$('.banner-top').each(function(){
			if ($(this).css('display') == 'none') {
				$('.header').css('top', '0');
				if ($('.advert-el').length) {
					advertStart = $('.advert-el').offset().top - 60;
					advertStop = $('.advert-wrap').height() + advertStart - $('.advert-el').height() + $('.advert-el__map').outerHeight();
				};
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

// Show phone number
	$('.show-phone').on('click', function(){
		var authorPhone = $(this).find('.author-phone').attr('data-phone');
		$(this).find('.author-phone').text(authorPhone);
	});

// Main Slider
	$('.slider-main').slick({
		autoplay: true,
		autoplaySpeed: 10000,
		dots: true
	});

// Advertisement Slider

	// FIX fancybox clones
	var indexMax = 0,
		indexCurrent,
		indexMark;
	$('.advert-slider').on('init', function(event, slick){

		$('.advert-slider .slick-slide').each(function(){
			indexCurrent = parseInt($(this).attr('data-slick-index'));
			if (indexCurrent > indexMax) {
				indexMax = indexCurrent;
			};
		});
		indexMax -= 5;

		$('.advert-slider .slick-slide.slick-active').each(function(){
			$(this).find('.advert-fancybox').attr('data-fancybox-group', 'advert-gallery');
		});

		$('.advert-slider .slick-slide').each(function(){
			if (($(this).attr('data-slick-index') >= 0) && ($(this).attr('data-slick-index') <= indexMax)) {
				$(this).find('.advert-fancybox').attr('data-fancybox-group', 'advert-gallery');
			};
		});
	});
	$('.advert-slider').on('afterChange', function(event, slick, currentSlider){
		$('.advert-slider .slick-active').each(function(){
			$(this).find('.advert-fancybox').attr('data-fancybox-group', 'advert-gallery');
		});
		$('.advert-slider .slick-cloned.slick-active').each(function(){
			$(this).find('.advert-fancybox').attr('data-fancybox-group', 'advert-gallery');
			indexMark = parseInt($(this).attr('data-slick-index'));
			indexMark -= indexMax + 1;
			$('.advert-slider .slick-slide').each(function(){
				if (parseInt($(this).attr('data-slick-index')) == indexMark) {
					$(this).find('.advert-fancybox').attr('data-fancybox-group', '');
				};
			});
		});
	});

	// slider
	$('.advert-slider').slick({
		infinite: true,
		slidesToShow: 5,
		slideToScroll: 1
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

	var advertStart;
	var advertStop;
	$('.close-banner-fix').on('click', function(){
		$(this).parent().hide();
		$('.header').css('top', '0');
		if ($('.advert-el').length) {
			advertStart = $('.advert-el').offset().top - 60;
			advertStop = $('.advert-wrap').height() + advertStart - $('.advert-el').height() + $('.advert-el__map').outerHeight();
		};
	});

// Advert fancybox
	$('.advert-fancybox').fancybox({
		maxHeight: '70%',
		theme: 'light',
		padding: 5,
		openEffect	: 'drop',
		closeEffect	: 'drop',
		prevEffect: 'none',
		nextEffect: 'none',
		caption : {
			type : 'outside'
		},
		helpers: {
			thumbs: true
		},
		locked: true,
		locale: 'ru',
		locales: {
			'ru': {
				CLOSE: 'закрыть',
				NEXT: 'вперед',
				PREV: 'назад',
				EXPAND: 'показать в полном размере'
			}
		},
		beforeShow: function(){
			wh = $(window).height()/this.height;
			ww = $(window).width()/this.width;
			if (wh<ww) {
				this.height = this.height*wh;
				this.width = this.width*wh;
			} else {
				this.height = this.height*ww;
				this.width = this.width*ww;
			}
		}
	});

// author question fancybox
	$('.author-q-popup').fancybox({
		theme: 'light',
		padding: 5,
		openEffect	: 'drop',
		closeEffect	: 'drop',
		prevEffect: 'none',
		nextEffect: 'none',
		locked: true,
		locale: 'ru',
		locales: {
			'ru': {
				CLOSE: 'закрыть',
				NEXT: 'вперед',
				PREV: 'назад',
				EXPAND: 'показать в полном размере'
			}
		}
	});

// fixed advert aside
	$(window).load(function(){
		if ($('.advert-el').length) {
			advertStart = $('.advert-el').offset().top - 60;
			advertStop = $('.advert-wrap').height() + advertStart - $('.advert-el').height() + $('.advert-el__map').outerHeight();
			console.log(advertStop);
			$(window).scroll(function(){
				if ((jQuery(document).scrollTop() >= advertStart) && (jQuery(document).scrollTop() < advertStop)) {
					$('.advert-el').addClass('is-fixed');
				} else {
					$('.advert-el').removeClass('is-fixed');
				}
				if (jQuery(document).scrollTop() >= advertStart) {
					$('.advert-el__map').slideUp();
				} else {
					$('.advert-el__map').slideDown();
				};
				if (jQuery(document).scrollTop() >= advertStop) {
					$('.advert-el').css({
						'top': 'auto',
						'bottom': '50px',
						'right': '0'
					}).addClass('is-active');
				} else {
					$('.advert-el').css({
						'top': '0',
						'bottom': 'auto',
						'right': 'auto'
					}).removeClass('is-active');
					$('.advert-el.is-fixed').css('top', '60px');
				}
			});
		}
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