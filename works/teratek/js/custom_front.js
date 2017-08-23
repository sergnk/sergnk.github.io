"use strict";

var currentAttribute = false;

window.brandsOfCategories = !!window.brandsOfCategories ? window.brandsOfCategories : [];


/**
 * Выставить события для работы с сравнением товаров. Для работы с pajax
 * @param string selector
 * @returns none
*/


$(document).on('click', '[data-role="add-to-comparison"]', function(event) {
    return comparisonProcess(event);
});

var comparisonProcess = function(event) {

    var $el = $(event.target).closest('a');

    // If already clicked/active, act as plain link
    if ($el.hasClass('active')) {
        return true;
    }

    event.preventDefault();

    $el.addClass("loading");

    // Make ajax request
    $.ajax({
        url: $el.data("compAjaxUrl"),
        method: "POST",
        data: {productId: $el.data("compId"), method: "addToComparison"},
        dataType: "json"
    })
        .done(function(data){
            $el.removeClass("loading");
            $el.addClass("active");

            if (data.result) {

                var comparisonCount = !!data.count ? data.count : 1;

                // Top header counter upadte
                $('.header-functions__right .settings-item').eq(1).attr('href', $el.data("compUrl")).addClass('active').find('.settings-item__number').html(comparisonCount);


                $el.attr("data-comp-state", 'link');
                $el.attr("href", $el.data("compUrl") );

                // Update link text (if exists)
                if ($el.find('.link-in-compare__name')) {
                    $el.find('.link-in-compare__name').html(data.linkMessage);
                    $el.attr("title", data.linkMessage);
                }


                // Update other links in this category to the new popup plural text
                var links = $("[data-comp-state='link']");

                if (links) {
                  links.each(function () {
                      if ($el.data("zfPlugin")) {
                          $(this).data("zfPlugin").options.tipText = '';
                          $(this).attr("title", data.linkMessage);
//                          Foundation.reInit($(this));
                      }
                  });
                }

                // Update tooltip
                if ($el.data("zfPlugin")) {
                  $el.data("zfPlugin").options.tipText = '';
                  $el.attr("title", data.linkMessage);
//                  Foundation.reInit($el);
                  $('.tooltip').delay(500).fadeOut(300);

                }
            }
      })
      .fail(function(data){
          //console.log("comparisonProcess ajax fail data", data);
      });
};

/**
 * Выставить события для работы с закладками для товаров. Для работы с pajax
 * @param string selector
 * @returns none
 */
var setUpHistoryDelete = function() {

    $(document).off('close.zf.trigger', '#historyBlock li.catalog-products__item[data-closable]');
    $(document).on('close.zf.trigger', '#historyBlock li.catalog-products__item[data-closable]', function(event) {
        var el = $(event.target).parent();
        //console.log("setUpHistoryDelete close.zf.trigger el", el);

        var productId = $(el).data('productId');
        // ajax
        $.ajax({
            url: '/catalogue/ajax',
            method: "POST",
            data: {productId: productId, method: "deleteFromProductHistory"},
            dataType: "json",
        })
        .done(function(data){
            if (data.result) {
                // remove (now it display:none)
                $(el).remove();
            } else {
                console.log("setUpHistoryDelete ajax result false message", data);
            }
        })
        .fail(function(data){
            console.log("setUpHistoryDelete ajax fail data", data);
        })
        .always(function(data){
            //console.log("setUpHistoryDelete ajax always data", data);
        })
        ;

        return false;
    });

    //console.log("setUpHistoryDelete end");
}

var setUpCompareNavigate = function(selector, selectorFind) {

    if (undefined === selector || undefined === selectorFind) return;

    $(document).off('change', selector);
    $(document).on('change', selector, function(event) {

        var selectedItems = $(selector + selectorFind )
        if (selectedItems.length) {
            var urlTo = $(selectedItems[0]).data("url");
            $.pjax.reload({url: urlTo, container: '#compareBlock', timeout: 3000});
        }
        return false;
    });
}

$(document).on('click', '[data-role=add-to-cart]', function(event) {
    addToCart(event);

    return false;
});

var addToCart = function(event) {


    var elem = $(event.target).closest('a').length > 0 ? $(event.target).closest('a') : $(event.target);
    var countCntrl = $('.card-product__info-price-cont').find('input[name="number"]').val();
    if(typeof countCntrl == "undefined" ) {
        countCntrl = 1;
    } else {
        if(isNaN(parseInt(countCntrl))) {
            countCntrl = 1;
        }
    }


    if (undefined !== elem.data('id')) {
        $.ajax({
            url: '/cart/ajax',
            method: "POST",
            data: {productId: elem.attr('data-id'), count: countCntrl, method: "addToCart"},
            dataType: "json",
        })
          .done(function(data){
              if (data.result) {
                  var basket =  $('.btn-basket');
                  var basketCountBox = $('.btn-basket__number');
                  var cartCount = data.cartItemsCount;
                  elem.addClass('active');
                  elem.text('В корзине');

                  if(basketCountBox.length){
                      basketCountBox.html(cartCount);
                  } else {
                      basket.addClass('btn-basket_with-product').append('<span class="btn-basket__number">'+ cartCount +'</span>')
                  }

                  // Заполняем шаблон окна
                  var card = elem.closest('div.card-product');
                  var template = $('#popup-buy');

                  if (card.length) {
                      // Карточка товара
                      console.log('card');
                      template.find('.box-product__title').text($('.line-title__cont h1').text());
                      template.find('.box-product__descr p').html(card.find('.description-card p').html());
                      template.find('.box-product__img img').attr('src', card.find('.big-img-card img').attr('src'));

                      template.find('.line-star').replaceWith(card.find('.line-star').clone());
                      var price =  card.find('.card-product__price span:last');
                      if (price.length) {
                          template.find('.box-product__price').text(price.text() + ' руб.');
                      }
                  } else {
                      card = elem.closest('li.catalog-products__item');
                      if (card.length) {

                          // Раздел каталога
                          template.find('.box-product__title').text(card.find('h2').text());
                          template.find('.box-product__descr p').html(card.find('p[itemprop=description]').html());
                          template.find('.box-product__img img').attr('src', card.find('img[itemprop=image]').attr('src'));
                          template.find('.line-star').replaceWith(card.find('.line-star').clone());

                          var price2 = card.find('.gallery-product-compare__price span:last');
                          if (price2.length) {
                              template.find('.box-product__price').text(price2.text() + ' руб.');
                          }
                      } else {
                          card = elem.closest('div.gallery-product-compare__column');
                          if (card.length) {
                              // Сравнение товаров
                              console.log(card);
                              template.find('.box-product__title').text(card.find('a[itemprop=name]').text());
                              template.find('.box-product__descr p').html(card.find('meta[itemprop=description]').attr('content'));
                              template.find('.box-product__img img').attr('src', card.find('img[itemprop=image]').attr('src'));
                              //template.find('.line-star').replaceWith(card.find('.line-star').clone());

                              var price3 = card.find('p[itemprop=offers] span:last');
                              if (price3.length) {
                                  template.find('.box-product__price').text(price3.text() + ' руб.');
                              }

                          }

                      }
                  }

                  template.find('.btn-line .link-all').text(data.cartItemsCount + ' ' + data.cartPlural + ' в корзине');
                  template.find('ul.list-you-watched').html(data.recommend);


                  $.fancybox( {
                      'href': '#popup-buy',
                      'wrapCSS' : 'wrap-fancy-window',
                      'type' : 'inline'
                  });

              } else {
                  console.log("addToCart ajax result false message", data);
              }
          })
          .fail(function(data){
              console.log("addToCart ajax fail data", data);
          })
          .always(function(data){
              //console.log("addToCart ajax always data", data);
          });

    }
}

var updateResults = function(eavs) {
    $.map(eavs, function(values, item) {
        var elements  = $('[name="Filter[attribute.' + item + ']"]'),
            elements2 = $('[name="Filter[attribute.' + item + '][]"]'),
            elem      = null;

        if (true || currentAttribute != item) {

            try {

                elements.closest('label').addClass('disabled');

                elements2.closest('label').addClass('disabled');
            }  catch (e) {
                console.log(e, 'frontend.js:21');
            }

        }

        for (var i = 0; i < values.length; i++) {
            /**
             * 1:
             **/

            try {

                elem = $("[name=\"Filter[attribute." + item + "]\"][value='" + (String(values[i])).replace('"', '\"') + "']");

                elem.closest('label').removeClass('disabled');
            }  catch (e) {
                console.log(e, 'frontend.js:37');
            }

            /**
             * 2:
             **/

            try {
                elem = $("[name=\"Filter[attribute." + item + "][]\"][value='" + (String(values[i])).replace('"', '\"') + "']");

                elem.closest('label').removeClass('disabled');
            }  catch (e) {
                console.log(e, 'frontend.js:49');
            }
        }

        try {
            elem = $('[name="Filter[attribute.' + item + ']"][value=""]');

            elem.closest('label').removeClass('disabled');
        }  catch (e) {
            console.log(e, 'frontend.js:58');
        }
    });
};

var updateFilterPage = function(link) {
    var body = $('body'),
        content = $('div#idCatalogueIndex'),
        //box = $('#result-counter'),
        filter = $('#filter-form');

    var data = filter.serialize();

    body.addClass('loading-content');
    //box.hide();

    $.pjax.reload('#idCatalogueIndex', {url: link, method: 'POST', container: '#idCatalogueIndex', timeout: 3000, data: data});

//    $.post(link, data)
//        .done(function(response) {
//
//            content.replaceWith(
//                response
//            );
//
//            body.removeClass('loading-content');
//
//            window.history.pushState(
//                {data: response},
//                $(response).find('title').text(),
//                link
//            );
//
//            setUpCatalogueFilterEvents();
//
//        });

};

var updateBrands = function(brands) {
    var elements = $('[name="Filter[brandAlias][]"]'),
        elem     = undefined;

    if (currentAttribute != 'brand') {
        elements.closest('label').addClass('disabled');
    }

    brands.forEach(function(value) {
        try {
            elem = $("[name=\"Filter[brandAlias][]\"][value='" + (String(value)).replace('"', '\"') + "']");
            elem.closest('label').removeClass('disabled');
        } catch (e) {
            console.log(e, 'frontend.js:76');
        }
    });
};

var updateCategorySets = function(categorySets) {
    if (undefined !== categorySets) {
        var elements = $('[name="Filter[categorySets][]"]'),
            elem     = undefined;

        if (currentAttribute != 'category') {
            elements.closest('label').addClass('disabled');
        }

        categorySets.forEach(function(value) {
            try {
                elem = $("[name=\"Filter[categorySets][]\"][value='" + (String(value)).replace('"', '\"') + "']");
                elem.closest('label').removeClass('disabled');
            } catch (e) {
                console.log(e, 'frontend.js:367');
            }
        });
    }
};


/**
 * Действия после ajax запроса в фильтре каталога
 */
function setUpCatalogueFilterEvents()
{
    setUpJsStyled();
}

var catalogueAjax = false;

function updateFilteredItems(e, showFilerLink)
{
    e.preventDefault();


    if (!!catalogueAjax) {
        return false;
    }

    var catalogueAjaxUrl = "/catalogue/ajax";

    showFilerLink = typeof showFilerLink == "undefined";

    if (catalogueAjaxUrl !== undefined) {
        var elem = $(e.target).length > 0 ? $(e.target) : $(this);
        var body = $('body');

        var form = showFilerLink ? elem.parents('[data-role=filter-form]') : $("#filter-form");

        var data = form.serialize();
        var countBlock = form.find('[data-role=products-count]');
        var filterLink = form.find('[data-role=filter-link]');

        var catalogIndex = $('#idCatalogueIndex');
        var positionTooltip = $(this).parents('label, .box-filter__cont').position();
        var positionTooltipTop;

        console.log($(this));

        if($(this).hasClass('slider-fields')) {
            positionTooltipTop = positionTooltip.top + 20;
        } else {
            positionTooltipTop = positionTooltip.top - 5;
        }


        var countResult =  $('#result-counter');

        var slider = $('.slider-item:first', form);

        data = data.replace(/[^&]+=\.?(?:&|$)/g, '');

        if (elem.data('attribute')) {
            currentAttribute = elem.data('attribute');
        }

        if ($('.price-slider', form).data('changed')) {
            data += '&price-slider-changed=1';
        } else {
            data += '&price-slider-changed=0';

            $('.price-slider .changed-item', form).removeClass('changed-item');
        }

        $('.price-slider', form).data('changed', false);

        data += '&method=filterProducts';

        filterLink.hide();

        body.addClass('loading-content');

        catalogueAjax = $.post(catalogueAjaxUrl, data)

        /** @param {{productsCount: mixed, brands: mixed, eavs: mixed}} response */
          .done(function(response) {

              updateFilterPage(response.url);

              catalogueAjax = false;

              if (response.result == true) {
                  countBlock.text(response.productsCount);
                  $('.help-number__cont').html('Предложений: ' + response.productsCount);
                  countResult.hide().css({'top' : positionTooltipTop, 'left': '-120px'});

                  catalogIndex.addClass('trigger-on ajax-load');

                  catalogIndex.prepend("<div class='relative-box'><div class='uil-ring-css' style='transform:scale(0.31);'><div></div></div>");


                  filterLink.find('span').text(response.productsCount);

                  updateBrands(response.brands);
                  updateResults(response.eavs);
                  updateCategorySets(response.categories);

              } else {
                  countBlock.text(0);

              }

          })

          .fail(function(jqXHR) {
              // if (!!jqXHR.responseText) {
              //     toastr.error($('<div></div>').append(jqXHR.responseText).text());
              // }
              alert(jqXHR.responseText);
          })
          .always(function() {

              catalogueAjax = false;
          });
    }

};

$(document).on('pjax:end', function() {
    var countResult =  $('#result-counter');
    var catalogIndex = $('#idCatalogueIndex');
    if(catalogIndex.hasClass('trigger-on')) {
        countResult.fadeIn(200, function () {
            $(this).delay(2000).fadeOut(100);
        });
        catalogIndex.removeClass('trigger-on ajax-load');
    }
});

(function () {

        $(document).on('click', '[data-role="filter-link"]', function(e) {
            var link = $(this),
                body = $('body'),
                content = $('div#idCatalogueIndex'),
                //box = $('#result-counter'),
                filter = $('#filter-form');

            var data = filter.serialize();

            body.addClass('loading-content');
            //box.hide();

            $.pjax.reload('#idCatalogueIndex', {url: link.attr('href'), method: 'POST', container: '#idCatalogueIndex', timeout: 3000, data: data});
//            $.post(link.attr('href'), data)
//                .done(function(response) {
//
//                    content.replaceWith(
//                        response
//                    );
//
//                    body.removeClass('loading-content');
//
//                    window.history.pushState(
//                        {data: response},
//                        $(response).find('title').text(),
//                        link.attr('href')
//                    );
//
//                    setUpCatalogueFilterEvents();
//                });

            e.preventDefault();
        });

        $(document).on('change', '[data-role=filter-field]', updateFilteredItems);

        $(document).on('click', '[data-role="clear-form-link"]', function(event) {
            var form = $(this).closest('form');

            $(form).get(0).reset();

            $(form).find('input:first').trigger('change');

            event.preventDefault();
        });

        $(document).on('reset', '#filter-form', function() {
            var slidersFields = $(this).find('.slider-fields'),
                checkboxes = $(this).find('[type="checkbox"]');

            $.each(checkboxes, function(index, item) {
                $(item).removeAttr('checked');
            });

            $.each(slidersFields, function(index, item) {
                $(item).trigger('change');
            });
        });
})();

(function () {

    var search = function() {

        var data = searchForm.val();
//        var block = $(searchForm.parent()).parent().find('[data-type=search-items]');
//        var btn = block.find('.show-all-search');
//        var btn2 = $('[data-type=search-button-head]');

        var block = $(searchForm).parent().siblings(".drop-search");
        var btn = block.find('.show-all-search');
        var catalogueAjaxUrl = "/catalogue/ajax";

        if (data.length >= 3) {

            var postData = {q: data, method: 'searchItems'};
            $.post(catalogueAjaxUrl, postData)
                .done(function(response) {
                    console.log("search done response", response);
                    if (response.content) {
                        block.find('ul').html(response.content);
                        if (response.a) {
                            btn.attr('href', response.a);
                        }
                        
                        block.show();
                        
                        var arrToEcGa = [];
                        block.find('.list-result-search__link').each(function(indexRSL,objRSL){
                            arrToEcGa.push($(objRSL).data('trk'));
                        });
                        console.log("arrToEcGa", arrToEcGa);
                        if (arrToEcGa.length) {
                            var impressionToEcGa = {
                                'ecommerce': {
                                    'impressions': arrToEcGa
                                },
                                'event' : 'searchResultList'
                            };
                            console.log(impressionToEcGa);
                            dataLayer.push(impressionToEcGa);
                        }

                        $(document).click(function(e) {
                            var target = $(e.target);

                            if (target.is('.drop-search') || target.parents('.drop-search').length) return;

                            $(document).unbind('click', e.callee);

                            $('.drop-search').hide();

                        });
                        
                    } else {
                        block.hide();
                    }
                });
        } else {
            block.hide();
        }
    };
    
    var searchInterval;
    var searchForm;

    /** Ajax search */
    $(document).on('keyup', '[data-role=search-input]', function() {

        searchForm = $(this);
        clearTimeout(searchInterval);
        searchInterval = setTimeout(search, 500);


    });
    
})();

var setCatalogueScrollShowMore = function(selector) {
    selector = selector || '';

    $(document).off('click', selector + '.button-show-more');
    $(document).on('click', selector + '.button-show-more', function(event) {
        console.log("setScrollShowMore click event", event, $(event.target));
        
        $("#idCatalogueIndex").after("<div id=\"idCatalogueIndex2\" style=\"display:none;\"></div>");
        
        // признак что это был скролл, а не обычное обновление
        $("#idCatalogueIndex").data("pjax-scroll-action", true);
        
        $.pjax.click(event, {container: "#idCatalogueIndex2", fragment:"#idCatalogueIndex", scrollTo: false, timeout: 10000});
        
        $(this).fadeOut(0);
        $(this).parent().find('.loader-block').fadeIn(0);
        setTimeout(function () {
            $('.button-show-more').fadeIn(0);
            $('.loader-block').fadeOut(0);
            $('.hide-item').slideDown(100);
        }, 1000);
        
        return false;
    });
}

var compileTemplate = function( source , data ) {
    var template = Handlebars.compile( source );
    return template( data );
};

var setUpFeedbackModal = function(selector)
{
    selector = selector || '';

    $(document).off('click', selector + '.modal-show-feedback');
    $(document).on('click', selector + '.modal-show-feedback', function(event) {
        event.preventDefault();
        
        var dialogHtml = compileTemplate($('#feedback-form').html());
        $.fancybox($(event.target), {
            wrapCSS : 'wrap-fancy-window', 
            content : dialogHtml,
            type : 'html'
        });
        
        return false;
    });   
    
    $(document).on('click', ' .form-feedback .button-form2', function() {
        var form = $(this).parent().parent();
        var data = form.serialize();

        if (data != undefined && data != '') {

            // /site/ajax
            data += "&method=setFeedback";
            $.post("/site/ajax", data)
                .done(function(response) {
                    
                    console.log("form-feedback response", response);
            
                    if (response.result) {
                        
                        dataLayer.push({'event': 'form-feedback'});
                        
                        var bFancy = $.fancybox.isOpen;
                        if (bFancy) {
                            $.fancybox.close();
                        }

//                        toastr.info('Спасибо за вашу заявку!');
                        
                        var textPopup = 'Спасибо за вашу заявку! Менеджер свяжется <br>с вами в течение 15 минут в рабочее время.';
                        var popup = compileTemplate($('#popup-success').html(), {text:textPopup, urlAsset:urlAsset});
                        $.fancybox({
                            wrapCSS : 'wrap-fancy-window', 
                            content : popup,
                            type : 'html'
                        });
                        
                        if (! bFancy) {
                            // очистить поля формы и убрать ошибки
                            form.find('.form-callback-field.has-error').removeClass('has-error');
                            form.find('.form-callback-field .help-block').html("");
                            
                            form.find('input').each(function(indexInput, itemInput){
                                var inputType = $(itemInput).attr("type");
                                switch(inputType) {
                                    case 'submit':
                                    case 'hidden':
                                        break;
                                    default:
                                        $(itemInput).val("");
                                }
                            });
                        }
                        
                    }
                    else if (response.errors) {

                        form.find('.form-feedback-field.has-error').removeClass('has-error');
                        form.find('.form-feedback-field .help-block').html("");

                        $.each(response.errors, function(index, item) {
                            form.find('.form-feedback-field.box-field-' + index).addClass('has-error');
                            form.find('.form-feedback-field.box-field-' + index + ' .help-block').html(item);

                            //toastr.error(item[0]);
                        });
                    }
                });
            
        }
        return false;
    });
    
}

var setUpCallbackModal = function(selector)
{
    selector = selector || '';

    $(document).off('click', selector + '.modal-show-callback');
    $(document).on('click', selector + '.modal-show-callback', function(event) {
        event.preventDefault();
        
        var dialogHtml = compileTemplate($('#callback-form').html());
        $.fancybox($(event.target), {
            wrapCSS : 'wrap-fancy-window', 
            content : dialogHtml,
            type : 'html',
            afterShow: function () {
                $("#callback-phone").mask('+7 (999) 999-99-99');
            }
        });
        
        return false;
    });   
    
    $(document).on('click', ' .form-callback .callback-form-submit', function() {
        var form = $(this).closest("form.form-callback");
        var data = form.serialize();

        if (data != undefined && data != '') {

            // /site/ajax
            data += '&url=' + window.location.href + "&method=setCallback";
            $.post("/site/ajax", data)
                .done(function(response) {
                    
                    console.log("form-callback response", response);
            
                    if (response.result) {
                        
                        dataLayer.push({'event': 'form-callback'});
                        
                        var bFancy = $.fancybox.isOpen;
                        if (bFancy) {
                            $.fancybox.close();
                        }
                        
//                        toastr.info('Спасибо за вашу заявку!');
                        
                        var textPopup = 'Спасибо за вашу заявку! Менеджер свяжется <br>с вами в течение 15 минут в рабочее время.';
                        var popup = compileTemplate($('#popup-success').html(), {text:textPopup, urlAsset:urlAsset});
                        $.fancybox({
                            wrapCSS : 'wrap-fancy-window', 
                            content : popup,
                            type : 'html'
                        });
                        
                        if (! bFancy) {
                            // очистить поля формы и убрать ошибки
                            form.find('.form-callback-field.has-error').removeClass('has-error');
                            form.find('.form-callback-field .help-block').html("");
                            
                            form.find('input').each(function(indexInput, itemInput){
                                var inputType = $(itemInput).attr("type");
                                switch(inputType) {
                                    case 'submit':
                                    case 'hidden':
                                        break;
                                    default:
                                        $(itemInput).val("");
                                }
                            });
                        }
                        
                    } else if (response.errors) {

                        form.find('.form-callback-field.has-error').removeClass('has-error');
                        form.find('.form-callback-field .help-block').html("");

                        $.each(response.errors, function(index, item) {
                            form.find('.form-callback-field.box-field-' + index).addClass('has-error');
                            form.find('.form-callback-field.box-field-' + index + ' .help-block').html(item);

//                            toastr.error(item[0]);
                        });
                    }
                });
            
        }
        return false;
    });
    
}

/**
 * Подписка на новости
 */
var setUpNewsSubscribe = function()
{
            
    $(document).on('click', ' .form-news-subscribe .news-subscribe-form-submit', function(event) {
        // Клик по сжатой форме, где только email. Далее валидация email - расширенная форма
        
        event.preventDefault();
        
        var form = $(this).closest("form.form-news-subscribe");
        var data = form.serialize();

        if (data != undefined && data != '') {

            // /site/ajax
            data += '&url=' + window.location.href + "&method=subscribeNews";
            $.post("/news/ajax", data)
                .done(function(response) {
                    
                    console.log("form-news-subscribe response", response);
            
                    if (response.result) {
                        
                        dataLayer.push({'event': 'form-news-subscribe'});
                        
                        var popup = compileTemplate($('#subscribe-form').html(), {});
                        $.fancybox({
                            wrapCSS : 'wrap-fancy-window', 
                            content : popup,
                            type : 'html',
                            afterShow: function () {
                                $("#subscribe-news-email").val(response.zz.email);
                            }
                        });

                        form.find('.form-news-subscribe.has-error').removeClass('has-error');
                        form.find('.form-news-subscribe .help-block').html("");
                        
                        form.find('input').each(function(indexInput, itemInput){
                            var inputType = $(itemInput).attr("type");
                            switch(inputType) {
                                case 'submit':
                                case 'hidden':
                                    break;
                                default:
                                    $(itemInput).val("");
                            }
                        });

                        form.find('box-field-input_email').val("");
                        
                        extendedNewsSubscribe();
                        
                    } else if (response.errors) {

                        form.find('.form-news-subscribe.has-error').removeClass('has-error');
                        form.find('.form-news-subscribe .help-block').html("");

                        $.each(response.errors, function(index, item) {
                            form.find('.form-news-subscribe.box-field-' + index).addClass('has-error');
                            form.find('.form-news-subscribe.box-field-' + index + ' .help-block').html(item);

//                            toastr.error(item[0]);
                        });
                    }
                });
            
        }
        return false;
    });
    
    $(document).on('click', ' .news-subscribe-dialog-link', function(event) {
        
        event.preventDefault();
        
        var popup = compileTemplate($('#subscribe-form').html(), {});
        $.fancybox({
            wrapCSS : 'wrap-fancy-window', 
            content : popup,
            type : 'html',
        });
        
        extendedNewsSubscribe();
        
        return false;
    });
    
    /**
     * Появляется расширенная форма подписки на новости, заполнение - валидация - ответ
     */
    var extendedNewsSubscribe = function() {

        $(document).on('click', ' .form-subscribe .subscribe-form-submit', function(event) {
            
            event.preventDefault();
            
            var form = $(this).closest("form.form-subscribe");
            var data = form.serialize();

            if (data != undefined && data != '') {

                // /site/ajax
                data += '&url=' + window.location.href + "&method=subscribeNews";
                $.post("/news/ajax", data)
                    .done(function(response) {

                        console.log("form-subscribe response", response);

                        if (response.result) {

                            var bFancy = $.fancybox.isOpen;
                            if (bFancy) {
                                $.fancybox.close();
                            }

//                            toastr.info('Ваш адрес добавлен!');

                            var textPopup = 'Ваш адрес добавлен!';
                            var popup = compileTemplate($('#popup-success').html(), {text:textPopup, urlAsset:urlAsset});
                            $.fancybox({
                                wrapCSS : 'wrap-fancy-window', 
                                content : popup,
                                type : 'html'
                            });

                            if (! bFancy) {
                                // очистить поля формы и убрать ошибки
                                form.find('.form-subscribe-field.has-error').removeClass('has-error');
                                form.find('.form-subscribe-field .help-block').html("");

                                form.find('input').each(function(indexInput, itemInput){
                                    var inputType = $(itemInput).attr("type");
                                    switch(inputType) {
                                        case 'submit':
                                        case 'hidden':
                                            break;
                                        default:
                                            $(itemInput).val("");
                                    }
                                });
                            }

                        } else if (response.errors) {

                            form.find('.form-subscribe-field.has-error').removeClass('has-error');
                            form.find('.form-subscribe-field .help-block').html("");

                            $.each(response.errors, function(index, item) {
                                form.find('.form-subscribe-field.box-field-' + index).addClass('has-error');
                                form.find('.form-subscribe-field.box-field-' + index + ' .help-block').html(item);

//                                toastr.error(item[0]);
                            });
                        }
                    });

            }
            return false;
        });        
        
    }
    
}


jQuery(document).ready(function () {
    
    setUpFeedbackModal();
    setUpCallbackModal();
    setUpNewsSubscribe();
    
});


/* function update price */

function updatePrice() {
    $.ajax({
        url: '/cart/ajax',
        method: "POST",
        data: {method: "getTotalPrice"}
    })
      .done(function(data){
          if (data.result) {
              $('.line-total-basket__price-delivery').html('Доставка: '+ data.deliveryCost +' руб.');
              $('.line-total-basket__price').html('Итого:' + data.totalPrice + 'руб.');
              console.log(data);
          } else {
              console.log("ajax result false message", data);
          }
      })
      .fail(function(data){
          console.log("ajax fail data", data);
      })
      .always(function(data){
          //console.log("ajax always data", data);
      });
}

/* delete cart  */

$(document).on('click', 'button.delete', function() {
    var parent = $(this).parents('[data-closable]'),
      parentId = parent.attr('data-product-id');

    $.ajax({
        url: '/cart/ajax',
        method: "POST",
        data: {productId: parentId, method: "deleteItem"},
        dataType: "json"
    })
      .done(function(data){
          var basket =  $('.btn-basket');
          var basketCountBox = $('.btn-basket__number');
          var cartCount = data.cartContent.replace(/\D/g, '');
          updatePrice();

          if(cartCount == ""){
              basket.removeClass('btn-basket_with-product');
              basketCountBox.remove();
          } else {
              basketCountBox.html(cartCount);
          }

          parent.hide(function () {
              parent.remove();
          });
          
          trackingAnalytics(parent);
      })
      .fail(function(data){
          console.log("addToCart ajax fail data", data);
      })
      .always(function(data){
          //console.log("addToCart ajax always data", data);
      });
});

/* update cart */

$(document).on('change', '[data-role="product-count"]', function() {
    var product = $(this).parents('[data-role="product"]'),
      productId = product.attr('data-product-id'),
      thisProductCount = $(this).val(),
      thisTotal = product.find('[data-role="price-value"]');

    if(typeof thisProductCount == "undefined" ) {
        thisProductCount = 1;
    } else {
        if(isNaN(parseInt(thisProductCount))) {
            thisProductCount = 1;
        }
    }

    $.ajax({
        url: '/cart/ajax',
        method: "POST",
        data: {productId: productId, count: thisProductCount, method: "setItemCount"},
        dataType: "json",
    })
      .done(function(data){
          if (data.result) {
              var total = data.totalPrice;
              thisTotal.eq(1).html(total);
              updatePrice();
          } else {
              console.log("ajax result false message", data);
          }
      })
      .fail(function(data){
          console.log("ajax fail data", data);
      })
      .always(function(data){
          //console.log("addToCart ajax always data", data);
      });
});

/* update cart */


$(document).on("change", '[name="OrderForm[delivery_method]"]', function() {

    var form = $('#order-form');
    var data = 'method=updateOrderForm' + '&' + form.serialize();

    $.ajax({
        url: '/cart/ajax',
        method: "POST",
        data: data,
        dataType: "json"
    })
      .done(function(data){
          if (data.result) {
              updatePrice();
          } else {
              console.log("ajax result false message", data);
          }
      })
      .fail(function(data){
          console.log("ajax fail data", data);
      })
      .always(function(data){
          //console.log("ajax always data", data);
      });

});

$(document).on("click", '#order-form .button', function() {
    var form = $('#order-form');
    var data = 'method=validateBasket' + '&' + form.serialize();

    $.ajax({
        url: '/cart/ajax',
        method: "POST",
        data: data,
        dataType: "json"
    })
      .done(function(data){
          if (data.result) {
              console.log(data);
          } else {
              console.log("ajax result false message", data);
          }
      })
      .fail(function(data){
          console.log("ajax fail data", data);
      })
      .always(function(data){
          //console.log("ajax always data", data);
      });

});


$(document).ready(function () {

    /* Validation */

    /*need delete */
    if($('div').hasClass('order-block')) {
        $('h2.name, .basket-table, .order-block, .box-basket__table').wrapAll('<div class="content confirmation"><div class="wrapper"></div></div>');
        $('.btn-warning').addClass('button secondary');
    }
    /*need delete */

    $('input[type="hidden"][name="OrderForm[payment_method]"]').remove();

    var $orderForm = $('#order-form');

    if($orderForm.length) {
        $orderForm.yiiActiveForm([{"id":"orderform-payment_method","name":"payment_method","container":".field-orderform-payment_method","input":"#orderform-payment_method","validate":function (attribute, value, messages, deferred, $form) {yii.validation.required(value, messages, {"message":"Необходимо заполнить «Способо оплаты»."});}},{"id":"orderform-delivery_method","name":"delivery_method","container":".field-orderform-delivery_method","input":"#orderform-delivery_method","validate":function (attribute, value, messages, deferred, $form) {yii.validation.required(value, messages, {"message":"Необходимо заполнить «Способ доставки»."});}},{"id":"orderform-first_name","name":"first_name","container":".field-orderform-first_name","input":"#orderform-first_name","validate":function (attribute, value, messages, deferred, $form) {yii.validation.required(value, messages, {"message":"Необходимо заполнить «Имя»."});}},{"id":"orderform-email","name":"email","container":".field-orderform-email","input":"#orderform-email","validate":function (attribute, value, messages, deferred, $form) {yii.validation.required(value, messages, {"message":"Необходимо заполнить «E-mail»."});yii.validation.email(value, messages, {"pattern":/^[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$/,"fullPattern":/^[^@]*<[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?>$/,"allowName":false,"message":"Значение «E-mail» не является правильным email адресом.","enableIDN":false,"skipOnEmpty":1});}},{"id":"orderform-phone","name":"phone","container":".field-orderform-phone","input":"#orderform-phone","validate":function (attribute, value, messages, deferred, $form) {yii.validation.required(value, messages, {"message":"Необходимо заполнить «Телефон»."});}},{"id":"orderform-address","name":"address","container":".field-orderform-address","input":"#orderform-address","validate":function (attribute, value, messages, deferred, $form) {if ((function(attribute, value) { return $('[name="OrderForm[delivery_method]"]:checked').val() != 3; })(attribute, value)) { yii.validation.required(value, messages, {"message":"Необходимо заполнить «Адрес»."}); }}},{"id":"orderform-comment","name":"comment","container":".field-orderform-comment","input":"#orderform-comment","validate":function (attribute, value, messages, deferred, $form) {yii.validation.string(value, messages, {"message":"Значение «Комментарий» должно быть строкой.","skipOnEmpty":1});}}], []);
    }

    /* Bookmarks check if has item */

    var bookmarkItem = $('.settings-item').eq(0);
    var bookmarkItemVal = bookmarkItem.find('.settings-item__number').html()
    if(bookmarkItemVal > 0) {
        bookmarkItem.addClass('active');
    }


    /* Comparison check if has item */

    var comparisonItem = $('.settings-item').eq(1);
    var comparisonItemVal = comparisonItem.find('.settings-item__number').html()
    if(comparisonItemVal > 0) {
        comparisonItem.addClass('active');
    }


});

$(window).on('load', function (e) {
    /* scroll review */

    var hash = window.location.hash.substr(1);

    if(hash == "reviews") {
        $('html, body').animate({
            scrollTop: $(".box-sub-description").offset().top
        }, 800);

        $('[aria-controls="panel5"]').trigger('click');
    }
});


var setUpProductView = function()
{
    $(document).on('click', '#review-form input[type=submit]', function() {
        var form = $('#review-form');

        var data = form.serialize();
        
        console.log("review-form input[type=submit] data", data);
        
        data += '&method=reviewFormValidate';
        
        $.post('/catalogue/ajax', data)
        .done(function(response){
            console.log("reviewFormValidate post res", response);
    
            if (response.result) {
                form.trigger('reset');
//                $.module.message(response.message);

                var textPopup = response.message;
                var popup = compileTemplate($('#popup-success').html(), {text:textPopup, urlAsset:urlAsset});
                $.fancybox({
                    wrapCSS : 'wrap-fancy-window', 
                    content : popup,
                    type : 'html'
                });

            } else {
                form.find('.help-block').hide();
                form.find('.box-field.has-error').removeClass('has-error');

                $.each(response.errors, function(index, item) {
                    form.find('.box-field.field-productreview-' + index).addClass('has-error');
                    form.find('.box-field.field-productreview-' + index + ' .help-block').html(item).show();
                    
//                    toastr.error(item[0]);

//                    $.module.message(item[0], 'error')
                });
            }
        })
        .fail(function(data){
            //console.log("comparisonProcess ajax fail data", data);
        });

        return false;

    });
    
    $(document).on('click', '#review-form > div.form-group li > a', function() {
        $('#productreview-product_rating').val($(this).data('count-stars'));
        $(this).parent().parent().attr('class', 'rating ' + $(this).parent().data('name'));
        return false;
    });
    
}

/**
 * Диалог "Ошибки в описании"
 */
var setUpMistakeModal = function(selector)
{
    selector = selector || '';

    var popupMistake = function(event) {
        
        event.preventDefault();
        
        var text = "";
        if (window.getSelection) {
            text = window.getSelection();
        } else if (document.getSelection) {
            text = document.getSelection();
        } else if (document.selection) {
            text = document.selection.createRange().text;
        } 
        
        var dialogHtml = compileTemplate($('#mistake-form').html());
        $.fancybox($(event.target), {
            wrapCSS : 'wrap-fancy-window', 
            content : dialogHtml,
            type : 'html',
            afterShow: function () {
                // .card-product__right data-role="add-to-cart" data-id=
                $("#mistakedescription-text").val(text);
                $("#mistakedescription-product_id").val($(".card-product__right [data-role=add-to-cart]").data("id"));
                var objURL = window.location;
                var strURL = objURL.pathname;
                if (objURL.search) { strURL += "?" + objURL.search;}
                if (objURL.hash) { strURL += "#" + objURL.hash;}
                $("#mistakedescription-url").val(strURL);
            }
        });
        
        return false;
    }

    $(document).off('click', selector + '.popup-mistake-link');
    $(document).on('click', selector + '.popup-mistake-link', function(event) {
        return popupMistake(event);
    });   

    $(document).on('keydown', false, function(event) {
        if (event.shiftKey && 13 == event.keyCode) {
            return popupMistake(event);
        } else {
            return true;
        }
    });   
    
    $(document).on('click', ' .form-mistakedescription .mistakedescription-form-submit', function() {
        var form = $(this).closest("form.form-mistakedescription");
        var data = form.serialize();

        if (data != undefined && data != '') {

            data += "&method=setMistakeDescription";
            $.post("/catalogue/ajax", data)
                .done(function(response) {
                    
                    console.log("form-mistakedescription response", response);
            
                    if (response.result) {
                        var bFancy = $.fancybox.isOpen;
                        if (bFancy) {
                            $.fancybox.close();
                        }
                        
//                        toastr.info('Спасибо за ваше замечание!');
                        
                        var textPopup = 'Ваше замечание отправлено. Спасибо.';
                        var popup = compileTemplate($('#popup-success').html(), {text:textPopup, urlAsset:urlAsset});
                        $.fancybox({
                            wrapCSS : 'wrap-fancy-window', 
                            content : popup,
                            type : 'html'
                        });
                        
                        if (! bFancy) {
                            // очистить поля формы и убрать ошибки
                            form.find('.form-mistakedescription-field.has-error').removeClass('has-error');
                            form.find('.form-mistakedescription-field .help-block').html("");
                            
                            form.find('input').each(function(indexInput, itemInput){
                                var inputType = $(itemInput).attr("type");
                                switch(inputType) {
                                    case 'submit':
                                    case 'hidden':
                                        break;
                                    default:
                                        $(itemInput).val("");
                                }
                            });
                        }
                        
                    } else if (response.errors) {

                        form.find('.form-mistakedescription-field.has-error').removeClass('has-error');
                        form.find('.form-mistakedescription-field .help-block').html("");

                        $.each(response.errors, function(index, item) {
                            form.find('.form-mistakedescription-field.box-field-' + index).addClass('has-error');
                            form.find('.form-mistakedescription-field.box-field-' + index + ' .help-block').html(item);

//                            toastr.error(item[0]);
                        });
                    }
                });
            
        }
        return false;
    });
    
}

$(document).on('click', 'a[data-trk]', function(event) {
    return trackingAnalytics($(event.target));
});

var trackingAnalytics = function(elementTarget) {

    var $eventTarget = $(elementTarget).closest("a");
    
    // разделение на типы событий
    var clickType = $eventTarget.data("trkType");
    console.log("trackingAnalytics clickType", clickType, elementTarget);
    
    if ('searchClick' == clickType) {
        // Клик на товаре в результате поиска на сайте
        var trkEvent = $eventTarget.data("trkEvent");
        var trkList = $eventTarget.data("trkList");
        var trkElement = $eventTarget.data("trk");
        if ((undefined !== trkEvent) && (undefined !== trkList) && (undefined !== trkElement)) {
            var gaEvent = {
                'event': trkEvent,
                'ecommerce': {
                    'click': {
                        'actionField': {'list': trkList},      // Optional list property.
                        'products': [ trkElement ]
                    }
                }
            };
            console.log("trackingAnalytics searchClick push gaEvent", gaEvent);
            dataLayer.push(gaEvent);
        } else {
            console.log("trackingAnalytics searchClick not enaugh data trkEvent, trkList", trkEvent, trkList, trkElement);
        }
        
    } else if ('addToCart' == clickType) {
        
        var trkEvent = $eventTarget.data("trkEvent");
        var trkElement = $eventTarget.data("trk");
        if ((undefined !== trkEvent) && (undefined !== trkElement)) {
            var gaEvent = {
                'event': trkEvent,
                'ecommerce': {
                    'currencyCode': 'RUR',
                    'add': {
                        'products': [ trkElement ]
                    }
                }
            };
            var $elemQuantity = $eventTarget.siblings("div.number").find("input[name=number]");
            if (undefined !== $elemQuantity) {
                gaEvent.ecommerce.add.products[0].quantity = $elemQuantity.val();
            }
            console.log("trackingAnalytics searchClick push gaEvent", gaEvent);
            dataLayer.push(gaEvent);
        } else {
            console.log("trackingAnalytics searchClick not enough data trkEvent, trkList", trkEvent, trkList, trkElement);
        }
        
    } else if ('removeFromCart' == clickType) {
        
        var trkEvent = $eventTarget.data("trkEvent");
        var trkElement = $eventTarget.data("trk");
        if ((undefined !== trkEvent) && (undefined !== trkElement)) {
            var gaEvent = {
                'event': trkEvent,
                'ecommerce': {
                    'remove': {
                        'products': [ trkElement ]
                    }
                }
            };
            var $elemQuantity = $eventTarget.find("input[name=count]");
            if (undefined !== $elemQuantity) {
                gaEvent.ecommerce.remove.products[0].quantity = $elemQuantity.val();
            }
            console.log("trackingAnalytics removeFromCart push gaEvent", gaEvent);
            dataLayer.push(gaEvent);
        } else {
            console.log("trackingAnalytics removeFromCart not enough data trkEvent, trkList", trkEvent, trkList, trkElement);
        }
        
    } else if ('FilterClick' == clickType) {
        // клик в списках, формат для фильтров
        var trkContainerData = $eventTarget.data('trkSelector');
        if (undefined !== trkContainerData) {
            var $liTrk = $eventTarget.closest(trkContainerData);

            var trkElement = $liTrk.data("trk");
            var trkList = trkElement.list;
            delete trkElement.list;
            if ((undefined !== trkList) && (undefined !== trkElement) ) {
                var gaEvent = {
                    'event': 'productClick',
                    'ecommerce': {
                        'click': {
                            'actionField': {'list': trkList},
                            'products': [ trkElement ]
                        }
                    }
                };
                // aClick.closest("li.catalog-products__item")
                console.log("trackingAnalytics FilterClick push gaEvent", gaEvent);
                dataLayer.push(gaEvent);
            } else {
                console.log("trackingAnalytics FilterClick not enough data  trkList", trkList, trkElement);
            }
        } else {
            console.log("trackingAnalytics FilterClick not enough data trkSelector");
        }
        
    } else if ('SliderClick' == clickType) {
        
        var trkElement = $eventTarget.data("trk");
        if ((undefined !== trkElement) ) {
            var gaEvent = {
                'event': 'promotionClick',
                'ecommerce': {
                    'promoClick': {
                        'promotions': [ trkElement ]
                    }
                }
            };
            console.log("trackingAnalytics SliderClick push gaEvent", gaEvent);
            dataLayer.push(gaEvent);
        } else {
            console.log("trackingAnalytics SliderClick not enough data  ", trkElement);
        }
    }
    
}


// -------------------------------------------- by tsm --------------------------
// Tabs [ Главная, Карточка товара ]
$('ul[data-tabs] li a').on('click', function (e) {
    e.preventDefault();

    var item = $(this);
    var ul = item.closest('ul');
    var id = item.attr("href").substr(1);

    ul.find('li, li a').removeClass('is-active');
    item.addClass('is-active');
    item.closest('li').addClass('is-active');

    ul.parent().find('.tabs-content .tabs-panel').removeClass('is-active');

    $('#' + id).addClass('is-active');

    if (ul.data('hashed') !== undefined) {
        if(history.pushState) {
            history.pushState(null, null, '#' + id);
        }
        else {
            var el = document.getElementById(id);
            el.removeAttribute('id');
            location.hash = '#' + id;
            el.setAttribute('id',id);
        }
    }
});

$('a[data-tabclick]').on('click', function(e){
    var a = $(this).attr('href');
    $('ul[data-tabs] li a[href="' + a + '"]').click();
});

// ---------------------------------------------------------
// Buttons drops [share/print/mail]

$(document).click(function   (e) {
    if ($(e.target).parents().filter('.js-parent-open-drop:visible').length != 1) {
        $('.dropdown-pane').removeClass('is-open');
        $(".js-open-drop").removeClass('hover');
    }
});

$('.js-open-drop *').on('click', function(e) {
    e.preventDefault();
    e.stopPropagation();

    var parent = $(e.target).closest('div');

    // Hide all opened/hovered
    $('.dropdown-pane').removeClass('is-open');
    $('.js-open-drop').removeClass('hover');

    // Show corresponding pane
    parent.find('.js-open-drop').addClass('hover');
    parent.find('.dropdown-pane').addClass('is-open');

});

// -----------------------------------------------------------------
// Карточка скролл фикс
// Если высота таблицы с характеристиками больше чем блок с ценой
// при прокрутке фиксировать блок до нижней границы таблицы
//@todo: встречается только в карточке товара

$(window).scroll(function() {
    if($('.js-parent-ofset').length){
        var scrollOffset = $(window).scrollTop();
        var infoPriceHeight = $('.card-product__info-price-cont').height();
        var table = $('.js-parent-ofset div.tabs-content:first');
        var startOffset = table.offset().top;
        var tableHeight =  table.height();
        var endOffset = startOffset + tableHeight - infoPriceHeight - 56;

        if ( (tableHeight > infoPriceHeight + 200)  && (scrollOffset > startOffset) && (scrollOffset < endOffset)) {
            $('.card-product__info-price-cont').addClass("fixed");
        } else{
            $('.card-product__info-price-cont').removeClass("fixed")
        }
    }
});

// --------------------------------------------------------------------
// Обработка кликов на видео [раздел видео и на главной]

$(document).on("click", '.video.fancybox-media', function(e) {
    e.preventDefault();
    e.stopPropagation();

    var thisUrl = $(this).attr('href');

    $.fancybox(this, {
        openEffect	: 'fade',
        closeEffect	: 'fade',
        padding: 0,
        href: thisUrl,
        helpers: {
            overlay: {
                locked: false
            },
            media : {}
        }
    });

});

// --------------------------------------------------------------------
// Фильтр карточки товаров

// выбор брендов - еще бренды
$(".js-show-more-2").on('click', function (e) {
    e.preventDefault();

    var clicker = $(this);
    if (!clicker.hasClass('active')) {
        clicker.parents('.js-parents-toggle').find('.js-toggle').slideDown();
        clicker.text("Скрыть").addClass('active');
    } else {
        clicker.parents('.js-parents-toggle').find('.js-toggle').slideUp();
        clicker.text("Ещё бренды").removeClass('active');
    }
});

// -------------------------------------------------------------------------
// Страница видео - выбор бренда и категории


var videoAjax = false,
    form      = $('.video-filter-form');
var brands    = $('select[name=brand_id]', form),
    category  = $('select[name=category_id]', form);


category.on('change', function() {

    var category_id = $(this).val(),
        result      = '<option value>-- Бренд --</option>';
    if (!!window.brandsOfCategories && !!window.brandsOfCategories[category_id]) {

        $.each(window.brandsOfCategories[category_id], function(index, item) {
            result += '<option value="' + item.id + '">' + item.name + '</option>';
        });

        brands.removeAttr('disabled');
    } else {
        brands.attr('disabled', true);
    }

    brands.html(result);
    brands.trigger('refresh');

    if(history.pushState) {
        history.pushState(null, null, category_id ? ('/video?category_id=' + category_id) : '/video');
    }


    form.trigger('submit');
});

brands.on('change', function() {
    var brand_id = $(this).val();
    var category_id = $('select[name=category_id]').val();
    if(history.pushState) {
        history.pushState(null, null, '/video' + (category_id ? (('?category_id=' + category_id) + (brand_id ? ('&brand_id=' + brand_id):'')) : '')  );
    }
    form.trigger('submit');
});

var videoFilterStarted = false;

form.on('submit', function(event) {
    event.preventDefault();

    if (false == videoFilterStarted) {
        videoFilterStarted = true
    } else {
        return false;
    }

    var url        = form.attr('action'),
        block      = $('.video-content'),
        pagination = $('.line-pagination');

    url += url.indexOf('?') >= 0 ? '&' : '?';

    url += 'time=' + (new Date).getTime();

    if (!!videoAjax) {
        videoAjax.abort();
        videoFilterStarted = false;
    }
    block.addClass('loading');
    videoAjax = $.post(url, form.serialize())
        .done(function(response) {
            var data       = $('<div/>').append(response);
            var videoBlock      = $('.video-content', data),
                paginationBlock = $('.line-pagination', data);

            block.replaceWith(videoBlock);
            pagination.replaceWith(paginationBlock);

        })
        .fail(function(jqXHR, textStatus) {
            if (textStatus != 'abort') {
                console.log(textStatus, 'error');
            }

        })
        .always(function() {
            videoFilterStarted = false;
            block.removeClass('loading');
        });
});
// -------------------------------------------------------------------------

// -- Букмарки

// очистить список
$(document).on('click', '.box-bookmarks .link-clear-list', function(e){
    e.preventDefault();
    $.ajax({
        method: 'get',
        url: '/bookmarks/clear-favorite-list',
        data: 'listID=' + $('select[name=bookmarks-list-favorite-select]').val(),
        dataType: 'json',
        success: function(data) {
            if (data.status == 'success') {
                $('ul.catalog-products').hide();
            } else {
                var message = !!data.message ? data.message : 'Произошла ошибка.';
                message += !!data.errors ? '<br />' + data.errors.join('<br />') : '';
                alert(message);
            }
        }
    });
});

// Удалить позицию
$(document).on('click', '#bookmarkBlock button[data-close]', function(e){
    e.preventDefault();
    var $el = $(event.target).closest('li');
    $el.addClass('loading');
    $.ajax({
        method: 'get',
        url: '/bookmarks/delete-bookmark',
        data: 'productID=' + $el.data('product-id'),
        dataType: 'json',
        success: function(data) {
            if (data.status == 'success') {
                $.pjax.reload('#bookmarkBlock');
            } else {
                var message = !!data.message ? data.message : 'Произошла ошибка.';
                message += !!data.errors ? '<br />' + data.errors.join('<br />') : '';
                alert(message);
            }
        }
    });
});

// Добавить в закладки
// @todo: Разобраться и почистить
$(document).on('click', '[data-role="add-to-bookmarks"]', function(event) {
    event.preventDefault();
    var $el = $(event.target).closest('a');

    if ('addMe' == $el.data("bkmkState")) {

        $el.addClass("loading");

        // ajax to add
        $.ajax({
            url: $el.data("bkmkAjaxUrl"),
            method: "GET",
            data: {productID: $el.data("bkmkId"), listID: $el.data("bkmkList")},
            dataType: "json",
        })
            .done(function(data){
                // result: true, message: "Товар успешно добавлен в закладки", count: 1, html: "<div class="addto"><a data-type="widget-btn" class…ookmarks/index">Посмотреть списки</a></div></div>"
                if (data.result) {

                    var bookmarksCount = data.count;

                    $el.removeClass("loading");
                    $el.addClass("active");

                    if(!bookmarksCount) {
                        bookmarksCount = 1;
                    }

                    $('.header-functions__right .settings-item').eq(0).attr("href", $el.data("bkmkUrl")).addClass('active').find('.settings-item__number').html(bookmarksCount);

                    if ($el.data("clicked-label")) {
                        $el.find('span:last').html($el.data("clicked-label"));
                    }

                    $el.data("bkmkState", 'link');
                    $el.attr("data-bkmk-state", 'link');
                    $el.attr("href", $el.data("bkmkUrl"));
                    $el.attr("title", 'Перейти в закладки');

                    if ($el.data("zfPlugin")) {
                        $el.data("zfPlugin").options.tipText = '';
                        $('.tooltip').delay(500).fadeOut(300);
                    }

                } else {
                    console.log("bookmarkProcess ajax done result is FALSE");
                }
            })
            .fail(function(data){
                //console.log("bookmarkProcess ajax fail data", data);
            })
            .always(function(data){
                //console.log("bookmarkProcess ajax always data", data);
            })
        ;
        // update datas
    } else if ('link' == $el.data("bkmkState")) {
        console.log("bookmarkProcess link");
        window.location = $el.data("bkmkUrl");
    }
});

