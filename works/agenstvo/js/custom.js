$(window).load(function(){
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
		$('body').addClass('ios');
	};
	$('body').removeClass('loaded'); 
});
/* viewport width */
function viewport(){
	var e = window, 
		a = 'inner';
	if ( !( 'innerWidth' in window ) )
	{
		a = 'client';
		e = document.documentElement || document.body;
	}
	return { width : e[ a+'Width' ] , height : e[ a+'Height' ] }
};
/* viewport width */
$(function(){
	/* placeholder*/	   
	$('input, textarea').each(function(){
 		var placeholder = $(this).attr('placeholder');
 		$(this).focus(function(){ $(this).attr('placeholder', '');});
 		$(this).focusout(function(){			 
 			$(this).attr('placeholder', placeholder);  			
 		});
 	});
	/* placeholder*/

	$('.button-nav').click(function(){
		$(this).toggleClass('active'), 
		$('.main-nav-list').slideToggle(); 
		return false;
	});
	
	// open menu
	$('.js-menu').click(function(){
		$('header').toggleClass('active');
		$(this).toggleClass('active');
		$('.content').toggleClass('active-menu');
		return false;
	});

	// hover menu
	// $('header').hover(function(){
	// 	$(this).toggleClass('on-hover');
	// });

	// close menu
	$('header').click(function(e){
		if( $(this).hasClass('active') && (!$('.header-wrapper').is(e.target) 
			&& !$('.menu').is(e.target) 
			&& !$('.menu-list').is(e.target) 
			&& !$('.menu-list__item').is(e.target)) ){
			$(this).removeClass('active');
			$('.js-menu').removeClass('active');
			$('.content').removeClass('active-menu');
		}
	});


	// main-slider
	if($('.js-slider').length){
		$('.js-slider').slick({
			infinite: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			dots: true,
			arrows: false
			// responsive: [{
			// 	breakpoint: 768,
			// 	settings: {
			// 		arrows: false
			// 	}
			// }]
		});
	}

	// formstyler
	if ($('.styled').length) {
        $('.styled').styler();
    };

    // active label and changing price
    $('.js-radio').click(function(){
    	$(this).parents('.list-radio').find('.js-radio').each(function(){
    		$(this).removeClass('active');
    	})
    	$(this).addClass('active');

    	var price = 120;

    	if( $(this).hasClass('list-radio__label_not-light') ){
    		price = price * 0.8;
    		$('.product-price-block-number').html(price);
    	};

    	if( $(this).hasClass('list-radio__label_light') ){
    		price = price * 1;
    		$('.product-price-block-number').html(price);
    	};

    	if( $(this).hasClass('list-radio__label_pvh') ){
    		price = price * 1.5;
    		$('.product-price-block-number').html(price);
    	};

    	if( $(this).hasClass('list-radio__label_akril') ){
    		price = price * 1;
    		$('.product-price-block-number').html(price);
    	};
    })

    // open/close colors-list
    $('.js-color').click(function(e){
    	e.preventDefault();
    	$('.colors-list').slideToggle();
    });
    $('.js-close').click(function(e){
    	e.preventDefault();
    	$('.colors-list').slideToggle();
    });

    // choose color
    $('.js-choose-color').click(function(){
    	var selColor = $(this).css('background-color');
    	var dataColor = $(this).attr('data-color');

    	$(this).parents('.list-radio').find('.js-choose-color').each(function(){
    		$(this).removeClass('selected');
    	});

    	$(this).addClass('selected');
    	$('.color-example').css('background-color', selColor);

    	$('.colors-list').slideToggle();

    	$('.product-block-img').each(function(){
    		$(this).removeClass('selected');
    	});
    	$('.product-block-img').each(function(){
    		if ( $(this).attr('data-color') == dataColor ){
    			$(this).addClass('selected');
    		}
    	});

    })

	// google map
		if($('#map').length){
			ymaps.ready(init);
 
			function init(){     
			 
			    var myMap;
			 
			    myMap = new ymaps.Map("map", {
			        center: [55.748271, 37.536729],
			        zoom: 16,
			        controls: []
			    });
			    var myPlacemark = new ymaps.Placemark([55.748271, 37.536729] , {},
			        { iconLayout: 'default#image',
			          iconImageHref: 'img/map-icon.png',
			          iconImageSize: [70, 70],
			          iconImageOffset: [-20, -47] });     
			 
			    myMap.geoObjects.add(myPlacemark);
			 
			}
		}
});

var handler = function(){
	
	var height_footer = $('footer').height();	
	var height_header = $('header').height();	
	$('.content').css('padding-bottom', height_footer+40);
	
	
	var viewport_wid = viewport().width;
	
	if (viewport_wid <= 991) {
		
	}
	
}
$(window).bind('load', handler);
$(window).bind('resize', handler);



