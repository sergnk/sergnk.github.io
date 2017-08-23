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

	$('.js-menu').click(function(){
		$(this).toggleClass('active'), 
		$('.navigation-wrap').slideToggle(); 
		return false;
	});

	// show replies
	$('.js-show-reply').click(function(){
		$(this).toggleClass('active');
		$(this).parents('.comments-box').find('.comment_reply').each(function(){
			$(this).slideToggle();
		});

		return false;
	});

	// show comment/reply form
	$('.js-show-form').click(function(e){
		e.preventDefault();
		
		if( $(this).hasClass('comment_button') ){
			$('#comment-form-reply').css('display', 'none');
			$('#comment-form').slideDown();
		} else{
			$('#comment-form').css('display', 'none');
			$('#comment-form-reply').slideDown();
		}

		var target = this.hash,
	    $target = $(target);

	    $('html, body').stop().animate({
	        'scrollTop': $target.offset().top-90
	    }, 800, 'swing', function () {

	    	window.location.hash = target;
		});	
	    setTimeout(function(){
			$('.content-box-wrapper_forms').addClass('active');
		}, 500);

	})

	// check name and email in comment/reply forms
	$('.js-control').click(function(e){
		e.preventDefault();

		var mailInput = $(this).parents('form').find('.form-control_comment-mail');
		var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;

		// check name
		var value = $(this).parents('form').find('.form-control_comment-name');
		if( $(value).attr('value').length < 1 ){
			$(value).attr('value', 'Guest');
		}

		// check mail
		if( mailInput.val() == '' ){
			e.preventDefault();
			mailInput.parents('.box-field__input').addClass('invalid-email');
			mailInput.attr('placeholder', 'Invalid email');
		} else {
			if( pattern.test($(mailInput).val()) ){
				mailInput.parents('.box-field__input').removeClass('invalid-email');
			} else{
				e.preventDefault();
				mailInput.parents('.box-field__input').addClass('invalid-email');
				mailInput.val('');
				mailInput.attr('placeholder', 'Invalid email');
			}
		}


	})

	// disable subscribe form and validation email
	$('.js-subscribe').click(function(e){

		var mailInput = $(this).parents('.subscribe-form').find('.form-control_mail');
		var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;

		if( mailInput.val() == '' ){
			e.preventDefault();
			mailInput.parents('.box-field__input').addClass('invalid-email');
			mailInput.attr('placeholder', 'Invalid email');
		} else {
			if( pattern.test($(mailInput).val()) ){
				mailInput.parents('.box-field__input').removeClass('invalid-email');
				
					$(this).attr('disabled', 'disabled');
					$(this).val('Subscribed');
					$(this).parents('.subscribe-form').addClass('disabled');
					$(this).parents('.subscribe-form').find('.invalid-email').removeClass('invalid-email');
					$(this).parents('.subscribe-form').find('.form-control_name').val('Kracken Haettensweller');
					$(this).parents('.subscribe-form').find('.form-control_mail').val('kracken@yandex.ru');
				
			} else{
				e.preventDefault();
				mailInput.parents('.box-field__input').addClass('invalid-email');
				mailInput.val('');
				mailInput.attr('placeholder', 'Invalid email');
			}
		}


		// $('.right-col .js-subscribe').each(function(){
		// 	$(this).attr('disabled', 'disabled');
		// 	$(this).val('Subscribed');
		// 	$(this).parents('.subscribe-form').addClass('disabled');
		// 	$(this).parents('.subscribe-form').find('.invalid-email').removeClass('invalid-email');
		// 	$(this).parents('.subscribe-form').find('.form-control_name').val('Kracken Haettensweller');
		// 	$(this).parents('.subscribe-form').find('.form-control_mail').val('kracken@yandex.ru');
		// });
	});



	// fixed header
	$(window).scroll(function() {
    	if ($(window).scrollTop() > 1) {
            $('header').addClass("fixed");
		} else{
            $('header').removeClass("fixed") 	
		}
    });

	// search border
	$('.search-box__input').focus(function(){
		$(this).parents('.search-box').addClass('active');
	})
	$('.search-box__input').focusout(function(){
		$(this).parents('.search-box').removeClass('active');
	})

	// category open
	$('.js-category').click(function(){
		$('.blog-categories-list').slideToggle();
	})	

	// choose category
	$('.blog-categories-list__link').click(function(e){
		e.preventDefault();
		$(this).parents('.blog-categories-list').find('.blog-categories-list__link').each(function(){
			$(this).removeClass('active');
		});
		$(this).addClass('active');

		if (viewport().width <= 991) {
			$(this).parents('.blog-categories-list').slideUp();
		}
		var val = $(this).html();
		
		$('.js-category').html(val);
	})
	// more posts
	var posts = $('.articles-list .articles-list__item');
	var lastElementIndex = ((posts.length) - 1);
	var lastElement = $(posts).eq(lastElementIndex);

	$(posts).each(function(){
		var post = this;
		if (lastElementIndex > 5){
			if ($(this).index() > 5){
				$(this).css('display', 'none');
				$('.show-more-btn').css('display', 'block');
			}
		}
	});
	$('.js-more').click(function(e){
		e.preventDefault();
		for(var i = 0; i < lastElementIndex+1; i++){
			if( $(posts[i]).is(':hidden') && !$(posts[i]).hasClass('js-non-visible')){
				var hiddenElemIndex = $(posts[i]).index();
				for(var j = hiddenElemIndex; j < hiddenElemIndex+6; j++){
					$(posts[j]).css('display', 'block');
				}
				break;
			}
		}
		if($(lastElement).is(':visible')){
			$('.show-more-btn').css('display', 'none');
		} else{
			$('.show-more-btn').css('display', 'block');
		};
	})

	// active link 
	$('.button_more').click(function(e){
		var href = $(this).attr('href');
		e.preventDefault();
		$(this).addClass('focus');
		setTimeout(function(){
			location.href = href;
		}, 500);
	})
	
});

var handler = function(){
	
	var height_footer = $('footer').height();	
	var height_header = $('header').height();		
	$('.content').css({'padding-top':height_header, 'padding-bottom':height_footer});
	
	
	var viewport_wid = viewport().width;
	var viewport_height = viewport().height;
	

	// fixed subscribe-form
	if (viewport_wid >= 768) {
		if (viewport_wid <= 991) {
			var elemBottomCoord = $('.right-col').outerHeight() + 55;
		} else{
			var elemBottomCoord = $('.right-col').outerHeight() + 144;
		};

		var footerTopCoord = $('.main-wrapper').outerHeight() - $('footer').outerHeight();
		var elemHeight = $('.subscribe-form_first').outerHeight()+30;
		elemBottomCoord = elemBottomCoord - elemHeight - 68;
		$(document).scroll(function(){
			if( ($(window).scrollTop() > elemBottomCoord) && ($(window).scrollTop() < footerTopCoord-elemHeight-50) ){
				if (viewport_wid >= 768) {
					$('.subscribe-form_second').addClass('fixed');
				}
			} else{
				$('.subscribe-form_second').removeClass('fixed');
			}
		})
	} else{
		$('.subscribe-form_second').removeClass('fixed');
	};

	
}
$(window).bind('load', handler);
$(window).bind('resize', handler);



