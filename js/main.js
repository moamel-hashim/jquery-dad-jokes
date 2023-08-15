/* import data */

const $ = require('jquery');
const laughingFace = 'https://em-content.zobj.net/thumbs/120/apple/354/face-with-tears-of-joy_1f602.png';
const smilingFace = 'https://em-content.zobj.net/thumbs/160/apple/354/grinning-face_1f600.png';
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
    if (data.favorite.indexOf(dadJokesArray[dadJokesIndex]) !== -1) {
      $('.favorite-emoji img').attr('src', laughingFace);
    } else {
      $('.favorite-emoji img').attr('src', smilingFace);
    }
  }

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
    }
    updateFavoriteEmoji();
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

  $('.favorite').on('click', function () {
    $('.main-page').addClass('hide');
    $('div.no-favorite-container').removeClass('hide');
    $('.favorite-page').removeClass('hide');
  });

  if (data.favorite.length === 0) {
    const newDiv = $('<div>').addClass('no-favorite-container hide text-align-center');
    const newH3 = $('<h3>').addClass('no-favorite').text('Please add a favorite');
    newDiv.append(newH3);
    $('.favorite-page').append(newDiv);
  }
  for (let i = 0; i < data.favorite.length; i++) {
    data.id++;
    const newDiv = $('<div>').addClass('favorite-joke-container').attr('data-id', data.id);
    const newDiv2 = $('<div>').addClass('delete-icon-container flex justify-content-end');
    const liDiv = $('<div>').addClass('');
    const newLi = $('<li>').text(data.favorite[i]);
    const newI = $('<i>').addClass('fa-solid fa-trash-can');
    newDiv.append(newDiv2);
    newDiv2.append(newI);
    newDiv.append(liDiv);
    liDiv.append(newLi);
    $('ul').append(newDiv);
  }
  
  const newModel = $('<div>').addClass('model');
  const closeModel = $('<div>').addClass('close');
  const closeButton = $('<button>').addClass('close-button').text('X');
  const p = $('<p>').text('are you sure you want to delete this?');
  const buttonContainer = $('<div>').addClass('flex justify-content-space-evenly confirm-buttons-container');
  const yesButton = $('<button>').addClass('yes').text('yes');
  const noButton = $('<button>').addClass('no').text('no');
  newModel.append(closeModel);
  closeModel.append(closeButton);
  newModel.append(p);
  newModel.append(buttonContainer);
  buttonContainer.append(yesButton);
  buttonContainer.append(noButton);
  $('.model-container').append(newModel);

  $('.fa-trash-can').on('click', function () {
    const trashIcon = $(this);
    const dataId = parseInt(trashIcon.closest('div').parent('div').attr('data-id'));
    console.log(dataId);
    $('.model-container').removeClass('hide');
    $('.overlay').removeClass('hide');

    $('.close-button').on('click', function () {
      $('.overlay').addClass('hide');
      $('.model-container').addClass('hide');

    });

    $('.no').on('click', function() {
      $('.overlay').addClass('hide');
      $('.model-container').addClass('hide');
    });

    $('.yes').on('click', function() {
      console.log('if dataId === data.favorite', data.favorite.findIndex(id => id === dataId) !== -1);
      console.log(data.id)
      console.log('value of dataId',dataId);
      // const indexToRemove = data.favorite.indexOf(dataId);
          // console.log('if is working');
          data.favorite.splice(dataId, 1);
          $(`div.favorite-joke-container[data-id="${dataId}"]`).remove();
          $('.overlay').addClass('hide');
          $('.model-container').addClass('hide');
        // console.log(dataId);
      });

  });


});
