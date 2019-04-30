(function ($) {
  var form1 = $('.sbscrb-field'),
      completed = false,
      mail1 = $(form1).find('.sbscrb-input'),
      successElem = document.createElement('div'),
      successText = "<span class='success'>Thanks for joining us!</span>";
      successElem.setAttribute('class', 'subscription-descr');

  $('.sbscrb-btn').on('click', function (e) {
    var form = $(this).parents('.sbscrb-field'),
      mail = $(form).find('.sbscrb-input');

      e.preventDefault();
      if(completed)
          return true;
      var email = $(mail).val();
      
      if (typeof email !== 'undefined' && email.match(/[a-z0-9_.#]+@[a-z0-9_.#]+/gi)) {
        
          $.ajax({
              url: 'https://account.420cloud.com/subscribe.php',
              dataType: 'JSON',
              method: 'GET',
              data: {
                  email: email,
                  action: 'subscribe',
                  siteid: 16
              },
              complete: function (response) {
                  completed = true;
                  $(mail).val('');
                  $(form1).empty();
                  $(successElem).append(successText);
                  $(form1).append(successElem);
                  console.log('complete');
              },
              success: function (response) {
                
              },
              beforeSend: function () {
              },
              error: function (evt) {
                console.log('error');
              }
          });
      } else{
        mail1.addClass('error');
        mail1.val('');
        mail1.attr('placeholder', 'Please enter valid email');
      }
  });
})(jQuery);