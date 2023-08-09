const $ = require('jquery');
$(document).ready(function () {

  const settings = {
    async: true,
    crossDomain: true,
    url: 'https://dad-jokes.p.rapidapi.com/random/joke',
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '19cde8be53mshba709677a7fe40ep101cbcjsnf2989692780b',
      'X-RapidAPI-Host': 'dad-jokes.p.rapidapi.com'
    }
  };

  $.ajax(settings).done(function (response) {
    const setup = response.body[0].setup;
    const punchline = response.body[0].punchline;
    $('.jokes').text(`${setup} ${punchline}`);
    dadJokesArray.push(`${setup} ${punchline}`);
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
  const dadJokesArray = [];
});
