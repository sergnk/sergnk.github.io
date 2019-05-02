(function ($) {
  function getGetByName(name) {
    var $_GET = {};
    if(document.location.toString().indexOf('?') !== -1) {
      var query = document.location
           .toString()
           // get the query string
           .replace(/^.*?\?/, '')
           // and remove any existing hash string (thanks, @vrijdenker)
           .replace(/#.*$/, '')
           .split('&');

      for(var i=0, l=query.length; i<l; i++) {
         var aux = decodeURIComponent(query[i]).split('=');
         $_GET[aux[0]] = aux[1];
      }
    }
    //get the 'index' query parameter
    if ( $_GET[ name ] ) {
      return $_GET[ name ];
    }
    return false;
  }

  // News list
  function News(page, filterDate) {
    this.page = page != undefined ? page : 1;
    this.pagePrev = 1;
    this.pageNext;
    this.date = filterDate;
    this.mcigUrl = 'https://mciggroup.com/json420news.php';
  }

  News.prototype.getNews = function(url, callback) {
    var that = this;
    var attr = {
      page: this.page,
      orderby: ["date_desc"],
    };

    if (this.date) {
      attr.date_query = '';
      attr.y = this.date;
    }

    $.ajax({
      url: url,
      dataType: 'JSON',
      method: 'GET',
      data: attr,
      complete: function (response) {
          console.log('complete');
      },
      success: function (response) {
        callback(that, response);
      },
      beforeSend: function () {
      },
      error: function (evt) {
        console.log('error');
      }
    });
  }

  News.prototype.getDirectFromMcig = function(that, response) {
    var wrapper = $('.investors-list');

    if (response.next_page_index != undefined) {
      that.pageNext = response.next_page_index;
      that.pagePrev = (response.next_page_index - 2) >= 1 ? (response.next_page_index - 2) : 0;

      if (+that.page === +that.pageNext) {
        $('.investors-nav-btn.next').hide();
        if ( that.pagePrev >= 0) {
          that.pagePrev = that.pagePrev + 1;
        }
      }

      if ( that.pagePrev >= 1) {
        $('.investors-nav-btn.prev').show();
      }
    }

    if (response.data != undefined && response.data.length) {
      response.data.forEach(function(item, k) {
        var div = document.createElement("div"),
            text;

        div.innerHTML = item.content;
        text = div.textContent || div.innerText || "";
        item.description = that.getShortContent(text);

        var itemHtml = that.createInvestorItem(item);
        wrapper.append(itemHtml);
      });
    } else if (that.page > 1 || that.page < 1 ) {
      document.location.href = "./investors.html?page=" + 1;
    }
  }

  News.prototype.getShortContent = function(content) {
    var maxLength = 370; // maximum number of characters to extra

    if (content.length <= maxLength) {
      return content;
    }

    // trim the string to the maximum length
    var trimmedString = content.substr(0, maxLength);

    // re-trim if we are in the middle of a word
    trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")));
    return trimmedString;
  }

  News.prototype.createInvestorItem = function(post) {
    var postLink = 'investors-article.html?post=' + post.id,
        postDate = post.date.replace(',','').split(" "),
        itemWrapp = $("<div></div>").addClass("investors-list__item"),
        itemLeft = $("<div></div>").addClass("investors-list__item-left"),
        itemRight = $("<div></div>").addClass("investors-list__item-right"),
        itemDate = $("<div></div>").addClass("investors-list__item-date")
          .append(postDate[0].substr(0, 3) + "<br> "+ postDate[1] +"<br><span>"+ postDate[2] +"</span>"),
        leftTxt = $("<div></div>").addClass("investors-list__item-left-txt").append("PRESS RELEASE"),
        itemName = $("<a></a>").addClass("investors-list__item-name").append(post.title).attr('href', postLink),
        //itemAuthor = $("<span></span>").addClass("investors-list__item-author").append("JACKSONVILLE, FL, Feb. 12, 2018 (GLOBE NEWSWIRE)"),
        itemText = $("<p></p>").addClass("investors-list__item-text").append(post.description),
        itemMore = $("<span></span>").addClass("investors-list__item-more").append('... <a href="'+postLink+'">MORE</a>'),
        text;

    itemLeft.append(itemDate);
    itemLeft.append(leftTxt);

    itemRight.append(itemName);
    //itemRight.append(itemAuthor);

    itemText.append(itemMore);
    itemRight.append(itemText);

    itemWrapp.append(itemLeft);
    itemWrapp.append(itemRight);

    return itemWrapp;
  }

  News.prototype.clearNewsList = function() {
    var wrapper = $('.investors-list');

    if (wrapper.length) {
      $(wrapper).html('');
    }
  }

  $(document).ready(function() {
    var wrapper = $('.investors-list');

    if (wrapper.length) {
      var curentPage = getGetByName('page');
      var filterDate = getGetByName('date');
      var news = new News(curentPage, filterDate);

      news.getNews(news.mcigUrl, news.getDirectFromMcig);
    }

    $('.investors-nav-btn.next').on('click', function() {
      var dateAttr = '';
      if (news.date) {
        dateAttr = '&date=' + news.date;
      }
      document.location.href = "./investors.html?page=" + news.pageNext + dateAttr;
    });

    $('.investors-nav-btn.prev').on('click', function() {
      var dateAttr = '';
      if (news.date) {
        dateAttr = '&date=' + news.date;
      }
      document.location.href = "./investors.html?page=" + news.pagePrev + dateAttr;
    });

  });

})(jQuery);