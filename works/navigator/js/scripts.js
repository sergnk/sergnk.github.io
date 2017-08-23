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

var windowWidth;

$(document).ready(function() {

	if($('#main_slider')[0]){
		
		$('#main_slider').slick({
			slidesToShow: 1,
			arrows: true,
			dotts: false
		});
		
	}
	
	
	$('body').addClass('hasJS');
	$("select.custom").each(function() {
		
		var sb = new SelectBox({
			selectbox: $(this),
			customScrollbar: false,
			height: 98,
		});
		
	});
	
	
	$('.b-footer__nav-hd').click(function(){
		
		$(this).next('ul').toggleClass('opened');
		$(this).toggleClass('opened');
		
	});
	
	
	$('.mobile_menu_toggle').click(function(){
		
		$('body').toggleClass('expand');
		
	});
	
	
	$(document).click( function(event){
		
		if( $(event.target).closest(".b-header-left__user").length ) 
		return;
		$('.b-header-left__user').removeClass('active');
		$('.b-header-left__user-settings__tools').slideUp(0);
		event.stopPropagation();
		
	});
	$('.b-header-left__user-settings').click(function(){
		
		$(this).parent().toggleClass('active');
		$('.b-header-left__user-settings__tools').slideToggle(0);
		
	});
	
	
	$('.account_menu_toggle').click(function(){
		
		$('#sidebar_nav').toggleClass('close');
		
	});

    /*DATEPICKER*/
    if($('#datepicker').length){
        $('#datepicker').datepicker({
        	dateFormat: "dd.mm.yy",
		    range: 'period', // режим - выбор периода
		    numberOfMonths: 2,
		    onSelect: function(dateText, inst, extensionRange) {
		      $('#datepicker').val(extensionRange.startDateText + ' - ' + extensionRange.endDateText);
		    }
		  });  
    };
    if($('#datepicker11').length){
        $('#datepicker11').datepicker({
        	dateFormat: "dd.mm.yy"
		  });  
    };
    if($('#datepicker12').length){
        $('#datepicker12').datepicker({
        	dateFormat: "dd.mm.yy"
		  });  
    };
    
    if($('.fancybox').length) {
		$('.fancybox').fancybox();
	};

    // fileupload styler
    if($('.styled').length){
    	$('.styled').styler({
    		selectSearch: true,
    		selectSearchLimit: 5,
    		filePlaceholder: 'Загрузить',
    		fileBrowse: 'Выберите изображение для загрузки или<br>перетащите его в это поле'
    	});
    }
     $('.chosen-sel').each(function(){
	  $(this).chosen({placeholder_text_multiple: 'Поиск...'}).trigger('chosen:open');
	 });

	 $('.pickListResult').each(function(){
	  $(this).chosen({placeholder_text_multiple: 'Поиск...'}).trigger('chosen:open');;
	 });

	 $('.b-form-select-line__box').each(function(){
	  $(this).pickList()
	 });

    // open stat, play, modal
    $('.js-open-stat').click(function(e){
    	e.preventDefault();
    	$(this).toggleClass('active');
    	$(this).parents('.table-list__item').find('.table-list__item-statictic').slideToggle();
    	$(this).find('.js-open-stat').toggleClass('active');
    	$(this).parents('.table-list__item').toggleClass('opened');
    });
    $('.js-play-campain').click(function(e){
    	e.preventDefault();
    	$(this).toggleClass('stopped');
    })
    $('.js-browser').click(function(){
    	$(this).toggleClass('opened');
    })
    $('.table-list__item-titles dd').click(function(){
    	$('.success-modal').addClass('active');
    	setTimeout(function() {
		  $('.success-modal').removeClass('active');
		}, 2500)
    });
    $('.js-close-modal').click(function(e){
    	e.preventDefault();
    	$(this).parents('.modal-box').removeClass('active');
    })
    $('.statistic-left dd').click(function(){
    	$('.success-modal').addClass('active');
    	setTimeout(function() {
		  $('.success-modal').removeClass('active');
		}, 2500)
    })
		var timerId = setInterval(function() {
			setTimeout(function() {
				$('.advice-modal').toggleClass('active');
			}, 5000);
		}, 3000);
		setTimeout(function() {
			clearInterval(timerId);
		}, 7000);
	$('.js-hour').click(function(e){
		e.preventDefault();
		$(this).toggleClass('active');
	});
	$(document).click(function (e) {
	    var container = $('.b-form__checkbox-wrapper');
	    if (container.has(e.target).length === 0){
		    container.removeClass('active');
		}
	});

	$(document).click(function(e){
		var cont = $('.dashbox-size');
		var cont2 = $('.dashbox-settings');
		if ( (cont.has(e.target).length === 0) || (cont2.has(e.target).length === 0) ){
			cont.find('.dashbox-size').removeClass('active');
			cont.find('.dashbox-size-select').slideUp();
			cont.find('.dashbox-settings').removeClass('active');
			cont.find('.dashbox-settings-select').slideUp();
		}
	})
	$('.b-form__checkbox-group_with-list .js-checkbox').click(function(){
		if( $(this).parents('.b-form__checkbox-wrapper').hasClass('checked') ){
			$(this).parents('.b-form__checkbox-wrapper').addClass('active');
		} else{
			$(this).parents('.b-form__checkbox-wrapper').addClass('active');
			$(this).parents('.b-form__checkbox-wrapper').siblings().removeClass('active');
		}
		
	});
	$('.b-form__checkbox-group_with-list .b-form__checkbox-list>.checkbox').change(function(){
		$(this).parents('.b-form__checkbox-wrapper').addClass('checked');
	});
	$('.b-form__checkbox-group_with-list .b-form__checkbox-wrapper>.checkbox').on('change', function(){
	    if ( $(this).is(':checked') && !($(this).parents('.b-form__checkbox-wrapper').hasClass('checked')) ){
	    	$(this).prop('checked', false);
	    }
	    if ( !$(this).is(':checked') && ($(this).parents('.b-form__checkbox-wrapper').hasClass('checked')) ) {
	    	$(this).prop('checked', true);
	    }
	});
	$('.categories-checkboxes-list__item>label').click(function(){
		$(this).parents('.b-form__checkbox-wrapper').addClass('checked');
	});
	$('.categories-checkboxes-list__item>.checkbox').on('change', function(){
		var sumCheckboxed = $(this).parents('.categories-checkboxes-list').find('.categories-checkboxes-list__item>.checkbox').length;
	    var sumNotChecked = $(this).parents('.categories-checkboxes-list').find('.categories-checkboxes-list__item>.checkbox').not(':checked').length;
		if ( !$(this).parents('.b-form__checkbox-wrapper').find('.b-form__checkbox-wrapper>.checkbox').is(':checked') ){
		 	$(this).parents('.b-form__checkbox-wrapper').children('.checkbox').attr('checked', 'checked');
		}
		if( sumCheckboxed == sumNotChecked ){
	    	$(this).parents('.b-form__checkbox-wrapper').children('.checkbox').removeAttr('checked');
	    	$(this).parents('.b-form__checkbox-wrapper').removeClass('checked');
	    }
	})
	$('.js-delete-row').click(function(e){
		e.preventDefault();
		$(this).parents('.table-list__item').hide();
	});

	$('.js-line-open').click(function(e){
		var parents = $(this).parents('.b-form-select-line');
		$('.b-form-select-line').removeClass('open');
		parents.addClass('open');
		e.preventDefault();
		$(this).parents('.b-form-box').find('.b-form-select-line').each(function(){
			if ( $(this).hasClass('active') ){
				var selectsNumber1 = $(this).find('.js-select-start option').size();
				var selectsNumber2 = $(this).find('.pickListResult option').size();
				var sumSelects = selectsNumber1 + selectsNumber2;
				
				if( sumSelects == selectsNumber2){
					$(this).removeClass('active');
				} else{
					$(this).addClass('changed');
					$(this).find('.pickListResult option').attr('selected','selected').trigger("chosen:updated").trigger('chosen:open');
				}
			}
		})
		parents
			.addClass('active')
			.find('.pickListResult option')
			.removeAttr('selected');
		parents.find(".pickListResult").trigger("chosen:updated").trigger('chosen:open')
	});	
	
	$('.js-select-all').click(function(e){
		e.preventDefault();
		$(this).parents('.b-form-select-line').addClass('changed');
	});
	$('.js-continue').click(function(e){
		var parents = $(this).parents('.b-form-select-line');
		$('.b-form-select-line').removeClass('open').each(function(){
			var el = $(this);
			if (!el.is('.changed')){
				el.removeClass('active');	
			}
		})
		parents.addClass('open');
		e.preventDefault();
		$(this).parents('.b-form-select-line').removeClass('changed').addClass('active').find('.pickListResult option').removeAttr('selected');
		$(this).parents('.b-form-select-line').find('.pickListResult').trigger("chosen:updated").trigger('chosen:open');
	});
	$(window).resize(function(){

	})
	var contW = $('.b-content').innerWidth() + 2;
	$('.modal-box').css({'width': contW, 'left': $('.b-content').offset().left});
	$(document).scroll(function(){
		if ( viewport().width > 999 ){
			var hHeader = 60;
		} 

		if ( viewport().width <= 999 && viewport().width > 550 ){
			var hHeader = 208;
		}

		if ( viewport().width < 549 ){
			var hHeader = 245;
		}
		if( $(this).scrollTop() > hHeader){
			$('.modal-box').addClass('scrolled');
		} else{
			$('.modal-box').removeClass('scrolled');
			$('.modal-box').css('top', hHeader-$(this).scrollTop());
		}
	})
	
	$('.b-form__checkbox-list-title-close.js-close').click(function(e){
		e.preventDefault();
		$('.b-form__checkbox-wrapper').removeClass('active');
	})

    // scroll bar 
    if($('.js-scroll').length && window.innerWidth > 651) {
    	$(".js-scroll").mCustomScrollbar({
    		mouseWheel: true, documentTouchScroll: true
    	});
    }
    $(window).resize(function(){
    	$('.js-scroll').each(function() {
    		var el = $(this);
 			if (window.innerWidth < 651 && $('.mCustomScrollbar').length) {
		    	el.mCustomScrollbar('destroy');
		    } else {
		    	if (!el.is('.mCustomScrollbar')) {
		    		el.mCustomScrollbar({
			    		mouseWheel: true, documentTouchScroll: true, contentTouchScroll: true
			    	}); 
		    	}
		    }  		
    	});
    });
    if($('.js-h-scroll').length){
    	$(".js-h-scroll").mCustomScrollbar({
    		axis: "x",
    		mouseWheel:{ preventDefault: true }, documentTouchScroll: true, contentTouchScroll: true
    	});
    }
    if ( viewport().width > 999 ){
    	$('.account_menu_toggle').click(function(){
    		$('.b-content').toggleClass('active');
    		$('.b-footer').toggleClass('active');
    		if( $('#budget').length ){

    		}
    	})
    }
    
    // tabs
    $('.nav-tab-list__link').click(function(e){

    	href = $(this).attr('href');

    	$(this).parents('.nav-tab-list__item').addClass('active');
    	$(this).parents('.nav-tab-list__item').siblings().removeClass('active');

    	$(this).parents('.table-list__item-statictic-block').find('.tab-cont').each(function(){
    		
    		var idTab = '#' + $(this).attr('id');
    		if( idTab == href ){
    			$(this).siblings().addClass('hide');
    			$(this).removeClass('hide');
    		}
    	})
    	e.preventDefault();
    })


    // pie chart
				
		

	if ($('#pie-chart').length){
		var colors = ['#49b4e6', '#2b9b6b', '#734ba2'],
		    categories = ['', '', ''],
		    data = [{
		        y: 22,
		        color: colors[0],
		        drilldown: {
		            name: 'Position 2',
		            categories: ['Position 2'],
		            data: [22],
		            number: [134359],
		            color: colors[0]
		        }
		    }, {
		        y: 9,
		        color: colors[1],
		        drilldown: {
		            name: 'Other',
		            categories: ['Other'],
		            data: [9],
		            number: [34712],
		            color: colors[1]
		        }
		    }, {
		        y: 69,
		        color: colors[2],
		        drilldown: {
		            name: 'Position 1',
		            categories: ['Position 1'],
		            data: [69],
		            number: [623228],
		            color: colors[2]
		        }
		    }],
		    browserData = [],
		    versionsData = [],
		    i,
		    j,
		    dataLen = data.length,
		    drillDataLen,
		    brightness;
	
	
		// Build the data arrays
		for (i = 0; i < dataLen; i += 1) {
	
		    // add browser data
		    browserData.push({
		        name: categories[i],
		        y: data[i].y,
		        color: data[i].color
		    });
	
		    // add version data
		    drillDataLen = data[i].drilldown.data.length;
		    for (j = 0; j < drillDataLen; j += 1) {
		        brightness = 0.2 - (j / drillDataLen) / 5;
		        versionsData.push({
		            name: data[i].drilldown.categories[j],
		            y: data[i].drilldown.data[j],
		            number: data[i].drilldown.number[j],
		            color: Highcharts.Color(data[i].color).brighten(brightness).get()
		        });
		    }
		}
	
		// Create the chart
		Highcharts.chart('pie-chart', {
		    chart: {
		        type: 'pie'
		    },
		    title: {
		        text: ''
		    },
		    subtitle: {
		        text: ''
		    },
		    yAxis: {
		        title: {
		            text: ''
		        }
		    },
		    plotOptions: {
		        pie: {
		        	innerSize: 150,
		            shadow: false,
		            center: ['50%', '50%'],
		            borderWidth: 0
		        }
		    },
		    tooltip: {
		        enabled: false
		    },
		    series: [{
		        name: '',
		        data: browserData,
		        size: '60%'
		    }, {
		        name: '',
		        data: versionsData,
		        size: '60%',
		        innerSize: '75%',
		        dataLabels: {
		            formatter: function () {
		                // display only if larger than 1
		                return this.y > 1 ? '<b>' + this.point.name + '/</b> ' + this.y + '%<br>' + this.point.number : null;
		            }
		        }
		    }]
		});
	}


	// pie chart small

	if ($('#pie-chart_small').length){
		var colors = ['#49b4e6', '#2b9b6b', '#734ba2'],
		    categories = ['', '', ''],
		    data = [{
		        y: 22,
		        color: colors[0],
		        drilldown: {
		            name: 'Position 2',
		            categories: ['Position 2'],
		            data: [22],
		            color: colors[0]
		        }
		    }, {
		        y: 9,
		        color: colors[1],
		        drilldown: {
		            name: 'Other',
		            categories: ['Other'],
		            data: [9],
		            color: colors[1]
		        }
		    }, {
		        y: 69,
		        color: colors[2],
		        drilldown: {
		            name: 'Position 1',
		            categories: ['Position 1'],
		            data: [69],
		            color: colors[2]
		        }
		    }],
		    browserData = [],
		    versionsData = [],
		    i,
		    j,
		    dataLen = data.length,
		    drillDataLen,
		    brightness;
	
	
		// Build the data arrays
		for (i = 0; i < dataLen; i += 1) {
	
		    // add browser data
		    browserData.push({
		        name: categories[i],
		        y: data[i].y,
		        color: data[i].color
		    });
	
		    // add version data
		    drillDataLen = data[i].drilldown.data.length;
		    for (j = 0; j < drillDataLen; j += 1) {
		        brightness = 0.2 - (j / drillDataLen) / 5;
		        versionsData.push({
		            name: data[i].drilldown.categories[j],
		            y: data[i].drilldown.data[j],
		            color: Highcharts.Color(data[i].color).brighten(brightness).get()
		        });
		    }
		}
	
		// Create the chart
		Highcharts.chart('pie-chart_small', {
		    chart: {
		        type: 'pie'
		    },
		    title: {
		        text: ''
		    },
		    subtitle: {
		        text: ''
		    },
		    yAxis: {
		        title: {
		            text: ''
		        }
		    },
		    plotOptions: {
		        pie: {
		        	innerSize: 157,
		            shadow: false,
		            center: ['50%', '50%'],
		            borderWidth: 0
		        }
		    },
		    tooltip: {
		        enabled: false
		    },
		    series: [{
		        name: '',
		        data: browserData,
		        size: '61%'
		    }, {
		        name: '',
		        data: versionsData,
		        size: '61%',
		        innerSize: '75%',
		        dataLabels: {
		            formatter: function () {
		                // display only if larger than 1
		                return this.y > 1 ? '<b>' + this.point.name + '/</b> ' + this.y + '%' : null;
		            }
		        }
		    }]
		});
	}

	// line-chart 
	if ($('#line-chart').length){
		Highcharts.chart('line-chart', {
		    title: {
		        text: ''
		    },
		    subtitle: {
		        text: ''
		    },
		    chart: {
		    	width: 751,
		    	height: 250,
		    	marginBottom: 30,
		    	marginTop: -17
		    },
		    legend: {
				y: 24,
				x: -6
			},
		    xAxis: {
		    	tickPixelInterval: 386,
		        type: 'datetime',
	        	maxZoom: 48 * 3600 * 1000,
		        dateTimeLabelFormats: { // don't display the dummy year
		            day: '%d. %m. %Y'
		        },
		        title: {
		            text: ''
		        },
		        gridLineWidth: 1,
		        lineColor: '#ecede8',
		        lineColor: '#000',
		        tickWidth: 0
		    },
		    yAxis: {
		        title: {
		            text: ''
		        },
	          	color: '#9d7fc1',
		        min: 0,
	          	labels: {
		            style: {
		                color: '#9d7fc1'
		            },
	        	},
	        	tickInterval: 5,
	        	tickPixelInterval: 39
		    },
		    tooltip: {
		        headerFormat: '<b>{series.name}</b><br>',
		        pointFormat: '{point.x:%e. %b}: {point.y:.2f}'
		    },
	
		    plotOptions: {
		        spline: {
		            marker: {
		                enabled: true
		            }
		        },
		        series: {
		            marker: {
		                enabled: false
		            }
		        }
		    },
	
		    series: [{
		        name: 'Клики',
	          	color: '#663399',
		        data: [24,2],
		        pointStart: Date.UTC(2016, 9, 30),
	        	pointInterval: 24 * 3600 * 1000 // one day
		    }, {
		        name: 'Действия',
	          	color: '#2b9b6b',
		        data: [14,6],
		        pointStart: Date.UTC(2016, 9, 30),
	        	pointInterval: 24 * 3600 * 1000 // one day
		    }]
		});
	}


	if ($('#line-chart1').length){
		Highcharts.chart('line-chart1', {
		    title: {
		        text: ''
		    },
		    subtitle: {
		        text: ''
		    },
		    chart: {
		    	width: 751,
		    	height: 250,
		    	marginBottom: 30,
		    	marginTop: -17
		    },
		    legend: {
				y: 24,
				x: -6
			},
		    xAxis: {
		    	tickPixelInterval: 386,
		        type: 'datetime',
	        	maxZoom: 48 * 3600 * 1000,
		        dateTimeLabelFormats: { // don't display the dummy year
		            day: '%d. %m. %Y'
		        },
		        title: {
		            text: ''
		        },
		        gridLineWidth: 1,
		        lineColor: '#ecede8',
		        lineColor: '#000',
		        tickWidth: 0
		    },
		    yAxis: {
		        title: {
		            text: ''
		        },
	          	color: '#9d7fc1',
		        min: 0,
	          	labels: {
		            style: {
		                color: '#9d7fc1'
		            },
	        	},
	        	tickInterval: 5,
	        	tickPixelInterval: 39
		    },
		    tooltip: {
		        headerFormat: '<b>{series.name}</b><br>',
		        pointFormat: '{point.x:%e. %b}: {point.y:.2f}'
		    },
	
		    plotOptions: {
		        spline: {
		            marker: {
		                enabled: true
		            }
		        },
		        series: {
		            marker: {
		                enabled: false
		            }
		        }
		    },
	
		    series: [{
		        name: 'Клики',
	          	color: '#663399',
		        data: [24,2],
		        pointStart: Date.UTC(2016, 9, 30),
	        	pointInterval: 24 * 3600 * 1000 // one day
		    }, {
		        name: 'Действия',
	          	color: '#2b9b6b',
		        data: [14,6],
		        pointStart: Date.UTC(2016, 9, 30),
	        	pointInterval: 24 * 3600 * 1000 // one day
		    }]
		});
	}

if ($('#statistic-line-chart').length){
		var chart1 = Highcharts.chart('statistic-line-chart', {
		    title: {
		        text: ''
		    },
		    subtitle: {
		        text: ''
		    },
		    chart: {
		    	marginBottom: 47,
		    	marginTop: -25,
		    	height: 330
		    },
		    legend: {
				y: 25,
				x: 0
			},
		    xAxis: {
		    	tickPixelInterval: 100,
		        type: 'datetime',
	        	maxZoom: 48 * 3600 * 1000,
		        dateTimeLabelFormats: { // don't display the dummy year
		            day: '%d. %m. %Y'
		        },
		        title: {
		            text: ''
		        },
		        gridLineWidth: 1,
		        lineColor: '#ecede8',
		        lineColor: '#000',
		        tickWidth: 0
		    },
		    yAxis: {
		        title: {
		            text: ''
		        },
	          	color: '#9d7fc1',
		        min: 0,
	          	labels: {
		            style: {
		                color: '#9d7fc1'
		            },
	        	},
	        	tickInterval: 5,
	        	tickPixelInterval: 39
		    },
		    tooltip: {
		        headerFormat: '<b>{series.name}</b><br>',
		        pointFormat: '{point.x:%e. %b}: {point.y:.2f}'
		    },
	
		    plotOptions: {
		        spline: {
		            marker: {
		                enabled: true
		            }
		        },
		        series: {
		            marker: {
		                enabled: false
		            }
		        }
		    },
	
		    series: [{
		        name: 'Клики',
	          	color: '#663399',
		        data: [24,2],
		        pointStart: Date.UTC(2016, 9, 30),
	        	pointInterval: 24 * 3600 * 1000 // one day
		    }, {
		        name: 'Действия',
	          	color: '#2b9b6b',
		        data: [14,6],
		        pointStart: Date.UTC(2016, 9, 30),
	        	pointInterval: 24 * 3600 * 1000 // one day
		    }]
		});
	}
	
		if ($('#budget').length){
			Highcharts.setOptions({
            lang: {
                loading: 'Загрузка...',
                months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
                weekdays: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
                shortMonths: ['Янв', 'Фев', 'Март', 'Апр', 'Май', 'Июнь', 'Июль', 'Авг', 'Сент', 'Окт', 'Нояб', 'Дек'],
                exportButtonTitle: "Экспорт",
                printButtonTitle: "Печать",
                rangeSelectorFrom: "С",
                rangeSelectorTo: "По",
                rangeSelectorZoom: "Период",
                downloadPNG: 'Скачать PNG',
                downloadJPEG: 'Скачать JPEG',
                downloadPDF: 'Скачать PDF',
                downloadSVG: 'Скачать SVG',
                printChart: 'Напечатать график'
            }
    });

		var chart = Highcharts.chart('budget', {
			responsive: {
		        rules: [{
		            condition: {
		                maxWidth: 300
		            },
		            chartOptions: {
		                chart: {
		                    className: 'small-chart'
		                }
		            }
		        }]
		    },
		    title: {
		        text: ''
		    },
		    subtitle: {
		        text: ''
		    },
		    chart: {
		    	marginBottom: 35,
		    	marginTop: 7
		    },
		    legend: { },
		    xAxis: {
		        type: 'datetime',
		        dateTimeLabelFormats: { // don't display the dummy year
            month: '%e %b',
            year: '%b'
        },
		        title: {
		            text: ''
		        },
		        gridLineWidth: 0,
		        tickWidth: 0
		    },
		    yAxis: {
		        title: {
		            text: ''
		        },
	          	color: '#777777',
		        min: 0,
	          	labels: {
		            style: {
		                color: '#777777'
		            },
	        	},
	        	tickInterval: 500,
	        	tickPixelInterval: 25
		    },
		    tooltip: {
		        headerFormat: '{point.x:%e %bября} <br>',
		        pointFormat: '$ {point.y:.2f}'
		    },
	
		    plotOptions: {
		        series: {
		            marker: {
		                enabled: true,
																		fillColor: '#2a9b6b',
                  lineWidth: 2,
                  lineColor: '#ffffff',
																		shadow: true,
												radius: 6
		            }
		        }
		    },
	
		    series: [{
		        name: '',
	         color: '#2b9b6b',
		        data: [300,530,650,330,1350,1600,1370,1880],
										data: [
            [Date.UTC(2016, 9, 1), 300],
												[Date.UTC(2016, 9, 5), 530],
												[Date.UTC(2016, 9, 9), 670],
												[Date.UTC(2016, 9, 12), 350],
												[Date.UTC(2016, 9, 17), 1320],
												[Date.UTC(2016, 9, 21), 1570],
												[Date.UTC(2016, 9, 25), 1340],
												[Date.UTC(2016, 9, 28), 1860]
        ],
								states: {
                hover: {
                    halo: {
                      size: 9,
                      attributes: {
                        fill: '#2a9b6b',
                        'stroke-width': 3,
                        stroke:'#2a9b6b'
                        }
                     }
                   }
            },
		        pointStart: Date.UTC(2016, 9, 1)
		    }]
		});

	}


	
	

	/* DASHBOARD CHARTs */
/* DASHBOARD CHART 1 */
		if ($('#pie-chart-dashbox1').length){

		// Create the chart
		Highcharts.chart('pie-chart-dashbox1', {
			
		    chart:{ type:'pie' },
            credits:{enabled: false},
            colors:[
               '#734ba2','#49b4e6','#2b9b6b'
                ],
            title:{text: '<span class="pie-heading-num"><span>243 457</span> <br> lorem ipsum</span>',
												       align: 'center',
																			verticalAlign: 'middle',
																			y: 0,
																			x: 42 },
			         plotOptions: {
                pie: {
																				borderWidth: 0,
                    allowPointSelect: true,
                    cursor: 'pointer',
                    showInLegend: true,
                    dataLabels: {
                        enabled: false,                        
                        formatter: function() {
                            return this.percentage.toFixed(2) + '%';
                        }
                    } 									
                }
            },
		    tooltip: {
		        enabled: false
		    },
												
            legend: {
                enabled: true,
                layout: 'vertical',
                align: 'left',
                verticalAlign: 'middle',
                useHTML: true,
																left: 0,
                labelFormatter: function() {
                    return '<div class="chart-label-inner__name">' + this.name + '</div><div class="chart-label-inner__data">' + this.y + '%</div>';
				}
            },
			series: [{
		        name: '',
		        data: versionsData,
		        size: '115%',
		        innerSize: '73%',
				type: 'pie',
    dataLabels: { },
				data: [
				{
					name: 'Position 2',
					y: 27,
					color: '#49b4e6',
				},
				{
					name: 'Position 3',
					y: 16,
					color: '#2b9b6b',
				},
				{
					name: 'Position 1',
					y: 57,
					color: '#734ba2',
				}]
			},
			{
		        name: '',
		        data: browserData,
		        size: '84%',
		        innerSize: '97%',
				type: 'pie',
    dataLabels: { },
				data: [
				{
					name: 'Position 2',
					y: 27,
					color: '#1681b3',
				},
				{
					name: 'Position 3',
					y: 16,
					color: '#006838',
				},
				{
					name: 'Position 1',
					y: 57,
					color: '#4f2a7a',
				}],
				showInLegend: false
			}]
		});
	}
	/* DASHBOARD CHART 1 END */
	
		/* DASHBOARD CHART 2 */
		if ($('#pie-chart-dashbox2').length){
				var colors = ['#49b4e6', '#2b9b6b', '#734ba2'],
		    categories = ['Position 1', 'Position 2', 'Position 3'],
		    data = [{
		        y: 27,
		        color: colors[0],
		        drilldown: {
		            name: 'Position 2',
		            categories: ['27'],
		            data: [27],
		            color: colors[0]
		        }
		    }, {
		        y: 16,
		        color: colors[1],
		        drilldown: {
		            name: 'Position 3',
		            categories: ['16'],
		            data: [16],
		            color: colors[1]
		        }
		    }, {
		        y: 57,
		        color: colors[2],
		        drilldown: {
		            name: 'Position 1',
		            categories: ['57'],
		            data: [57],
		            color: colors[2]
		        }
		    }],
		    browserData = [],
		    versionsData = [],
		    i,
		    j,
		    dataLen = data.length,
		    drillDataLen,
		    brightness;
	
	
		// Build the data arrays
		for (i = 0; i < dataLen; i += 1) {
	
		    // add browser data
		    browserData.push({
		        name: categories[i],
		        y: data[i].y,
		        color: data[i].color
		    });
	
		    // add version data
		    drillDataLen = data[i].drilldown.data.length;
		    for (j = 0; j < drillDataLen; j += 1) {
		        brightness = -0.2 - (j / drillDataLen) / 5;
		        versionsData.push({
		            name: data[i].drilldown.categories[j],
		            y: data[i].drilldown.data[j],
		            color: Highcharts.Color(data[i].color).brighten(brightness).get()
		        });
		    }
		}
	
		// Create the chart
		Highcharts.chart('pie-chart-dashbox2', {
		    chart: {
		        type: 'pie'
		    },
		    title: {text: '<span class="pie-heading-num"><span>243 457</span> <br> lorem ipsum</span>',
												       align: 'center',
																			verticalAlign: 'middle',
																			y: 0,
																			x: 0 },
		    subtitle: {
		        text: ''
		    },
		    yAxis: {
		        title: {
		            text: ''
		        }
		    },
		    plotOptions: {
		        pie: {
		        	innerSize: 120,
		            shadow: false,
		            center: ['50%', '50%'],
		            borderWidth: 0,

					dataLabels: { 
						enabled: true,
						distance: 0,
						x: -10,
						y: 0
					}
														
				}
		    },
		    tooltip: {
		        enabled: false
		    },
		    series: [{
		        name: '',
		        data: browserData,
		        size: '115%',
		        dataLabels: { 
		        	enabled: true,
		        	useHTML: true
		        }
		        
		    }, {
		        name: '',
		        data: versionsData,
		        size: '75%',
		        innerSize: '90%',
										dataLabels: {
		        	color: '#ffffff',
		        	distance: 0,
		        	formatter: function(){
			        	return this.y > 1 ? '<span class="label-percent">' + this.y + '%</span>': null;
			        }
		        }
		    }]
		});
	}

		/* DASHBOARD CHART 2 END */
		
	/* DASHBOARD CHARTS END */
	
	
	
	
	if ($('#line-chart2').length){
		Highcharts.chart('line-chart2', {

		    title: {
		        text: ''
		    },

		    subtitle: {
		        text: ''
		    },

		    chart: {
		    	borderColor: '#7b52ab',
		    	borderWidth: 1,
		    	borderRadius: 2,
		    	height: 210,
		    	marginTop: 1,
		    	marginLeft: 2,
		    	marginRight: 3,
		    	marginBottom: 3
		    },
		    tooltip: {
		        pointFormat: 'bid <b>{point.x}</b> <br/> {series.name}: <b>{point.y}</b><br/>',
		        shared: true
		    },

		    xAxis: {
		    	gridLineWidth: 1,
		        lineColor: '#ecede8',
		        offset: 2,
		        min: 0,
		        max: 5,
		        tickPosition: 'inside',
		        tickColor: '#663399',
		        tickLength: 5,
		        showFirstLabel: false,
		        labels: {
		        	reserveSpace: false,
		        	y: -5,
		        	x: -7,
		        	style: {
		        		color: '#545454',
		                fontSize: '12px',
		                fontWeight: '300',
		                fontFamily: 'Open Sans'
		        	}
		        },
		        tickInterval: 1
		    },

		    yAxis: {
		        title: {
		            text: ''
		        },
		        gridLineWidth: 1,
		        lineColor: '#ecede8',
		        offset: 0,
		        min: 0,
		        tickPosition: 'inside',
		        tickColor: '#663399',
		        tickLength: 3,
		        showFirstLabel: false,
		        labels: {
		        	reserveSpace: false,
		        	x: 25,
		        	y: 15,
		        	style: {
		        		color: '#545454',
		                fontSize: '12px',
		                fontWeight: '300',
		                fontFamily: 'Open Sans'
		        	}
		        },
		        tickInterval: 20000
		    },
		    legend: {
		        enabled: false
		    },

		    plotOptions: {
		    	line: {
		    		lineWidth: 4,
		    		color: '#663399'
		    	},
		        series: {
		            pointStart: 0,
		            marker: {
			            enabled: false
			        }
		        }
		    },
		    series: [{
		        name: 'clicks',
		        data: [20000, 20000, 40000, 40000, 60000, 80000]
		    }]

		});
	}

	$grid;
	if ($( "#sortable" ).length) {			
		var $grid = $( "#sortable" ).packery({
	  		itemSelector: '.dashbox'
	});
		// make all grid-items draggable
	$grid.find('.dashbox').each( function( i, gridItem ) {
	  var draggie = new Draggabilly( gridItem );
	  // bind drag events to Packery
	  $grid.packery( 'bindDraggabillyEvents', draggie );
	});

	}

	// js
	
		$(".icon-size").on('click touchstart', function() {
		  $('.dashbox-settings-select').fadeOut().parent().removeClass('active');
    $(this).next().fadeToggle().parent().toggleClass('active');
				return false ;
  });
		$(".icon-settings").on('click touchstart', function() {
			 $('.dashbox-size-select').fadeOut().parent().removeClass('active');
    $(this).next().fadeToggle().parent().toggleClass('active');
				return false 
  });
		/*
		$(document).click(function() {
				$('.dashbox-settings-select, .dashbox-size-select').fadeOut().parent().removeClass('active');
			});
			*/
		$(".dashbox-size-option").on('click touchstart', function() {
			$('.dashbox-size-select').fadeOut().parent().removeClass('active');
					var newSize = $(this).attr('data-size').valueOf();
					var oldSize = $(this).parents('.dashbox').attr('data-size').valueOf();
					if ( newSize == oldSize ) { return false;}
					$(this).parents('.dashbox').attr('data-size', newSize);
     $(this).parents('.dashbox').switchClass( oldSize, newSize, 200, "easeInOutQuad", function(){chart.reflow();$grid.packery('layout');} );

    });


	$('.t-statistic-row').click(function(){
    	$(this).toggleClass('opened');
    	$(this).find('.t-statistic-row__details').slideToggle();
    })
				 
	$('.js-content-toggle').click(function(){
		var el = $(this);
		if($('#right-sidebar').hasClass('fixed-sidebar-bottom')){
			$('#right-sidebar').removeClass('fixed-sidebar-bottom').addClass('fixed-sidebar'); 
			$('.b-sidebar-right').css('position', 'relative');
		}
		
		el
			.toggleClass('open')
			.next('.b-form-box')
			.slideToggle(500, function() {
				el.next('.b-form-box').toggleClass('b-form-box_first');
				checkSidebarPos();

			})
			

	});

	$(".b-submenu__item-link").click(function() {
		$("html, body").animate({
				scrollTop: $($(this).attr("href")).offset().top
		}, {
				duration: 500
		});
		return false;
	});


	$('.js-col-show').click(function(){		
		$(this).toggleClass('opened');
		$(this).next('.holder-sub-table').slideToggle(500);
		$(".mCustomScrollBox").addClass("custom-height");
	});

	$('.table-btn__open').click(function(){	
	 	$(".holder-sub-table").each(function(index, elem) {
	 		if ($(elem).css('display') === 'none') {
				$(elem).slideToggle(500);
	 		}
	 	})
	 	$(".holder-sub-table").prev(".adv-payment_page .t-payment-row.opened").removeClass('opened');
	 	$(".holder-sub-table").prev(".adv-payment_page .t-payment-row").addClass('opened');
	 	$(".mCustomScrollBox").addClass("custom-height");

	});

	$('.table-btn__close').click(function(){
		$(".holder-sub-table").each(function(index, elem) {
	 		if ($(elem).css('display') === 'block') {
				$(elem).slideToggle(500);
	 		}
	 	})
	 	$(".holder-sub-table").prev(".adv-payment_page .t-payment-row.opened").removeClass('opened');	
	});

	$('.group-delete').click(function(){
		$(this).parent().addClass("item-delete") 
	})

	if($('.chosen-drop').length){
    	$(".chosen-drop").mCustomScrollbar({
    		mouseWheel: true
    	});
    }
    $('.chosen-search-input').attr('placeholder', 'Поиск...');
		
		
	$('#save-settings').bind('click', function(e) { 

			e.preventDefault();
			$('#html-popup').bPopup({
				modalColor: '#643296',
				opacity: 0.17
			});

	});

	
	
	if($('.html-content').length){
		$(".html-content").mCustomScrollbar({mouseWheel: true, documentTouchScroll: true});
	}
	
	
	$('.b-account-container').css('min-height', $('.b-sidebar-right').height()); // min-height for tablet content
	
	
	$('.b-form-box .js-create-new-select').click(createCustomSelect);
	
	// choice url or offer
	$('.js-choice').on('change', function(){
		$('.js-choice-el').attr('disabled', 'disabled');
		$(this).closest('.js-choice-wrap').find('.js-choice-el').removeAttr('disabled');
	});
});

function createCustomSelect(eventObject) {
    var insertSelectID = $.uniqueId({prefix:'customSelect_',suffix:''});
		
		var insertElement;
		
		if($(this).hasClass('b-form__link_2')){
			insertElement = '<div class="b-form__add-box b-form__add-box-2"><div class="b-form__select b-form__select_add"><select class="custom" id="'+insertSelectID+'"><option>option 1</option><option>option 2</option><option>option 3</option></select></div><a href="#" class="b-form__link b-form__link_delete b-form__link_delete-2">Удалить</a><div class="b-content__clear"></div></div>';
			$('.b-form__link_2').css('display', 'none');
		}
		else{
			insertElement = '<div class="b-form__add-box"><div class="b-form__select b-form__select_add"><select class="custom" id="'+insertSelectID+'"><option>option 1</option><option>option 2</option><option>option 3</option></select></div><a href="#" class="b-form__link b-form__link_delete">Удалить</a><div class="b-content__clear"></div></div>';
		}
		
    var newElem = $(insertElement).insertBefore(this);
    
    $('.b-form__link_delete').click(function () {
        $(this).parents('.b-form__add-box').remove();
				
				if($(this).hasClass('b-form__link_delete-2'))
					$('.b-form__link_2').css('display', 'block').removeClass('b-form__link_3');
				
        return false;
    });

    $('body').addClass('hasJS');

    var sb = new SelectBox({
        selectbox: $("#"+insertSelectID),
        customScrollbar: false,
        height: 98,
    });

    $(this).addClass('b-form__link_3');
		
    return false;
}

(function($){
    $.uniqueId = function(options){
        var settings=$.extend({
            attribute: 'id',
            prefix: 'uid_',
            suffix: '',
            counter_start: 1
        },options);
        var id_counter=parseInt(settings.counter_start);
        while($('['+settings.attribute.toString()+'='+settings.prefix.toString()+id_counter.toString()+settings.suffix+']').length>0){
            id_counter+=1;
        }
        return settings.prefix.toString()+id_counter.toString()+settings.suffix.toString();
    }
}(jQuery))


$(window).scroll(function (event) {
	
	checkSidebarPos();
		
});


$(window).resize(function(){
	
	var contW = $('.b-content').innerWidth() + 2;
	$('.modal-box').css({'width': contW, 'left': $('.b-content').offset().left});
});



/* check position of the element */
function offsetPosition(element) {
	var offsetTop = 0;
	do {
			offsetTop  += element.offsetTop;
	} while (element = element.offsetParent);
	return offsetTop;
}
//--


var header_height;

function checkSidebarPos(){
	
	if($('#right-sidebar')[0]){
		var sidebarPos = offsetPosition($('#right-sidebar')[0]);
		var footer = offsetPosition($('#footer')[0]);  
		
		var y = $(this).scrollTop();
		var pos = $(window).scrollTop(); //position of the scrollbar
		var midPos = y + $('#right-sidebar').height();
			
		if(pos > sidebarPos)
			$('#right-sidebar').addClass('fixed-sidebar'); 
		else
			$('#right-sidebar').removeClass('fixed-sidebar');
		
		if(windowWidth < 999)
			header_height = 238;
		else
			header_height = 60;
		
		if(pos <= header_height)
			$('#right-sidebar').removeClass('fixed-sidebar');
		
		if(midPos >= footer){
			$('#right-sidebar').addClass('fixed-sidebar-bottom');
			$('.b-sidebar-right').css('position', 'static');
		}
		else{
			$('#right-sidebar').removeClass('fixed-sidebar-bottom');
			$('.b-sidebar-right').css('position', 'relative');
		}
	}
	
}
