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

  $('.favorite-emoji').hover(function () {
    $(this).css({ transform: 'scale(1.2)', transition: 'transform 0.5s' });
  },
  function () {
    $(this).css({ transform: 'scale(1)', transition: 'transform 0.5s' });
  }
  );

  $('.favorite-emoji').on('click', function () {
    const currentSrc = $('.favorite-emoji img').attr('src');
    const laughingFace = 'https://em-content.zobj.net/thumbs/120/apple/354/face-with-tears-of-joy_1f602.png'
    const smilingFace = 'https://em-content.zobj.net/thumbs/160/apple/354/grinning-face_1f600.png'

    if (currentSrc === laughingFace) {
      $('.favorite-emoji img').attr('src', smilingFace);
    } else {
      $('.favorite-emoji img').attr('src', laughingFace);
    }
  });

  const dadJokesArray = [];
  let dadJokesIndex = -1;
});
