'use strict';

svg4everybody();

(function() {
	var iterate = function iterate(items, callback) {
		items.forEach(function(item) {
			var key = void 0;
			var value = void 0;

			if (typeof item === 'string') {
				key = item;
				value = item;
			} else {
				key = item[0];
				value = item[1];
			}

			callback(key, value);
		});
	};

	var check = function check(category, items) {
		iterate(items, function(key, value) {
			if (bowser[key]) {
				$(document.documentElement).addClass('is-' + category + '-' + value);
			}
		});
	};

	check('engine', ['webkit', 'blink', 'gecko', ['msie', 'ie'],
		['msedge', 'edge']
	]);

	check('device', ['mobile', 'tablet']);

	check('browser', ['chrome', 'firefox', ['msie', 'ie'],
		['msedge', 'edge'], 'safari', 'android', 'ios', 'opera', ['samsungBrowser', 'samsung'], 'phantom', 'blackberry', 'webos', 'silk', 'bada', 'tizen', 'seamonkey', 'sailfish', 'ucbrowser', 'qupzilla', 'vivaldi', 'sleipnir', 'kMeleon'
	]);

	check('os', ['mac', 'windows', 'windowsphone', 'linux', 'chromeos', 'android', 'ios', 'iphone', 'ipad', 'ipod', 'blackberry', 'firefoxos', 'webos', 'bada', 'tizen', 'sailfish']);
})();

var $window = $(window);
var $document = $(document);
var $html = $(document.documentElement);
var $body = $(document.body);

$(window).on('load', changeScale);

(function() {

	// foundation
	$(document).foundation();

	// formstyler
	$('.styled').styler();

	// checkboxes for skills
	$('.list-check__item').each(function() {
		var $text = $(this).find('.label-text').html();
		var $input = $(this).find('input');

		$(this).find('.jq-checkbox.styled').addClass('checked');

		if ($text == 'VANILLAJS' || $text == 'ANGULAR') {
			$(this).find('.jq-checkbox.styled').removeClass('checked');
			$input.prop('checked', false);
		} else {
			$input.prop('checked', true);
		}
	});

	// scale animation
	$('#range').on('input', function() {
		changeScale();
	});
})();

var $range = $('#range');
var $rangeValue = $(".profile-block-js__data-value");
var $rangeArrow = $('.scale-arrow');

function changeScale() {

	$('html').removeClass('loaded');

	var $rotateClock = $range.val();

	$rangeArrow.css('transform', 'rotate(' + (-85 + $rotateClock * 172 / 1000) + 'deg)');
	$rangeValue.text($rotateClock);

	if ($rotateClock < 225) {
		$rangeValue.addClass('is-low');
		$rangeValue.removeClass('is-middle');
	} else {
		if ($rotateClock < 720) {
			$rangeValue.addClass('is-middle');
			$rangeValue.removeClass('is-low');
		} else {
			$rangeValue.removeClass('is-middle');
			$rangeValue.removeClass('is-low');
		}
	}
};
