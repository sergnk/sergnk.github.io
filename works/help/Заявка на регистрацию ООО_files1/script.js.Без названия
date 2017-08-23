$( document ).ready(function() {

  BX.addCustomEvent("onAfterSetCity", function(city, city_id, full_name, identified_city_name){
    
    var identified_city_name = $.cookie("IDENTIFIED_CITY_NAME");
    $.cookie.json = true;
    var chosen_city_name = $.cookie("BITRIX_SM_ALTASIB_GEOBASE_CODE").CITY.NAME;
    console.log(chosen_city_name+"|"+identified_city_name);
    if(city != 'Москва' && chosen_city_name != identified_city_name){
       $.cookie('not_moscow', 'Y', { expires: 7, path: '/' });
       location.reload();     
    }else{
      $.removeCookie('not_moscow', { path: '/' });
      location.reload(); 
    }

  });


/*new lik table start*/
  $(".new_likvidation_wrapper tr.dop a").click(function(event) {

      if($(this).hasClass("active")){
        $(this).parents("table:first").find("tr.dop ~ tr").css("display","none");
        $(this).removeClass("active");
      }else{
        $(this).addClass("active");
        $(this).parents("table:first").find("tr.dop ~ tr").css("display","table-row");
      }
     
  });

  $(".new_likvidation_wrapper table.cost-table td .wrap img").hover(function(){
    $(this).next(".description").css({"display":"block","opacity":"0"}).animate({"opacity":"1"}, 400).clearQueue();
  },function(){
    $(this).next(".description").animate({"opacity":"0"}, 400,function(){
        $(this).next(".description").css({"display":"none"});
    }).clearQueue();
  })

  $(".liq_order_new").click(function(){
      var name = $(this).parents("tr:first").find(".name > span").text();
      $("#LiqFirmModal .liq_name_hidden_value").val(name);
      $("#LiqFirmModal .liq_name_hidden_text").text(name);
  })

/*new lik table end*/



/*ask a question start*/
    $("#get-faq-form").click(function() {
      $(this).hide('400');
      $("#faq-form").show('400');
    });
    $("#hide-faq-form").click(function() {
      $("#faq-form").hide('400');
      $("#get-faq-form").show('400');
    });


    $(".faq-order-submit").click(function(e){
      e.preventDefault();
      var $this = $(this);
      $("#faq-form .non_empty_field").each(function(index, el) {
        
        if(!$(this).val().replace(/\s+/g, '').length){
          $(this).removeClass("has_success").addClass("has_error");
        }else{
          $(this).removeClass("has_error").addClass("has_success");
        }

      });

      if($("#faq-form .has_success").length == $("#faq-form .non_empty_field").length){
        $("#faq-form .non_empty_field").removeClass('has-error').addClass("has-success");
        $this.attr("disabled",true).val("Пожалуйста, подождите...");


        sendAjaxFAQ();  
      }else{
        return false;
      }

      return false;
    })


    $("#faq-form .non_empty_field").focusout(function(event) {
        if(!$(this).val().replace(/\s+/g, '').length){
          $(this).removeClass("has_success").addClass("has_error");
        }else{
          $(this).removeClass("has_error").addClass("has_success");
        }
    });


    function sendAjaxFAQ() {
        var form = $("#faq-form");
        var serialized_data = form.serialize();

        $.ajax({  
          type: "POST",  
          url: "/include/faq/ajax.php",  
          data: serialized_data,  
          success: function(response){
            form.empty();
            form.html(response);
          }
      
        }); 

      } 

/*ask a question end*/



/***/
    $("#CallbackInpageFormSRO .bind-value").change(function(){
      var this_val = $(this).val();
      var this_name = $(this).attr("name");
      $("#calkulatorSRO_modal input[name='form_fields_values["+this_name+"_val]']").val(this_val);
    })
    $("#CallbackInpageFormSRO #sroCalcOsobennosti1").change(function(){
      if($(this).is(":checked")){
        var this_val = "Да";
      }else{
        var this_val = "Нет";
      }
      var this_name = $(this).attr("name");
      $("#calkulatorSRO_modal input[name='form_fields_values["+this_name+"_val]']").val(this_val);
    })
    $("#CallbackInpageFormSRO #sroCalcOsobennosti2").change(function(){
      if($(this).is(":checked")){
        var this_val = "Да";
      }else{
        var this_val = "Нет";
      }
      var this_name = $(this).attr("name");
      $("#calkulatorSRO_modal input[name='form_fields_values["+this_name+"_val]']").val(this_val);
    })
/***/

  $(".sro-order").click(function(){

      var name = $(this).next().val();
      $("#sro-name-hidden-form-field").val(name);
  })

  
  $('ul.popup_tabs').on('click', 'li:not(.current)', function() {  
    $(this).addClass('current').siblings().removeClass('current')  
      .parents('div.section').find('div.box').eq($(this).index()).fadeIn(150).siblings('div.box').hide();  
  })  
  
  $(".first_ip").click(function(){
    $(".first_ip_activator").click();
  })  
  $(".first_ooo").click(function(){
    $(".first_ooo_activator").click();
  })

  $( ".sub-menu .popup" ).children( "a" ).click(function() {
    $( ".sub-menu a" ).removeClass( "active" ).next( "div" ).removeClass( "active" );
    $( this ).addClass( "active" ).next( "div" ).addClass( "active" );
  });

  // Табы
  $( ".tabs a" ).click(function() {
    $( this ).parent().children( "a" ).removeClass( "active" );
    $( this ).addClass( "active" );
    var block = '.' + $( this ).attr( "tab" );
    $( this ).parent().parent().children().children( ".row" ).hide();
    $( block ).show();
  });
  
  // Верхнее выпадающее меню
  $( ".top-menu-block .link-sub-menu" ).click(function() {
    $( this ).next( ".sub-menu-head" ).toggle();
  });
  
  // Основное выпадающее меню
  $( ".sub-menu-main-link" ).click(function() {
    $( ".sub-menu-main" ).toggle();
  });
  
  // Блок Юридические услуги
  $( ".services .arrow a" ).click(function() {
    $( this ).parent().parent().toggleClass( "active" );
  });
  
  // Маленькая листалка
  $( ".slide .right-arrow" ).click(function() {
    var activeBlock = $( this ).parent().children( ".slide-list" ).children( "div.active" ).removeClass( "active" );
    var parent = $( this ).parent().children( ".slide-list" );
    var nextBlock = $( activeBlock ).next( "div" ).addClass( "active" );
    $( activeBlock ).appendTo( parent );
  });
  
  $( ".slide .left-arrow" ).click(function() {
    var activeBlock = $( this ).parent().children( ".slide-list" ).children( "div.active" ).removeClass( "active" );
    var parent = $( this ).parent().children( ".slide-list" );
    var prevBlock = $( parent ).children("div.item:last-child").addClass( "active" );
    $( prevBlock ).prependTo( parent );
  });
  
  // Основной слайдер
  $( ".main-slider-link a" ).click(function() {
    var active = $( this ).hasClass("active");
    if(active !== true){
      var eq = $( this ).attr("slide");
      $( ".main-slider-block .item" ).removeClass( "active" );
      $( ".main-slider-block .item" ).eq( eq ).addClass( "active" );
      $( ".main-slider-link a" ).removeClass( "active" );
      $( this ).addClass( "active" );
    }
  });
  
  
	// Main carousel
	var carousel = $('.carousel').bxSlider({
		auto: true,
		autoHover: true,
		mode: 'fade',
		speed: 1000,
		pause: 5000,
		controls: false
	});

	$('.carousel-wrapper').on('click', '.bx-controls a', function() {
		//carousel.startAuto();
	});


//Yandex Metrika aims

/*** "перезвонить мне" в шапке - start ***/
$(".callme_pls").on("click",function(){
  console.log("CALLME_TOP_PRESSED");
    yaCounter22729432.reachGoal('CALLME_TOP_PRESSED');
    //return true;
})
/*** "перезвонить мне" в шапке - end ***/

/*** клик по кнопке "каталог фирм" на странице Готовые фирмы - start ***/
if(location.pathname == "/gotovye-firmy/"){
  $("#firm-cat-link").on("click",function(){
    console.log("CATALOG_CLICK");
      yaCounter22729432.reachGoal('CATALOG_CLICK');
      //return true;
  })
}
/*** клик по кнопке "каталог фирм" на странице Готовые фирмы - end ***/

/*** заказ фирмы из каталога - start ***/
$(".catalog-link-order").on("click",function(){
  console.log("ORDER_CLICK");
    yaCounter22729432.reachGoal('ORDER_CLICK');
    //return true;
})
$("#order-form .buy-firm").on("click",function(){
  console.log("ORDER_ORDER_CLICK");
    yaCounter22729432.reachGoal('ORDER_ORDER_CLICK');
    //return true;
})

/*** заказ фирмы из каталога - end ***/

/*** заказ фирмы из карточки товара - start ***/
$(".post .ct-order").on("click",function(){
  console.log("FIRM_ORDER");
    yaCounter22729432.reachGoal('FIRM_ORDER');
    //return true;
})
$(".ct-order-submit").on("click",function(){
  console.log("FIRM_ORDER_ORDER");
    yaCounter22729432.reachGoal('FIRM_ORDER_ORDER');
    //return true;
})

/*** заказ фирмы из карточки товара - end ***/

$("a[href='#reviewModal']").on("click",function(){
      console.log("REVIEW_CLICK");
      yaCounter22729432.reachGoal('REVIEW_CLICK');
      return true;
})

$("a.call").each(function(index, el) {
  if(void 0 === $(this).attr('data-toggle')){
    $(this).attr('data-toggle', 'modal');
  }
});

  
  $(".required").each(function(index, el) {
    var req_block = $(this);
    if(req_block.hasClass('filled-block')){
      //пропускаем
    }else{
      $(".list-required li", this).each(function(index, el) {
        //console.log(index)
        if(index > 3){
          $(this).addClass('hidden-li');
        }
      });     
    }
    if($(".list-required li", this).length > 4){
      $(this).append('<a class="smore" href="javascript:void(0);">Показать еще...</a>')
    }
  });

  $(".required").on("click",".smore",function(){
    $(this).parent().find("li.hidden-li").show(400);
    $(this).remove();
  })

   var detached_filter = $("#filter-to-detach .filter-wrapper").detach();
   $(".left-col .catalog").html(detached_filter);

    var detached_xs_filter = $("#xs-filter-to-detach .filter-wrapper").detach();
    $(".container .xs-filter-catalog").html(detached_xs_filter);


   $("#catalog-filter-list > li.lvl1").each(function(index, val) {
     var ul_height = $(this).find('ul').innerHeight();

     if(ul_height > 66){
      $(this).addClass('collapsed-li').find("a.showchild").after('<div style="position:relative;"><div class="more-wrapper"><span class="show-more">показать еще</span></div></div>');
     }
    // console.log(ul_height);
  });

   $(".more-wrapper span.show-more").click(function(event) {
    var ul_height = $(this).parent().parent().next("ul").innerHeight();
    var li_height = $(this).parent().parent().parent("li.lvl1").innerHeight();
    
    var ulLi_height = $(this).parent().parent().next("ul").find("li").innerHeight();
    var ulLi_count_li = $(this).parent().parent().next("ul").find("li").length;
    var total_ul_height = ulLi_height*ulLi_count_li;

      if($(this).parent().parent().prev("a").text() == "ИФНС №"){
        total_ul_height = total_ul_height/2.9;
      }

       if($(this).parent().parent().prev("a").text() == "Округ Москвы"){
           total_ul_height = total_ul_height/2.9;
       }

    console.log(total_ul_height);
    if($(this).hasClass('uncollapsed')){
      $(this).removeClass('uncollapsed').text("показать еще");
      $(this).parent().parent().parent().animate({"height": "120px"});
      $(this).parent().parent().parent().find("ul").animate({"height": "66px"});
      $(this).parent().animate({"top": "49px"});

    }else{
      $(this).addClass('uncollapsed').text("свернуть");
      $(this).parent().parent().parent().animate({"height": (li_height+total_ul_height-20)+"px"});
      $(this).parent().parent().parent().find("ul").animate({"height": total_ul_height+"px"});
      $(this).parent().animate({"top": (total_ul_height+10)+"px"});


    }

   });
   function hide_modef(){
    $("#modef").hide('slow');
   }

   $("li.lvl2 > input[type=checkbox]").click(function(){
    setTimeout(hide_modef, 5000);
   })



function activeLinks(){
    var uri = location.pathname;
    if(uri != "/"){
        $("header a[href='"+uri+"']").addClass('active');
    }
}

activeLinks();

$("header .links .getmodal").click(function(){
    yaCounter22729432.reachGoal('CALLME_TOP_PRESSED');
})
$(".form-block-search .advanced_search").click(function(){
    yaCounter22729432.reachGoal('CATALOG_CLICK');
})
$(".catalog-link-order").click(function(){
    yaCounter22729432.reachGoal('ORDER_CLICK');
})
$("#order-form").submit(function(){
    yaCounter22729432.reachGoal('ORDER_ORDER_SUBMIT');
})
$(".firm-card .bigblue").click(function(){
    yaCounter22729432.reachGoal('FIRM_ORDER');
})
$(".send-resp .getmodal").click(function(){
    yaCounter22729432.reachGoal('REVIEW_CLICK');
})

});

$(document).ready(function(){
   $(".poshag_instr_title").click(function(){
       $(this).parent(".poshag_instr_wrap").find(".poshag_instr").slideToggle(500);
   });

    $(".question_in-text").click(function(){
       //  if($(this).parent(".wrap_qa").hasClass("active_qa")){
       //      $(this).parent(".wrap_qa").removeClass("active_qa");
       //  }
       //  else{
       //      $(this).parent(".wrap_qa").addClass("active_qa");
       //  }

       // $(this).parent(".wrap_qa").find(".answer_in-text").slideToggle(500);
   })
});

$(document).ready(function() { // Для карточек фирм устанавливаем одинаковую высоту, что бы не съезжали
  $(".auto-height").each(function(index, el) {
    var height = 0;
      $(el).find('.col-xs-4.text-center').each(function(index, element) {
        if(height < $(element).height())
        height = $(element).height()
        $(element).css('height', height);
      });
  });
});

 $( document ).on( "click", "a.file", function()
    {
        inputFile = $( this ).prev( "input" );
        $( inputFile ).click();
    });  

$(document).ready(function() {
   $(".pak_doc_item p").click(function(event) {
     $(this).parent(".pak_doc_item").find('.pak_doc_item_more').show(400);
   });
   $(".pak_doc_item_more .pak_doc_item_more-close").click(function(event) {
     $(this).parent(".pak_doc_item_more").hide(400);
   });
 }); 

$(document).ready(function() {
  var height = 0;
  $(".document .grey-block.radius5").each(function(index, el) {    
      if(height < $(el).height()){
        height = $(el).height();
      }

  });
  $(".document .grey-block.radius5").each(function(index, el) {  
      $(el).css('height', height+32);
    });
});

$(document).ready(function() {
  $("a[href='/voprosy-i-otvety/#get-faq-form']").attr('target', '_blank');
});