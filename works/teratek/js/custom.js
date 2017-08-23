$(window).on('load', function (e) {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
        $('body').addClass('ios');
    };
    $('body').removeClass('loaded');
    //@todo: встречается только на странице прайс-листа (да помоему уже вообще нет)
//    $('.js-vertical-scroll').mCustomScrollbar();
});

function setUpJsStyled(selector)
{
//return;
    selector = selector || '';
    var itemobj = $(selector + '.js-styled');
    if (itemobj.length) {
        itemobj.styler();
    };
}


$(function () {

    // @todo О чем это вообще? Проверить!
    if (/msie/.test(navigator.userAgent.toLowerCase())) {
        $('input[placeholder]').each(function () {
            var input = $(this);
            $(input).val(input.attr('placeholder'));
            $(input).focus(function () {
                if (input.val() == input.attr('placeholder')) {
                    input.val('');
                }
            });
            $(input).blur(function () {
                if (input.val() == '' || input.val() == input.attr('placeholder')) {
                    input.val(input.attr('placeholder'));
                }
            });
        });


        $('textarea[placeholder]').each(function () {
            var input = $(this);
            $(input).val(input.attr('placeholder'));
            $(input).focus(function () {
                if (input.val() == input.attr('placeholder')) {
                    input.val('');
                }
            });
            $(input).blur(function () {
                if (input.val() == '' || input.val() == input.attr('placeholder')) {
                    input.val(input.attr('placeholder'));
                }
            });
        });
    };

    $('input, textarea').each(function () {
        var placeholder = $(this).attr('placeholder');
        $(this).focus(function () {
            $(this).attr('placeholder', '');
            return false;
        });
        $(this).focusout(function () {
            $(this).attr('placeholder', placeholder);
            return false;
        });
    });
    $('.btn-open-search').click(function () {
        $(this).toggleClass('active'), $('.box-search__toggle').fadeIn(0);
        return false;
    });

        var mainSliderSelector = $('.main-slider');
    if (mainSliderSelector.length) {
        setTimeout(function(){
            mainSliderSelector.slick({
                dots: true,
                infinite: true,
                speed: 300,
                slidesToShow: 1,
                slidesToScroll: 1,
                adaptiveHeight: true,
                autoplay: true,
                autoplaySpeed: 4000,
                fade: true
            });
            mainSliderSelector.find(".main-slider__item").show();
            
        }, 3001);
    };
//    mainSliderSelector = null;
        
    var galleryProductSelector = $('.gallery-product');
    if (galleryProductSelector.length) {
        setTimeout(function(){
            galleryProductSelector.slick({
                infinite: true,
                speed: 300,
                adaptiveHeight: true,
                autoplay: true,
                autoplaySpeed: 2000,
                slidesToShow: 6,
                responsive: [{
                    breakpoint: 1100,
                    settings: {
                        slidesToShow: 5,
                        slidesToScroll: 1
                    }
                }, {
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1
                    }
                }, {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                }, {
                    breakpoint: 500,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }]
            });
            galleryProductSelector.find(".gallery-product__item").show();
            
        }, 3001);
    };
//    galleryProductSelector = null;
	
	
    $('.slick-next-btn').click(function () {
        $(this).parent().find('.slick-next').click();
        return false;
    });
    $('.slick-prev-btn').click(function () {
        $(this).parent().find('.slick-prev').click();
        return false;
    });
    if($('.tel_mask').length){
        $('.tel_mask').mask('+7 (999) 999-99-99');
    }

    $('.js-link-nav').click(function () {
        $(this).parent().siblings().removeClass('active');
        var id = $(this).attr('href');
        $('header').find('.js-open-nav-block').not(id).hide();
        $(id).fadeToggle(0);
        $(this).parent().toggleClass('active');
        return false;
    });
    $('.js-close-open-nav').click(function () {
        $('.js-open-nav-block').fadeOut(200);
        $('.js-link-nav').parent().removeClass('active');
        return false;
    });
    var fancyboxClassSelector = $('.fancybox');
    if (fancyboxClassSelector.length) {
        fancyboxClassSelector.fancybox();
    };

    // Выбор города
    $('.fancybox2').fancybox({
        wrapCSS : 'wrap-fancy-window'
    });


        $(".js-sign-up-button").click(function(a){
        a.preventDefault();
        $(this).parent('').parent('form').toggleClass("box-form-hide");
        $(this).parent('').parent('form').siblings("form").removeClass("box-form-hide");
    });
    $('.js-scroll-top').click(function() {
        $('html, body').animate({scrollTop: 0},500);
        return false;
      });

 
    setUpJsStyled();
    
    $('.button-minus').click(function () {
        var $input = $(this).parent().find('input');
        var count = parseInt($input.val()) - 1;
        count = count < 1 ? 1 : count;
        $input.val(count);
        $input.change();
        return false;
    });
    $('.button-plus').click(function () {
        var $input = $(this).parent().find('input');
        var count = parseInt($input.val()) + 1;
        count = count > ($input.attr("maxlength")) ? ($input.attr("maxlength")) : count;
        $input.val(count);
        $input.change();
        return false;
    });



    $('.box-filter__title').click(function () {
        $(this).parents('.box-filter__section').find('.box-filter__cont').fadeToggle(0);
        $(this).parents('.box-filter__section').toggleClass('box-filter__section_close');
        return false;
    });
    $('.box-price-list__title').click(function () {
        $(this).parents('.box-price-list__bottom').toggleClass('box-price-list__section_close');
        $(this).parents('.box-price-list__top').toggleClass('box-price-list__section_close');
        return false;
    });
    //@todo: класс не найден нигде в проекте
    /*
    $('.js-horizontal-scroll').mCustomScrollbar({
        axis: "x",
        theme: "dark-thin",
        autoExpandScrollbar: true,
        advanced: {
            autoExpandHorizontalScroll: true
        }
    });
    */
    $('.box-search__input').on("focus", function(){
        $(".box-search__button").removeClass("icon_search");
    });
    $('.box-search__input').on("focusout", function(){
        $(".box-search__button span").removeClass("show-ib");
        $(".box-search__button").addClass("icon_search");
    });
    $('.box-search__input').keyup(function(){
        $(".box-search__button span").addClass("show-ib");
    });
    $(".js-link-open-help").click(function () {
        $('.box-question').removeClass('open');
        $('.js-open-on-click').removeClass('open');
        $(this).parents('.box-question').addClass('open');
        $(this).parents('.js-parent-help').find('.js-open-on-click').toggleClass('open');
        return false;
    });
    $(document).click(function (e) {
        if ($(e.target).parents().filter('.js-open-on-click').length != 1) {
            $('.js-open-on-click').removeClass('open');
        }
    });
    if ($('#zoom_03f').length) {
        $("#zoom_03f").elevateZoom({
            gallery: 'gallery_01f',
            cursor: 'pointer',
            galleryActiveClass: "active"
        });
        $("#zoom_03f").bind("click", function (e) {
            var ez = $('#zoom_03f').data('elevateZoom');
            ez.closeAll();
            $.fancybox(ez.getGalleryList());
            return false;
        });
    };
    $(".js-color-tooltip").click(function () {
        $('.tooltip').addClass('active');
        return false;
    });
    $(document).click(function (e) {
        if ($(e.target).parents().filter('.tooltip').length != 1) {
            $('.tooltip').removeClass('active');
        }
    });

    $(".filter-toggle").click(function () {
        $('.column-filter').toggleClass('show-filter-mob');
        return false;
    });
	
	$('.up-btn-block').click(function() {
		$('html, body').animate({scrollTop: 0}, 500);
		return false;
	});
	$(window).scroll(function() {
		var scroll_num = $(window).scrollTop();
		if (scroll_num > 10) {				
			$(".up-btn-block").fadeIn();					
		} else{
			$(".up-btn-block").fadeOut();
		}
	});


	$(".js-btn-close").on("click", function(){
		$(".fancybox-close").click();
	});
	
    $('.flag-row').click(function(){
        $(this).toggleClass('flag-row_no');
    })

    $(".link-tab-mobile").click(function (e) {

        if($(this).hasClass('active')){
            if($(this).attr('href') == "#panel1"){
                e.preventDefault();
            }
            $(this).removeClass('active');
            $(this).parents('.tabs-content').find('.tabs-panel').removeClass('is-active-mobile');
            $(this).parents('.tabs-content').find('.link-tab-mobile').removeClass('active');
			return false;
        }
        else {
            $(this).parents('.tabs-content').find('.tabs-panel').removeClass('is-active-mobile');
            $(this).parents('.tabs-content').find('.link-tab-mobile').removeClass('active');
            
			
            $('html, body').animate({scrollTop: $(this).offset().top -$('.box-navigation').outerHeight()}, 0);
            $(this).addClass('active');
            $(this).next().addClass('is-active-mobile');
			return false;
        }
    });
    
//    $('.box-search__input').on("focus", function(){
//        $(".drop-search").slideDown();
//    });
//    $('.box-search__input').on("focusout", function(){
//        $(".drop-search").slideUp();
//    });
    
    $(".js-scrool-to").click(function () {
        var target_scroll3 = $(this).attr('href');
        $('html, body').animate({scrollTop: $(target_scroll3).offset().top-50}, 1000);
    });
	
	$('.table-lk__description.with-open').click(function() {
		$(this).parents('.tr').toggleClass('open');
		return false;
	});
});     


// ========TABS========

    $('.tabs-title a[href="#panel1"]').click(function(e){
        e.preventDefault();
        $(this).parents('.tabs').find('.tabs-title').each(function(){
            $(this).removeClass('is-active');
        });
        $(this).parents('.tabs-title').addClass('is-active');

        $(this).parents('.box-tabs-product').find('.tabs-panel').each(function(){
            $(this).removeClass('is-active is-active-mobile');
        });
        $(this).parents('.box-tabs-product').find('#panel1').addClass('is-active is-active-mobile');

        $(this).parents('.box-tabs-product').find('.link-tab-mobile').each(function(){
            $(this).removeClass('active');
        });
        $(this).parents('.box-tabs-product').find('.tabs-content a[href="#panel1"]').addClass('active');

    });
    $('.tabs-title a[href="#panel2"]').click(function(e){
        e.preventDefault();
        $(this).parents('.tabs').find('.tabs-title').each(function(){
            $(this).removeClass('is-active');
        });
        $(this).parents('.tabs-title').addClass('is-active');

        $(this).parents('.box-tabs-product').find('.tabs-panel').each(function(){
            $(this).removeClass('is-active is-active-mobile');
        });
        $(this).parents('.box-tabs-product').find('#panel2').addClass('is-active is-active-mobile');

        $(this).parents('.box-tabs-product').find('.link-tab-mobile').each(function(){
            $(this).removeClass('active');
        });
        $(this).parents('.box-tabs-product').find('.tabs-content a[href="#panel2"]').addClass('active');

    });
    $('.tabs-title a[href="#panel3"]').click(function(e){
        e.preventDefault();
        $(this).parents('.tabs').find('.tabs-title').each(function(){
            $(this).removeClass('is-active');
        });
        $(this).parents('.tabs-title').addClass('is-active');

        $(this).parents('.box-tabs-product').find('.tabs-panel').each(function(){
            $(this).removeClass('is-active is-active-mobile');
        });
        $(this).parents('.box-tabs-product').find('#panel3').addClass('is-active is-active-mobile');

        $(this).parents('.box-tabs-product').find('.link-tab-mobile').each(function(){
            $(this).removeClass('active');
        });
        $(this).parents('.box-tabs-product').find('.tabs-content a[href="#panel3"]').addClass('active');

    });
    $('.tabs-title a[href="#panel4"]').click(function(e){
        e.preventDefault();
        $(this).parents('.tabs').find('.tabs-title').each(function(){
            $(this).removeClass('is-active');
        });
        $(this).parents('.tabs-title').addClass('is-active');

        $(this).parents('.box-tabs-product').find('.tabs-panel').each(function(){
            $(this).removeClass('is-active is-active-mobile');
        });
        $(this).parents('.box-tabs-product').find('#panel4').addClass('is-active is-active-mobile');

        $(this).parents('.box-tabs-product').find('.link-tab-mobile').each(function(){
            $(this).removeClass('active');
        });
        $(this).parents('.box-tabs-product').find('.tabs-content a[href="#panel4"]').addClass('active');

    });



// ========DELIVERY-DROP-ITEMS========

    $('.delivery-information-list__item-title').click(function(){
        $(this).parents('.delivery-information-list__item').toggleClass('active');
        var hh_img_map1 = $('.delivery-map-block__image img').outerHeight();
        $('.delivery-map-block__map').css({
            'height': hh_img_map1
        });
        if( $('.delivery-information-list__item:last-child').hasClass('active') ){
            $('.delivery-h4-title').css('margin-top', '0px');
        }else {
            $('.delivery-h4-title').css('margin-top', '20px');
        }
    });


    $('.guarantee-information-list__item>a.with-icon').click(function(e){
        e.preventDefault();
        $(this).parents('.guarantee-information-list__item').toggleClass('active');
    });

    $('.types-payment-cashless-list__item-text a.with-icon').click(function(e){
        e.preventDefault();
        $(this).parents('.types-payment-cashless-list__item').toggleClass('active');
    });



// ======= FORMS =======

if($('.styled').length){
    $('.styled').styler();
};


var setUpCharts = function() {
    
    //charts
    var chartAreaClassSelector = $('.chart-area');
    if(chartAreaClassSelector.length){	
		var pieOptions = {
		    segmentShowStroke : false,
			animationSteps: 60,
			animationEasing: "easeOutQuart",
			scaleShowLabels: true
		};
		// charts 1
		if($('#chart-area').length){	
		   var element_1= $('#chart-area');
		   var chart_1= document.getElementById("chart-area").getContext("2d");
		   var pieData = [
				{
					value : $(element_1).data('percent'),
					color : $(element_1).data('color')
				},
				{
					value : $(element_1).data('percent2'),
					color : $(element_1).data('color2')
				},
			   	{
					value : $(element_1).data('percent3'),
					color : $(element_1).data('color3')
				},
			   	{
					value : $(element_1).data('percent4'),
					color : $(element_1).data('color4')
				},
			   	{
					value : $(element_1).data('percent5'),
					color : $(element_1).data('color5')
				},
			   	{
					value : $(element_1).data('percent6'),
					color : $(element_1).data('color6')
				},
			   	{
					value : $(element_1).data('percent7'),
					color : $(element_1).data('color7')
				},
				{
					value: 100 - $(element_1).data('percent') - $(element_1).data('percent2') - $(element_1).data('percent3') - $(element_1).data('percent4') - $(element_1).data('percent5') - $(element_1).data('percent6') - $(element_1).data('percent7'),
					color:"#69aa80"
				},   
			];
			new Chart(chart_1).Pie(pieData, pieOptions);
		};
		// charts 1
		if($('#chart-area').length){	
		   var element_1= $('#chart-area');
		   var chart_1= document.getElementById("chart-area").getContext("2d");
		   var pieData = [
				{
					value : $(element_1).data('percent'),
					color : $(element_1).data('color')
				},
				{
					value : $(element_1).data('percent2'),
					color : $(element_1).data('color2')
				},
			   	{
					value : $(element_1).data('percent3'),
					color : $(element_1).data('color3')
				},
			   	{
					value : $(element_1).data('percent4'),
					color : $(element_1).data('color4')
				},
			   	{
					value : $(element_1).data('percent5'),
					color : $(element_1).data('color5')
				},
			   	{
					value : $(element_1).data('percent6'),
					color : $(element_1).data('color6')
				},
			   	{
					value : $(element_1).data('percent7'),
					color : $(element_1).data('color7')
				},
				{
					value: 100 - $(element_1).data('percent') - $(element_1).data('percent2') - $(element_1).data('percent3') - $(element_1).data('percent4') - $(element_1).data('percent5') - $(element_1).data('percent6') - $(element_1).data('percent7'),
					color:"#69aa80"
				},   
			];
			new Chart(chart_1).Pie(pieData, pieOptions);
		};
		// charts 2
		if($('#chart-area2').length){	
		   var element_1= $('#chart-area2');
		   var chart_1= document.getElementById("chart-area2").getContext("2d");
		   var pieData = [
				{
					value : $(element_1).data('percent'),
					color : $(element_1).data('color')
				},
				{
					value : $(element_1).data('percent2'),
					color : $(element_1).data('color2')
				},
			   	{
					value : $(element_1).data('percent3'),
					color : $(element_1).data('color3')
				},
			   	{
					value : $(element_1).data('percent4'),
					color : $(element_1).data('color4')
				},
			   	{
					value : $(element_1).data('percent5'),
					color : $(element_1).data('color5')
				},
			   	{
					value : $(element_1).data('percent6'),
					color : $(element_1).data('color6')
				},
			   	{
					value : $(element_1).data('percent7'),
					color : $(element_1).data('color7')
				},
				{
					value: 100 - $(element_1).data('percent') - $(element_1).data('percent2') - $(element_1).data('percent3') - $(element_1).data('percent4') - $(element_1).data('percent5') - $(element_1).data('percent6') - $(element_1).data('percent7'),
					color:"#69aa80"
				},   
			];
			new Chart(chart_1).Pie(pieData, pieOptions);
		};
		// charts 3
		if($('#chart-area3').length){	
		   var element_1= $('#chart-area3');
		   var chart_1= document.getElementById("chart-area3").getContext("2d");
		   var pieData = [
				{
					value : $(element_1).data('percent'),
					color : $(element_1).data('color')
				},
				{
					value : $(element_1).data('percent2'),
					color : $(element_1).data('color2')
				},
			   	{
					value : $(element_1).data('percent3'),
					color : $(element_1).data('color3')
				},
			   	{
					value : $(element_1).data('percent4'),
					color : $(element_1).data('color4')
				},
			   	{
					value : $(element_1).data('percent5'),
					color : $(element_1).data('color5')
				},
			   	{
					value : $(element_1).data('percent6'),
					color : $(element_1).data('color6')
				},
			   	{
					value : $(element_1).data('percent7'),
					color : $(element_1).data('color7')
				},
				{
					value: 100 - $(element_1).data('percent') - $(element_1).data('percent2') - $(element_1).data('percent3') - $(element_1).data('percent4') - $(element_1).data('percent5') - $(element_1).data('percent6') - $(element_1).data('percent7'),
					color:"#69aa80"
				},   
			];
			new Chart(chart_1).Pie(pieData, pieOptions);
		};
		// charts 4
		if($('#chart-area4').length){	
		   var element_1= $('#chart-area4');
		   var chart_1= document.getElementById("chart-area4").getContext("2d");
		   var pieData = [
				{
					value : $(element_1).data('percent'),
					color : $(element_1).data('color')
				},
				{
					value : $(element_1).data('percent2'),
					color : $(element_1).data('color2')
				},
			   	{
					value : $(element_1).data('percent3'),
					color : $(element_1).data('color3')
				},
			   	{
					value : $(element_1).data('percent4'),
					color : $(element_1).data('color4')
				},
			   	{
					value : $(element_1).data('percent5'),
					color : $(element_1).data('color5')
				},
			   	{
					value : $(element_1).data('percent6'),
					color : $(element_1).data('color6')
				},
			   	{
					value : $(element_1).data('percent7'),
					color : $(element_1).data('color7')
				},
				{
					value: 100 - $(element_1).data('percent') - $(element_1).data('percent2') - $(element_1).data('percent3') - $(element_1).data('percent4') - $(element_1).data('percent5') - $(element_1).data('percent6') - $(element_1).data('percent7'),
					color:"#ed535b"
				},   
			];
			new Chart(chart_1).Pie(pieData, pieOptions);
		};
	};
        
}   
    
$(function () {                

        var miniImgCardClassSelector = $('.mini-img-card');
	if (miniImgCardClassSelector.length) {
		miniImgCardClassSelector.slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			infinite: true,
			dots: false,
			arrows: true,
			responsive: [{
				breakpoint: 2000,
				settings: "unslick"
			}, {
				breakpoint: 500,
				settings: "slick"
			}]
		});
	};
        miniImgCardClassSelector = null;
	
	
	$('.list-sort__link').click(function () {
        $(this).parent().siblings().removeClass('active');
        $(this).parent().addClass('active');
    });

	$(document).on('click', '.list-sort__item.active .list-sort__link', function() {
        $(this).parent().toggleClass('up');		
    });
	
    
});


var handler2 = function () {
    
	var height_footer = $('footer').height();
    var hh = $(window).height();
    $('.content').css({
        'padding-bottom': height_footer + 37
    });
    var hh_img_map = $('.box-enhanced-contacts__photo img').outerHeight();
    $('.box-enhanced-contacts__map').css({
        'height': hh_img_map
    });
    var hh_img_map2 = $('.delivery-map-block__image img').outerHeight();
        $('.delivery-map-block__map').css({
            'height': hh_img_map2
        });



    var ww = $(window).width();
    // if (ww < 992) {
    //     $('.js-vertical-scroll2').mCustomScrollbar();
    // };
    if (ww > 991) {
        var exampleOptions = {
            speed: 'fast'
        }
        var example = $('#example').superfish(exampleOptions);
        $('.destroy').on('click', function () {
            example.superfish('destroy');
        });
        $('.init').on('click', function () {
            example.superfish(exampleOptions);
        });
        $('.open').on('click', function () {
            example.children('li:first').superfish('show');
        });
        $('.close').on('click', function () {
            example.children('li:first').superfish('hide');
        });
    } else {
        $('.menu__item_with-drop .menu__link').click(function () {
            $(this).parent().siblings().removeClass('active');
            $(this).parent().siblings().find('.open-block-menu').slideUp(0);
            $(this).parent().find('.open-block-menu').slideToggle(0);
            $(this).parent().toggleClass('active');
//            $('.js-vertical-scroll2').mCustomScrollbar("update");
            return false;
        });
    };
    
    var hh_min = $('.js-hh-min-example').height();
    $('.js-hh-min').css({
        'min-height': hh_min
    });
    
    
    $(window).scroll(function() {  
        if ($(window).scrollTop() > 50) {
            $('.link-filter').addClass("fixed");
        } else{
            $('.link-filter').removeClass("fixed");
        };

    });

    $(window).on('load', function (e) {
        if ($(window).scrollTop() >150) {
            $('.link-filter').addClass("fixed");
        } else{
            $('.link-filter').removeClass("fixed");
        }
    });
    
    var textErrorArrowClassSelector = $(".text-error__arrow");
    if(textErrorArrowClassSelector.length){
		var offset_search = $('.box-search').offset();
		var offset_arrow = $('.text-error__text-border').offset();
		textErrorArrowClassSelector.css({'height':offset_arrow.top - offset_search.top -20});
	};  		
  	
		
	
}
$(window).bind('load', handler2);
$(window).bind('resize', handler2);

/**
 * box-fix-scroll найден только на странице верстки личного кабинета
 */
var setUpPrivateOffice = function() {
        var boxFixScrollClassSelector = $('.box-fix-scroll');
	if(boxFixScrollClassSelector.length){
		// boxFixScrollClassSelector.mCustomScrollbar({
		// 	horizontalScroll:true,
		// 	scrollButtons:{enable:false},
		// 	mouseWheel:{ enable: false },
		// 	advanced:{updateOnContentResize:true},
		// 	advanced:{updateOnBrowserResize:true}
		// });
	};
	//fixed scroll
	
	if($('.box-fix-scroll').length){	
		var windowHeight = $(window).height();
		var offset_top = $(this).find('.box-fix-scroll').offset().top;
		var height_table = $('.height-table').height();
		$(window).scroll(function() {		
			if ($(window).scrollTop()+windowHeight > offset_top+height_table){
				$('.box-fix-scroll').addClass("no-fixed");
			} else{
				$('.box-fix-scroll').removeClass("no-fixed");
			};
			if (offset_top > windowHeight+$(window).scrollTop()){
				$('.box-fix-scroll').addClass("no-fixed_top");
			} else{
				$('.box-fix-scroll').removeClass("no-fixed_top");
			}
		});
	};
}



var setUpMiddleLine = function() {
 /*****Brend List*****/
	
	var is_animate = false;/*!!!!!!!!!!!!!!!!!!!!!!!!!!*/

    $(".bl_all").click(function(){
	
        if($(this).hasClass('bl_active')) return;
        if (is_animate)/*!!!!!!!!!!!!!!!!!!!!!!!!!!*/
            return false;
        is_animate = true;/*!!!!!!!!!!!!!!!!!!!!!!!!!!*/

        $(".bl_active").removeClass("bl_active");
        $(this).addClass("bl_active");
		
		$(".bbb_active").removeClass("bbb_active");
        $(".bb_active").fadeOut("slow",function(){
            $(".bb_active").hide();
            $(".bb_active").removeClass("bb_active");
        });
		
		$(".bb_all").addClass("bbb_active");
        $(".bb_all").fadeIn("slow",function(){
            $(".bb_all").addClass("bb_active");
            is_animate = false;/*!!!!!!!!!!!!!!!!!!!!!!!!!!*/
        });
		if (!$(".brend_cont").hasClass('showed'))
			$(".show_brends").click();
		var bHeight=$('.brend_block.bb_all').outerHeight();
        //$(".brend_block_pusher").animate({'height': $(".bb_all").data("height")},300);
        $(".brend_cont").animate({height: bHeight});
        return false;
    });

    $(".bl_popular").unbind('click');
    $(".bl_popular").bind("click", function(){
		
        if($(this).hasClass('bl_active')) return;

        if (is_animate)/*!!!!!!!!!!!!!!!!!!!!!!!!!!*/
            return false;
        is_animate = true;/*!!!!!!!!!!!!!!!!!!!!!!!!!!*/
		
		$(".bbb_active").removeClass("bbb_active");
        $(".bl_active").removeClass("bl_active");
        $(this).addClass("bl_active");
        $(".bb_active").fadeOut("slow",function(){
            $(".bb_active").hide();
            $(".bb_active").removeClass("bb_active");
        });
		
		$(".bb_popular").addClass("bbb_active");
        $(".bb_popular").fadeIn("slow",function(){
            $(".bb_popular").addClass("bb_active");
            mixTags(true);
            is_animate = false;/*!!!!!!!!!!!!!!!!!!!!!!!!!!*/
        });
		if (!$(".brend_cont").hasClass('showed'))
                $(".show_brends").click();
		var bHeight=$('.brend_block.bb_popular').outerHeight();

        //$(".brend_block_pusher").animate({'height': $(".bb_popular").data("height")},300);
        $(".brend_cont").animate({height: bHeight});
        //setTimeout(function(){$(".brend_cont").animate({height: bHeight});}, 2000);
        return false;
    });

    $(".bl_category").unbind('click');
    $(".bl_category").bind("click", function(){
	
        if($(this).hasClass('bl_active')) return;

        if (is_animate)/*!!!!!!!!!!!!!!!!!!!!!!!!!!*/
            return false;
        is_animate = true;/*!!!!!!!!!!!!!!!!!!!!!!!!!!*/
		
		$(".bbb_active").removeClass("bbb_active");
        $(".bl_active").removeClass("bl_active");
        $(this).addClass("bl_active");
        $(".bb_active").fadeOut("slow",function(){
            $(".bb_active").hide();
            $(".bb_active").removeClass("bb_active");
        });
		
		$(".bb_category").addClass("bbb_active");
		$(".bb_category").fadeIn("slow",function(){
            $(".bb_category").addClass("bb_active");
            mixTags2(true);
            is_animate = false;/*!!!!!!!!!!!!!!!!!!!!!!!!!!*/
        });
		if (!$(".brend_cont").hasClass('showed'))
			$(".show_brends").click();
        
		var bHeight=$('.brend_block.bb_category').outerHeight();
       // $(".brend_block_pusher").animate({'height': $(".bb_category").data("height")},300);
        $(".brend_cont").animate({height: bHeight});
        //setTimeout(function(){$(".brend_cont").animate({height: bHeight});}, 2000);
        return false;
    });

    $(".hide_brends").unbind('click');
    $(".hide_brends").bind("click", function(){
		$('.brend_cont').removeClass('showed');
        $(".brend_cont").animate({
            height: $(".brend_icon_block").outerHeight(true),
            opacity: 0
        }, {queue:false, duration:1000, complete: function() {
            $(".brend_icon_block").css('position','relative');
            $(".brend_cont").css('position','fixed');
            //$(".brend_cont").hide();
            $(".hide_brends").removeClass("active");
        }});
        $(".brend_icon_block").show();
        $(".brend_icon_block").animate({
            opacity: 1
        }, {queue:true, duration:1000, complete: function() {
            $(".show_brends").addClass("active");
        }});
        return false;
    });

    $(".show_brends").unbind('click');
    $(".show_brends").bind("click", function(){
		$('.brend_cont').addClass('showed');
		var bHeight=$('.brend_block.bbb_active').outerHeight(true);
		if(bHeight==null){
			bHeight=$('.brend_block.bb_active').outerHeight(true);
		}
        var autoHeight = $(".brend_cont").css('height', 'auto').outerHeight(true);
        $(".brend_cont").height($(".brend_icon_block").outerHeight(true)+100); //Why exactly 100? I don't really know...
        $(".brend_icon_block").css('position','absolute');
        $(".brend_cont").show();
        $(".brend_cont").css('position','relative');
		if(bHeight>0){

			$(".brend_cont").animate({
				height: bHeight,
				opacity: 1
			}, {queue:false, duration:1000, complete: function() {
				$(".brend_cont").css('height', bHeight);
				$(".hide_brends").addClass("active");
			}});
		}
        $(".brend_icon_block").animate({
            opacity: 0
        }, {queue:true, duration:1000, complete: function() {
            $(".brend_icon_block").hide();
            $(".show_brends").removeClass("active");
        }});
        if ($(".bb_popular").hasClass("bb_active")){
            mixTags(true);
        }
        return false;
    });


    /*$('.country_balun .flag a').mouseover(function(){
     $('.country_bubble').css({'visibility':'hidden'});
     $(this).parent().next().css({'visibility':'visible'});
     });*/



    $('.descr_mark').each(function(){
        var cow = ($(this).find('.bl_link').size())*178;
        $(this).css({'width':cow+'px'});
    });
    
    $(".js-close-drop-search").click(function () {
        $('.drop-search').fadeOut(0);
        return false;
    });
	
}


/*****TagsCloud Mix******/
var tagsAlreadyMixed = false;
function mixTags(realRun) {
    realRun = realRun || false;

    if (tagsAlreadyMixed || realRun == false)
        return;

    var hb = $(".tagscloud").height();
    var wb = $(".tagscloud").width();


    //$(".tagscloud a").css('left',-9999);

    var arNotPlaced = [];
    var arPlaced = [];
    $(".tagscloud a").each(function(q) {
        var pos = $(this).position();
        var item = {'el': $(this), 'width': $(this).outerWidth(), 'height': $(this).outerHeight(), 'left': pos.left, 'top': pos.top};
        arNotPlaced.push(item);
    });
    var infodiv = $(".tagscloud div:first");

    var error = 0;
    var errorcycle = 0;
    do {
        for (var q = 0; q < arNotPlaced.length; q++) {
            var ws = arNotPlaced[q].width;
            var hs = arNotPlaced[q].height;


            var cx = Math.floor(Math.random()*(wb-ws));
            var cy = Math.floor(Math.random()*(hb-hs));

            var oo = 0;
            var ok = false;
            while (!ok) {
                var out = true;
                for (var i = -oo; ((i <= oo)&&(!ok)); i++) {
                    if (((cy + i)<0)||((cy + i)>=hb))
                        continue;

                    for (var j = -oo; ((j <= oo)&&(!ok)); j++) {
                        if (((cx + j)<0)||((cx + j)>=wb))
                            continue;

                        out = false;
                        if ((Math.abs(i) == oo)||((Math.abs(j) == oo))) {
                            var x1 = cx + j;
                            var y1 = cy + i;
                            var x2 = x1 + ws;
                            var y2 = y1 + hs;
                            if ((x2 > wb)||(y2 > hb))
                                continue;
                            var ok2 = true;
                            for (var z = 0; z < arPlaced.length; z++) { //check for covering
                                var wa = arPlaced[z].width;
                                var ha = arPlaced[z].height;

                                var xa1 = arPlaced[z].left;
                                var ya1 = arPlaced[z].top;
                                var xa2 = xa1 + wa;
                                var ya2 = ya1 + ha;

                                //перекрывается с кем то
                                if ((((x1>=xa1)&&(x1<xa2))||((xa1>=x1)&&(xa1<x2)))&&(((y1>=ya1)&&(y1<ya2))||((ya1>=y1)&&(ya1<y2)))) {
                                    ok2 = false;
                                    break;
                                }
                            }
                            if (ok2) {
                                arNotPlaced[q].left = x1;
                                arNotPlaced[q].top = y1;
                                arPlaced.push(arNotPlaced[q]);
                                ok = true;
                            }
                        }
                    }
                }
                oo++;
                if (out) {
                    error++;
                    break;
                }
            }
        }
    } while ((error != 0)&&(errorcycle < 10));

    if (errorcycle < 10) {
        for (var z = 0; z < arPlaced.length; z++) {
            arPlaced[z].el.css('left',arPlaced[z].left);
            arPlaced[z].el.css('top',arPlaced[z].top);
        }
    }
    else {
        $(".tagscloud a").css('left','');
        $(".tagscloud a").css('position','relative');
    }

    tagsAlreadyMixed = true;
}

var tagsAlreadyMixed2 = false;
function mixTags2(realRun) {
    console.log("mixTags2 start");
    realRun = realRun || false;

    if (tagsAlreadyMixed2 || realRun == false) {
        console.log("mixTags2 end over start");
        return;
    }

    var hb = $(".tagscloud2").height();
    var wb = $(".tagscloud2").width();


    //$(".tagscloud a").css('left',-9999);

    var arNotPlaced = [];
    var arPlaced = [];
    $(".tagscloud2 a").each(function(q) {
        var pos = $(this).position();
        var item = {'el': $(this), 'width': $(this).outerWidth(), 'height': $(this).outerHeight(), 'left': pos.left, 'top': pos.top};
        arNotPlaced.push(item);
    });
    var infodiv = $(".tagscloud2 div:first");

    var error = 0;
    var errorcycle = 0;
    do {
        for (var q = 0; q < arNotPlaced.length; q++) {
            var ws = arNotPlaced[q].width;
            var hs = arNotPlaced[q].height;


            var cx = Math.floor(Math.random()*(wb-ws));
            var cy = Math.floor(Math.random()*(hb-hs));

            var oo = 0;
            var ok = false;
            while (!ok) {
                var out = true;
                for (var i = -oo; ((i <= oo)&&(!ok)); i++) {
                    if (((cy + i)<0)||((cy + i)>=hb))
                        continue;

                    for (var j = -oo; ((j <= oo)&&(!ok)); j++) {
                        if (((cx + j)<0)||((cx + j)>=wb))
                            continue;

                        out = false;
                        if ((Math.abs(i) == oo)||((Math.abs(j) == oo))) {
                            var x1 = cx + j;
                            var y1 = cy + i;
                            var x2 = x1 + ws;
                            var y2 = y1 + hs;
                            if ((x2 > wb)||(y2 > hb))
                                continue;
                            var ok2 = true;
                            for (var z = 0; z < arPlaced.length; z++) { //check for covering
                                var wa = arPlaced[z].width;
                                var ha = arPlaced[z].height;

                                var xa1 = arPlaced[z].left;
                                var ya1 = arPlaced[z].top;
                                var xa2 = xa1 + wa;
                                var ya2 = ya1 + ha;

                                //перекрывается с кем то
                                if ((((x1>=xa1)&&(x1<xa2))||((xa1>=x1)&&(xa1<x2)))&&(((y1>=ya1)&&(y1<ya2))||((ya1>=y1)&&(ya1<y2)))) {
                                    ok2 = false;
                                    break;
                                }
                            }
                            if (ok2) {
                                arNotPlaced[q].left = x1;
                                arNotPlaced[q].top = y1;
                                arPlaced.push(arNotPlaced[q]);
                                ok = true;
                            }
                        }
                    }
                }
                oo++;
                if (out) {
                    error++;
                    break;
                }
            }
        }
    } while ((error != 0)&&(errorcycle < 10));

    if (errorcycle < 10) {
        for (var z = 0; z < arPlaced.length; z++) {
            arPlaced[z].el.css('left',arPlaced[z].left);
            arPlaced[z].el.css('top',arPlaced[z].top);
        }
    }
    else {
        $(".tagscloud2 a").css('left','');
        $(".tagscloud2 a").css('position','relative');
    }

    tagsAlreadyMixed2 = true;
    console.log("mixTags2 end");
}




// new function

var handler3 = function () {
    	
	// compare	
	var compLen = (".box-compare__bottom").length;
	if(compLen>0){	
		$(".list-characteristics_1 .list-characteristics__item").css("height","auto");
		for (var i=1; i<99; i++){
			var height1 = 0; 	
			$('.list-characteristics_1 .list-characteristics__item:nth-child('+i+')').each(function() {height1 = height1 > $(this).height() ? height1 : $(this).height();});	
			$('.list-characteristics_1 .list-characteristics__item:nth-child('+i+')').each(function() {$(this).css("height",height1+"px")});		
		}			
		setTimeout(function(){
			$(".list-characteristics_1 .list-characteristics__item").css("height","auto");
			for (var i=1; i<99; i++){
				var height1 = 0; 	
				$('.list-characteristics_1 .list-characteristics__item:nth-child('+i+')').each(function() {height1 = height1 > $(this).height() ? height1 : $(this).height();});	
				$('.list-characteristics_1 .list-characteristics__item:nth-child('+i+')').each(function() {$(this).css("height",height1+"px")});		
			}		
		}, 500);

		$(".list-characteristics_2 .list-characteristics__item").css("height","auto");
		for (var i=1; i<99; i++){
			var height2 = 0; 	
			$('.list-characteristics_2 .list-characteristics__item:nth-child('+i+')').each(function() {height2 = height2 > $(this).height() ? height2 : $(this).height();});	
			$('.list-characteristics_2 .list-characteristics__item:nth-child('+i+')').each(function() {$(this).css("height",height2+"px")});		
		}			
		setTimeout(function(){
			$(".list-characteristics_2 .list-characteristics__item").css("height","auto");
			for (var i=1; i<99; i++){
				var height2 = 0; 	
				$('.list-characteristics_2 .list-characteristics__item:nth-child('+i+')').each(function() {height2 = height2 > $(this).height() ? height2 : $(this).height();});	
				$('.list-characteristics_2 .list-characteristics__item:nth-child('+i+')').each(function() {$(this).css("height",height2+"px")});		
			}		
		}, 500);

		$(".list-characteristics_3 .list-characteristics__item").css("height","auto");
		for (var i=1; i<99; i++){
			var height3 = 0; 	
			$('.list-characteristics_3 .list-characteristics__item:nth-child('+i+')').each(function() {height3 = height3 > $(this).height() ? height3 : $(this).height();});	
			$('.list-characteristics_3 .list-characteristics__item:nth-child('+i+')').each(function() {$(this).css("height",height3+"px")});		
		}			
		setTimeout(function(){
			$(".list-characteristics_3 .list-characteristics__item").css("height","auto");
			for (var i=1; i<99; i++){
				var height3 = 0; 	
				$('.list-characteristics_3 .list-characteristics__item:nth-child('+i+')').each(function() {height3 = height3 > $(this).height() ? height3 : $(this).height();});	
				$('.list-characteristics_3 .list-characteristics__item:nth-child('+i+')').each(function() {$(this).css("height",height3+"px")});		
			}		
		}, 500);
	}
	// compare		
	
}


/**
 * Запуск специфичного кода для страницы сравнения товара
 */
var setUpComparePage = function() {

    handler3();
    $(window).bind('resize', handler3);

    var galleryProductCompareClassSelector = $('.gallery-product-compare');
    if (galleryProductCompareClassSelector.length) {
        galleryProductCompareClassSelector.slick({
            infinite: true,
            speed: 300,
            adaptiveHeight: true,
            autoplay: false,
            autoplaySpeed: 2000,
            slidesToShow: 6,
            responsive: [{
                breakpoint: 1200,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 1
                }
            }, {
                breakpoint: 1150,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1
                }
            }, {
                breakpoint: 950,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            }, {
                breakpoint: 800,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }, {
                breakpoint: 650,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }]
        });
    };


    $(document).on('click', '.gallery-product-compare__column .delete[data-role=remove-from-comparison]', function(event){

        event.preventDefault();
        var $el = $(this);
        var card = $el.closest('.gallery-product-compare__column');
        card.addClass("loading");

        // Make ajax request
        $.ajax({
            url: "/catalogue/ajax",
            method: "POST",
            data: {productId: $el.data("productId"), categoryId: $el.data("categoryId"), method: "removeFromComparison"},
            dataType: "json"
        })
            .done(function(data){
                card.removeClass("loading");

                if (data.result) {
                    card.hide(function(){
                        card.remove();
                    });
                } else {
                    if (data.redirect) {
                        window.location = data.redirect;
                    } else {
                        console.log('result:false');
                    }
                }
            })
            .fail(function(data){
                console.log("remove-from-comparison ajax fail data", data);
                card.removeClass("loading");
            });

    });

}