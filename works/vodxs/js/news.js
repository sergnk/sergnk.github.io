(function ($) {
  $(document).ready(function() {
    var wrapper = $('.news-list');

    if ( wrapper.length ) {
      getFromFeed();
    }

  });

  function getFromFeed() {
    $.ajax({
      url: 'https://feeds.blogcertified.com/posts?type=order_desc&categories=1122&num_of_posts=15',
      dataType: 'JSON',
      method: 'GET',
      data: {},
      complete: function (response) {
      },
      success: function (response) {
        var wrapper = $('.news-list');

        if (response.data != undefined && response.data.length) {

          response.data.forEach(function(item, k) {
            var itemHtml = createNewsItem(item);
            $('.js-news-slider').slick('slickAdd', itemHtml);
          });
        }
      },
      beforeSend: function () {
      },
      error: function (evt) {
      }
    });
  }

  function compareNumeric(a, b) {
    if (a.date < b.date) return 1;
    if (a.date > b.date) return -1;
  }

  function getShortContent(content) {
    var maxLength = 250; // maximum number of characters to extra

    if (content.length <= maxLength) {
      return content;
    }

    var trimmedString = content.substr(0, maxLength);

    trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")));
    trimmedString = trimmedString + '...';
    return trimmedString;
  }

  function createNewsItem(post) {  
    var postLink = 'news-single.php?post=' + post.id,
        itemElem = $("<div></div>").addClass("news-list__item"),
        itemWrapp = $("<div></div>").addClass("news-list__item-wrapper"),
        itemDate = $("<div></div>").addClass("news-list__item-date"),
        itemContent = $("<div></div>").addClass("news-list__item-txt"),
        itemTitle = $("<a></a>").addClass("news-list__item-name").append(post.title).attr('href', postLink),
        itemText = $("<p></p>").addClass("news-list__item-text").append(getShortContent(post.description)),
        itemReadMore = $("<a></a>").addClass("news-list__item-more").append('read more').attr('href', postLink),
        itemImgWrapp = $("<div></div>").addClass("news-list__item-image"),
        itemImgLink = $("<a></a>").attr('href', postLink),
        itemImage = $("<img>").attr('src', post.cached_thumbs['360x200']);

    var postDate = post.date.split(/[\s,]+/);

    if ( postDate[0] != undefined ) {
      postDate = postDate[0] + ' ' + postDate[1];
    }
    
    itemContent.append(itemTitle);
    itemContent.append(itemText);

    itemDate.append(postDate);

    itemImgLink.append(itemImage);
    itemImgWrapp.append(itemImgLink);

    itemWrapp.append(itemDate);
    itemWrapp.append(itemImgWrapp);
    itemWrapp.append(itemContent);
    itemWrapp.append(itemReadMore);

    itemElem.append(itemWrapp);

    return itemElem;
  }

})(jQuery);