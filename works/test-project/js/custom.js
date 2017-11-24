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

	// variables
	var sidebarBtn = document.querySelector('.sidebar-mbl');
	var sidebar = document.querySelector('.sidebar');
	var body = document.querySelector('body');
	var cabinetLink = document.querySelector('.own-cabinet-link');
	var cabinet = document.querySelector('.own-cabinet');
	var cabinetDropped = document.querySelector('.own-cabinet-dropped');

	// open/close sidebar
	sidebarBtn.onclick = function(){
		sidebar.classList.toggle('active');
		body.classList.toggle('no-scrolled');

		return false;
	}

	// open/close cabinet
	cabinetLink.onclick = function(){
		cabinet.classList.toggle('active');

		return false;
	}

	/* components */
	
	if($('.js-scrollbar').length) {
		$(".js-scrollbar").mCustomScrollbar({
			axis:"y",
			theme:"dark-thin",
			autoExpandScrollbar:true,
			scrollInertia: 310,
			mouseWheel:{ 
				enable: true, 
				scrollAmount: 100
			},
			advanced:{autoExpandHorizontalScroll:true}
		});
	};

	/* components */
	
	
	

});

var handler = function(){		
	
	var viewport_wid = viewport().width;
	var viewport_height = viewport().height;
	
	if (viewport_wid <= 991) {
		if($('.js-scrollbar').length) {
			$('.js-scrollbar').mCustomScrollbar("destroy");
		} 
	} else{
		$(".js-scrollbar").mCustomScrollbar({
			axis:"y",
			theme:"dark-thin",
			autoExpandScrollbar:true,
			scrollInertia: 310,
			mouseWheel:{ 
				enable: true, 
				scrollAmount: 100
			},
			advanced:{autoExpandHorizontalScroll:true}
		});
	}
	var content = document.querySelector('.main-content');
	var sidebar = document.querySelector('.sidebar');
	var contentHeight = content.clientHeight;
	sidebar.style.height = contentHeight + 'px';
	
}
$(window).bind('load', handler);
$(window).bind('resize', handler);



