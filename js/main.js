const $ = require('jquery');
$(document).ready(function () {
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
    dadJokesArray.push(dadJoke);
  });
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
  });

  $('.fa-chevron-right').on('click', function () {
    dadJokesIndex++;
    if (dadJokesArray[dadJokesIndex] === undefined) {
      $.ajax(settings).done(function (response) {
        const dadJoke = response.joke;
        $('.jokes').text(`${dadJoke}`);
        dadJokesArray.push(dadJoke);
      });
    } else {
      $('.jokes').text(dadJokesArray[dadJokesIndex]);
    }
  });

  $('.fa-chevron-left').on('click', function () {
    if (dadJokesIndex > 0) {
      dadJokesIndex--;
      $('.jokes').text(dadJokesArray[dadJokesIndex]);
    }
  });

  const dadJokesArray = [];
  let dadJokesIndex = -1;
  console.log('value of dadjokesarray', dadJokesArray);
});
