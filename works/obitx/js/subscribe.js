(function ($) {
  var form = $('.contact-sbscrb'),
      completed = false,
      mail = $(form).find('.contact-sbscrb-input'),
      btn = $(form).find('.contact-sbscrb-btn'),
      successElem = document.createElement('p'),
      successText = "<span class='success'>Thanks for subscribing.</span>";
      successElem.setAttribute('class', 'subscription-descr');
  $(btn).on('click', function (e) {
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
                  $(form).empty();
                  $(successElem).append(successText);
                  $(form).append(successElem);
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
        mail.addClass('error');
        mail.val('');
        mail.attr('placeholder', 'Please enter valid email');
      }
  });
})(jQuery);