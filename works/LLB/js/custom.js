$(window).load(function(){
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
		$('body').addClass('ios');
	} else{
		$('body').addClass('web');
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
	
	/* components */
	
	
	
	// if($('.styled').length) {
	// 	$('.styled').styler();
	// };

	

	if($('.js-reviews-slider').length) {
		$('.js-reviews-slider').owlCarousel({
			loop: true,
			dots: true,
			dotsEach: true,
			autoplay: true,
			autoplayHoverPause: true,
			responsive:{
		        0:{
		            items:1
		        },
		        768:{
		            items:2
		        },
		        1307:{
		            items:3
		        }
		    }
		});
	};


	if($('.js-articles-slider').length) {
		$('.js-articles-slider').owlCarousel({
			loop: true,
			dots: true,
			dotsEach: true,
			responsive:{
		        0:{
		            items:1
		        },
		        768:{
		            items:2
		        },
		        1307:{
		            items:3
		        }
		    }
		});
	};
	
	if($('.fancybox').length) {
		$('.fancybox').fancybox();
	};
	if($('.js-scroll').length) {
		$(".js-scroll").mCustomScrollbar({
			axis:"y",
			autoExpandScrollbar:true,
			advanced:{autoExpandHorizontalScroll:true}
		});
	};
	

	// ellipsis in text 
	var size = 74;
	$('.product-text span').each(function(){
		var text = $(this).text();
		if( text.length > size ){
			$(this).text(text.slice(0, size) + '...');
		}
	});
	
	/* components */


	// grayscale

	
	var urlLbb = $('.product-page_lbb').attr('style');
	var urlLbbKids = $('.product-page_lbb-kids').attr('style');
	var urlLbbLacto = $('.product-page_lactoberry').attr('style');
	var urlLbbPbi = $('.product-page_pbi').attr('style');

	$('.product-page').mouseover(function(){
		var urlBg = $(this).find('.product-page-link').attr('style');
		$(this).attr('style', urlBg);
	});

	$('.product-page_lbb').mouseleave(function(){
		if( !$(this).hasClass('active') ){
			$(this).attr('style', urlLbb);
		}
	})
	$('.product-page_lbb-kids').mouseleave(function(){
		if( !$(this).hasClass('active') ){
			$(this).attr('style', urlLbbKids);
		}
	})
	$('.product-page_lactoberry').mouseleave(function(){
		if( !$(this).hasClass('active') ){
			$(this).attr('style', urlLbbLacto);
		}
	})
	$('.product-page_pbi').mouseleave(function(){
		if( !$(this).hasClass('active') ){
			$(this).attr('style', urlLbbPbi);
		}
	})


	$('.product-page').each(function(){
		if( $(this).hasClass('active') ){
			var aUrl = $(this).find('.product-page-link').attr('style');
			$(this).attr('style', aUrl);
		}
	})

	// not basket place

	$(document).click( function(event){
		if( $(event.target).closest(".basket-box").length ) 
		return;
		$('.basket-box').removeClass('active');
		$('.basket-dropped-window').slideUp(0);
		event.stopPropagation();
	});
	
	$('.js-open-basket').on('click', function(){
		$(this).parents('.basket-box').toggleClass('active');
		$('.basket-dropped-window').slideToggle();
	});

	$('.js-close').on('click', function(){
		$(this).parents('.basket-dropped-window').slideUp();
		$(this).parents('.basket-box').removeClass('active');
	});

	
	$('.js-more').on('click', function(e){
		e.preventDefault();
		var val = $(this).parents('.product-number').find('.product-number-field__input').val();
		val ++ ;
		$(this).parents('.product-number').find('.product-number-field__input').val(val);
	});
	$('.js-less').on('click', function(e){
		e.preventDefault();
		var val = $(this).parents('.product-number').find('.product-number-field__input').val();
		val -- ;
		$(this).parents('.product-number').find('.product-number-field__input').val(val);
	});
	$('.js-minus').on('click', function(e){
		e.preventDefault();
		var val = $(this).parents('.basket-products__item-number').find('.basket-products__item-input').val();
		val -- ;
		$(this).parents('.basket-products__item-number').find('.basket-products__item-input').val(val);
	});
	$('.js-plus').on('click', function(e){
		e.preventDefault();
		var val = $(this).parents('.basket-products__item-number').find('.basket-products__item-input').val();
		val ++ ;
		$(this).parents('.basket-products__item-number').find('.basket-products__item-input').val(val);
	});

});

var handler = function(){
	
	var height_footer = $('footer').height();	
	var height_header = $('header').height();		
	//$('.content').css({'padding-bottom':height_footer+40, 'padding-top':height_header+40});
	
	
	var viewport_wid = viewport().width;
	var viewport_height = viewport().height;
	
	if (viewport_wid <= 767) {
		$('.products-consist-table-slider-list').addClass('js-slider-table');
		if($('.js-slider-table').length) {
			$('.js-slider-table').owlCarousel({
				nav: true,
				dots: false,
				loop: true,
				items: 1
			});
		};
	} else{
		$('.products-consist-table-slider-list').removeClass('js-slider-table');
		var owl = $('.products-consist-table-slider-list');
		owl.trigger('destroy.owl.carousel');
	}
	
}
$(window).bind('load', handler);
$(window).bind('resize', handler);



