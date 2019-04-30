$(window).load(function(){
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
		$('body').addClass('ios');
	} else{
		$('body').addClass('web');
	};
	if($('.js-company-ticker').length) {
		$('.js-company-ticker').webTicker({
			hoverpause: false,
			duplicate: true
		});
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
 	// pdf coming soon open/close
 	$('.logo-pdf-link').on('click', function(){
 		$('.logo-dd').slideToggle();
 		setTimeout(function() {
		 	$('.logo-dd').slideUp();
		}, 3500);
 		return false;
 	});

 	// download pdf shows after 90seconds
 	// if( viewport().width < 768 ){
 	// 	setTimeout(function() {
		// 	$('.logo-box').slideDown();
		// }, 90000);
 	// }
 	
 	$('.header-pdf-btn').on('click', function(){
 		$('.header-pdf-block-dd').slideToggle();
 		setTimeout(function() {
		 	$('.header-pdf-block-dd').slideUp();
		}, 3500);
 		return false;
 	})


 	// smoothscroll
 	$('.smoothscroll').on('click',function (e) {
	    e.preventDefault();

	    var target = this.hash,
	    $target = $(target);

	    $('html, body').stop().animate({
	        'scrollTop': $target.offset().top -$('.header-bottom').outerHeight()
	    }, 800, 'swing', function () {
	        window.location.hash = target;
	    });
	});


 	// show mobile on platform block
 	$('.platform-item').on('mouseover click', function(){
 		$(this).addClass('active').siblings().removeClass('active');
 		$('.platform-list').removeClass('autoplay');
 		return false;
 	});

 	// show text in services block
 	$('.services-item').on('mouseover click', function(){
 		$(this).addClass('active').siblings().removeClass('active');
 		$('.services-list').removeClass('autoplay');
 	});
 	$('.services-right').on('mouseover', function(){
 		$(this).addClass('active');
 	});
 	$('.services-right').on('mouseout', function(){
 		$(this).removeClass('active').find('.services-item').removeClass('active');
 	});

 	// dropdown open/close
 	$('body').on('click', '.js-dd-open', function(){
 		$(this).parent().toggleClass('active').find('.dropdown-block').slideToggle();
 		return false;
 	});
 	$(document).on('click', function(e){
		var container = $('.js-dd-open');
		if ( container.has(e.target).length === 0 ){
			$('.dropdown-block').slideUp();
			$('.shr-box-icon').parent().removeClass('active');
		}
	});


 	// autoplay mobiles
	var length = $('.platform-item').length;
 	$.each($('.platform-item'), function(i, el) {
 		setInterval(function(){
	 		setTimeout(function() {
		 		if( $('.platform-list').hasClass('autoplay') ){
		 			$(el).addClass("active").siblings().removeClass('active');
		 		} else{
		 			return false;
		 		}
			}, i * 1500);
 		}, length * 1500 );
	});

 	// autoplay text
	var lengthTexts = $('.services-item').length;
 	$.each($('.services-item'), function(i, el) {
 		setInterval(function(){
	 		setTimeout(function() {
		 		if( $('.services-list').hasClass('autoplay') ){
		 			$('.services-right').addClass('active');
		 			$(el).addClass("active").siblings().removeClass('active');
		 		} else{
		 			$('.services-right').removeClass('active');
		 			return false;
		 		}
			}, i * 7000);
 		}, lengthTexts * 7000 );
	});

	// sticky menu
	var menuPos = $('.header-bottom').offset();
	$(document).ready( function() {
		if( ($(document).scrollTop()) > menuPos.top ){
			$('.header-bottom').addClass('isStuck');
			$('body').addClass('menu-stuck');
			$('.about-section').addClass('active');
		}
	});

	$(document).on('scroll', function(){
		if( ($(document).scrollTop()) > menuPos.top ){
			$('.header-bottom').addClass('isStuck');
			$('body').addClass('menu-stuck');
		} else{
			$('.header-bottom').removeClass('isStuck');
			$('body').removeClass('menu-stuck');
			$('.about-section').removeClass('active');
		}
		if( ($(document).scrollTop()) > menuPos.top ){
			if( viewport().width > 800 ){
				if( !$('.about-section').hasClass('active') ){
					$('.about-section').slideUp();
					$('.header-menu-link_about').removeClass('active');
				}
			}
		}
		

			
		// touchpoints animation
		var images = $('.js-img');
		var number = $('.js-img').length;
		var index = $('.js-img.active').index();

		if( index == (number - 1) ){
			index = 0;
		} else{
			index++;
		}
		$(images[index]).addClass('active').siblings().removeClass('active');
	});

	// about section open/close
 	$('.header-menu-link_about').on('click', function(e){
 		e.preventDefault();

 		$(this).toggleClass('active');
 		$('.about-section').slideToggle().addClass('active');

 		var target = this.hash,
	    $target = $(target);

	    $('html, body').stop().animate({
	        'scrollTop': $target.offset().top - $('.header-bottom').outerHeight() - 10
	    }, 500, 'swing', function () {
	        window.location.hash = target;
	    });

 	});

	
	

	// stop/play video
	$('.js-play').on('click', function(){
		if( $(this).parent().hasClass('active') ){
			$(this).get(0).pause();
			$(this).parent().removeClass('active');
		} else{
			$(this).parent().addClass('active');
			$(this).get(0).play();
		}
	});

	// video without preload
	if( $('.show-desktop').length ){
		if ( viewport().width < 992 ) {
		$('.show-desktop').removeAttr('autoplay').get(0).pause();
		$('.show-tablet').attr('autoplay', 'autoplay').get(0).play();
		}
		if ( viewport().width < 480 ) {
			$('.show-desktop').removeAttr('autoplay');
			$('.show-tablet').removeAttr('autoplay');
			$('.show-mobile').attr('autoplay', 'autoplay').get(0).play();
		}
	}
	


	// faq open/close
	$('.js-faq-item').on('click', function(){
		$(this).parent().addClass('active');
		$(this).parent().find('.faq-list__item-drop').slideDown();
		$(this).parent().siblings().removeClass('active');
		$(this).parent().siblings().find('.faq-list__item-drop').slideUp();
		return false;
	})

	
	/* components */
	if($('.js-header-slider').length) {
		$('.js-header-slider').slick({
			arrows: false,
			speed: 300,
			slidesToShow: 4,
			slidesToScroll: 1,
			autoplay: true,
			centerMode: true,
			responsive: [
				{
				  breakpoint: 991,
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

	if($('.js-slider').length) {
		$('.js-slider').slick({
			dots: true,
			arrows: false,
			speed: 300,
			slidesToShow: 1,
			slidesToScroll: 1,
			autoplay: true,
			adaptiveHeight: true
		});
	};
	if($('.js-portal-slider').length) {
		$('.js-portal-slider').slick({
			dots: true,
			speed: 300,
			arrows: false,
			slidesToShow: 1,
			slidesToScroll: 1,
			autoplay: true
		});
	};

	if($('.js-team-slider').length) {
		$('.js-team-slider').slick({
			infinite: true,
			speed: 300,
			slidesToShow: 5,
			slidesToScroll: 1,
			autoplay: true,
			responsive: [
				{
				  breakpoint: 1030,
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
	if($('.js-team-slider-rtl').length) {
		$('.js-team-slider-rtl').slick({
			infinite: true,
			speed: 300,
			slidesToShow: 5,
			slidesToScroll: 1,
			autoplay: true,
			rtl: true,
			responsive: [
				{
				  breakpoint: 1030,
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
	if($('.js-news-slider').length) {
		$('.js-news-slider').slick({
			infinite: true,
			speed: 300,
			dots: true,
			autoplay: false,
			slidesToShow: 3,
			slidesToScroll: 3,
			autoplay: true,
			responsive: [
				{
				  breakpoint: 768,
				  settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
				  }
				},
				{
				  breakpoint: 440,
				  settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				  }
				}				
			]
		});
	};

	if ( viewport().width > 1100 ) {
		$('.platform-bg').parallaxie({
			speed: 0.99
		});
	} else {
		$('.platform-bg').parallaxie({
			speed: 1.5
		});
	}
	if ( viewport().width > 1100 ) {
		$('.solutions-bg').parallaxie({
			speed: 0.3
		});
	} else {
		$('.solutions-bg').parallaxie({
			speed: 1.5
		});
	}
	if ( viewport().width > 1100 ) {
		$('.wallet').parallaxie({
			speed: 0.99
		});
	} else {
		$('.wallet').parallaxie({
			speed: 1.5
		});
	}
	if ( viewport().width > 767 ) {
		$('.article-bg_rewards').parallaxie({
			speed: 0.5
		});
	} else {
		$('.article-bg_rewards').parallaxie({
			speed: 0.85
		});
	}
	

	if($('.wow').length) {
		new WOW().init();
	}

	if($('.fancybox').length) {
		$('.fancybox').fancybox({
			margin : 30,
			padding : 15,
			wrapCSS: 'fancy-bio'
		});
	};
	if($('.fancybox-form').length) {
		$('.fancybox-form').fancybox({
			margin : 30,
			padding : 0
		});
	};
	
	if($('.scrollblock').length) {
		var drtn = 1500;
		if( viewport().height < 1000 ){
			drtn = 1100;
		}
		if( viewport().height < 1000 && viewport().width > 1250){
			drtn = 1100;
		}
		if( viewport().height > 1100 && viewport().width < 1200){
			drtn = 1800;
		}
		if( viewport().width > 1550){
			drtn = 1200;
		}
		var scrollorama = $.scrollorama({
	        blocks:'.scrollblock'
	    });
	    scrollorama.animate('#image1',{ delay: 200, duration: drtn, property:'left', start:1400, end:0 });
	    scrollorama.animate('#image2',{ delay: 300, duration: drtn, property:'left', start:1400, end:117 });
	    scrollorama.animate('#image3',{ delay: 400, duration: drtn, property:'left', start:1400, end:210 });
	    scrollorama.animate('#image4',{ delay: 500, duration: drtn, property:'left', start:1400, end:275 });
	    scrollorama.animate('#image5',{ delay: 600, duration: drtn, property:'left', start:1400, end:340 });
	    scrollorama.animate('#image6',{ delay: 700, duration: drtn, property:'left', start:1400, end:405 });
	};
	/*

	
	
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

	// send sponsor number
	$('.spnsr-list__item').on('click', function(){
		var number = $(this).find('.spnsr-list__item-top span').html();
		$('#win_form_1').find('.window-open-txt span').html(number);
	})
	
	/* components */
	
});

var handler = function(){
	
	var height_footer = $('footer').height();	
	var height_header = $('header').height();		
	//$('.content').css({'padding-bottom':height_footer+40, 'padding-top':height_header+40});
	
	
	var viewport_wid = viewport().width;
	var viewport_height = viewport().height;

	// active service item on mobile
	if ( viewport_wid <= 767) {
		$('.services-item.first').addClass('active');
	} else{
		$('.services-item.first').removeClass('active');
	}
	
	
	
}
$(window).bind('load', handler);
$(window).bind('resize', handler);



$('.js-btn_form').on('click', function(e){
    var form = $(this).parents('.sponsor-form'),
    	number = $(this).parents('.window-open-wrapper').find('.window-open-txt span').html(),
        name = $(form).find('.form-control_name').val(),
        email = $(form).find('.form-control_email').val(),
        phone = $(form).find('.form-control_phone').val(),
        website = $(form).find('.form-control_website').val(),
        g_recaptcha_response = $(form).find('#g-recaptcha-response').val(),
        validate = true;
    if (!validateEmail(email)) {
        $(form).find('.form-control_email').parent('.box-field').addClass('no-validate');
        // console.log($('#email').parent('.form-group'));
        $(form).find('.form-control_email').attr('placeholder', 'enter email');
        validate = false;
    } else {
      $(form).find('.form-control_email').parent('.box-field').removeClass('no-validate');
      validate = true;
    };
    if (name === '') {
        $(form).find('.form-control_name').parent('.box-field').addClass('no-validate');
        $(form).find('.form-control_name').attr('placeholder', 'enter name');
        validate = false;
    } else {
      $(form).find('.form-control_name').parent('.box-field').removeClass('no-validate');
      validate = true;
    };
    if(phone === '') {
        $(form).find('.form-control_phone').parent('.box-field').addClass('no-validate');
        $(form).find('.form-control_phone').attr('placeholder', 'enter phone');
        validate = false;
    } else {
      $(form).find('.form-control_phone').parent('.box-field').removeClass('no-validate');
      validate = true;
    };
     if(website === '') {
        $(form).find('.form-control_website').parent('.box-field').addClass('no-validate');
        $(form).find('.form-control_website').attr('placeholder', 'enter phone');
        validate = false;
    } else {
      $(form).find('.form-control_website').parent('.box-field').removeClass('no-validate');
      validate = true;
    };
    var data = {
        name: name,
        email: email,
        phone: phone,
        website: website,
        number: number,
        g_recaptcha_response: g_recaptcha_response
    }
    if (validate) {
        $.ajax({
            url: "php/send_email.php",
            method: "POST",
            dataType: 'JSON',
            data: data,
            success: function(html){
                console.log(html);
            },
            complete: function (res) {
                // var textHtml = '<span class="succes-text">Information submitted. Thank You.</span>'
                // $('#contact-popup-form').hide();
                // $('#contact-popup-form').parent('.box-form').append(textHtml);
                // setTimeout(function(){
                //   $('.fancybox-close').trigger('click');
                // }, 2000)
                $('.fancybox-close').trigger('click');
            },
            error: function(html){
              console.log('error');
            }
        });
    }
    e.preventDefault();
});

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}