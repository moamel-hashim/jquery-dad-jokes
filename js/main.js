/* import data */


const $ = require('jquery');
const laughingFace = 'https://em-content.zobj.net/thumbs/120/apple/354/face-with-tears-of-joy_1f602.png'
const smilingFace = 'https://em-content.zobj.net/thumbs/160/apple/354/grinning-face_1f600.png'
$(document).ready(function () {
  let dadJokesIndex = 0;
  const dadJokesArray = [];
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

  function updateFavoriteEmoji() {
    if(data.favorite.indexOf(dadJokesArray[dadJokesIndex]) !== -1 ) {
      $('.favorite-emoji img').attr('src', laughingFace);
    } else {
      $('.favorite-emoji img').attr('src', smilingFace);
    }
  };

  function toggleFavorite(joke) {
    const index = data.favorite.indexOf(joke);
    if (index !== -1) {
      data.favorite.splice(index, 1);
    } else {
      data.favorite.push(joke);
    }
    updateFavoriteEmoji();
  }

  $.ajax(settings).done(function (response) {
    const dadJoke = response.joke;
    $('.jokes').text(`${dadJoke}`);
    dadJokesArray.push(dadJoke);
    updateFavoriteEmoji();
  });
  $('button.emoji').hover(
    function () {
      $(this).css({ transform: 'scale(1.2)', transition: 'transform 0.5s' });
    },
    function () {
      $(this).css({ transform: 'scale(1)', transition: 'transform 0.5s' });
    }
  );
  $('button.emoji').on('click', function () {
    $('.home-page').addClass('hide');
    $('nav').removeClass('hide');
    $('.main-page').removeClass('hide');
  });

  $('.fa-chevron-right').on('click', function () {
    dadJokesIndex++;
    if (dadJokesArray[dadJokesIndex] === undefined) {
      $.ajax(settings).done(function (response) {
        const dadJoke = response.joke;
        $('.jokes').text(`${dadJoke}`);
        dadJokesArray.push(dadJoke);
        updateFavoriteEmoji();
      });
    } else {
      $('.jokes').text(dadJokesArray[dadJokesIndex]);
      updateFavoriteEmoji();
    }
    updateFavoriteEmoji();
  });

  $('.fa-chevron-left').on('click', function () {
    if (dadJokesIndex > 0) {
      dadJokesIndex--;
      $('.jokes').text(dadJokesArray[dadJokesIndex]);
      updateFavoriteEmoji();
    }
    updateFavoriteEmoji();
  });

  $('.favorite-emoji').hover(function () {
    $(this).css({ transform: 'scale(1.2)', transition: 'transform 0.5s' });
  },
  function () {
    $(this).css({ transform: 'scale(1)', transition: 'transform 0.5s' });
  });

  $('.favorite-emoji').on('click', function () {
    const currentJoke = dadJokesArray[dadJokesIndex];
    const currentSrc = $('.favorite-emoji img').attr('src');

    if (currentSrc === smilingFace) {
      $('.favorite-emoji img').attr('src', laughingFace);
      toggleFavorite(currentJoke);
    } else {
      $('.favorite-emoji img').attr('src', smilingFace);
      toggleFavorite(currentJoke);
    }
    updateFavoriteEmoji();
  });

  $('.favorite').on('click', function() {
    $('.main-page').addClass('hide');
  });

  if(data.favorite.length === 0) {
    return $()
  }

});
