$(window).load(function() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
        $('body').addClass('ios');
    } else {
        $('body').addClass('web');
    };
    $('body').removeClass('loaded');
});
/* viewport width */
function viewport() {
    var e = window,
        a = 'inner';
    if (!('innerWidth' in window)) {
        a = 'client';
        e = document.documentElement || document.body;
    }
    return {
        width: e[a + 'Width'],
        height: e[a + 'Height']
    }
};
/* viewport width */
$(function() {
    /* placeholder*/
    $('input, textarea').each(function() {
        var placeholder = $(this).attr('placeholder');
        $(this).focus(function() {
            $(this).attr('placeholder', '');
        });
        $(this).focusout(function() {
            $(this).attr('placeholder', placeholder);
        });
    });
    /* placeholder*/
    /* button-nav*/
    $('.js-button-nav').click(function() {
        //$(this).toggleClass('active'), 
        $('header').toggleClass('open-mob-nav');
        $('.box-main-nav').slideToggle();
        $('body').toggleClass('no-scroll');
        $('html').toggleClass('no-scroll');
        return false;
    });
    /* button-nav*/
    /* short-header*/
    $('.js-menu-btn').click(function() {
        $('header').toggleClass('header-narrow');
        $('.content-wrap').toggleClass('header-narrow');
        return false;
    });
    /* short-header*/
    /*mob-filt*/
    $('.js-open-mob-filt').click(function() {
        $('.box-filter').toggleClass('visible-mob');
        $('body').toggleClass('overlay');
        return false;
    });
    $('.js-close-mob-filt').click(function() {
        $('.box-filter').removeClass('visible-mob');
        $('body').removeClass('overlay');
        return false;
    });
    
    $(document).on('touchstart click', function(e) {
        if ($(e.target).parents().filter('.box-filter:visible').length != 1) {
            $('.box-filter').removeClass('visible-mob');
            $('body').removeClass('overlay');
        }
    });
    /*mob-filt*/
    /* remove field offer*/
    $('.js-remove-field').click(function() {
        $(this).parents('.offers-list__item').addClass('hide-offers');
        return false;
    });
    /* remove field offer*/
    /* user-button*/
    $('.js-user').toggle(function() {
        $(this).parent().find('.user-inf').slideDown();
        $(this).addClass('user-open');
        $('.box-logo').addClass('user-open');
        return false;
    }, function() {
        $(this).parent().find('.user-inf').slideUp();
        $('.box-logo').removeClass('user-open');
        $(this).removeClass('user-open');
        return false;
    });
    $(document).on('touchstart click', function(e) {
        if ($(e.target).parents().filter('.user-inf:visible').length != 1) {
            $('.user-inf').slideUp();
            $('.box-logo').removeClass('user-open');
            $('.js-user').removeClass('user-open');
        }
    });
    /* user-button*/
    /* Add Funds*/
    $('.js-add-funds').click(function() {
        $(this).parent().find('.add-balans').toggleClass('add-balans-open');
        return false;
    });
    $(document).on('touchstart click', function(e) {
        if ($(e.target).parents().filter('.add-balans:visible').length != 1) {
            $('.add-balans').removeClass('add-balans-open');
        }
    });
    /* Add Funds*/
    /* accordion*/
    $('.js-acord').click(function() {
        $(this).parent().find('.accordion__cont').slideToggle();
        $(this).parent().toggleClass('accordion-open');
        $(this).parent().siblings().removeClass('accordion-open');
        $(this).parent().siblings().find('.accordion__cont').slideUp();
        return false;
    });
    /* accordion */
    /* tabs*/
    $('.tabs li a').click(function() {
        $(this).parents('.tab-wrap').find('.tab-cont').addClass('hide-tab');
        $(this).parent().siblings().removeClass('active');
        var id = $(this).attr('href');
        $(id).removeClass('hide-tab');
        $(this).parent().addClass('active');
        return false;
    });
    $('.tabs-big li a').click(function() {
        $(this).parents('.page-campaign').find('.tab-wrap-big').addClass('hide-tab');
        $(this).parent().siblings().removeClass('active');
        var id = $(this).attr('href');
        $(id).removeClass('hide-tab');
        $(this).parent().addClass('active');
        return false;
    });
    /* tabs */
    /*play stop*/
    $('.js-play').toggle(function() {
        $(this).find('.icon-circle').addClass('stop');
        $(this).find('.tooltip').text("Stopped");
        return false;
    }, function() {
        $(this).find('.icon-circle').removeClass('stop');
        $(this).find('.tooltip').text("Play");
        return false;
    });
    /*play stop*/
    /*offers-icons-mob*/
    $('.js-open-offers-icons-mob').click(function() {
        $(this).parents('.offers-list__item').find('.open-offers-icons').toggleClass('offers-icons-visb');
        return false;
    });
    /*offers-icons-mob*/

    /*active-link filter*/
    $('.js-active-link').click(function() {
        $(this).parent('').addClass('active');
        $(this).parent().siblings().removeClass('active');
        return false;
    });
    /*active-link filter*/
    /*counter investor*/
    $('.counter__link-prev').click(function() {
        var $input = $(this).parents('.box-counter').find('input');
        var count = parseInt($input.val()) - 10;
        if (count) {
            count = count < 10 ? 10 : count;
        } else count = 10;
        $input.val(count);
        $input.change();
        return false;
    });
    $('.counter__link-next').click(function() {
        var $input = $(this).parents('.box-counter').find('input');
        var count = parseInt($input.val()) + 10;
        if (count) {
            count = count > ($input.attr("maxlength")) ? ($input.attr("maxlength")) : count;
        } else count = 10;
        $input.val(count);
        $input.change();
        return false;
    });
    /*counter investor*/
    /*select-date*/
    $('.js-select-date').click(function() {
        $(this).parent().find('.select-date-list').toggleClass('open-select-list');
        $(this).toggleClass('open-select');
        return false;
    });
    $('.select-date-list__link').click(function() {
        $(this).parent().siblings().removeClass("active");
        $(this).addClass("active");
        var text = $(this).find('.select-date-list__text').html();
        $('.select-date-list').removeClass('open-select-list');
        $(this).closest(".select-date").find('.select-date__title').html(text);
        $('.select-date-list').removeClass('open-select-list');
        $('.select-date__title').removeClass('open-select');
        return false;
    });
    $(document).on('touchstart click', function(e) {
        if ($(e.target).parents().filter('.select-date-list:visible').length != 1) {
            $('.js-select-date').removeClass('open-select');
            $('.select-date-list').removeClass('open-select-list');
        }
    });
    /*select-date*/
    /*form-valide*/
    $('.rf').each(function() {
        var form = $(this),
            btn = form.find('.btn_submit');
        form.find('.rfield').addClass('empty_field');

        function checkInput() {
            form.find('.rfield').each(function() {
                if (($(this).val() != '') && ($(this).val() != '(___)_______')) {
                    $(this).removeClass('empty_field');
                } else {
                    $(this).addClass('empty_field');
                }
            });
        }

        function lightEmpty() {
            form.find(".box-validate").removeClass("show");
            form.find('.empty_field').parents('.box-validate').addClass("show");
        }
        setInterval(function() {
            checkInput();
            var sizeEmpty = form.find('.empty_field').size();
            if (sizeEmpty > 0) {
                if (btn.hasClass('btn-disabled')) {
                    return false
                } else {
                    btn.addClass('btn-disabled')
                }
            } else {
                btn.removeClass('btn-disabled')
            }
        }, 500);
        btn.click(function() {
            if ($(this).hasClass('btn-disabled')) {
                lightEmpty();
                return false
            } else {
                form.submit();
            }
        });
        $(document).click(function(event) {
            if ($(event.target).closest(".box-validate").length) return;
            form.find(".box-validate").removeClass("show");
            event.stopPropagation();
        });
    });
        $('.table-dots-mobile').click(function(e){
            e.preventDefault();
            $(this).toggleClass('active');
            $(this).parents('.sites-table-row').find('.sites-table-row__options').toggleClass('active');
        }); 


    /*form-valide*/
    /* components */
    /*DATEPICKER*/
    if($('#datepicker').length){
        $('#datepicker').datepicker( $.datepicker.regional[ "ru" ]);    
    };
    if($('#datepicker1').length){
        $('#datepicker1').datepicker( $.datepicker.regional[ "ru" ]);    
    };
    if($('#datepicker2').length){
        $('#datepicker2').datepicker( $.datepicker.regional[ "ru" ]);   
    };
    if($('#datepicker3').length){
        $('#datepicker3').datepicker( $.datepicker.regional[ "ru" ]);    
    };
    if($('#datepicker4').length){
        $('#datepicker4').datepicker( $.datepicker.regional[ "ru" ]);   
    };
    /*DATEPICKER*/
    if ($('.styled').length) {
        $('.styled').styler({
            selectSearch: true
        });
    };
    if($('.js-mscroll').length){
        $('.js-mscroll').mCustomScrollbar();
    }
    if ($('#graph').length) {
        $('#graph').highcharts({
            chart: {
                type: 'line',
                zoomType: 'xy'
            },
            title: {
                text: ''
            },
            subtitle: {
                text: ''
            },
            xAxis: {
                categories: ['06.02.17', '07.02.17', '08.02.17', '09.02.17', '10.02.17', '11.02.17','12.02.17']
            },
            yAxis: {
                title: {
                    text: ''
                }
            },
            credits: {
                enabled: false
            },
            legend: {
                align: 'right',
                verticalAlign: 'top',
                x: 10,
                y: 0
            },
            plotOptions: {
                line: {
                    dataLabels: {
                        enabled: true
                    },
                    enableMouseTracking: false
                }
            },
            series: [{
                name: 'Impressions',
                data: [4, 0, 0, 0, 0, 0, 0]
            },
            {
                name: 'Revenue',
                data: [5, 1, 2, 5, 5, 1, 1]
            },
            {
                name: 'ECPM',
                data: [4, 1, 1, 1, 1, 1, 1]
            }
            ]
        });
    };
    /* components */
});

var handler = function() {

    var height_footer = $('footer').height();
    var height_header = $('header').height();
    $('.content').css({
        'padding-bottom': height_footer + 10
    });


    var viewport_wid = viewport().width;
    var viewport_height = viewport().height;

    if (viewport_wid <= 991) {

    }

}
$(window).bind('load', handler);
$(window).bind('resize', handler);