$(window).load(function(){
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
		$('body').addClass('ios');
	} else{
		$('body').addClass('web');
	};
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


	// height of bottle images
	

	if ( viewport().width >= 1101 ) {

		var imageHeight = $('.slides-container-images-last').outerHeight();
		var imagesNumber = $('.slider-bottle-images img').length;
		var imagesHeight = imagesNumber * imageHeight;
		// $('.slides-scroll').css({'height':imagesHeight});

		var arrImages = [];
		var scrollStep = imagesNumber / imageHeight; //312

		$('.slider-bottle-images img').each(function(i){

			$(this).css({'margin-top':-imageHeight/2});
			// arrImages.push(this);

		});

	}


	// menu open/close 
	$('.menu-btn').on('click', function(){
		$(this).toggleClass('active');
		$('.header-menu-wrapper').slideToggle();
		$('header').toggleClass('active');
		return false;
	});

	// sticky menu
	var headerHeight;
	if ( viewport().width > 991 ) {
		headerHeight = 41;
	} else{
		headerHeight = 46;
	}
	var serchHeight,
		sbscrbHeight,
		offsetSbscrb,
		offsetContacts;

	var currentScroll = $(document).scrollTop() + 3;

	setTimeout(function(){
		$(document).scrollTop(currentScroll);
	},100);

	$(document).on('scroll', function(){

		if ( $(document).scrollTop() > 2 ){
			$('.header').addClass('sticky');
		} else{
			$('.header').removeClass('sticky');
		}

		setTimeout(function(){
			var height_header = $('.header').height();
			$('.content').css({'padding-top':height_header});
		},200);

		serchHeight = $('.search-block').outerHeight();
		sbscrbHeight = $('.sbscrb').outerHeight();

		offsetSbscrb = serchHeight + headerHeight;
		offsetContacts = offsetSbscrb + sbscrbHeight;

		if ( $('.search-block').length ) {
			$('.search-block').sticky({ 
				topSpacing: headerHeight, 
				className:"is_stuck" 
			});
		}
		if ( $('.sbscrb').length ) {
			$('.sbscrb').sticky({ 
				topSpacing: offsetSbscrb, 
				className:"is_stuck" 
			});
		}
		if ( $('.contacts').length ) {
			$('.contacts').sticky({ 
				topSpacing: offsetContacts, 
				className:"is_stuck" 
			});
		}

	});

	// open/close dropdown windows
	$('body').on('click', '.js-dd-open', function(){
		$('.dropdown-block').slideUp();
		$('.js-dd').not($(this)).parent().removeClass('active');
		if( $(this).parent().hasClass('active') ){
			$(this).parent().find('.dropdown-block').slideUp();
			$(this).parent().removeClass('active');
		} else{
			$(this).parent().find('.dropdown-block').slideDown();
			$(this).parent().addClass('active');
		}
		
		return false;
	});

 	$(document).on('click', function(e){
		var container = $('.js-dd-open');
		if ( container.has(e.target).length === 0 ){
			$('.dropdown-block').slideUp();
			$('.dropdown-block').parent().removeClass('active');
		}
	});

	// open/close map`s tooltips
	$('.map-point').on('touchstart', function(){
		$(this).toggleClass('active').siblings().removeClass('active');
	})

	// play/stop video
	$('.capability-video-btn').on('click', function(){
		$(this).parents('.capability-video-center').addClass('active');
		$(this).parents('.capability-video-center').find('.video-capability').get(0).play();
		
		return false;
	});
	$('.capability-video-close').on('click', function(){
		$(this).parents('.capability-video-center').removeClass('active');
		$(this).parents('.capability-video-center').find('.video-capability').get(0).pause();

		return false;
	})


	
	
	/* components */
	
	if ( viewport().width >= 1101 ) {
		if ( $('.slides-container').length ) {
			var s = skrollr.init({
				forceHeight: false
			});
		}
	}

	// sticky menu plugin
	// if ( $('.main-page .search-block').length ) {
	// 	$('.main-page .search-block').stick_in_parent({
	// 		offset_top: headerHeight
	// 	});
	// }
	// if ( $('.sbscrb').length ) {
	// 	$('.sbscrb').stick_in_parent({
	// 		offset_top: offsetSbscrb
	// 	});
	// }
	// if ( $('.contacts').length ) {
	// 	$('.contacts').stick_in_parent({
	// 		offset_top: offsetContacts
	// 	});
	// }





	if ( $('.packaging').length ) {
		if ( viewport().width >= 1101 ) {
			$('.packaging').parallaxie({
				speed: 0.8
			});
		} else {
			$('.packaging').parallaxie({
				speed: 1.2
			});
		}
	}
	if ( $('.slider-bottle-images').length ) {
		if ( viewport().width <= 1100 && viewport().width >= 992 ) {
			$('.slider-bottle-images').parallaxie({
				speed: 0.7
			});
		} else {
			if( viewport().width <= 991 ){
				$('.slider-bottle-images').parallaxie({
					speed: 1.3
				});
			}
		}

	}
	
	if ( viewport().width <= 1101 ) {
		if($('.js-slides-slider').length) {
			$('.js-slides-slider').slick({
				arrows: false,
				speed: 800,
				slidesToShow: 1,
				slidesToScroll: 1,
				fade: true,
	  			cssEase: 'linear',
	  			autoplay: true,
	  			autoplaySpeed: 2500
				// ,
				// responsive: [
				// 	{
				// 	  breakpoint: 1024,
				// 	  settings: {
				// 		slidesToShow: 3,
				// 		slidesToScroll: 3,
				// 		infinite: true,
				// 		dots: true
				// 	  }
				// 	},
				// 	{
				// 	  breakpoint: 600,
				// 	  settings: "unslick"
				// 	}				
				// ]
			});
		};
	}
	if($('.js-products-slider').length) {
		$('.js-products-slider').slick({
			arrows: false,
			speed: 400,
			slidesToShow: 5,
			slidesToScroll: 1,
  			autoplay: true,
  			autoplaySpeed: 2500,
			responsive: [
				{
				  breakpoint: 992,
				  settings: {
					slidesToShow: 4
				  }
				},
				{
				  breakpoint: 640,
				  settings: {
					slidesToShow: 3
				  }
				},
				{
				  breakpoint: 480,
				  settings: {
					slidesToShow: 2
				  }
				}			
			]
		});
	};
	if($('.js-capability-slider').length) {
		$('.js-capability-slider').slick({
			arrows: false,
			speed: 400,
			slidesToShow: 4,
			slidesToScroll: 1,
  			autoplay: true,
  			autoplaySpeed: 2500,
			responsive: [
				{
				  breakpoint: 992,
				  settings: {
					slidesToShow: 3
				  }
				},
				{
				  breakpoint: 640,
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
	};

	if($('.fancybox').length) {
		$('.fancybox').fancybox({
			margin  : 30,
			padding  : 0
		});
	};


	/*

	$('.consult').parallaxie({
		speed: 0.99
	});

	if($('.wow').length) {
		new WOW().init();
	}
	
	if($('.styled').length) {
		$('.styled').styler();
	};
	
	if($('.slick-slider').length) {
		$('.slick-slider').slick({
			dots: true,
			infinite: false,
			speed: 300,
			slidesToShow: 4,
			slidesToScroll: 4,
			responsive: [
				{
				  breakpoint: 1024,
				  settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
					infinite: true,
					dots: true
				  }
				},
				{
				  breakpoint: 600,
				  settings: "unslick"
				}				
			]
		});
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
	setTimeout(function(){
			var height_header = $('.header').height();
			$('.content').css({'padding-top':height_header});
	},200);
	


	
	// sticky menu when page loaded
	if ( $(document).scrollTop() > 2 ){
		$('.header').addClass('sticky');
	} else{
		$('.header').removeClass('sticky');
	}
	
	
	var viewport_wid = viewport().width;
	var viewport_height = viewport().height;
	
	if (viewport_wid <= 991) {
		
	}
	
}
$(window).bind('load', handler);
$(window).bind('resize', handler);



