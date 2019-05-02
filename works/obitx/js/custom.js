$(window).load(function(){
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
		$('body').addClass('ios');
	} else{
		$('body').addClass('web');
	};

	$('#webTicker').webTicker({
		hoverpause: false,
		duplicate: true
	});
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

	if($('.ticker-list').length) {
		$('.ticker-list').coins({
		    limit: 10,
		    order_by: 'price_asc',
		    success: function(res, elem) {
		        var i = 0;
		        $(res).each(function(ind, coin){
		        	var sign;
		        	if( coin['change'] > 0 ){
		        		sign = 'plus';
		            } else {
		            	sign = 'minus';
		            }
		            if(i > 9)
		                return;
		            
		            var html = '<li class="ticker-list__item">';
		            html += '<div class="ticker-list__item-text">';
		            html += '<span>' + coin['name_full'] + '<sup>(' + coin['name_short'] + ')</sup></span> - <span>$' + coin['price'].toFixed(2) + '<sup class="'+ sign +'">(' + coin['change'] + '%/12h)</sup></span>';
		            html += '</div>';
		            html += '</li>';
		            $(elem).append(html);
		            i++;
		        });
		    }
		});
	};

	$('.js-more').on('click', function(){
		$(this).parent('.relation-list__item').addClass('full');
		return false;
	})

	$('.mobile-menu-btn').on('click', function(){
		$('.header-menu-wrapper').addClass('active');
		return false;
	});
	$('.menu-close').on('click', function(){
		$('.header-menu-wrapper').removeClass('active');
		return false;
	});

	$('.info-circle-item').on('click mouseover', function(){
		$(this).addClass('active').siblings().removeClass('active');
		$('.info-circle').removeClass('autoplay');

		if( $(this).hasClass('icomethod') ){
			$('.info-description-item.icomethod').addClass('active').siblings().removeClass('active');
		}
		if( $(this).hasClass('ico') ){
			$('.info-description-item.ico').addClass('active').siblings().removeClass('active');
		}
		if( $(this).hasClass('about') ){
			$('.info-description-item.about').addClass('active').siblings().removeClass('active');
		}
		if( $(this).hasClass('tech') ){
			$('.info-description-item.tech').addClass('active').siblings().removeClass('active');
		}

		return false;
	});

	var length = $('.info-circle-item').length;
 	$.each($('.info-circle-item'), function(i, el) {
 		setInterval(function(){
	 		setTimeout(function() {
		 		if( $('.info-circle').hasClass('autoplay') ){
		 			$(el).addClass("active").siblings().removeClass('active');
		 			if( $(el).hasClass('icomethod') ){
						$('.info-description-item.icomethod').addClass('active').siblings().removeClass('active');
					}
					if( $(el).hasClass('ico') ){
						$('.info-description-item.ico').addClass('active').siblings().removeClass('active');
					}
					if( $(el).hasClass('about') ){
						$('.info-description-item.about').addClass('active').siblings().removeClass('active');
					}
					if( $(el).hasClass('tech') ){
						$('.info-description-item.tech').addClass('active').siblings().removeClass('active');
					}
		 		} else{
		 			return false;
		 		}
			}, i * 2500);
 		}, length * 2500 );
	});

 	// video
 	$('.js-video').on('click', function(e){
 		e.preventDefault();
 		
 		var target = this.hash;
	    $(target).get(0).play();

	    $(target).parents('.popup-videos-item').addClass('active').siblings().removeClass('active');
 	});

 	$('.video-close').on('click', function(e){
 		e.preventDefault();
 		$(this).parents('.popup-videos-item').removeClass('active').find('video').get(0).pause();
 	});

 	// sort open/close
 	$('.sort-box-btn').on('click', function(){
 		$('.sort-box-dropdown').slideToggle();
 		return false;
 	})

 	// choose site
 	$('.sites-box-current').on('click', function(){
 		$('.sites-box-dropdown').slideToggle();
 		return false;
 	});

 	var menuPos = $('.header-menu').offset();
	// sticky menu
	$(document).ready( function() {	
		if ( viewport().width < 1280 ){
			var tickerHeight = 40;
		} else {
			var tickerHeight = 60;
		}
		if( !$('.ticker').length ) {
			var tickerHeight = 0;
		}
		if( ($(document).scrollTop() + tickerHeight) > menuPos.top ){
			$('.header-menu').addClass('isStuck');
			$('body').addClass('menu-stuck');
		}
	})

	$(document).scroll( function(){
		if ( viewport().width < 1280 ){
			var tickerHeight = 40;
		} else {
			var tickerHeight = 60;
		}
		if( !$('.ticker').length ) {
			var tickerHeight = 0;
		}
		if( ($(document).scrollTop() + tickerHeight) > menuPos.top ){
			$('.header-menu').addClass('isStuck');
			$('body').addClass('menu-stuck');
		} else{
			$('.header-menu').removeClass('isStuck');
			$('body').removeClass('menu-stuck');
		}
	});

	// inner videos play/pause
	$('.main-video-wrapper').on('click', function(){
		if ( $(this).hasClass('active') ){
			$(this).find('video').get(0).pause();
		} else {
			$(this).find('video').get(0).play();
			$(this).find('video').attr('autoplay', 'autoplay');
		}
		$(this).toggleClass('active');
	});
	$('.js-inner-video').on('click', function(){
		var src = $(this).attr('data-src');
		$(this).parents('.video-list-wrapper').find('.main-video-wrapper').addClass('active');
		$(this).parents('.video-list-wrapper').find('.current-video').attr('src', src).attr('autoplay', 'autoplay');
		var text = $(this).find('.main-video-list__item-name').html();
		$('.main-video-name').html(text);
	});

	// open share-box
	$('.share-box-icon').on('click', function(){
		$(this).parents('.shr-box').toggleClass('active');
		return false;
	})


	if($('.js-inner-videos').length) {
		if ( viewport().width < 992 ) {
			$('.js-inner-videos').slick({
				speed: 300,
				slidesToShow: 3,
				slidesToScroll: 1,
				autoplay: true,
				arrows: false,
				responsive: [
					{
					  breakpoint: 768,
					  settings: {
						slidesToShow: 2
					  }
					},
					{
					  breakpoint: 480,
					  settings: {
						slidesToShow: 1
					  }
					}			
				]
			});
		}
	};

	if($('.js-team-slider').length) {
		$('.js-team-slider').slick({
			speed: 300,
			slidesToShow: 2,
			slidesToScroll: 1,
			autoplay: true,
			appendArrows: '.team-slider-btns',
			responsive: [
				{
				  breakpoint: 992,
				  settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				  }
				},
				{
				  breakpoint: 640,
				  settings: {
					slidesToShow: 2,
					arrows: false
				  }
				  
				},
				{
				  breakpoint: 440,
				  settings: {
					slidesToShow: 1,
					arrows: false
				  }
				}			
			]
		});
	};
	if($('.js-provider-slider').length) {
		$('.js-provider-slider').slick({
			speed: 300,
			slidesToShow: 2,
			slidesToScroll: 1,
			autoplay: true,
			appendArrows: '.provider-slider-btns',
			responsive: [
				{
				  breakpoint: 992,
				  settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				  }
				},
				{
				  breakpoint: 640,
				  settings: {
					slidesToShow: 2,
					arrows: false
				  }
				  
				},
				{
				  breakpoint: 440,
				  settings: {
					slidesToShow: 1,
					arrows: false
				  }
				}				
			]
		});
	};
	if($('.js-experts-slider').length) {
		$('.js-experts-slider').slick({
			speed: 300,
			slidesToShow: 2,
			slidesToScroll: 1,
			autoplay: true,
			appendArrows: '.experts-slider-btns',
			responsive: [
				{
				  breakpoint: 992,
				  settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				  }
				},
				{
				  breakpoint: 640,
				  settings: {
					slidesToShow: 2,
					arrows: false
				  }
				  
				},
				{
				  breakpoint: 440,
				  settings: {
					slidesToShow: 1,
					arrows: false
				  }
				}				
			]
		});
	};
	setTimeout(function(){
		$('#webTicker1').webTicker({
			hoverpause: false,
			duplicate: true
		});
	}, 2000);

	if( $('.fancybox').length ){
		$('.fancybox').fancybox({
			margin: 20,
			padding: 30
		});
	}


	
	/* components */

	/*

	$('.consult').parallaxie({
		speed: 0.99
	});
	
	if($('.styled').length) {
		$('.styled').styler();
	};
	
	if($('.scroll').length) {
		$(".scroll").mCustomScrollbar({
			axis:"x",
			theme:"dark-thin",
			autoExpandScrollbar:true,
			advanced:{autoExpandHorizontalScroll:true}
		});
	};
	
	*/
	
	/* components */

});

var handler = function(){
	
	var height_footer = $('footer').height();	
	var height_header = $('header').height();		
	//$('.content').css({'padding-bottom':height_footer+40, 'padding-top':height_header+40});
	
	
	var viewport_wid = viewport().width;
	var viewport_height = viewport().height;
	
	if (viewport_wid <= 991) {
		
	}
	
}
$(window).bind('load', handler);
$(window).bind('resize', handler);



