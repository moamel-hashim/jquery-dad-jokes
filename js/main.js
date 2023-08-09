const $ = require('jquery');
$(document).ready(function () {

  $('button.emoji').hover(
    function () {
      $(this).css({ transform: 'scale(1.2)', transition: 'transform 0.5s' });
    },
    function () {
      $(this).css({ transform: 'scale(1)', transition: 'transform 0.5s' });
    }
  );
  $('.emoji-container').on('click', function () {
    $(this).addClass('hide');

    const settings = {
      async: true,
      crossDomain: true,
      url: 'https://icanhazdadjoke.com/',
      method: 'GET',
      dataType: 'json',
      headers: {
        Accept: 'application/json'
      }
    };

    $.ajax(settings).done(function (response) {
      const dadJoke = response.joke;
      $('.jokes').text(`${dadJoke}`);
      dadJokesArray.push(`${dadJoke}`);
      console.log(response);
    });
  });

  const dadJokesArray = [];
});
