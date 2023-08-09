import $ from './node_modules/jquery/dist/jquery.min.js';

$(document).ready(function () {
  $('.emoji').click(function () {
    $('p').add('its working');
  });
});
