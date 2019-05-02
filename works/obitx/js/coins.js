(function ($) {
    $.fn.extend({
        coins: function (o) {
            var elem = $(this);

            var defaults = {
                success: function () {},
                limit: -1,
                order_by: '',
            };

            var settings = $.extend({}, defaults, o);
            $.ajax({
                url: 'https://feeds.420cloud.com/coins',
                type: 'GET',
                dataType: 'json',
                success: function (res) {
                    settings.success(res, elem);
                }
            });
        }
    });
})(jQuery);