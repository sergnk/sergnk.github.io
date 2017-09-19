$(window).load(function(){
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
		$('body').addClass('ios');
	} else{
		$('body').addClass('web');
	};
	$('body').removeClass('loaded'); 

	changeSkill();
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

	$('.btn-menu').click(function(){
		$(this).toggleClass('active'), 
		$('.menu-list').slideToggle(); 
		return false;
	});
	
	/* components */
	
	if($('.styled').length) {
		$('.styled').styler();
	};
	
	/* components */
	

	$('.js-range').on('input change', changeSkill);

	$('.js-scroll').on('click',function (e) {
	    e.preventDefault();

	    var target = this.hash,
	    $target = $(target);

	    $('html, body').stop().animate({
	        'scrollTop': $target.offset().top
	    }, 1000, 'swing', function () {
	        window.location.hash = target;
	    });

	});

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

function changeSkill(){
	var range = $('.js-range');
	var rangeVal = $(range).val();

	if( rangeVal >= 0.76 ){
		$('.range-line').addClass('range-line_25percents');
		$('.range-line').removeClass('range-line_50percents');
		$('.range-line').removeClass('range-line_100percents');
	} else {
		$('.range-line').removeClass('range-line_25percents');
		$('.range-line').removeClass('range-line_50percents');
		$('.range-line').removeClass('range-line_100percents');
	}
	if( rangeVal >= 2 ){
		$('.range-line').addClass('range-line_100percents');
		$('.range-line').removeClass('range-line_50percents');
		$('.range-line').removeClass('range-line_25percents');
	}
	if ( rangeVal <= 2 && rangeVal >= 1.52 ){
		$('.range-line').removeClass('range-line_100percents');
		$('.range-line').addClass('range-line_50percents');
		$('.range-line').removeClass('range-line_25percents');
	}
}

