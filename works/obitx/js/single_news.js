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

  // Single news
  function SingleNews(post) {
    this.post = post != undefined ? post : 1;
    this.prevPost;
    this.nextPost;
    this.mcigUrl = 'https://mciggroup.com/json420news.php';
    //this.feedUrl = 'https://feeds.420cloud.com/mciggroup';
  }

  SingleNews.prototype.getSingleNews = function(url, callback) {
    var that = this;
    $.ajax({
      url: url,
      dataType: 'JSON',
      method: 'GET',
      data: {
        post_id: that.post,
      },
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

  SingleNews.prototype.getSingleFromMcig = function(that, response) {
    var wrapper = $('.investors-list');

    if (response.data[0] != undefined) {
        if (response.data[0].prev_post == "") {
          $('.investors-nav-btn.prev').hide();
          that.prevPost = "";
        } else {
          that.prevPost = response.data[0].prev_post;
        }

        if (response.data[0].next_post == "") {
          $('.investors-nav-btn.next').hide();
          that.nextPost = "";
        } else {
          that.nextPost = response.data[0].next_post;
        }

        var div = document.createElement("div");

        div.innerHTML = response.data[0].content;
        response.data[0].description = div.textContent || div.innerText || "";

        var itemHtml = that.createInvestorItem(response.data[0]);
        wrapper.append(itemHtml);
    } else {
      document.location.href = "./investors.html";
    }
  }

  SingleNews.prototype.createInvestorItem = function(post) {
    var postDate = post.date.replace(',','').split(" "),
        itemWrapp = $("<div></div>").addClass("investors-list__item"),
        itemLeft = $("<div></div>").addClass("investors-list__item-left"),
        itemRight = $("<div></div>").addClass("investors-list__item-right"),
        itemWrappText = $("<div></div>").addClass("investors-list__item-text-wrapper"),
        itemDate = $("<div></div>").addClass("investors-list__item-date")
          .append(postDate[0].substr(0, 3) + "<br> "+ postDate[1] +"<br><span>"+ postDate[2] +"</span>"),
        leftTxt = $("<div></div>").addClass("investors-list__item-left-txt").append("PRESS RELEASE"),
        itemName = $("<div></div>").addClass("investors-list__item-name").append(post.title),
        //itemAuthor = $("<span></span>").addClass("investors-list__item-author").append("JACKSONVILLE, FL, Feb. 12, 2018 (GLOBE NEWSWIRE)"),
        itemText = this.parseContent(post.content);;

    itemLeft.append(itemDate);

    itemRight.append(leftTxt);
    itemRight.append(itemName);
    //itemRight.append(itemAuthor);

    itemWrappText.append(itemText);

    itemWrapp.append(itemLeft);
    itemWrapp.append(itemRight);
    itemWrapp.append(itemWrappText);

    return itemWrapp;
  }

  SingleNews.prototype.parseContent = function(content) {
    var parser = new DOMParser();
    var doc = parser.parseFromString(content, 'text/html');
    //var style = '<style>.investors-list__item-text-wrapper {font-size: 20px; line-height: 36px; color: #000; font-weight: 400;}</style>';
    //$(doc).find('body').append(style);

    var parag = $(doc).find('p');
    var listsUl = $(doc).find('ul');
    var listsOl = $(doc).find('ol');

    Array.prototype.some.call(parag, function(el) {
        $(el).attr('class', '');
        $(el).attr('style', '');
        $(el).addClass("investors-list__item-text");
        $(el).append('<br><br>');
    });

    $(doc).find('body').contents().wrap("<p/>");
    parag = $(doc).find('p');
    Array.prototype.some.call(parag, function(el) {
        $(el).addClass("investors-list__item-text");
    });

    Array.prototype.some.call(listsUl, function(el) {
        $(el).attr('class', '');
        $(el).attr('style', '');
        $(el).addClass("investors-list__item-text-list");
    });

    Array.prototype.some.call(listsOl, function(el) {
        $(el).attr('class', '');
        $(el).attr('style', '');
        $(el).addClass("investors-list__item-text-list");
    });

    return $(doc).find('body').html();
  }

  $(document).ready(function() {
    var wrapper = $('.investors-list');

    if (wrapper.length) {
      var nawsId = getGetByName('post');
      var single = new SingleNews(nawsId);

      single.getSingleNews(single.mcigUrl, single.getSingleFromMcig);
    }

    $('.investors-nav-btn.next').on('click', function() {
      if (single.nextPost) {
        document.location.href = "./investors-article.html?post=" + single.nextPost;
      }
    });

    $('.investors-nav-btn.prev').on('click', function() {
      if (single.prevPost) {
        document.location.href = "./investors-article.html?post=" + single.prevPost;
      }
    });

  });

})(jQuery);