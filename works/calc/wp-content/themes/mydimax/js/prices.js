// Делаем вкладку активной при клике + переключение табов
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

$(".prices__categories-item").click(function(){
    var w = viewport().width;
  $(this).addClass("active").siblings().removeClass("active");
  $('.last-slide-actions').css('display', 'none');
  if( $(this).find('.js-tab').attr('href') == '#panel_1' ){
    
    $(this).parents('.prices-content').find('.prices__forms').each(function(){
        $(this).removeClass('active');
    });

    $(this).parents('.prices-content').find('.prices__forms-list #tab_1').addClass('active');

    if( w < 768 ){
        var ste = $(this).parents('.prices-content').find('.prices__forms-list #tab_1');
        $('html, body').animate({ scrollTop: $(ste).offset().top }, 500);
    }
    

    if( $(this).parents('.single-content').find('#tab_1 .prices__tabs li:last-child').hasClass('active') ){
        $('.last-slide-actions').css('display', 'block');
    }
  };

  if( $(this).find('.js-tab').attr('href') == '#panel_2' ){

    $(this).parents('.prices-content').find('.prices__forms').each(function(){
        $(this).removeClass('active');
    });
    
    $(this).parents('.prices-content').find('.prices__forms-list #tab_2').addClass('active');

    if( w < 768 ){
        var ste = $(this).parents('.prices-content').find('.prices__forms-list #tab_2');
        $('html, body').animate({ scrollTop: $(ste).offset().top }, 500);
    }

    if( $(this).parents('.single-content').find('#tab_2 .prices__tabs li:last-child').hasClass('active') ){
        $('.last-slide-actions').css('display', 'block');
    }
  };

  if( $(this).find('.js-tab').attr('href') == '#panel_3' ){
    
    $(this).parents('.prices-content').find('.prices__forms').each(function(){
        $(this).removeClass('active');
    });
    $(this).parents('.prices-content').find('.prices__forms-list #tab_3').addClass('active');

    if( w < 768 ){
        var ste = $(this).parents('.prices-content').find('.prices__forms-list #tab_3');
        $('html, body').animate({ scrollTop: $(ste).offset().top }, 500);
    }

    if( $(this).parents('.single-content').find('#tab_3 .prices__tabs li:last-child').hasClass('active') ){
        $('.last-slide-actions').css('display', 'block');
    }
  }

});



$('.list-radio__item').click(function(){
    $('.list-radio .list-radio__item').each(function(){
        $(this).removeClass('active');
    })
    $(this).addClass('active');
});


$('.prices__tabs li a').click(function(e){
    e.preventDefault();
    if ( $(this).parents('li').hasClass('disabled') ){
        return;
    } else {
        var tab = $(this).attr('href');
        $(this).parents('.prices__forms').find('.prices__form-slide').not(tab).removeClass('active');
        $(tab).next().animate({
            left: '100%'
        }, 500);
        $(tab).addClass('active').animate({
            left: '0%'
        }, 500);

        if( $(this).parents('.prices__forms').find('.prices__form-slide:first-child').hasClass('active') ){
            $(this).parents('.prices__forms').find('.prices__form-slide:last-child').css('left', '100%');
        };
        if( $(this).parents('.prices__forms').find('.prices__form-slide:last-child').hasClass('active') || 
            $(this).parents('.prices__forms').find('.prices__form-slide:nth-child(2n)').hasClass('active') ){
            $(this).parents('.prices__forms').find('.prices__form-slide:first-child').css('left', '-100%');
        };
        if( $(this).parents('.prices__forms').find('.prices__form-slide:last-child').hasClass('active') ){
            $(this).parents('.prices__forms').find('.prices__form-slide:nth-child(2n)').css('left', '-100%');
        }


        $(this).parents('.prices__tabs').find('li').each(function(){
            $(this).removeClass('active');
        });
        $(this).parents('li').removeClass('disabled');
        $(this).parents('li').addClass('active');
    }
    if( $(this).parents('.prices__forms-list').find('#tab_1.active .prices__tabs li:last-child').hasClass('active') ){
        $('.last-slide-actions').css('display', 'block');
    } else{
        $('.last-slide-actions').css('display', 'none');
    }
})



// Показ доп. цветов
$('.js-color').click(function(){
    $(this).parents('.prices__inputblock').find('.window-select-color').toggleClass('active');
});
$('.js-close').click(function(e){
    e.preventDefault();
    $(this).parents('.window-select-color').removeClass('active');
})
// Выбор доп. цвета
$('.list-radio_colors .list-radio__label').click(function(){
    var selectedColor = $(this).css('background-color');
    var selectedColorText = $(this).find('.label-text').html();

    $(this).parents('.prices__inputblock').find('.js-color').html(selectedColorText);
    $(this).parents('.prices__inputblock').find('.js-color').css('background-color', selectedColor);
    $(this).parents('.window-select-color').removeClass('active');
});


// Делаем кнопку активной
$(".prices__checkradio label").click(function(){
    $(this).parents(".prices__form-slide").find("[data-slide='next']").removeClass("disabled");
});

$(".prices__form input").on("keyup change", function(){
    $(this).parents(".prices__form-slide").find("[data-slide='next']").removeClass("disabled");
});

$('.prices__button').click(function(){
    var flag = 0;
    var flag1 = 0;
    var flag2 = 0;
    var flag3 = 0;
    if( $(this).hasClass('js-check') ){
        $(this).parents('.prices__form-slide').find('input[type="number"]').each(function(){
            if( ($(this).val()) <= 0 ){
                $(this).parents('.prices__inputblock').addClass('error');
                flag3 = 1;
                return;
            } else {
               $(this).parents('.prices__inputblock').removeClass('error');
                flag3 = 0; 
            }
        });
        if (flag3 == 1){
            return;
        }
    }   
    if( $(this).hasClass('js-check1') ){
        $(this).parents('.prices__form-slide').find('input[type="number"]').each(function(){
            if( ($(this).val()) <= 0 ){
                $(this).parents('.prices__inputblock').addClass('error');
                flag = 1;
                return;
            } else {
                $(this).parents('.prices__inputblock').removeClass('error');
                flag = 0;
            }
        })
        if ( $(this).parents('.prices__form-slide').find('.list-radio__item.active').length < 1 ){
            $(this).parents('.prices__form-slide').find('.burden-radio-block').addClass('error-radio');
            flag1 = 1;
        } else{
            $(this).parents('.prices__form-slide').find('.burden-radio-block').removeClass('error-radio');
            flag1 = 0;
        }

        if (flag == 1 || flag1 == 1){
            return;
        }
    };
    if( $(this).hasClass('js-check2') ){
        var inputs = $(this).parents('.prices__form-slide').find('.prices__inputblock').length;
        var selInputs = $(this).parents('.prices__form-slide').find('.prices__inputblock.active').length;
        var errInputs = $(this).parents('.prices__form-slide').find('.prices__inputblock.error').length;


        $(this).parents('.prices__form-slide').find('input[type="number"]').each(function(){
            if( ($(this).val()) <= 0 ){
                $(this).parents('.prices__inputblock').addClass('error');
                flag2 = 1;
                return;
            } else {
                $(this).parents('.prices__inputblock').removeClass('error');
            }
        });

        if (flag2 == 1){
            return;
        }
    }
    var pr = 100;
    if( !$(this).hasClass('disabled') ){
        $(this).parents('.prices__form-wrapper').find('.prices__form-slide').each(function(){
            $(this).removeClass('active');
        });
        $(this).parents('.prices__forms').find('.prices__tabs li.active').next().removeClass('disabled');
        $(this).parents('.prices__forms').find('.prices__tabs li.active').removeClass('active').next().addClass('active');
        
        $(this).parents('.prices__form-slide').animate({
            left: pr-100*2 + '%'
        }, 500)
        $(this).parents('.prices__form-slide').next().addClass('active').animate({
            left: pr-100 + '%'
        }, 500);
    }





    if( $(this).parents('.prices__forms-list').find('#tab_1.active .prices__tabs li:last-child').hasClass('active') ){
        $('.last-slide-actions').css('display', 'block');
    } else{
        $('.last-slide-actions').css('display', 'none');
    }




    var ste = $(this).parents('.prices__forms');
    $('html, body').animate({ scrollTop: $(ste).offset().top }, 500);

});


// Слайдер
// function slider(el) {
//     var slider = el,
//         currentslide = 1,
//         wrapper = slider.find(".prices__form-wrapper"),
//         tabs = slider.find(".prices__tabs"),
//         slide = slider.find(".prices__form-slide");
    
//     // Следующий слайд
//     function nextslide() {
//         currentslide += 1;
//         changeslide();
//         $(".prices__categories-item").click(function(){
//             currentslide = 1;
//         })
//     }
    
//     // Смена слайда
//     function changeslide() {
//         wrapper.css("transform", "translate3d("+ (-(currentslide-1)*33.333) +"%,0,0)");
//         tabs.find("li:eq("+(currentslide-1)+")").addClass("active").siblings().removeClass("active");
//     }
    
//     changeslide();
    
//     // Нажатие по кнопке "далее"
//     $("[data-slide='next']").click(function(){
//         nextslide();
//     });
    
//     // Клик по табу
//     tabs.find("li").click(function(){
//         var index = $(this).index()+1;
//         if (index <= currentslide) {
//             currentslide = index;
//             changeslide();
//         }
//     });
// }

// slider( $(".prices__form") );




// Проверка форм
$("[data-required]").each(function(){
    var input = $(this).find("input");
    input.on("change input keyup", function(){
        if (input.val().length > 0) {
            $(this).parents("[data-required]").addClass("active");
            $(this).parents("[data-required]").removeClass("error");
        } else {
            $(this).parents("[data-required]").addClass("error");
        }
    });
});


// Маска поля ввода
$(document).ready(function(){
    $('.prices__form-slide:first-child').css('left', '0%');
   $("input[name='tel']").inputmask("+7 (999) 999-99-99");
   
   if ($('.styled').length) {
        $('.styled').styler();
    };
    $(".fancybox").fancybox();

});


