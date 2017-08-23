$(window).load(function(){
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
		$('body').addClass('ios');
	};
	$('body').removeClass('loaded'); 
});
var idframe;
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
	var idframe;
	/* placeholder*/	   
	$('input, textarea').each(function(){
 		var placeholder = $(this).attr('placeholder');
 		$(this).focus(function(){ $(this).attr('placeholder', '');});
 		$(this).focusout(function(){			 
 			$(this).attr('placeholder', placeholder);  			
 		});
 	});
	/* placeholder*/

	$('.mobile-btn').click(function(){



		if( $('header').hasClass('active') ){
			$('header').css('overflow-y', '');
			setTimeout(function(){
				$('header').removeClass('active');
				$('body').css('overflow', 'scroll');
			}, 300);
			$('nav.menu').slideToggle(250);

			return false;
		}

		if( viewport().height <= 650){
			$('header').css('overflow-y', 'scroll');
			$('.menu-list__item_social').css('padding-bottom', '12px');
		} else{
			$('header').css('overflow-y', '');
			$('.menu-list__item_social').css('padding-bottom', '0px');
		}

		$('body').css('overflow', 'hidden');
		$(this).parents('header').toggleClass('active');

		$('nav.menu').slideToggle(250);
		
		return false;
	});
		



	$('.js-scroll').on('click',function (e) {
	    e.preventDefault();

	    var target = this.hash,
	    $target = $(target);

	    $('html, body').stop().animate({
	        'scrollTop': $target.offset().top
	    }, 1000, 'swing', function () {
	        window.location.hash = target;
	    });

	 	$('header').removeClass('active');

	 	if(viewport().width <= 991){

	 		$('nav.menu').slideToggle(150);

	 		if( $('header').hasClass('active') ){
	 			$('body').css('overflow', 'hidden');
	 		} else{
	 			$('body').css('overflow', 'scroll');
	 		}
	 	}
	 	$('.products-list').find('.products-list__card').each(function(){
	 		$(this).removeClass('active');
			 $(this).animate({
				left: '100%'
				}, 500);
			});
	 		$('body').css('overflow', 'auto');
	 		$('.content').css('overflow', 'auto');

	});

	$('.to-top').click(function(){
		if(viewport().width <= 991){
			$('nav.menu').css('display', 'none');
		}
	})

// menu highlight	

	var sections = $("section");
	var navigation_links = $(".menu .menu-list__link");

	sections.waypoint({

      handler: function(event, direction) {

		   var active_section;

			active_section = $(this);
			if (direction === "up") active_section = active_section.prev();

			var active_link = $('.menu a[href="#' + active_section.attr("id") + '"]');

         navigation_links.parent().removeClass("current");
			active_link.parent().addClass("current");

		},
		offset: '35%'

	});



// opening video
	$(document).on('click','.js-videoposter',function(ev) {
	  ev.preventDefault();
	  $('iframe').css('opacity', '1');

	  idframe = $(this).parents('.video-slider-item').find('iframe').attr('id');
	  $(this).parents('.slick-track').find('.js-videoposter').each(function(){
	  	$(this).css('position', 'relative');
	  })
	  $(this).css('position', 'static');

	  $(this).parents('.slick-track').find('.js-videoIframe').each(function(){
	  	$(this).attr('src','');
	  })

	  

	  var $poster = $(this);
	  var $wrapper = $poster.closest('.js-videowrapper');
	  videoPlay($wrapper);
	});

	// play the targeted video (and hide the poster frame)
	function videoPlay($wrapper) {
	  var $iframe = $wrapper.find('.js-videoIframe');
	  var src = $iframe.data('src');

	  // hide poster
	  $wrapper.addClass('videoWrapperActive');
	  // add iframe src in, starting the video
	  $iframe.attr('src',src);
	}





	if($('.js-slider').length){
		$('.js-slider').slick({
			infinite: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			dots: true,
			responsive: [{
				breakpoint: 768,
				settings: {
					arrows: false
				}
			}]
		});
	}

	$('.main-slider').css({ 'height': $(window).height() });
	$('.main-slider .slick-list').css({ 'height': $(window).height() });
	$('.products-list__card-image').css({ 'height': $(window).height() - 72});

	if($('.js-slider-video').length){
		$('.js-slider-video').slick({
		  centerMode: true,
		  centerPadding: '346px',
		  slidesToShow: 1,
		  dots: true,
		  dotsClass: 'custom-paging',
		  customPaging: function (slider, i) {
    			return  '<span>' + (i + 1) + '</span>' + ' / ' + slider.slideCount;
    		},
		  responsive: [
		  	{
		      breakpoint: 1300,
		      settings: {
		        centerMode: true,
		        centerPadding: '160px',
		        slidesToShow: 1
		      }
		    },
		    {
		      breakpoint: 991,
		      settings: {
		        arrows: false,
		        centerMode: true,
		        centerPadding: '85px',
		        slidesToShow: 1
		      }
		    },
		    {
		      breakpoint: 768,
		      settings: {
		        arrows: false,
		        centerMode: true,
		        centerPadding: '20px',
		        slidesToShow: 1
		      }
		    }
		  ]
		});
	}

	if($('.js-shops-slider').length){
		$('.js-shops-slider').slick({
			infinite: true,
			slidesToShow: 5,
			slidesToScroll: 1,
			responsive: [{
				breakpoint: 991,
				settings: {
					slidesToShow: 3
				}
			},
			{
				breakpoint: 768,
				settings: {
					arrows: false,
					slidesToShow: 3
				}

			}, {
				breakpoint: 480,
				settings: {
					arrows: false,
					slidesToShow: 2
				}
			}
			]
		});
	}






google.maps.event.addDomListener(window, 'load', init);
        
            function init() {
                var mapOptions = {
                	disableDefaultUI: true,
                	scrollwheel: false,
                    zoom: 13,
                    center: new google.maps.LatLng(55.83707847, 37.52901256), 
                    styles: [
						{
							"featureType": "administrative",
							"elementType": "all",
							"stylers": [
								{
									"saturation": "-100"
								}
							]
						},
						{
							"featureType": "administrative.province",
							"elementType": "all",
							"stylers": [
								{
									"visibility": "off"
								}
							]
						},
						{
							"featureType": "landscape",
							"elementType": "all",
							"stylers": [
								{
									"saturation": -100
								},
								{
									"lightness": 65
								},
								{
									"visibility": "on"
								}
							]
						},
						{
							"featureType": "poi",
							"elementType": "all",
							"stylers": [
								{
									"saturation": -100
								},
								{
									"lightness": "50"
								},
								{
									"visibility": "simplified"
								}
							]
						},
						{
							"featureType": "road",
							"elementType": "all",
							"stylers": [
								{
									"saturation": "-100"
								}
							]
						},
						{
							"featureType": "road",
							"elementType": "geometry.fill",
							"stylers": [
								{
									"hue": "#ff0000"
								}
							]
						},
						{
							"featureType": "road.highway",
							"elementType": "all",
							"stylers": [
								{
									"visibility": "simplified"
								}
							]
						},
						{
							"featureType": "road.highway",
							"elementType": "labels.text",
							"stylers": [
								{
									"color": "#997d03"
								}
							]
						},
						{
							"featureType": "road.arterial",
							"elementType": "all",
							"stylers": [
								{
									"lightness": "30"
								}
							]
						},
						{
							"featureType": "road.local",
							"elementType": "all",
							"stylers": [
								{
									"lightness": "40"
								}
							]
						},
						{
							"featureType": "transit",
							"elementType": "all",
							"stylers": [
								{
									"saturation": -100
								},
								{
									"visibility": "simplified"
								}
							]
						},
						{
							"featureType": "transit.station",
							"elementType": "labels.text",
							"stylers": [
								{
									"color": "#00b1ff"
								}
							]
						},
						{
							"featureType": "transit.station",
							"elementType": "labels.text.stroke",
							"stylers": [
								{
									"lightness": "46"
								},
								{
									"saturation": "75"
								}
							]
						},
						{
							"featureType": "transit.station",
							"elementType": "labels.icon",
							"stylers": [
								{
									"saturation": "65"
								},
								{
									"lightness": "2"
								},
								{
									"gamma": "1.96"
								}
							]
						},
						{
							"featureType": "water",
							"elementType": "geometry",
							"stylers": [
								{
									"hue": "#ffff00"
								},
								{
									"lightness": -25
								},
								{
									"saturation": -97
								}
							]
						},
						{
							"featureType": "water",
							"elementType": "labels",
							"stylers": [
								{
									"lightness": -25
								},
								{
									"saturation": -100
								}
							]
						}
					]

                };

                var mapElement = document.getElementById('map');

                var map = new google.maps.Map(mapElement, mapOptions);

                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(55.81121161, 37.53005470),
                    map: map,
                    title: '',
                    icon: {
						url: "img/map-icon.png",
						scaledSize: new google.maps.Size(60, 55)
					}
                });
            }


});

$('.js-open-cont').click(function(e){
	e.preventDefault();
	

	if( $(this).parents('.contacts-sector').hasClass('active') ){
		return false;
	}
	$(this).parents('.contacts-wrapper-block').find('.contacts-sector').each(function(){
		$(this).find('.contacts-textual-block__open').each(function(){
			$(this).slideUp('slow');
		});
		$(this).removeClass('active');
	})


	$(this).parents('.contacts-sector').toggleClass('active');
	$(this).parents('.contacts-sector').find('.contacts-textual-block__open').each(function(){
		$(this).slideDown('slow');
	});


	
});




$('.js-open-col h3').click(function(){
    $(this).parents('.contacts-textual-block__column').find('.contacts-wrapper-block').slideToggle('slow');
    $(this).parents('.contacts-textual-block__column').toggleClass('active');
    $(this).parents('.contacts-textual-block__column').siblings().find('.contacts-wrapper-block').slideUp('slow');
    $(this).parents('.contacts-textual-block__column').siblings().removeClass('active');
})
// products-card open/close
$('.products-list__item').click(function(){


	if( $(this).find('.products-list__card').hasClass('active') ){
		$(this).addClass('flipped');
	} else{
		$(this).toggleClass('flipped');
	}

});

$('.products-list__back .button').click(function(e){
	e.preventDefault();

	// $('.content').css('position', 'absolute');
	// $('.content').animate({
	// 	left: '-100%'
	// }, 500);
	$('body').css('overflow', 'hidden');
	$(this).parents('.products-list__item').find('.products-list__card').animate({
		left: '0px'
	}, 500);
	$(this).parents('.products-list__item').find('.products-list__card').addClass('active');
	$(this).parents('.products-list__item').addClass('flipped');
	$('.content').css('overflow-y', 'scroll');
	// $('footer').animate({
	// 	left: '-100%'
	// }, 250);
	$('header').addClass('hid-mob');
});

$('.js-close').click(function(e){
	e.preventDefault();
	// $('.content').css('position', 'relative');
	// $('.content').animate({
	// 	left: '0px'
	// }, 500);
	$('body').css('overflow', 'scroll');
	$(this).parents('.products-list__card').animate({
		left: '100%'
	}, 500);
	$(this).parents('.products-list__item').find('.products-list__card').removeClass('active');
	$(this).parents('.products-list__item').removeClass('flipped');
	$('.content').css('overflow-y', '');
	// $('footer').animate({
	// 	left: '0px'
	// }, 500);
	$('header').removeClass('hid-mob');

	var ste = $('.products-box');
    $('html, body').animate({ scrollTop: $(ste).offset().top });

});



var handler = function(){



	$('.main-slider').css({ 'height': $(window).height() });
	$('.main-slider .slick-list').css({ 'height': $(window).height() }); 
	$('.main-slider .slick-track').css({ 'height': $(window).height() }); 
	$('.products-list__card-image').css({ 'height': $(window).height()});
	$('.products-list__card-about').css({ 'height': $(window).height()});

	var height_footer = $('footer').height();	
	var height_header = $('header').height();	
	$('.content').css({'padding-bottom':height_footer});
	
	$('.main-slider').css({ 'height': $(window).height() });

	var viewport_wid = viewport().width;
	
	if (viewport_wid <= 991) {
		$('#map').css('height', '695px');
		$('nav.menu').css('display', 'none');
		$('header').removeClass('active');
	} else{
		$('nav.menu').css('display', 'block');

	}


	if( viewport().height <= 650){
		// $('header').css('overflow-y', 'scroll');
		$('.menu-list__item_social').css('padding-bottom', '12px');
	} else{
		$('header').css('overflow-y', '');
		$('.menu-list__item_social').css('padding-bottom', '0px');
	}
	if( (viewport().height <= 768) && (viewport().width >= 1200) ){
		$('.products-list__card-text').css('font-size', '16px');
		$('.products-list__card-text').css('line-height', '20px');
		$('.menu-list__item').css('height', '12.5%');
		$('.menu-list__item.menu-list__item_social').css('height', '28%');
		$('.card-data-list__item').css('margin-bottom', '8px');
		$('.products-list__card-data').css('padding-top', '20px');
		$('.products-list__card-about').css('padding-top', '8px');
	}

	if (viewport_wid >= 992) {
		$('header').css({ 'height': $(window).height() });
		$('.contacts-wrapper-block').each(function(){
			$(this).css('display', 'block');
		})
	} else{
		$('header').css('height', '');
	}


	if (viewport_wid <= 991) {
		$('.main-slider').css('height', '512px');
		$('.main-slider .slick-list').css('height', '512px');
		$('.main-slider .slick-track').css('height', '512px'); 
		$('.products-list__card-image').css('height', '512px');
		$('.products-list__card-about').css('height', '');
	}
	if (viewport_wid <= 600) {
		$('.main-slider').css('height', '480px');
		$('.main-slider .slick-list').css('height', '480px');
		$('.products-list__card-image').css('height', '480px');
	}


	if (viewport_wid <= 767) {
		$('#map').css('height', '744px');
	}

}
$(document).scroll(function(){
	var  elemTop1 = $('#about').offset().top;
	if( $(window).scrollTop() >= elemTop1-10){
		$('header').addClass('fixed');
	} else{
		$('header').removeClass('fixed');
	}

})

$(window).bind('load', handler);
$(window).bind('resize', handler);
// google.maps.event.addDomListener(window, 'load', init);

			


			// script youtube
			  var tag = document.createElement('script'); 

		      tag.src = "https://www.youtube.com/iframe_api"; 
		      var firstScriptTag = document.getElementsByTagName('script')[0]; 
		      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);




			var player;var player1;var player2;var player3;var player4;var player5;var player6;var player7;
			var player8;var player9; var player10;
		  	function onYouTubePlayerAPIReady() {
			    player = new YT.Player('js-videoIframe', {
			      events: {
		            'onReady': onPlayerReady,
		            'onStateChange': onPlayerStateChange
		          }
			    });
			    player1 = new YT.Player('js-videoIframe1', {
			      events: {
		            'onReady': onPlayerReady,
		            'onStateChange': onPlayerStateChange
		          }
			    });
			    player2 = new YT.Player('js-videoIframe2', {
			      events: {
		            'onReady': onPlayerReady,
		            'onStateChange': onPlayerStateChange
		          }
			    });
			    player3 = new YT.Player('js-videoIframe3', {
			      events: {
		            'onReady': onPlayerReady,
		            'onStateChange': onPlayerStateChange
		          }
			    });
			    player4 = new YT.Player('js-videoIframe4', {
			      events: {
		            'onReady': onPlayerReady,
		            'onStateChange': onPlayerStateChange
		          }
			    });
			    player5 = new YT.Player('js-videoIframe5', {
			      events: {
		            'onReady': onPlayerReady,
		            'onStateChange': onPlayerStateChange
		          }
			    });
			    player6 = new YT.Player('js-videoIframe6', {
			      events: {
		            'onReady': onPlayerReady,
		            'onStateChange': onPlayerStateChange
		          }
			    });
			    player7 = new YT.Player('js-videoIframe7', {
			      events: {
		            'onReady': onPlayerReady,
		            'onStateChange': onPlayerStateChange
		          }
			    });
			    player8 = new YT.Player('js-videoIframe8', {
			      events: {
		            'onReady': onPlayerReady,
		            'onStateChange': onPlayerStateChange
		          }
			    });
			    player9 = new YT.Player('js-videoIframe9', {
			      events: {
		            'onReady': onPlayerReady,
		            'onStateChange': onPlayerStateChange
		          }
			    });
			    player10 = new YT.Player('js-videoIframe10', {
			      events: {
		            'onReady': onPlayerReady,
		            'onStateChange': onPlayerStateChange
		          }
			    });
			  };
			  




			function onPlayerReady(event) {
		        event.target.playVideo();
		      }
		    
		    
		      function onPlayerStateChange(event) {
		        if (event.data == YT.PlayerState.ENDED) {
		          $('iframe').css('opacity', '0');
		          $(this).parents('.video-slider-item').find('.js-videoposter').css('position', 'relative');
		        } else{
		        	$('iframe').css('opacity', '1');
		        	$(this).parents('.video-slider-item').find('.js-videoposter').css('position', 'static');
		        }

		      }

		      