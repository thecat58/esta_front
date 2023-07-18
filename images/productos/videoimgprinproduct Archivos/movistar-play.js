$(document).on('click', '.js-modal-parrilla-play',
  function (e) {
      e.preventDefault();
      let label = $(this).attr('data-label');
      $('.modal-movistarPlay').hide();
      $('#modal-parrilla-play').show();
      dataLayer.push({
          'event': 'trackEvent',
          'eventCategory': 'Movistar - Movistar TV',
          'eventAction': 'Click Movistar TV',
          'eventLabel': 'Click ' + label,
      });
  });
let modal_movistarPlay = document.getElementById('modal-parrilla-play');

function hideModalActivar() {
  if (event.target === modal_movistarPlay) {
      $('#modal-parrilla-play').hide();
  }
}

window.addEventListener('click', hideModalActivar);
$('#modal-parrilla-play').find($('.modal-movistarPlay__close')).on('click', function () {
  $('#modal-parrilla-play').hide();
});
$('.modal-movistarPlay__tablink').on('click', function () {
  let tabContentToShow = $(this).data('content');
  let label = $(this).data('label');
  $('.modal-movistarPlay__tabcontent').hide();
  $('#' + tabContentToShow).show();
  $('.modal-movistarPlay__tablink').removeClass("active");
  $(this).addClass("active");
  dataLayer.push({
      'event': 'trackEvent',
      'eventCategory': 'Movistar - Movistar TV',
      'eventAction': 'Click tabs Guía de canales Movistar TV App',
      'eventLabel': 'Click ' + label
  });
});
$('.modal-movistarPlay-desk__tab').on('click', function () {
  let tabContentToShow = $(this).data('id');
  let label = $(this).data('label');
  let category = $(this).data('category');
  let parrilla = "parrilla-";
  if (category === "Play Lite") {
      parrilla += "canales";
  }
  if (category === "Play Lite Plus") {
      parrilla += "canales-plus";
  }
  if (category === "Play Lite Total") {
      parrilla += "play-lite";
  }
  if (category === "Plan Full Canales") {
      parrilla += "full-canales";
  }
  $(this).parent().parent().parent().find($('.modal-movistarPlay-desk__tabcontent')).hide();
  $('#' + parrilla + '__' + tabContentToShow).show();
  $(this).parent().parent().parent().find($('.modal-movistarPlay-desk__tab')).removeClass("active");
  $(this).addClass("active");
  dataLayer.push({
      'event': 'trackEvent',
      'eventCategory': 'Movistar - Movistar TV',
      'eventAction': 'Click tabs Guía de canales TV movistarPlay',
      'eventLabel': 'Click ' + label,
  });
});
let movistarPlay_acc = $('#modal-parrilla-play').find($(".accordionPlay-btn"));
let movistarPlay_paneles = $('#modal-parrilla-play').find($(".panel"));
movistarPlay_acc.on('click', function () {
  let panel = $(this).next();
  movistarPlay_paneles.slideUp();
  movistarPlay_acc.removeClass("active");
  if (panel.hasClass("active")) {
      movistarPlay_paneles.removeClass("active");
      panel.slideUp();
  } else {
      panel.addClass("active");
      $(this).addClass("active");
      panel.slideDown();
  }
  let category = $(this).data('category');
  let label = $(this).data('label');
  dataLayer.push({
      'event': 'trackEvent',
      'eventCategory': 'Movistar - Movistar TV',
      'eventAction': 'Click tabs Guía de canales ' + category,
      'eventLabel': 'Click ' + label,
  });
});