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
		$('.main-nav').slideToggle();
		if($('.button-nav').hasClass('active')){
			$('body').css('overflow','hidden');
		}else {
			$('body').css('overflow','scroll');
		};

		return false;
	});

	/* valide entry form */
	$('.js-correct').click(function(){
		if($('.js-valide-login').val().length == 0){
			$('.js-correct-login').addClass('box-field_no-valide');
		} else {
			$('.js-correct-login').removeClass('box-field_no-valide');
		};
		if($('.js-valide-password').val().length == 0){
			$('.js-correct-password').addClass('box-field_no-valide');
		} else{
			$('.js-correct-password').removeClass('box-field_no-valide');
		};
	});
	/* valide entry form */



	/* valide entry form */
	$('.js-reg-correct').click(function(){
		var forms = $('.registration-form .form-control');
		$(forms).each(function(){
			var form = this;
			if (this.value.length == 0){
				$(this).parents('.box-field').addClass('box-field_no-valide');
			} else {
				$(this).parents('.box-field').removeClass('box-field_no-valide');
			}

		});

		var checkboxes = $('.box-form-bottom .jq-checkbox');
		$(checkboxes).each(function(){
			if ($(this).hasClass('checked') == 0){
				$(this).parents('.box-form-bottom').addClass('box-form-bottom-error');
				return false;
			}
			if ($(this).hasClass('checked') == 1){
				$(this).parents('.box-form-bottom').removeClass('box-form-bottom-error');
			}
			
		})
	});
	/* valide entry form */


	/* firms - more firms */
	var firms = $('.box-firms-information .col-xs-6');
	var lastElementIndex = ((firms.length) - 1);
	var lastElement = $(firms).eq(lastElementIndex);

	$(firms).each(function(){
		var firm = this;
		if (lastElementIndex > 5){
			if ($(this).index() > 5){
				$(this).css('display', 'none');
				$('.box-firms-information__more-firms').css('display', 'block');
			}
		}
		$('.js-button-delete').click(function(){
			$(this).parents('.col-xs-6').css('display', 'none');
			$(this).parents('.col-xs-6').addClass('js-non-visible');
		});
	});
	$('.box-firms-information__more-firms').click(function(){
		for(var i = 0; i < lastElementIndex+1; i++){
			if( $(firms[i]).is(':hidden') && !$(firms[i]).hasClass('js-non-visible')){
				var hiddenElemIndex = $(firms[i]).index();
				for(var j = hiddenElemIndex; j < hiddenElemIndex+6; j++){
					$(firms[j]).css('display', 'inline-block');
				}
				break;
			}
		}
		if($(lastElement).is(':visible')){
			$('.box-firms-information__more-firms').css('display', 'none');
		} else{
			$('.box-firms-information__more-firms').css('display', 'block');
		};
	})
	/* firms - more firms */





	/* firms-bids - open-bid */
		$('.js-open-bid').click(function(){
			$(this).parents('.bids-list__item').toggleClass('opened');
		})

		$('.js-button_cancel').click(function(){
			$(this).parents('.bids-list-opened__item').css('display', 'none');
		})
	/* firms-bids - open-bid */

	$('#theme-switcher').change(function () {
	    var theme = $('#theme');
	    theme.prop(
	        'href',
	        theme.prop('href').replace(
	            /[\w\-]+\/jquery-ui.css/,
	            $(this).val() + '/jquery-ui.css'
	        )
	    );
	});



	/* firms-bids - selected - bid */

		$('.js-button-apply').click(function(){
			$(this).parents('.bids-list-opened__item').addClass('bid-selected');
			var listItems = $(this).parents('.bids-list-opened').find('.bids-list-opened__item');

			$(listItems).each(function(){
				if (!$(this).hasClass('bid-selected')){
					$(this).css('display', 'none');
				}
			});
		});

	/* firms-bids - selected - bid */

	/* forms */
		if($('.styled').length){
	 		$('.styled').styler();
		};
	/* forms */



	/* reviews open */
		$('.reviews-list__item .js-max-height').each(function(){
			if($(this).height() > 80){
				$(this).parents('.reviews-list__item').find('.js-reviews-list__item-more').css('display', 'block');
				$(this).css('height', '78px');
				$(this).css('overflow', 'hidden');
			}
		});

		$('.js-reviews-list__item-more').click(function(){
			if($(this).parents('.reviews-list__item').find('.js-max-height.active').length > 0){
				$(this).parents('.reviews-list__item').find('.js-max-height').removeClass('active');
				$(this).text('Читать полностью');
				$(this).parents('.reviews-list__item').find('.js-max-height').css('height', '78px');
				$(this).parents('.reviews-list__item').find('.js-max-height').css('overflow', 'hidden');

			} else {
				$(this).parents('.reviews-list__item').find('.js-max-height').css('height', 'auto');
				$(this).parents('.reviews-list__item').find('.js-max-height').addClass('active');
				$(this).text('Свернуть');
			}
		});
	/* reviews open */





	
	/* checked all */
	$('#checkedAll').change(function() {
		var inputs = $('input.js-checkbox');
		if ($(this).is(':checked')) {
			for(var i=0; i<inputs.length; i++){
				inputs.eq(i).prop('checked',true).trigger('refresh');
			}
		} else {
			for(var i=0; i<inputs.length; i++){
				inputs.eq(i).prop('checked',false).trigger('refresh');
			}
		}
	});
	$('input.js-checkbox').change(function() {
		if ($('input.js-checkbox:checked').length == $('input.js-checkbox').length) {
			$('#checkedAll').prop('checked',true).trigger('refresh');
		} else {
			$('#checkedAll').prop('checked',false).trigger('refresh');
		}
	});
	
	/* checked all */
	




	/* tel format */
	if($('.js-tel').length){
			$('.js-tel').mask("+7(999) 999-99-99");
	};
	/* tel format */



	



	/* calendar */
		if($('.js-date').length){
		$( ".js-date").datepicker({
			showOn: "both"
			})
		};
	/* calendar */

});

var handler = function(){
	
	var height_footer = $('footer').height();	
	var height_header = $('header').height();	
	
	
	var viewport_wid = viewport().width;
	
	if (viewport_wid <= 991) {
		if($('.table-list').width() > $('.table-wrapper').width()){
			$('.table-wrapper').css('overflow-x', 'scroll');
		} else {
			$('.table-wrapper').css('overflow-x', '');
		}
	};
	if (viewport_wid <= 540) {
		$('.reviews-list__item').each(function(){
			var authorHeight = $(this).find('.reviews-list__item-author').height();
			$(this).find('.js-reviews-list__item-more').css('bottom', authorHeight+45)
		})
	} else{
		$('.js-reviews-list__item-more').css('bottom', '40px');
	}

	
}

$('input:checkbox').change(function() {
  if ($(this).is(':checked')) {
    $(this).closest('label').addClass('active');
  } else {
    $(this).closest('label').removeClass('active');
  }
});

$(window).bind('load', handler);
$(window).bind('resize', handler);



