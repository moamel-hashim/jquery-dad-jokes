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
});

$('.emoji-container').on('click', function () {
  $(this).addClass('hide');
});
