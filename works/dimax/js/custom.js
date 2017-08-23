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
	
	if($('.js-slider').length){
		$('.js-slider').slick({
			infinite: true,
			slidesToShow: 4,
			slidesToScroll: 1,
			responsive: [{
				breakpoint: 640,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1
				}
			}]
		});
	};
	if($('.js-slider-video').length){
		$('.js-slider-video').slick({
			infinite: true,
			slidesToShow: 3,
			slidesToScroll: 1,
			responsive: [{
				breakpoint: 640,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}]
		});
	};
	if($('.js-slider-clients').length){
		$('.js-slider-clients').slick({
			infinite: true,
			slidesToShow: 6,
			slidesToScroll: 1,
			responsive: [{
				breakpoint: 991,
				settings: {
					slidesToShow: 4
				}
			}, {
				breakpoint: 768,
				settings: {
					slidesToShow: 3
				}

			}, {
				breakpoint: 700,
				settings: {
					slidesToShow: 2
				}
			}, {
				breakpoint: 480,
				settings: {
					slidesToShow: 1
				}
			}]
		});
	};

	$(".main-slider").owlCarousel({
                items: 1,
                nav: false,
                dots: false,
                loop: true,
                onInitialized: function () {
                    $(".main-slider").animate({
                        "opacity": "1"
                    });
                },
                autoplay: true,
                autoplayTimeout: 6000,
            });
	});

	$('.fancybox-media').fancybox({
		openEffect  : 'none',
		closeEffect : 'none',
        width       : 736,
        height      : 410,
        maxWidth    : '90%',
        maxHeight   : '70%',  
        padding     : 0,
        margin      : 0,           
		helpers : {
			media : {
			    youtube : {
			         params : {
			         	 autoplay : 1,
			             theme : 'light',
                         vq    : 'hd720',
                         css   : {
                            'body' : 'color: #fff'
                         } 
			         }
			    } 
			}
		}
	});

	var hash = location.hash; 
    
    if(hash == '#autoplay'){
        $('#tinymce').find('.fancybox-media').trigger('click');
    }


var handler = function(){
	
	var height_footer = $('footer').height();	
	var height_header = $('header').height();	
	$('.main').css({'padding-top':height_header});
	
	
	var viewport_wid = viewport().width;
	
	if (viewport_wid <= 991) {
		
	}
	
}
$(window).bind('load', handler);
$(window).bind('resize', handler);


